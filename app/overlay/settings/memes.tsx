import { useState } from "react";
import { useSettingsStore } from "lib/stores";
import { getRandomMeme } from "lib/redditUtils";
import { m } from "framer-motion";
import { Plus, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import { Switch } from "app/components/ui/switch";
import { Label } from "app/components/ui/label";
import { Alert, AlertDescription } from "app/components/ui/alert";
import { cn } from "app/lib/utils";

const Memes = () => {
  const { settings, setSettings } = useSettingsStore();
  const memes = settings!.memes;
  const [subReddit, setSubReddit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setMemes = (newMemes: any) => {
    setSettings({ ...settings!, memes: newMemes });
  };

  const toggleNSFW = () => {
    setMemes({ ...memes, isNsfwEnabled: !memes.isNsfwEnabled });
  };

  const toggleSource = (id: number) => {
    const { sources } = memes;

    const newSources = [...sources];
    const meme = newSources[id];
    newSources[id] = {
      ...meme,
      isEnabled: !meme.isEnabled,
    };

    setMemes({ ...memes, sources: newSources });
  };

  const addSubReddit = async () => {
    if (!subReddit.trim()) {
      setError("Please enter a subreddit");
      return;
    }

    setIsLoading(true);
    setError(null);

    const sub = subReddit.replace("r/", "").trim();

    if (memes.sources.some(s => s.name === sub)) {
      setError("This subreddit is already in your list");
      setIsLoading(false);
      return;
    }

    // Check if subreddit exists
    try {
      await getRandomMeme(sub);

      setMemes({
        ...memes,
        sources: [...memes.sources, { name: sub, isEnabled: true }],
      });

      setSubReddit("");
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Couldn't find this subreddit or it contains no memes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSubReddit();
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Memes</h2>
        <p className="text-muted-foreground">
          Customize your meme sources and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
          <CardDescription>
            Configure content filters for your meme feed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="nsfw-toggle">NSFW Content</Label>
              <p className="text-sm text-muted-foreground">
                Show content marked as Not Safe For Work
              </p>
            </div>
            <Switch
              id="nsfw-toggle"
              checked={memes.isNsfwEnabled}
              onCheckedChange={toggleNSFW}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subreddit-input">Add Subreddit</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <span className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
                    r/
                  </span>
                  <Input
                    id="subreddit-input"
                    className="pl-8"
                    placeholder="memes"
                    value={subReddit}
                    onChange={e => setSubReddit(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                </div>
                <Button onClick={addSubReddit} disabled={isLoading}>
                  {isLoading ? (
                    <m.div
                      className="w-4 h-4 border-2 border-current rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add
                </Button>
              </div>
              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            {memes.sources.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Subreddit Sources</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {memes.sources.map((meme: any, i: number) => (
                    <m.button
                      key={`${i}-${meme.name}`}
                      onClick={() => toggleSource(i)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-md transition-all",
                        meme.isEnabled
                          ? "bg-primary/20 hover:bg-primary/30 text-primary"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      <span className="font-medium truncate">
                        r/{meme.name}
                      </span>
                      <Switch
                        className="ml-2"
                        checked={meme.isEnabled}
                        onClick={e => {
                          e.stopPropagation();
                          toggleSource(i);
                        }}
                      />
                    </m.button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No subreddits added. Add your first one above to see memes.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Memes;
