import {
  Checkbox,
  Flex,
  FlexProps,
  Icon,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import Logger from 'js-logger';
import { cloneDeep, filter } from 'lodash';
import React, { useMemo, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import {
  GrAchievement,
  GrAction,
  GrChapterNext,
  GrChapterPrevious,
  GrFormClose,
  GrScan,
  GrSelect,
  GrUndo,
} from 'react-icons/gr';
import { MdSelectAll } from 'react-icons/md';
import { IconAndTextWithTooltip } from '../components/IconAndTextWithTooltip';
import { PageBG } from '../components/PageBG';
import { PageBody } from '../components/PageBody';
import { PageNavbar } from '../components/PageNavbar';
import { TextBody } from '../components/TextBody';
import { TextHeader } from '../components/TextHeader';
import { TextWithTooltip } from '../components/TextWithTooltip';

type HashTableReturn = {
  htKeys: string[];
  extra: { totalFiles: number };
};

type Photo = {
  value: any;
  image: any;
  stats: {
    atime: any;
    atimeMs: any;
    birthtime: any;
    birthtimeMs: any;
    blksize: any;
    blocks: any;
    ctime: any;
    ctimeMs: any;
    dev: any;
    gid: any;
    ino: any;
    mode: any;
    mtime: any;
    mtimeMs: any;
    nlink: any;
    rdev: any;
    size: any;
    uid: any;
    height: any;
    width: any;
    type: any;
  };
};

export const BasePage = ({ children }: FlexProps) => {
  const [hashIndex, setHashIndex] = useState<number>(0);

  //marked for deletion list
  const [toBeDeleted, setToBeDeleted] = useState<string[]>([]);

  //hashes and their file locations
  const [ht, setHt] = useState<HashTableReturn | undefined>(undefined);
  //photos and their info
  const [photos, setPhotos] = useState<Photo[] | undefined>(undefined);

  const [rootFolder, setRootFolder] = useState<string>('');

  //checkboxes
  const [keepHighestResolution, setKeepHighestResolution] =
    useState<boolean>(false);
  const [keepHighestSize, setKeepHighestSize] = useState<boolean>(false);
  const [autoMarkAll, setAutoMarkAll] = useState<boolean>(false);
  const [autoDeleteOnFolderChange, setAutoDeleteOnFolderChange] =
    useState<boolean>(false);

  const [markedAll, setMarkedAll] = useState<boolean>(false);

  //main image preview
  const [focusedImage, setFocusedImage] = useState<Photo | undefined>(
    undefined
  );

  const toast = useToast();

  const sortPhotos = useMemo(() => {
    if (photos) {
      let highestResPhoto = photos[0];
      let highestSizePhoto = photos[0];

      photos?.map((photo, index) => {
        if (
          photo?.stats?.height * photo?.stats?.width >
          highestResPhoto?.stats?.height * highestResPhoto?.stats?.width
        ) {
          highestResPhoto = photos[index];
          //TODO: if photo size is biggest, set photo to biggest, compare other photos with biggest, if photo is newest, set as newest, if photo has best resolution set it as best resolution
        }
        if (photo?.stats?.size > highestSizePhoto?.stats?.size) {
          highestSizePhoto = photos[index];
          //TODO: if photo is newest, set as newest
        }
      });

      setFocusedImage(highestResPhoto);
      return { highestResPhoto, highestSizePhoto };
    }
  }, [photos]);

  const markAllForDeletion = () => {
    if (photos) {
      if (!markedAll) {
        const filteredPhotos = photos?.filter((photo) => {
          if (
            (keepHighestResolution &&
              photo?.value === sortPhotos?.highestResPhoto?.value) ||
            (keepHighestSize &&
              photo?.value === sortPhotos?.highestSizePhoto?.value)
          ) {
            return;
          }
          return photo?.value;
        });

        setToBeDeleted(() => {
          return filteredPhotos?.map((photo) => {
            return photo?.value;
          });
        });

        setMarkedAll(true);
      }

      if (markedAll) {
        setToBeDeleted([]);
        setMarkedAll(false);
      }
    }
  };

  const triggerMarkAllForDeletion = useMemo(() => {
    if (autoMarkAll && !markedAll) markAllForDeletion();
  }, [photos, autoMarkAll]);

  const deleteDuplicates = async (toBeDeleted: string[]) => {
    return await window.electronAPI
      .deleteDuplicates(toBeDeleted)
      .then(async (result) => {
        console.log('files deleted:', result);
      })
      .catch((err) => console.error('fuck button error: ', err));
  };

  const nextDuplicate = async () => {
    if (ht && ht?.htKeys?.length - 1 !== hashIndex) {
      if (autoDeleteOnFolderChange) await deleteDuplicates(toBeDeleted);
      setToBeDeleted([]);
      setHashIndex(hashIndex + 1);
      const newPhotoSet = await window.electronAPI
        .getPhotos(ht?.htKeys[hashIndex + 1])
        .then()
        .catch((err) => console.error('next duplicate get error:', err));
      setMarkedAll(false);
      setPhotos(newPhotoSet);
      return true;
    }
    return false;
  };

  const previousDuplicate = async () => {
    if (hashIndex !== 0) {
      if (autoDeleteOnFolderChange) await deleteDuplicates(toBeDeleted);
      setToBeDeleted([]);
      setHashIndex(hashIndex - 1);

      const newPhotoSet = await window.electronAPI
        .getPhotos(ht?.htKeys[hashIndex - 1])
        .then()
        .catch((err) => console.error('prev duplicate get error:', err));
      setMarkedAll(false);
      setPhotos(newPhotoSet);
      return true;
    }
    return false;
  };

  const toggleKeepHighestSize = () => {
    if (toBeDeleted?.includes(sortPhotos?.highestSizePhoto?.value)) {
      let oldToBeDeleted = cloneDeep(toBeDeleted);
      let newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
        return !(tbd === sortPhotos?.highestSizePhoto?.value);
      });
      setToBeDeleted(newToBeDeleted);
    }
    setKeepHighestSize(!keepHighestSize);
    return true;
  };

  const toggleKeepHighestResolution = () => {
    if (toBeDeleted?.includes(sortPhotos?.highestResPhoto?.value)) {
      let oldToBeDeleted = cloneDeep(toBeDeleted);
      let newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
        return !(tbd === sortPhotos?.highestResPhoto?.value);
      });
      setToBeDeleted(newToBeDeleted);
    }
    setKeepHighestResolution(!keepHighestResolution);
    return true;
  };

  const scanForDuplicates = async () => {
    return await window.electronAPI
      .walkFs(rootFolder)
      .then(async (result) => {
        const jsonParsedResult = JSON.parse(result);
        const htResult = jsonParsedResult;
        setHt(jsonParsedResult);
        setHashIndex(0);
        setPhotos(
          await window.electronAPI
            .getPhotos(htResult?.htKeys?.[0])
            .then()
            .catch((err) => console.error('prev duplicate get error:', err))
        );
        return result;
      })
      .catch((err) => Logger.debug('fuck button error: ', err));
  };

  const rootFolderSelect = async () => {
    return await window.electronAPI
      .rootFolderSelect()
      .then((result) => {
        setRootFolder(result);
        return true;
      })
      .catch((err) => console.error('prev duplicate get error:', err));
  };

  const markForDeletion = (photo: Photo) => {
    if (!toBeDeleted?.includes(photo?.value)) {
      setToBeDeleted([...toBeDeleted, photo?.value]);
    } else {
      let oldToBeDeleted = cloneDeep(toBeDeleted);
      const newToBeDeleted = filter(oldToBeDeleted, (path: string) => {
        return !(path === photo?.value);
      });

      setToBeDeleted(newToBeDeleted);
    }
  };

  console.log('markedAll', markedAll);
  return (
    <PageBG bgColor='blue.400'>
      <PageNavbar
        height='15%'
        width='100%'
        bgColor='hsla(0, 0%, 0%, 0)'
        justifyContent={'space-evenly'}
        align='center'
      >
        <Flex
          width='50%'
          direction={'column'}
          height='100%'
          borderRight='solid 4px darkblue'
          padding={4}
          justifyContent='space-between'
        >
          <Flex width='100%' direction='row' align='center'>
            <TextHeader>Root Folder:</TextHeader>
            {rootFolder && (
              <TextWithTooltip
                tooltipProps={{ label: rootFolder }}
                fontSize='24px'
                fontWeight={'bold'}
                paddingX='6px'
              >
                {rootFolder}
              </TextWithTooltip>
            )}
          </Flex>
          <Flex id='current-hash' width='100%' direction='row' align='center'>
            <TextHeader>Hash:</TextHeader>
            {ht && (
              <TextWithTooltip
                paddingX='6px'
                fontWeight={'bold'}
                fontSize='24px'
                tooltipProps={{ label: ht?.htKeys[hashIndex] }}
              >
                {ht?.htKeys[hashIndex]}
              </TextWithTooltip>
            )}
          </Flex>
          <Flex
            id='duplicate-info-flex'
            width='100%'
            direction='row'
            align='center'
          >
            <TextHeader>Duplicates:</TextHeader>
            {ht && (
              <TextBody paddingX='6px' fontSize={'24px'} fontWeight='bold'>
                {ht?.extra?.totalFiles}
              </TextBody>
            )}
          </Flex>
        </Flex>
        <Flex
          width='50%'
          align='center'
          direction={'row'}
          justifyContent='space-between'
          height='100%'
        >
          <Flex
            direction={'column'}
            height='100%'
            borderRight='solid 4px darkblue'
          >
            <Flex direction={'row'} height='50%'>
              <IconAndTextWithTooltip
                tooltipProps={{
                  id: 'select-root-folder-button',
                  label: 'Select Root Folder',
                }}
                icon={GrSelect}
                onClick={async () => {
                  if (await rootFolderSelect()) {
                    toast({
                      title: 'Success:',
                      description: 'Selecting Root Folder.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: 'Error:',
                      description: 'Selecting Root Folder.',
                      status: 'error',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              />
            </Flex>
            <Flex direction={'row'} height='50%'>
              <IconAndTextWithTooltip
                tooltipProps={{
                  id: 'scan-for-duplicates-button',
                  label: 'Scan for Duplicates',
                }}
                icon={GrScan}
                isDisabled={!rootFolder}
                onClick={async () => {
                  if (await scanForDuplicates()) {
                    toast({
                      title: 'Success:',
                      description: 'Scanning for Duplicates.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: 'Error:',
                      description: 'Scanning for Duplicates.',
                      status: 'error',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              />
            </Flex>
          </Flex>
          <Flex id='settings' direction={'column'} height='100%' width='100%'>
            <Flex
              direction='row'
              width='100%'
              borderBottom='solid 4px darkblue'
              height='30%'
              align='center'
              justifyContent={'center'}
            >
              <Text
                height='100%'
                fontSize='30px'
                alignSelf={'center'}
                fontWeight={'black'}
              >
                Config
              </Text>
            </Flex>

            <Flex direction='column' height='70%' width='100%' overflow='auto'>
              <Flex>
                <Icon
                  height='30px'
                  width='30px'
                  as={MdSelectAll}
                  paddingX={1}
                ></Icon>
                <Text fontSize='20px' fontWeight={'bold'}>
                  Mark all for Deletion Options:
                </Text>
              </Flex>

              <Checkbox
                fontSize='18px'
                paddingX={1}
                isChecked={keepHighestResolution}
                onChange={() => {
                  toggleKeepHighestResolution();
                  if (!keepHighestResolution) {
                    toast({
                      title: 'Success:',
                      description: 'Keep Highest Resolution Toggled ON.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  if (keepHighestResolution) {
                    toast({
                      title: 'Warning:',
                      description: 'Keep Highest Resolution Toggled OFF.',
                      status: 'warning',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              >
                <Text fontSize='18px'>Keep Highest Resolution Photo</Text>
              </Checkbox>
              <Checkbox
                paddingX={1}
                isChecked={keepHighestSize}
                onChange={() => {
                  if (toggleKeepHighestSize()) {
                    if (!keepHighestSize) {
                      toast({
                        title: 'Success:',
                        description: 'Keep Highest Size Toggled ON.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      });
                    }
                    if (keepHighestSize) {
                      toast({
                        title: 'Warning:',
                        description: 'Keep Highest Size Toggled OFF.',
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                      });
                    }
                  }
                }}
              >
                <Text fontSize='18px'>Keep Highest Size Photo</Text>
              </Checkbox>
              <Checkbox
                fontSize='18px'
                paddingX={1}
                isChecked={autoMarkAll}
                onChange={() => {
                  if (!autoMarkAll)
                    alert(
                      'WARNING: Pressing Next/ Previous will now automatically mark all photos for DELETION that match the config!'
                    );
                  setAutoMarkAll(!autoMarkAll);
                  if (!autoMarkAll) {
                    toast({
                      title: 'Success:',
                      description: 'Auto Mark All Toggled ON.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  if (autoMarkAll) {
                    toast({
                      title: 'Warning:',
                      description: 'Auto Mark All Toggled OFF.',
                      status: 'warning',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              >
                <Text fontSize='18px'>Auto Mark All</Text>
              </Checkbox>
              <Checkbox
                fontSize='18px'
                paddingX={1}
                isChecked={autoDeleteOnFolderChange}
                onChange={() => {
                  if (!autoDeleteOnFolderChange)
                    alert(
                      'WARNING: Pressing Next/ Previous will now automatically DELETE photos marked for DELETION!'
                    );
                  setAutoDeleteOnFolderChange(!autoDeleteOnFolderChange);
                  if (!autoDeleteOnFolderChange) {
                    toast({
                      title: 'Success:',
                      description:
                        'Auto Delete Photos on Next/ Previous Toggled ON.',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  if (autoDeleteOnFolderChange) {
                    toast({
                      title: 'Warning:',
                      description:
                        'Auto Delete Photos on Next/ Previous Toggled OFF.',
                      status: 'warning',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              >
                <Text fontSize='18px'>
                  Auto Delete Photos ON Next/ Previous
                </Text>
              </Checkbox>
            </Flex>
          </Flex>

          <Flex direction={'column'} height='100%'>
            <Flex
              direction={'row'}
              height='50%'
              borderLeft='solid 4px darkblue'
            >
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
                    //TODO: send tbd to backend, then refetch files for current hash -> maybe?
                    await deleteDuplicates(toBeDeleted);
                  }
                }}
              />
              <IconAndTextWithTooltip
                tooltipProps={{
                  id: 'mark-all-for-deletion-button',
                  label: 'Mark all for Deletion',
                }}
                icon={markedAll ? GrUndo : MdSelectAll}
                isDisabled={!rootFolder || !photos}
                iconProps={{ color: 'red' }}
                onClick={() => markAllForDeletion()}
              />
            </Flex>
            <Flex
              direction={'row'}
              height='50%'
              borderLeft='solid 4px darkblue'
            >
              <IconAndTextWithTooltip
                tooltipProps={{
                  id: 'previous-duplicate-button',
                  label: 'Previous Duplicate',
                }}
                icon={GrChapterPrevious}
                isDisabled={!rootFolder || !photos || hashIndex === 0}
                onClick={async () => {
                  if (ht) await previousDuplicate();
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
                  !(ht && ht?.htKeys?.length - 1 !== hashIndex)
                }
                onClick={() => {
                  if (ht) nextDuplicate();
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </PageNavbar>
      <PageBody
        left='0%'
        top='15%'
        width='100%'
        height='85%'
        borderBottom='solid 4px darkblue'
        borderLeft='solid 4px darkblue'
        id='pg-body'
        direction='row'
      >
        {photos && photos?.length >= 0 && (
          <>
            <Flex
              id='focused-image-flex'
              height='100%'
              width='70%'
              borderRight='solid 4px darkblue'
              direction={'column'}
            >
              <Image
                height='80%'
                padding='5'
                id='focused-image'
                objectFit='contain'
                src={`data:image/jpg;base64,${focusedImage?.image}`}
              />
              <Flex
                id='focused-image-info-flex'
                height='20%'
                borderTop='solid 4px darkblue'
                width={'100%'}
                top='80%'
                direction='column'
              >
                <Flex
                  id='focused-image-info-header'
                  direction='row'
                  width='100%'
                  align={'center'}
                  textAlign='center'
                  justifyContent='space-evenly'
                  borderBottom={'4px solid darkblue'}
                  fontWeight={'bold'}
                  height='20%'
                >
                  <TextHeader width='25%'>Location</TextHeader>
                  <TextHeader width='25%'>Size (kB)</TextHeader>
                  <TextHeader width='25%'>Resolution (H x W)</TextHeader>
                  <TextHeader width='25%'>Created at</TextHeader>
                </Flex>
                <Flex
                  id='focused-image-info-body'
                  direction='row'
                  width='100%'
                  align={'center'}
                  textAlign='center'
                  height='80%'
                  padding='2'
                >
                  <TextBody width='25%'>{focusedImage?.value}</TextBody>
                  <TextBody width='25%'>
                    {Math.ceil(focusedImage?.stats?.size / 1024)}
                  </TextBody>
                  <TextBody width='25%'>
                    {focusedImage?.stats?.width} x {focusedImage?.stats?.height}
                  </TextBody>
                  <TextBody width='25%'>
                    {focusedImage?.stats?.birthtime?.toString()}
                  </TextBody>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              id='defocused-image-flex'
              direction={'column'}
              width='30%'
              height='100%'
              overflowY='scroll'
              borderRight='solid 4px darkblue'
            >
              {photos?.map((photo, index) => {
                return (
                  <Flex
                    id={`preview-defocused-image-flex-${index}`}
                    minHeight='33.33%'
                    width={`100%`}
                    borderBottom={
                      photos?.length - 1 !== index
                        ? 'solid 4px darkblue'
                        : undefined
                    }
                    border={`${
                      photo?.value === focusedImage?.value
                        ? 'solid 6px magenta'
                        : undefined
                    }`}
                    direction='row'
                  >
                    <Flex
                      width='50%'
                      id={`preview-image-flex-left-${index}`}
                      height='100%'
                    >
                      <Flex
                        id={`preview-image-flex-overlay-${index}`}
                        position='sticky'
                        direction='column'
                        height='100%'
                        justifyContent={'space-between'}
                      >
                        <Flex direction='column' position='relative'>
                          {photo?.value ===
                            sortPhotos?.highestResPhoto?.value && (
                            <IconAndTextWithTooltip
                              tooltipProps={{
                                title: 'high-res-icon',
                                label: 'Highest Resolution',
                              }}
                              id={`highest-resolution-icon-${index}`}
                              icon={GrAchievement}
                              width='30px'
                              height='30px'
                              iconProps={{
                                margin: undefined,
                                width: '30px',
                                height: '30px',
                              }}
                              margin='1'
                              isButton={false}
                            />
                          )}
                          {photo?.value ===
                            sortPhotos?.highestSizePhoto?.value && (
                            <IconAndTextWithTooltip
                              tooltipProps={{
                                title: 'high-size-icon',
                                label: 'Highest Size',
                              }}
                              id={`highest-size-icon-${index}`}
                              icon={GrAction}
                              width='30px'
                              height='30px'
                              iconProps={{
                                margin: undefined,
                                width: '30px',
                                height: '30px',
                              }}
                              margin='1'
                              isButton={false}
                            />
                          )}
                        </Flex>
                        <Flex direction='column' position='relative'>
                          {toBeDeleted?.includes(photo?.value) && (
                            <IconAndTextWithTooltip
                              tooltipProps={{
                                title: 'marked-for-deletion-icon',
                                label: 'Marked for Deletion',
                              }}
                              id={`marked-for-deletion-icon-${index}`}
                              icon={BsTrash}
                              width='30px'
                              height='30px'
                              iconProps={{
                                margin: undefined,
                                width: '30px',
                                height: '30px',
                                color: 'red',
                              }}
                              margin='1'
                              isButton={false}
                            />
                          )}
                          <IconAndTextWithTooltip
                            tooltipProps={{
                              title: 'mark-for-deletion-icon',
                              label: 'Mark for Deletion',
                            }}
                            id={`mark-for-deletion-icon-${index}`}
                            icon={
                              !toBeDeleted?.includes(photo?.value)
                                ? GrFormClose
                                : GrUndo
                            }
                            width='30px'
                            height='30px'
                            margin='1'
                            _hover={undefined}
                            _active={undefined}
                            iconProps={{
                              margin: undefined,
                              width: '30px',
                              height: '30px',
                              _hover: !toBeDeleted?.includes(photo?.value)
                                ? { border: 'solid 2px red' }
                                : { border: 'solid 2px darkgreen' },
                              zIndex: '3',
                              _active: !toBeDeleted?.includes(photo?.value)
                                ? { bgColor: 'orangered' }
                                : { bgColor: 'lightgreen' },
                            }}
                            onClick={() => {
                              markForDeletion(photo);
                            }}
                          />
                        </Flex>
                      </Flex>
                      <Image
                        id={`preview-image-${index}`}
                        width={'100%'}
                        height='100%'
                        objectFit='contain'
                        padding='5'
                        ml='-10'
                        onClick={() => {
                          setFocusedImage(photo);
                        }}
                        src={`data:image/jpg;base64,${photo?.image}`}
                      />
                    </Flex>
                    <Flex
                      width='50%'
                      id={`preview-image-info-${index}`}
                      direction='column'
                      justifyContent={'space-between'}
                      padding='2'
                      onClick={() => {
                        setFocusedImage(photo);
                      }}
                    >
                      <Flex
                        direction='column'
                        width='100%'
                        id={`preview-image-location-${index}`}
                        maxHeight='30%'
                        textOverflow={'ellipsis'}
                        overflow='auto'
                      >
                        <TextHeader fontSize={'16px'} width='100%'>
                          Location
                        </TextHeader>
                        <TextBody fontSize={'14px'} width='100%'>
                          {photo?.value}
                        </TextBody>
                      </Flex>
                      <Flex
                        direction='column'
                        width='100%'
                        id={`preview-image-size-${index}`}
                        maxHeight='20%'
                        overflow='auto'
                      >
                        <TextHeader fontSize={'16px'} width='100%'>
                          Size (kB)
                        </TextHeader>
                        <TextBody fontSize={'14px'} width='100%'>
                          {Math.ceil(photo?.stats?.size / 1024)}
                        </TextBody>
                      </Flex>
                      <Flex
                        direction='column'
                        width='100%'
                        id={`preview-image-resolution-${index}`}
                        maxHeight='20%'
                        overflow='auto'
                      >
                        <TextHeader fontSize={'16px'} width='100%'>
                          Resolution (H x W)
                        </TextHeader>
                        <TextBody fontSize={'14px'} width='100%'>
                          {photo?.stats?.width} x {photo?.stats?.height}
                        </TextBody>
                      </Flex>
                      <Flex
                        direction='column'
                        width='100%'
                        id={`preview-image-created-${index}`}
                        maxHeight='30%'
                        overflow='auto'
                      >
                        <TextHeader fontSize={'16px'} width='100%'>
                          Created at
                        </TextHeader>
                        <TextBody fontSize={'14px'} width='100%'>
                          {photo?.stats?.birthtime?.toString()}
                        </TextBody>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </>
        )}
      </PageBody>
    </PageBG>
  );
};
