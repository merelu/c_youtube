export interface IUser {
  _id?: string;
  isAuth?: boolean;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  lastname?: string;
  role?: boolean;
  image?: string;
}

export interface IVideo {
  category: string;
  createdAt: string;
  description: string;
  duration: string;
  filePath: string;
  privacy: number;
  thumbnail: string;
  title: string;
  updatedAt: string;
  views: number;
  writer: IUser;
  _id: string;
}

export interface IComment {
  _id: string;
  writer: string;
  videoId: string;
  responseTo: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
