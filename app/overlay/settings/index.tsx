import { Button } from 'app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'app/components/ui/dialog'
import { ScrollArea } from 'app/components/ui/scroll-area'
import { Separator } from 'app/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'app/components/ui/tabs'
import { cn } from 'app/lib/utils'
import { setLocalData } from 'lib/storageUtils'
import { useOverlayStore, useSettingsStore } from 'lib/stores'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { SettingsTab } from 'types/settings'
import Backup from './backup'
import DangerZone from './dangerzone'
import Favorites from './favorites'
// Import settings sections
import Feed from './feed'
import Memes from './memes'

const settingsSections = {
  feed: {
    title: 'RSS Feeds',
    description: 'Manage your RSS feed sources',
    component: Feed,
    icon: '📰',
    isDanger: false,
  },
  memes: {
    title: 'Memes',
    description: 'Configure your meme preferences',
    component: Memes,
    icon: '🎭',
    isDanger: false,
  },
  favorites: {
    title: 'Favorites',
    description: 'Manage your favorite items',
    component: Favorites,
    icon: '⭐',
    isDanger: false,
  },
  backup: {
    title: 'Backup & Restore',
    description: 'Backup or restore your settings',
    component: Backup,
    icon: '💾',
    isDanger: false,
  },
  'danger zone': {
    title: 'Danger Zone',
    description: 'Reset or delete your data',
    component: DangerZone,
    icon: '⚠️',
    isDanger: true,
  },
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('feed')
  const { settings } = useSettingsStore()
  const { overlay, setOverlay } = useOverlayStore()
  const isOpen = overlay === 'settings'

  const handleClose = () => {
    setOverlay(null)
  }

  const saveSettings = () => {
    setLocalData('settings', settings)
    setOverlay(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogContent className="sm:max-w-[1400px] h-[80vh] grid grid-cols-1 grid-rows-[auto_1fr] max-h-[800px] p-0 gap-0 overflow-hidden bg-background/70 backdrop-blur-xl border border-border/40">
        <DialogHeader className="shrink-0 p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <DialogDescription>
            Configure your preferences and personalize your experience
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as SettingsTab)}
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,5fr)] grid-rows-1 overflow-hidden h-full"
          orientation="vertical"
        >
          {/* Sidebar navigation */}
          <div className="w-full p-2 border-r border-border/60">
            <TabsList className="flex flex-col justify-start h-full gap-1 bg-transparent">
              {Object.entries(settingsSections).map(([key, section]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    'justify-start gap-2 p-2.5 w-full text-left rounded-lg h-auto',
                    activeTab === key && 'bg-accent',
                    section.isDanger && 'text-destructive hover:text-destructive justify-self-end'
                  )}
                >
                  <span className="mr-1">{section.icon}</span>
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content area */}
          <div className="grid grid-rows-[minmax(0,1fr)_auto] h-full">
            <ScrollArea className="h-full p-6">
              {Object.entries(settingsSections).map(([key, section]) => {
                const SectionComponent = section.component
                return (
                  <TabsContent key={key} value={key} className="h-full mt-0">
                    <SectionComponent />
                  </TabsContent>
                )
              })}
            </ScrollArea>
            <div className="h-full overflow-auto">
              <Separator />
              {/* Actions footer */}
              <div className="flex justify-end gap-2 p-4 bg-background/10">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={saveSettings}>Save Changes</Button>
              </div>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default Settings
