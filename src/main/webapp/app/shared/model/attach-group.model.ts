import { IPost } from '@/shared/model/post.model';
import { IAttach } from '@/shared/model/attach.model';

export interface IAttachGroup {
  id?: number;
  createdAt?: Date;
  createdBy?: number;
  post?: IPost | null;
  attaches?: IAttach[] | null;
}

export class AttachGroup implements IAttachGroup {
  constructor(
    public id?: number,
    public createdAt?: Date,
    public createdBy?: number,
    public post?: IPost | null,
    public attaches?: IAttach[] | null
  ) {}
}
