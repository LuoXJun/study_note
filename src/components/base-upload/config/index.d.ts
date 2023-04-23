import type { UploadUserFile } from 'element-plus';

type TlistType = 'text' | 'picture' | 'picture-card';

declare global {
  interface UploadFiles extends UploadUserFile {
    options?: {
      id?: string;
      [key: string]: any;
    };
  }

  interface UploadFileOptions {
    /**大小限制*/
    size: number;
    /**数量限制*/
    limit: number;
    fileType: string[];
    listType?: TlistType;
  }
}
