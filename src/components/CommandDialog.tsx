"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { useEffect, useState } from "react";
import { DEFAULT_SUGGESTIONS as suggestions } from "@/lib/config";

import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { PlacesSuggestion } from "@/lib/definitions";
import { MapPinIcon } from "@heroicons/react/24/outline";

export function CommandDialogDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const [places, setPlaces] = useState<PlacesSuggestion[]>([]);
  const router = useRouter();

  const fetchSuggestions = useDebouncedCallback(async () => {
    try {
      setLoading(true);
      const suggestions = await fetch(`/api/places?city=${value}`);
      const data = await suggestions.json();
      if (data.data) {
        setPlaces(data.data);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  }, 3000);

  const handleSelect = async (lat: number, lon: number) => {
    setOpen(false);
    setValue("");
    router.push(`/weather-forecast?lat=${lat}&lon=${lon}`);
  };

  const handeCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        handleSelect(latitude, longitude);
      });
    }
  };
  useEffect(() => {
    if (value.length > 2) {
      fetchSuggestions();
    } else {
      setPlaces([]);
    }
  }, [value]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-9 w-full md:w-auto rounded-md whitespace-nowrap px-4 border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground"
      >
        <p className="text-sm text-muted-foreground">
          Search city...{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hover:bg-primary md:ml-28">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search city..."
          value={value}
          onValueChange={setValue}
          disabled={false}
        />{" "}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem onSelect={() => handeCurrentLocation()}>
            <MapPinIcon /> <span className="ml-2">Use Current location</span>
          </CommandItem>
          <CommandGroup heading="Suggestions">
            {!places.length && (
              <>
                {suggestions.map((suggestion, i) => (
                  <CommandItem
                    key={i}
                    onSelect={() =>
                      handleSelect(suggestion.lat, suggestion.lon)
                    }
                  >
                    {`${suggestion.city}, ${suggestion.country}`}
                  </CommandItem>
                ))}
              </>
            )}

            {places.length > 0 &&
              places.map((place, i) => (
                <CommandItem
                  key={i}
                  onSelect={() => handleSelect(place.latitude, place.longitude)}
                >
                  {`${place.city}, ${place.region}, ${place.country}`}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
