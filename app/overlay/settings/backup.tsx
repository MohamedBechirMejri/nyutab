import { m } from "framer-motion";
import { useRef, useState } from "react";
import {
  BACKUP_KEYS,
  BackupKey,
  SETTINGS_KEYS,
  SettingsKey,
  createBackup,
  downloadBackup,
  parseBackup,
  restoreAllData,
  restoreSelectedData,
  restoreSelectedSettings,
} from "lib/backupUtils";
import { useSettingsStore } from "lib/stores";

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
    event: React.ChangeEvent<HTMLInputElement>
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
        key => backup.data[key] !== undefined
      );
      setSelectedDataKeys(availableKeys);

      // Default select all settings keys that exist in the backup
      if (backup.data.settings) {
        const availableSettingsKeys = SETTINGS_KEYS.filter(
          key => backup.data.settings[key] !== undefined
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
    setSelectedDataKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Toggle selection of a settings key
  const toggleSettingsKey = (key: SettingsKey) => {
    setSelectedSettingsKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
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
            key => key !== "settings"
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
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 h-full overflow-y-auto"
    >
      <h1 className="text-2xl font-bold select-none">Backup & Restore</h1>

      {/* Create Backup Section */}
      <section className="bg-zinc-600/50 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Create Backup</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Backup Description (optional)</label>
            <input
              type="text"
              value={backupDescription}
              onChange={e => setBackupDescription(e.target.value)}
              className="w-full p-2 bg-zinc-700 rounded-lg"
              placeholder="My backup"
            />
          </div>
          <button
            onClick={handleCreateBackup}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create & Download Backup
          </button>
        </div>
      </section>

      {/* Restore Backup Section */}
      <section className="bg-zinc-600/50 p-4 rounded-xl flex-1">
        <h2 className="text-xl font-semibold mb-4">Restore from Backup</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Select Backup File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="block w-full text-sm text-white bg-zinc-700 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {backupData && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Backup Info</h3>
                <p>
                  Created: {new Date(backupData.timestamp).toLocaleString()}
                </p>
                {backupData.description && (
                  <p>Description: {backupData.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Select Data to Restore</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto bg-zinc-700 p-2 rounded">
                    {BACKUP_KEYS.map(key => {
                      if (backupData.data[key] === undefined) return null;
                      return (
                        <label key={key} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedDataKeys.includes(key)}
                            onChange={() => toggleDataKey(key)}
                            className="rounded"
                          />
                          <span className="capitalize">{key}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {selectedDataKeys.includes("settings") && (
                  <div>
                    <h3 className="font-semibold mb-2">
                      Select Settings to Restore
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto bg-zinc-700 p-2 rounded">
                      {SETTINGS_KEYS.map(key => {
                        if (backupData.data.settings?.[key] === undefined)
                          return null;
                        return (
                          <label key={key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedSettingsKeys.includes(key)}
                              onChange={() => toggleSettingsKey(key)}
                              className="rounded"
                            />
                            <span className="capitalize">{key}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleRestore}
                disabled={selectedDataKeys.length === 0 || restoringFile}
                className={`font-semibold py-2 px-4 rounded-lg ${
                  selectedDataKeys.length === 0 || restoringFile
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                }`}
              >
                Restore Selected Data
              </button>
            </>
          )}
        </div>
      </section>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/80 text-white p-2 rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/80 text-white p-2 rounded-lg text-center">
          {success}
        </div>
      )}
    </m.div>
  );
};

export default Backup;
