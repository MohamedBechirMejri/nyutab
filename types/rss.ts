export type RSSResult = {
  title: string;
  link: string;
  description: string;
  entries: RSSItem[];
};

export type RSSItem = {
  id: string;
  title: string;
  link: string;
  published: string;
  description: string;
  category: string;
  spl: string;
};
