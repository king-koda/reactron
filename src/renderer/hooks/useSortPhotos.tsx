import { useCallback } from 'react';
import { BestPhotos, Photo } from 'renderer/components/utils';

const useSortPhotos = () => {
  const sortPhotos = useCallback((photos: Photo[]): BestPhotos => {
    if (photos && photos?.length >= 0) {
      let highestResPhoto = photos[0];
      let highestSizePhoto = photos[0];

      photos?.map((photo: Photo, index: number) => {
        if (
          photo?.stats?.height * photo?.stats?.width >
          highestResPhoto?.stats?.height * highestResPhoto?.stats?.width
        ) {
          highestResPhoto = photos[index];
          // TODO: if photo size is biggest, set photo to biggest, compare other photos with biggest, if photo is newest, set as newest, if photo has best resolution set it as best resolution
        }
        if (photo?.stats?.size > highestSizePhoto?.stats?.size) {
          highestSizePhoto = photos[index];
          // TODO: if photo is newest, set as newest
        }
        return true;
      });

      return { highestResPhoto, highestSizePhoto };
    }
    return { highestResPhoto: undefined, highestSizePhoto: undefined };
  }, []);

  return sortPhotos;
};

export default useSortPhotos;
