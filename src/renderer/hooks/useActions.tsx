import { Flex } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GrChapterNext, GrChapterPrevious, GrUndo } from 'react-icons/gr';
import { MdSelectAll } from 'react-icons/md';
import IconAndTextWithTooltip from '../components/IconAndTextWithTooltip';
import { BestPhotos, HashTableReturn, Photo } from '../components/utils';

type ActionProps = {
  rootFolder: string;
  photos: Photo[];
  toBeDeleted: string[];
  deleteDuplicates: (newToBeDeleted: string[]) => number;
  markedAll: boolean;
  markAllForDeletion: () => void;
  hashTable: HashTableReturn;
  previousDuplicate: () => Promise<boolean>;
  hashIndex: number;
  nextDuplicate: () => Promise<boolean>;
};

const Actions = ({
  rootFolder,
  photos,
  toBeDeleted,
  deleteDuplicates,
  markedAll,
  markAllForDeletion,
  hashTable,
  previousDuplicate,
  hashIndex,
  nextDuplicate,
}: ActionProps) => {
  return (
    <Flex direction="column">
      <Flex direction="row" height="50%">
        <IconAndTextWithTooltip
          tooltipProps={{
            id: 'delete-button',
            label: 'Delete',
          }}
          icon={BsTrash}
          isDisabled={!rootFolder || !photos || toBeDeleted?.length === 0}
          iconProps={{ color: 'red' }}
          onClick={async () => {
            if (photos && toBeDeleted?.length > 0) {
              // TODO: send tbd to backend, then refetch files for current hash -> maybe?
              // deleteDuplicates(toBeDeleted);
            }
          }}
        />
        <IconAndTextWithTooltip
          tooltipProps={{
            id: 'mark-all-for-deletion-button',
            label: markedAll
              ? 'Unmark all for Deletion'
              : 'Mark all for Deletion',
          }}
          icon={markedAll ? GrUndo : MdSelectAll}
          isDisabled={!rootFolder || !photos}
          iconProps={{ color: 'red' }}
          onClick={() => markAllForDeletion()}
        />
      </Flex>
      <Flex direction="row" height="50%">
        <IconAndTextWithTooltip
          tooltipProps={{
            id: 'previous-duplicate-button',
            label: 'Previous Duplicate',
          }}
          icon={GrChapterPrevious}
          isDisabled={!rootFolder || !photos || hashIndex === 0}
          onClick={async () => {
            if (hashTable) await previousDuplicate();
          }}
        />
        <IconAndTextWithTooltip
          tooltipProps={{
            id: 'next-duplicate-button',
            label: 'Next Duplicate',
          }}
          icon={GrChapterNext}
          isDisabled={
            !rootFolder ||
            !photos ||
            !(hashTable && hashTable?.htKeys?.length - 1 !== hashIndex)
          }
          onClick={async () => {
            if (hashTable) await nextDuplicate();
          }}
        />
      </Flex>
    </Flex>
  );
};

type UseActionProps = {
  autoMarkAll: boolean;
  markedAll: boolean;
  setToBeDeleted: (photosToBeDeleted: string[]) => void;
  toBeDeleted: string[];
  keepHighestResolution: boolean;
  keepHighestSize: boolean;
  sortedPhotos: BestPhotos;
  photos: Photo[];
  setMarkedAll: (markAll: boolean) => void;
  hashTable: HashTableReturn;
  autoDeleteOnFolderChange: boolean;
  setHashIndex: (index: number) => void;
  hashIndex: number;
  setPhotos: (photos: Photo[]) => void;
  rootFolder: string;
};

const useActions = ({
  autoMarkAll,
  markedAll,
  setToBeDeleted,
  toBeDeleted,
  keepHighestResolution,
  keepHighestSize,
  sortedPhotos,
  photos,
  setMarkedAll,
  hashTable,
  autoDeleteOnFolderChange,
  setHashIndex,
  hashIndex,
  setPhotos,
  rootFolder,
}: UseActionProps) => {
  const markAllForDeletion = useCallback(() => {
    if (photos) {
      if (!markedAll) {
        const filteredPhotos = photos?.filter((photo) => {
          if (
            (keepHighestResolution &&
              photo?.value === sortedPhotos?.highestResPhoto?.value) ||
            (keepHighestSize &&
              photo?.value === sortedPhotos?.highestSizePhoto?.value)
          ) {
            return false;
          }
          return !!photo?.value;
        });

        const toDelete = filteredPhotos?.map((photo) => {
          return photo?.value;
        });

        setToBeDeleted(toDelete);

        setMarkedAll(true);
      }

      if (markedAll) {
        setToBeDeleted([]);
        setMarkedAll(false);
      }
    }
  }, [
    photos,
    markedAll,
    setToBeDeleted,
    setMarkedAll,
    keepHighestResolution,
    sortedPhotos?.highestResPhoto?.value,
    sortedPhotos?.highestSizePhoto?.value,
    keepHighestSize,
  ]);

  const deleteDuplicates = (newToBeDeleted: string[]) => {
    return window.electronAPI.deleteDuplicates(newToBeDeleted);
  };

  const nextDuplicate = async () => {
    if (hashTable && hashTable?.htKeys?.length - 1 !== hashIndex) {
      // if (autoDeleteOnFolderChange) deleteDuplicates(toBeDeleted);
      setToBeDeleted([]);
      setHashIndex(hashIndex + 1);
      const newPhotoSet = await window.electronAPI.getPhotos(
        hashTable?.htKeys[hashIndex + 1]
      );

      setMarkedAll(false);
      setPhotos(newPhotoSet);
      return true;
    }
    return false;
  };

  const previousDuplicate = async () => {
    if (hashIndex !== 0) {
      // if (autoDeleteOnFolderChange) deleteDuplicates(toBeDeleted);
      setToBeDeleted([]);
      setHashIndex(hashIndex - 1);

      const newPhotoSet = await window.electronAPI.getPhotos(
        hashTable?.htKeys[hashIndex - 1]
      );

      setMarkedAll(false);
      setPhotos(newPhotoSet);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (autoMarkAll && !markedAll) markAllForDeletion();
  }, [autoMarkAll, markAllForDeletion, markedAll]);

  const actions = (
    <Actions
      deleteDuplicates={deleteDuplicates}
      hashIndex={hashIndex}
      hashTable={hashTable}
      markAllForDeletion={markAllForDeletion}
      markedAll={markedAll}
      nextDuplicate={nextDuplicate}
      photos={photos}
      previousDuplicate={previousDuplicate}
      rootFolder={rootFolder}
      toBeDeleted={toBeDeleted}
    />
  );

  return { Actions: actions };
};

export default useActions;
