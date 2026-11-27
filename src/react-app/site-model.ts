import model from "./site-model.json";

export const { site, pages } = model;
export type PageId = keyof typeof pages;
type Article =
  | { id: string; status: "published"; page: PageId; date: string; readMinutes: number }
  | { id: string; status: "draft"; title: string };

// The model validator checks these cross-references during the build.
export const navigation = model.navigation as PageId[];
export const articles = model.articles as Article[];

export function articleDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}-01T00:00:00Z`));
}
