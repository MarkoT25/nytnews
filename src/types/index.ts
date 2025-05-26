export interface CustomSvgIconType {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
}

export interface NYTimesResponse {
  docs: NYTimesArticle[];
  meta?: {
    hits: number;
    offset: number;
    time: number;
  };
  metadata?: {
    hits: number;
    offset: number;
    time: number;
  };
}

export interface NYTimesArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph?: string;
  print_page?: string;
  print_section?: string;
  source?: string;
  multimedia?: {
    caption?: string;
    credit?: string;
    default?: {
      url: string;
      height: number;
      width: number;
    };
    thumbnail?: {
      url: string;
      height: number;
      width: number;
    };
  };
  headline: {
    main: string;
    kicker?: string;
    content_kicker?: string;
    print_headline?: string;
    name?: string;
    seo?: string;
    sub?: string;
  };
  keywords?: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk?: string;
  section_name?: string;
  subsection_name?: string;
  byline?: {
    original?: string;
    person?: Array<{
      firstname?: string;
      middlename?: string;
      lastname?: string;
      role?: string;
      organization?: string;
      rank?: number;
    }>;
    organization?: string;
  };
  type_of_material?: string;
  _id: string;
  uri: string;
  word_count?: number;
}

export interface Favorite {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  userId: string;
  createdAt: Date;
  category: string;
  createdBy: string;
  user?: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: Date;
  favorites?: Favorite[];
}

export interface LatestNewsArticleType {
  url: string;
  published_date: string;
  title: string;
}

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: Date;
  favorites?: Favorite[];
}
