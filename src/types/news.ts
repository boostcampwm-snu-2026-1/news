import { PressWordmarkProps } from './press';

export interface Article {
  title: string;
  link: string;
}

export interface PressNewsData extends PressWordmarkProps {
  lastEditTime: string;
  mainArticle: {
    title: string;
    thumbnail: string;
    link: string;
  };
  subArticles: Article[];
}

export interface CategoryData {
  id: string;
  name: string;
  pressList: PressNewsData[];
}