export type LinkType = "user" | "tag" | "work";
export type FicUpdate ={
  fic: Fic,
  update:{}
}
export type textType = "XLDate"|"LongDate"| 
"MedDate" | "ShortDate" | "WordCount" | "EstTime" | "Summary" | "Generic"
export type FicChapters = {
  published: number;
  total: number;
  complete: number;
};
export type FicFieldTypes = number | string | boolean | string[] | FicChapters
export type FicField = keyof Fic;

/** Bookmarked fic row from AO3rdr backup / sync data. */
export type Fic = {
  id: string;
  userid: string;
  ao3id: number;
  title: string;
  author: string[];
  fandom: string[];
  category: string;
  relationship: string[];
  summary: string;
  word_count: number,
  chapters_published: number;
  chapters_total: number;
  complete: true,
  rating: number;
  read: boolean;
  visit: string;
  crawled_at:string;
  ao3_updated_at:string;
  deleted: boolean;
  hasupdate: boolean;
  recrawl: boolean;
  chapter_id: null;
  notes: string;
  personal_tags: string[];
  created_at:string;
  updated_at:string;

};


