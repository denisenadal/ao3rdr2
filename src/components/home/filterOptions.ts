import {stringToArray} from "../../lib/format"
import type {Fic} from "../../types/fic"
type OptionSet = {
    label: string;
    items: string[]
}
const FILTER_KEYS = ["title", "author", "fandom", "relationship", "personal_tags"] as const;

type FilterKey = (typeof FILTER_KEYS)[number]; // "title" | "author" | ...
function emptySets(): Record<FilterKey, Set<string>> {
  return Object.fromEntries(
    FILTER_KEYS.map(key => [key, new Set<string>()])
  ) as Record<FilterKey, Set<string>>;
}


function buildFilterOptions(fics: Fic[]): Record<FilterKey, OptionSet> {
    const sets = emptySets();


    for (const fic of fics) {
        for (const key of FILTER_KEYS) {
            const value = fic[key];
            if (!value) continue;

            if (Array.isArray(value)) {
                value.forEach(v => sets[key].add(v));
            } else {
                // fandom/relationship are comma-joined strings in your data
                stringToArray(String(value)).forEach(v => {
                    const trimmed = v.trim();
                    if (trimmed) sets[key].add(trimmed);
                });
            }
        }
    }

    return Object.fromEntries(
        FILTER_KEYS.map(key => [
            key,
            {
                label: key === "personal_tags" ? "tags" : key,
                items: [...sets[key]],
            },
        ])
    ) as Record<FilterKey, OptionSet>;
}

export { buildFilterOptions }
export type {OptionSet,FilterKey}