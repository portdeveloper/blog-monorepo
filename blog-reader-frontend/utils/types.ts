export interface Comment {
  _id: string;
  content: string;
  name: string;
  blogpost: string;
  timestamp: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  user: string;
  published: boolean;
  timestamp: string;
  comments: Comment[];
}
