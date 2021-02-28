import { Expose } from 'class-transformer';
import { TeachingBaseDocument } from '../entities/TeachingBaseDocument.entity';

export class TeachingBaseDocumentResource {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  documentPath: string;

  static make = (
    document: TeachingBaseDocument,
  ): TeachingBaseDocumentResource => {
    return document;
  };
}
