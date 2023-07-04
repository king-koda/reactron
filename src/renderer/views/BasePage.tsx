import { Box, Flex, FlexProps, Heading, Icon } from '@chakra-ui/react';
import { cloneDeep, filter } from 'lodash';
import React, { useMemo, useState } from 'react';
import { PiHashStraightBold } from 'react-icons/pi';
import DefocusedImageCarousel from 'renderer/components/DefocusedImageCarousel';
import FocusedImageWithStats from 'renderer/components/FocusedImageWithStats';
import RootFolderDetails from 'renderer/components/RootFolderDetails';
import { HashTableReturn, Photo } from 'renderer/components/utils';
import useActions from 'renderer/hooks/useActions';
import useSettingsPanel from 'renderer/hooks/useSettingsPanel';
import useSortPhotos from 'renderer/hooks/useSortPhotos';
import PageBG from '../components/PageBG';
import { PageBody } from '../components/PageBody';
import PageNavbar from '../components/PageNavbar';
import TextHeader from '../components/TextHeader';
import TextWithTooltip from '../components/TextWithTooltip';

const BasePage = ({ children }: FlexProps) => {
  const sortPhotos = useSortPhotos();

  const [hashIndex, setHashIndex] = useState<number>(0);

  // marked for deletion list
  const [toBeDeleted, setToBeDeleted] = useState<string[]>([]);

  // hashes and their file locations
  const [hashTable, setHashTable] = useState<HashTableReturn | undefined>(
    undefined
  );
  // photos and their info
  const [photos, setPhotos] = useState<Photo[] | undefined>(undefined);

  const [rootFolder, setRootFolder] = useState<string | undefined>();

  const [markedAll, setMarkedAll] = useState<boolean>(false);

  // main image preview
  const [focusedImage, setFocusedImage] = useState<Photo | undefined>(
    undefined
  );

  const sortedPhotos = useMemo(() => {
    const results = sortPhotos(photos);
    setFocusedImage(results?.highestResPhoto);
    return results;
  }, [sortPhotos, photos]);

  const {
    SettingsPanel,
    keepHighestResolution,
    keepHighestSize,
    autoMarkAll,
    autoDeleteOnFolderChange,
  } = useSettingsPanel({ setToBeDeleted, sortedPhotos, toBeDeleted });

  const { Actions } = useActions({
    autoMarkAll,
    markedAll,
    keepHighestResolution,
    keepHighestSize,
    autoDeleteOnFolderChange,
    hashIndex,
    hashTable,
    photos,
    rootFolder,
    setHashIndex,
    setMarkedAll,
    setPhotos,
    setToBeDeleted,
    sortedPhotos,
    toBeDeleted,
  });

  const scanForDuplicates = async () => {
    const result = await window.electronAPI.walkFs(rootFolder);

    if (!result) {
      return false;
    }
    try {
      const htResult = JSON.parse(result);
      if (htResult?.htKeys?.length === 0) {
        return false;
      }

      setHashTable(htResult);
      setHashIndex(0);
      setPhotos(await window.electronAPI.getPhotos(htResult?.htKeys?.[0]));
      return true;
    } catch (e) {
      return false;
    }
  };

  const selectRootFolder = async () => {
    const path = await window.electronAPI.rootFolderSelect();

    if (path) {
      setRootFolder(path);
      return true;
    }

    return false;
  };

  const markForDeletion = (photo: Photo) => {
    if (!toBeDeleted?.includes(photo?.value)) {
      setToBeDeleted([...toBeDeleted, photo?.value]);
    } else {
      const oldToBeDeleted = cloneDeep(toBeDeleted);
      const newToBeDeleted = filter(oldToBeDeleted, (path: string) => {
        return !(path === photo?.value);
      });

      setToBeDeleted(newToBeDeleted);
    }
  };

  return (
    <PageBG>
      <PageNavbar
        height="15%"
        width="100%"
        bgColor="hsla(0, 0%, 0%, 0)"
        justifyContent="space-evenly"
        align="center"
      >
        <Flex
          id="details-panel"
          width="50%"
          direction="column"
          height="100%"
          borderRight="solid 2px black"
          padding={4}
          justifyContent="space-between"
          overflow="auto"
        >
          <RootFolderDetails
            rootFolder={rootFolder}
            selectRootFolder={selectRootFolder}
            scanForDuplicates={scanForDuplicates}
            hashTable={hashTable}
          />

          <Flex id="current-hash" width="100%" direction="row" align="center">
            <Box height="60px" width="60px" />
            <Icon
              as={PiHashStraightBold}
              height="40px"
              width="40px"
              paddingX="4px"
            />
            <TextHeader>Current Photo Hash:</TextHeader>
            {hashTable && (
              <TextWithTooltip
                paddingX="6px"
                fontSize="24px"
                tooltipProps={{ label: hashTable?.htKeys[hashIndex] }}
              >
                {hashTable?.htKeys[hashIndex]}
              </TextWithTooltip>
            )}
          </Flex>
        </Flex>
        <Flex
          width="50%"
          align="center"
          direction="row"
          justifyContent="space-between"
          height="100%"
        >
          {SettingsPanel}
          {Actions}
        </Flex>
      </PageNavbar>
      <PageBody
        left="0%"
        top="15%"
        width="100%"
        height="85%"
        id="pg-body"
        direction="row"
      >
        {!rootFolder && (
          <Heading width="100%" alignSelf="center" textAlign="center">
            No Root Folder Selected
          </Heading>
        )}
        {rootFolder && (!photos || !(photos?.length >= 0)) && (
          <Heading width="100%" alignSelf="center" textAlign="center">
            Root Folder Not Yet Scanned
          </Heading>
        )}
        {rootFolder && photos && photos?.length >= 0 && (
          <>
            <FocusedImageWithStats focusedImage={focusedImage} />
            <DefocusedImageCarousel
              focusedImage={focusedImage}
              setFocusedImage={setFocusedImage}
              photos={photos}
              sortedPhotos={sortedPhotos}
              toBeDeleted={toBeDeleted}
              markForDeletion={markForDeletion}
            />
          </>
        )}
      </PageBody>
    </PageBG>
  );
};

export default BasePage;
