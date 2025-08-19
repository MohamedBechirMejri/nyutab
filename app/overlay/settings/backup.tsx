import { Alert, AlertDescription, AlertTitle } from "app/components/ui/alert";
import { Button } from "app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "app/components/ui/card";
import { Checkbox } from "app/components/ui/checkbox";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { ScrollArea } from "app/components/ui/scroll-area";
import { Separator } from "app/components/ui/separator";
import { m } from "framer-motion";
import {
	BACKUP_KEYS,
	type BackupKey,
	createBackup,
	downloadBackup,
	parseBackup,
	restoreAllData,
	restoreSelectedData,
	restoreSelectedSettings,
	SETTINGS_KEYS,
	type SettingsKey,
} from "lib/backupUtils";
import { useSettingsStore } from "lib/stores";
import {
	AlertCircle,
	CheckCircle2,
	Download,
	FileJson,
	Upload,
} from "lucide-react";
import { useRef, useState } from "react";

const Backup = () => {
	const [backupDescription, setBackupDescription] = useState("");
	const [restoringFile, setRestoringFile] = useState(false);
	const [backupData, setBackupData] = useState<any>(null);
	const [selectedDataKeys, setSelectedDataKeys] = useState<BackupKey[]>([]);
	const [selectedSettingsKeys, setSelectedSettingsKeys] = useState<
		SettingsKey[]
	>([]);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const { setSettings } = useSettingsStore();

	// Create and download backup
	const handleCreateBackup = () => {
		try {
			const backup = createBackup(backupDescription);
			downloadBackup(backup);
			setSuccess("Backup created successfully!");
			setTimeout(() => setSuccess(null), 3000);
		} catch (err) {
			setError("Failed to create backup");
			setTimeout(() => setError(null), 3000);
		}
	};

	// Handle file selection for restoration
	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setError(null);
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			setRestoringFile(true);
			const backup = await parseBackup(file);
			setBackupData(backup);

			// Default select all keys that exist in the backup
			const availableKeys = BACKUP_KEYS.filter(
				(key) => backup.data[key] !== undefined,
			);
			setSelectedDataKeys(availableKeys);

			// Default select all settings keys that exist in the backup
			if (backup.data.settings) {
				const availableSettingsKeys = SETTINGS_KEYS.filter(
					(key) => backup.data.settings[key] !== undefined,
				);
				setSelectedSettingsKeys(availableSettingsKeys);
			}

			setSuccess("Backup file loaded successfully");
			setTimeout(() => setSuccess(null), 3000);
		} catch (err) {
			setError("Invalid backup file");
			setBackupData(null);
		} finally {
			setRestoringFile(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	// Toggle selection of a data key
	const toggleDataKey = (key: BackupKey) => {
		setSelectedDataKeys((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
		);
	};

	// Toggle selection of a settings key
	const toggleSettingsKey = (key: SettingsKey) => {
		setSelectedSettingsKeys((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
		);
	};

	// Restore from backup
	const handleRestore = () => {
		if (!backupData) return;

		try {
			// If settings is selected, handle special case
			if (selectedDataKeys.includes("settings")) {
				if (selectedSettingsKeys.length > 0) {
					// Restore only selected settings fields
					restoreSelectedSettings(backupData, selectedSettingsKeys);
				} else {
					// If no settings fields are selected, don't restore settings
					const keysWithoutSettings = selectedDataKeys.filter(
						(key) => key !== "settings",
					);
					restoreSelectedData(backupData, keysWithoutSettings);
				}
			} else {
				// Restore selected non-settings data
				restoreSelectedData(backupData, selectedDataKeys);
			}

			setSuccess("Restore completed successfully!");
			setTimeout(() => {
				setSuccess(null);
				window.location.reload();
			}, 2000);
		} catch (err) {
			setError("Failed to restore backup");
			setTimeout(() => setError(null), 3000);
		}
	};

	return (
		<div className="w-full space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Backup & Restore</h2>
				<p className="text-muted-foreground">
					Save your data and settings or restore from a previous backup
				</p>
			</div>

			{/* Status Messages */}
			{error && (
				<m.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative"
				>
					<Alert variant="destructive">
						<AlertCircle className="w-4 h-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				</m.div>
			)}

			{success && (
				<m.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative"
				>
					<Alert className="bg-primary/10 border-primary/20">
						<CheckCircle2 className="w-4 h-4 text-primary" />
						<AlertTitle>Success</AlertTitle>
						<AlertDescription>{success}</AlertDescription>
					</Alert>
				</m.div>
			)}

			{/* Create Backup Section */}
			<Card className="bg-background/65">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Download className="w-5 h-5" />
						Create Backup
					</CardTitle>
					<CardDescription>
						Create a backup file of your data and settings
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="backup-description">
							Backup Description (optional)
						</Label>
						<Input
							id="backup-description"
							value={backupDescription}
							onChange={(e) => setBackupDescription(e.target.value)}
							placeholder="My personal settings backup"
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleCreateBackup} className="w-full sm:w-auto">
						<Download className="w-4 h-4 mr-2" />
						Create & Download Backup
					</Button>
				</CardFooter>
			</Card>

			{/* Restore Backup Section */}
			<Card className="bg-background/65">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Upload className="w-5 h-5" />
						Restore from Backup
					</CardTitle>
					<CardDescription>
						Load settings and data from a previous backup file
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="backup-file">Select Backup File</Label>
						<div className="flex items-center justify-center w-full">
							<label
								htmlFor="backup-file"
								className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 bg-muted/20 border-border"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<FileJson className="w-8 h-8 mb-3 text-muted-foreground" />
									<p className="mb-2 text-sm text-muted-foreground">
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									<p className="text-xs text-muted-foreground">
										JSON backup file
									</p>
								</div>
								<input
									id="backup-file"
									ref={fileInputRef}
									type="file"
									accept=".json"
									onChange={handleFileSelect}
									className="hidden"
								/>
							</label>
						</div>
					</div>

					{backupData && (
						<div className="space-y-4">
							<Separator />

							<div className="space-y-1">
								<h3 className="text-sm font-medium">Backup Information</h3>
								<p className="text-sm text-muted-foreground">
									Created: {new Date(backupData.timestamp).toLocaleString()}
								</p>
								{backupData.description && (
									<p className="text-sm text-muted-foreground">
										Description: {backupData.description}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Card className="border-muted bg-background/65">
									<CardHeader className="pb-2">
										<CardTitle className="text-base">
											Select Data to Restore
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ScrollArea className="h-[150px]">
											<div className="space-y-2">
												{BACKUP_KEYS.map((key) => {
													if (backupData.data[key] === undefined) return null;
													return (
														<div
															key={key}
															className="flex items-center space-x-2"
														>
															<Checkbox
																id={`data-${key}`}
																checked={selectedDataKeys.includes(key)}
																onCheckedChange={() => toggleDataKey(key)}
															/>
															<Label
																htmlFor={`data-${key}`}
																className="capitalize"
															>
																{key}
															</Label>
														</div>
													);
												})}
											</div>
										</ScrollArea>
									</CardContent>
								</Card>

								{selectedDataKeys.includes("settings") && (
									<Card className="border-muted bg-background/65">
										<CardHeader className="pb-2">
											<CardTitle className="text-base">
												Select Settings to Restore
											</CardTitle>
										</CardHeader>
										<CardContent>
											<ScrollArea className="h-[150px]">
												<div className="space-y-2">
													{SETTINGS_KEYS.map((key) => {
														if (backupData.data.settings?.[key] === undefined)
															return null;
														return (
															<div
																key={key}
																className="flex items-center space-x-2"
															>
																<Checkbox
																	id={`settings-${key}`}
																	checked={selectedSettingsKeys.includes(key)}
																	onCheckedChange={() => toggleSettingsKey(key)}
																/>
																<Label
																	htmlFor={`settings-${key}`}
																	className="capitalize"
																>
																	{key}
																</Label>
															</div>
														);
													})}
												</div>
											</ScrollArea>
										</CardContent>
									</Card>
								)}
							</div>

							<Button
								onClick={handleRestore}
								disabled={selectedDataKeys.length === 0 || restoringFile}
								className="w-full"
								variant={
									selectedDataKeys.length === 0 || restoringFile
										? "outline"
										: "default"
								}
							>
								<Upload className="w-4 h-4 mr-2" />
								Restore Selected Data
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Backup;
