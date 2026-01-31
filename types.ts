
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'News' | 'Event' | 'Announcement';
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}