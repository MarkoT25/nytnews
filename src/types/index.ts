export interface CustomSvgIconType {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
}

// export interface NYTimesResponse {
// 	status: string;
// 	copyright: string;
// 	section: string;
// 	last_updated: string;
// 	num_results: number;
// 	results: {
// 		section: string;
// 		subsection: string;
// 		title: string;
// 		abstract: string;
// 		url: string;
// 		uri: string;
// 		byline: string;
// 		item_type: string;
// 		updated_date: string;
// 		created_date: string;
// 		published_date: string;
// 		material_type_facet: string;
// 		kicker: string;
// 		des_facet: string[];
// 		org_facet: string[];
// 		per_facet: string[];
// 		geo_facet: string[];
// 		multimedia: Array<{
// 			url: string;
// 			format: string;
// 			height: number;
// 			width: number;
// 			type: string;
// 			subtype: string;
// 			caption: string;
// 			copyright: string;
// 		}>;
// 		short_url: string;
// 	}[];
// }

export interface NYTimesResponse {
  docs: NYTimesArticle[];
  meta?: {
    hits: number;
    offset: number;
    time: number;
  };
  // Using optional metadata for backward compatibility
  metadata?: {
    hits: number;
    offset: number;
    time: number;
  };
}

// export interface NYTimesArticle {
// 	section: string;
// 	subsection: string;
// 	title: string;
// 	abstract: string;
// 	url: string;
// 	uri: string;
// 	byline: string;
// 	item_type: string;
// 	updated_date: string;
// 	created_date: string;
// 	published_date: string;
// 	material_type_facet: string;
// 	kicker: string;
// 	des_facet: string[];
// 	org_facet: string[];
// 	per_facet: string[];
// 	geo_facet: string[];
// 	multimedia: Array<{
// 		url: string;
// 		format: string;
// 		height: number;
// 		width: number;
// 		type: string;
// 		subtype: string;
// 		caption: string;
// 		copyright: string;
// 	}>;
// 	short_url: string;
// }

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
