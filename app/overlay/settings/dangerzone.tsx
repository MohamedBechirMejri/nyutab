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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "app/components/ui/dialog";
import { Separator } from "app/components/ui/separator";
import { m } from "framer-motion";
import { BACKUP_KEYS } from "lib/backupUtils";
import { useSettingsStore } from "lib/stores";
import { AlertTriangle, CheckCircle2, Trash2, X } from "lucide-react";
import { useState } from "react";

type DangerAction = {
	title: string;
	description: string;
	warning: string;
	action: () => void;
	buttonText: string;
	impact: "medium" | "high";
};

const DangerZone = () => {
	const { settings, setSettings } = useSettingsStore();
	const [message, setMessage] = useState<string | null>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [currentAction, setCurrentAction] = useState<DangerAction | null>(null);

	const showMessage = (msg: string, duration = 3000) => {
		setMessage(msg);
		setTimeout(() => setMessage(null), duration);
	};

	const clearPrayerTimes = () => {
		localStorage.removeItem("prayerTimes");
		showMessage("Prayer times cleared");
	};

	const clearAllData = () => {
		for (const key of BACKUP_KEYS) {
			localStorage.removeItem(key);
		}
		showMessage("All data cleared. Refreshing page...", 2000);
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	const dangerActions: DangerAction[] = [
		{
			title: "Clear Prayer Times",
			description: "Remove saved prayer times from your device",
			warning:
				"This will reset your prayer time settings. You'll need to set them up again.",
			action: clearPrayerTimes,
			buttonText: "Clear Prayer Times",
			impact: "medium",
		},
		{
			title: "Clear All Data",
			description: "Remove all application data and reset to defaults",
			warning:
				"This will permanently delete ALL your data including settings, favorites, and other preferences. This action cannot be undone.",
			action: clearAllData,
			buttonText: "Clear All Data",
			impact: "high",
		},
	];

	const confirmAction = () => {
		if (currentAction) {
			currentAction.action();
			setConfirmOpen(false);
			setCurrentAction(null);
		}
	};

	const handleActionClick = (action: DangerAction) => {
		setCurrentAction(action);
		setConfirmOpen(true);
	};

	return (
		<div className="w-full space-y-6">
			<div className="space-y-2">
				<h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
					<AlertTriangle className="w-5 h-5 text-destructive" />
					Danger Zone
				</h2>
				<p className="text-muted-foreground">
					Actions in this section can result in data loss. Proceed with caution.
				</p>
			</div>

			{message && (
				<m.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="relative"
				>
					<Alert className="bg-primary/10 border-primary/20">
						<CheckCircle2 className="w-4 h-4 text-primary" />
						<AlertTitle>Success</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
						<Button
							variant="ghost"
							size="icon"
							className="absolute w-6 h-6 rounded-full top-2 right-2"
							onClick={() => setMessage(null)}
						>
							<X className="w-3 h-3" />
							<span className="sr-only">Dismiss</span>
						</Button>
					</Alert>
				</m.div>
			)}

			<Card className="border-destructive/30 bg-background/65">
				<CardHeader className="pb-3">
					<CardTitle className="text-destructive">Danger Zone</CardTitle>
					<CardDescription>
						These actions can permanently delete data and cannot be reversed
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{dangerActions.map((action, index) => (
						<div key={action.title} className="space-y-4">
							{index > 0 && <Separator className="my-2" />}
							<div className="flex flex-col justify-between gap-4 sm:flex-row">
								<div className="space-y-1">
									<h3 className="font-medium">{action.title}</h3>
									<p className="text-sm text-muted-foreground">
										{action.description}
									</p>
								</div>
								<Button
									variant="destructive"
									size="sm"
									className="self-start shrink-0 sm:self-center"
									onClick={() => handleActionClick(action)}
								>
									<Trash2 className="w-4 h-4 mr-2" />
									{action.buttonText}
								</Button>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2 text-destructive">
							<AlertTriangle className="w-5 h-5" />
							Confirm {currentAction?.title}
						</DialogTitle>
						<DialogDescription>{currentAction?.warning}</DialogDescription>
					</DialogHeader>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button variant="outline" onClick={() => setConfirmOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={confirmAction}
							className={
								currentAction?.impact === "high"
									? "bg-red-600 hover:bg-red-700"
									: ""
							}
						>
							Yes, I'm Sure
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DangerZone;
