import { Button } from 'app/components/ui/button'
import { Card, CardContent } from 'app/components/ui/card'
import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { Switch } from 'app/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'app/components/ui/tooltip'
import { cn } from 'app/lib/utils'
import { m } from 'framer-motion'
import { useSettingsStore } from 'lib/stores'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

const Feed = () => {
  const { settings, setSettings } = useSettingsStore()
  const { feed } = settings!

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const setFeed = (newFeed: any) => {
    setSettings({ ...settings!, feed: newFeed })
  }

  const validateURL = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const addSource = () => {
    setError(null)

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!url.trim()) {
      setError('URL is required')
      return
    }

    if (!validateURL(url)) {
      setError('Please enter a valid URL')
      return
    }

    const newFeed = {
      ...feed,
      rss: {
        ...feed.rss,
        sources: [...feed.rss.sources, { name, url, isEnabled: true }],
      },
    }

    setFeed(newFeed)
    setName('')
    setUrl('')
  }

  const toggleSource = (i: number) => {
    const newFeed = {
      ...feed,
      rss: {
        ...feed.rss,
        sources: feed.rss.sources.map((source: any, index: number) => {
          if (index === i) {
            return { ...source, isEnabled: !source.isEnabled }
          }
          return source
        }),
      },
    }
    setFeed(newFeed)
  }

  const removeSource = (i: number) => {
    const newFeed = {
      ...feed,
      rss: {
        ...feed.rss,
        sources: feed.rss.sources.filter((_: any, index: number) => index !== i),
      },
    }
    setFeed(newFeed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSource()
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">RSS Feeds</h2>
        <p className="text-muted-foreground">
          Add and manage your RSS feed sources to stay updated
        </p>
      </div>

      <Card className="bg-background/65">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_1.5fr_auto] gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="feedName">Feed Name</Label>
                <Input
                  id="feedName"
                  placeholder="e.g. Tech News"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedUrl">RSS URL</Label>
                <Input
                  id="feedUrl"
                  type="url"
                  placeholder="https://example.com/rss"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button onClick={addSource} className="self-end gap-2">
                <PlusCircle className="w-4 h-4" />
                Add
              </Button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="text-sm text-muted-foreground">
              {feed.rss.sources.length === 0 ? (
                <p>No RSS feeds added yet. Add your first one above.</p>
              ) : (
                <p>You have {feed.rss.sources.length} feed source(s)</p>
              )}
            </div>
          </div>

          {feed.rss.sources.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Your Feed Sources</h3>
              <div className="pr-2 space-y-2">
                {feed.rss.sources.map((source: any, i: number) => (
                  <m.div
                    key={`${i}-${source.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.05,
                    }}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border',
                      source.isEnabled ? 'bg-muted/40' : 'bg-muted/10 opacity-70'
                    )}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="pr-4 font-medium truncate">{source.name}</div>
                      <div className="text-xs truncate text-muted-foreground">{source.url}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`feed-switch-${i}`}
                                checked={source.isEnabled}
                                onCheckedChange={() => toggleSource(i)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {source.isEnabled ? 'Disable feed' : 'Enable feed'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSource(i)}
                              className="w-8 h-8"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove feed</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Feed
