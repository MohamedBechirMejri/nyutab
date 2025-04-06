import { useState } from "react";
import { useSettingsStore } from "lib/stores";
import { m } from "framer-motion";
import { Trash2, Plus, Globe, AlertCircle, ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Alert, AlertDescription } from "app/components/ui/alert";
import { ScrollArea } from "app/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "app/components/ui/tooltip";

const Favorites = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { settings, setSettings } = useSettingsStore();
  const { favorites } = settings!;

  const setFavorites = (newFavorites: any) => {
    setSettings({ ...settings!, favorites: newFavorites });
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const addFav = () => {
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      setError("Please enter a valid URL");
      return;
    }

    // Check if URL already exists
    if (favorites.includes(url)) {
      setError("This URL is already in your favorites");
      return;
    }

    const newFavorites = [...favorites, url];
    setFavorites(newFavorites);
    setUrl("");
  };

  const deleteFav = (i: number) => {
    const newFavorites = favorites.filter((_, index) => index !== i);
    setFavorites(newFavorites);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addFav();
    }
  };

  const openURL = (url: string) => {
    window.open(url, "_blank");
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="w-full space-y-6 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Favorites</h2>
        <p className="text-muted-foreground">
          Manage your favorite websites for quick access
        </p>
      </div>

      <Card className="bg-background/65">
        <CardHeader>
          <CardTitle>Add Favorite</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="favorite-url">Website URL</Label>
            <div className="flex space-x-2">
              <Input
                id="favorite-url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={addFav} className="gap-2 shrink-0">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="flex items-center gap-2">
                <AlertCircle className="[position:unset!important] w-4 h-4" />
                <AlertDescription className="flex pl-[0!important] items-center h-full [transform:none!important]">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background/65">
        <CardHeader>
          <CardTitle>Your Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You haven't added any favorites yet. Add your first URL above.
            </p>
          ) : (
            <ScrollArea className="pr-4 h-max">
              <div className="space-y-3">
                {favorites.map((fav: string, i: number) => (
                  <m.div
                    key={`${i}-${fav}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.05,
                    }}
                    className="flex items-center justify-between p-3 transition-colors border rounded-lg bg-muted/30 hover:bg-muted/50"
                  >
                    <div
                      className="flex items-center flex-1 min-w-0 gap-3 cursor-pointer"
                      onClick={() => openURL(fav)}
                    >
                      <div className="shrink-0">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${fav}&sz=64`}
                          alt=""
                          className="object-cover w-8 h-8 border rounded-lg border-border/40 bg-background"
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Im0yIDEyIDE4.52iYXggMCAwIDAgMTAgMTIgMTAiLz48cGF0aCBkPSJNMTIgMnYyMCIvPjwvc3ZnPg==";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {getDomainFromUrl(fav)}
                        </p>
                        <p className="text-xs truncate text-muted-foreground">
                          {fav}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-50" />
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={e => {
                              e.stopPropagation();
                              deleteFav(i);
                            }}
                            className="w-8 h-8 ml-2"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remove from favorites</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </m.div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Favorites;
