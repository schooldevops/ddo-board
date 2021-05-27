import { IPost } from '@/shared/model/post.model';

export interface IBoard {
  id?: number;
  title?: string;
  category?: string;
  createdAt?: Date;
  createdBy?: number;
  modifiedAt?: Date | null;
  modifiedBy?: number | null;
  posts?: IPost[] | null;
}

export class Board implements IBoard {
  constructor(
    public id?: number,
    public title?: string,
    public category?: string,
    public createdAt?: Date,
    public createdBy?: number,
    public modifiedAt?: Date | null,
    public modifiedBy?: number | null,
    public posts?: IPost[] | null
  ) {}
}
