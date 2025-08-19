import { getLocalData, setLocalData } from "./storageUtils";

// List of all local storage keys that can be backed up
export const BACKUP_KEYS = [
	"settings",
	"prayerTimes",
	"memes",
	"sudoku",
	"sudokuTime",
	"tasks",
	"ignored",
	"downloaded",
	"animeCache",
] as const;

export type BackupKey = (typeof BACKUP_KEYS)[number];

// Define settings keys that can be selectively restored
export const SETTINGS_KEYS = [
	"favorites",
	"memes",
	"position",
	"feed",
] as const;

export type SettingsKey = (typeof SETTINGS_KEYS)[number];

// Interface for backup metadata
interface BackupMetadata {
	timestamp: number;
	version: string;
	description?: string;
}

// Interface for complete backup
interface CompleteBackup extends BackupMetadata {
	data: Record<string, any>;
}

/**
 * Creates a complete backup of all local storage data
 */
export const createBackup = (description?: string): CompleteBackup => {
	const data: Record<string, any> = {};

	// Get all data from localStorage
	for (const key of BACKUP_KEYS) {
		const value = getLocalData(key);
		if (value !== null) {
			data[key] = value;
		}
	}

	return {
		timestamp: Date.now(),
		version: "1.0",
		description,
		data,
	};
};

/**
 * Downloads the backup as a JSON file
 */
export const downloadBackup = (backup: CompleteBackup) => {
	const json = JSON.stringify(backup, null, 2);
	const blob = new Blob([json], { type: "application/json" });

	const date = new Date(backup.timestamp);
	const dateString = date.toISOString().split("T")[0];
	const fileName = `nyutab-backup-${dateString}.json`;

	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	a.click();

	URL.revokeObjectURL(url);
};

/**
 * Parses a backup file
 */
export const parseBackup = async (file: File): Promise<CompleteBackup> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			try {
				const backup = JSON.parse(
					event.target?.result as string,
				) as CompleteBackup;

				// Validate backup structure
				if (!backup.timestamp || !backup.version || !backup.data) {
					throw new Error("Invalid backup file format");
				}

				resolve(backup);
			} catch (error) {
				reject(error);
			}
		};

		reader.onerror = () => {
			reject(new Error("Failed to read backup file"));
		};

		reader.readAsText(file);
	});
};

/**
 * Restores all data from a backup
 */
export const restoreAllData = (backup: CompleteBackup) => {
	for (const [key, value] of Object.entries(backup.data)) {
		if (BACKUP_KEYS.includes(key as BackupKey)) {
			setLocalData(key, value);
		}
	}
};

/**
 * Restores specific keys from a backup
 */
export const restoreSelectedData = (
	backup: CompleteBackup,
	keys: BackupKey[],
) => {
	for (const key of keys) {
		if (backup.data[key] !== undefined) {
			setLocalData(key, backup.data[key]);
		}
	}
};

/**
 * Restores specific settings fields from a backup
 */
export const restoreSelectedSettings = (
	backup: CompleteBackup,
	settingsKeys: SettingsKey[],
) => {
	// Skip if no settings in backup
	if (!backup.data.settings) return;

	// Get current settings
	const currentSettings = getLocalData("settings");
	if (!currentSettings) return;

	// Create a new settings object with selected fields from backup
	const newSettings = { ...currentSettings };

	for (const key of settingsKeys) {
		if (backup.data.settings[key] !== undefined) {
			newSettings[key] = backup.data.settings[key];
		}
	}

	// Save the updated settings
	setLocalData("settings", newSettings);
};

/**
 * Gets a preview of the backup contents
 */
export const getBackupPreview = (backup: CompleteBackup) => {
	const preview: Record<string, any> = {};

	// Create a preview for each data type
	for (const key of BACKUP_KEYS) {
		if (backup.data[key] !== undefined) {
			if (key === "settings") {
				preview[key] = {};
				for (const settingKey of SETTINGS_KEYS) {
					if (backup.data.settings[settingKey] !== undefined) {
						preview[key][settingKey] = backup.data.settings[settingKey];
					}
				}
			} else {
				// For other data types, just indicate they exist
				preview[key] = true;
			}
		}
	}

	return preview;
};
