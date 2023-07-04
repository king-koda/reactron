import { ISizeCalculationResult } from 'image-size/dist/types/interface';
import fs from 'fs';

export type Photo = {
  value: string | undefined;
  image: string | undefined;
  stats: ExtendedStats | undefined;
};

export interface ExtendedStats
  extends fs.Stats,
    Pick<ISizeCalculationResult, 'height' | 'width' | 'type'> {}

export type HashTableReturn = {
  htKeys: string[];
  extra: { totalFiles: number };
};

export type BestPhotos = {
  highestResPhoto: Photo | undefined;
  highestSizePhoto: Photo | undefined;
};
