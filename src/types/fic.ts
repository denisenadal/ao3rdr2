export type FicChapters = {
  published: number;
  total: number;
  complete: number;
};

/** Bookmarked fic row from AO3rdr backup / sync data. */
export type Fic = {
  ao3id: number;
  author?: string;
  author__ts?: number;
  fandom?: string;
  fandom__ts?: number;
  category?: string;
  category__ts?: number;
  relationship?: string;
  relationship__ts?: number;
  title?: string;
  title__ts?: number;
  crawled?: string;
  crawled__ts?: number;
  updated?: string;
  updated__ts?: number;
  chapters?: FicChapters;
  chapters__ts?: number;
  summary?: string;
  summary__ts?: number;
  word_count?: number;
  word_count__ts?: number;
  /** Historical data mixes numeric and string ratings. */
  rating?: number;
  rating__ts?: number;
  read?: number;
  read__ts?: number;
  chapter?: number;
  visit?: string;
  visit__ts?: number;
  /** Historical data mixes boolean and 0/1. */
  deleted?: boolean | number;
  deleted__ts?: number;
  hasupdate?: string;
  hasupdate__ts?: number | string;
  chapter_id?: string;
  chapter_id__ts?: number;
};
