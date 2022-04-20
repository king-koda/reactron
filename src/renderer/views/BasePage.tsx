import {
  Button,
  ButtonGroup,
  Flex,
  FlexProps,
  Icon,
  Image,
  Tooltip,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import Logger from 'js-logger';
import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconContext } from 'react-icons';
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsTrash,
} from 'react-icons/bs';
import {
  GrSelect,
  GrScan,
  GrCaretPrevious,
  GrCaretNext,
  GrChapterNext,
  GrChapterPrevious,
  GrAchievement,
  GrContract,
  GrFormClose,
  GrAction,
  GrTrash,
} from 'react-icons/gr';
import IconAndText from '../components/icons/IconAndText';
import NextFolderIcon from '../components/icons/NextFolderIcon';
import PreviousFolderIcon from '../components/icons/PreviousFolderIcon';
import { PageBG } from '../components/PageBG';
import { PageBody } from '../components/PageBody';
import { PageNavbar } from '../components/PageNavbar';
import { PageSidebar } from '../components/PageSidebar';

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
  const [toBeDeleted, setToBeDeleted] = useState<string[]>([]);

  const [ht, setHt] = useState<HashTableReturn | undefined>(undefined);
  const [photos, setPhotos] = useState<Photo[] | undefined>(undefined);
  const [rootFolder, setRootFolder] = useState<string>('');

  const [focusedImage, setFocusedImage] = useState<Photo | undefined>(
    undefined
  );

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

  console.log('ht 0', ht);
  console.log('photos', photos);
  console.log('rootFolderrootFolder', rootFolder);
  console.log('toBeDeleted', toBeDeleted);
  console.log(
    'adwadawd',
    document?.getElementById('current-hash')?.clientWidth
  );
  console.log('photos flat', photos?.flat());
  return (
    <PageBG bgColor={'#B0E0E6'} width='100%' height='100%'>
      <PageNavbar height='15%' width='100%' bgColor='rgba(0, 0, 0, 0.0)'>
        <Flex justifyContent={'space-evenly'} width={'100%'} align='center'>
          <Flex
            width='50%'
            direction={'column'}
            height='100%'
            borderRight='solid 6px black'
            padding={4}
            justifyContent='space-between'
          >
            <Flex width='100%' direction='row'>
              <Text
                fontWeight={'bold'}
                fontSize='20px'
                whiteSpace={'nowrap'}
                minWidth='30%'
              >
                Root Folder:
              </Text>
              {rootFolder && (
                <Tooltip label={rootFolder} placement='top'>
                  <Text
                    fontSize='20px'
                    fontWeight={'bold'}
                    paddingX='6px'
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    whiteSpace={'nowrap'}
                    width={'100%'}
                  >
                    {rootFolder}
                  </Text>
                </Tooltip>
              )}
            </Flex>
            <Flex id='current-hash' width='100%' direction='row'>
              <Text
                fontWeight={'bold'}
                fontSize='20px'
                whiteSpace={'nowrap'}
                minWidth='30%'
              >
                Hash:
              </Text>
              {ht && (
                <Tooltip label={ht?.htKeys[hashIndex]} placement='top'>
                  <Text
                    fontSize='20px'
                    fontWeight={'bold'}
                    paddingX='6px'
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    width={'100%'}
                    whiteSpace={'nowrap'}
                  >
                    {ht?.htKeys[hashIndex]}
                  </Text>
                </Tooltip>
              )}
            </Flex>
            <Flex width='100%' direction='row'>
              <Text
                fontWeight={'bold'}
                fontSize='20px'
                whiteSpace={'nowrap'}
                minWidth='30%'
              >
                Duplicates:
              </Text>
              {ht && (
                <Text
                  fontSize='20px'
                  fontWeight={'bold'}
                  paddingX='6px'
                  width='auto'
                >
                  {ht?.extra?.totalFiles}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex
            width='50%'
            align='left'
            direction={'row'}
            justifyContent='space-between'
          >
            <Flex>
              <IconAndText
                icon={GrSelect}
                text='Select Root Folder'
                onClick={async () =>
                  await window.electronAPI
                    .rootFolderSelect()
                    .then((result) => setRootFolder(result))
                    .catch((err) =>
                      console.log('prev duplicate get error:', err)
                    )
                }
              />

              <IconAndText
                icon={GrScan}
                text='Scan for Duplicates'
                onClick={async () => {
                  await window.electronAPI
                    .walkFs(rootFolder)
                    .then(async (result) => {
                      console.log('walkFs FE result:', result);
                      const jsonParsedResult = JSON.parse(result);
                      const htResult = jsonParsedResult;
                      setHt(jsonParsedResult);
                      setHashIndex(0);
                      setPhotos(
                        await window.electronAPI
                          .getPhotos(htResult?.htKeys?.[0])
                          .then()
                          .catch((err) =>
                            console.log('prev duplicate get error:', err)
                          )
                      );
                    })
                    .catch((err) => Logger.debug('fuck button error: ', err));
                }}
              />
            </Flex>
            <Flex id='settings' direction={'column'}>
              <Text fontWeight={'bold'}>Mark all for Deletion EXCEPT: </Text>
              <Checkbox iconSize={'1rem'}>Highest Resolution</Checkbox>
              <Checkbox iconSize={'1rem'}>Highest Size</Checkbox>
            </Flex>
            <Flex>
              <IconAndText
                icon={BsTrash}
                iconProps={{ color: 'red' }}
                onClick={() => {
                  if (photos) {
                    setToBeDeleted(() => photos?.map((photo) => photo?.value));
                  }
                }}
                text='Mark all for Deletion'
              />

              <IconAndText
                icon={GrChapterPrevious}
                onClick={
                  ht
                    ? async () => {
                        if (hashIndex !== 0) {
                          setToBeDeleted([]);
                          setHashIndex(hashIndex - 1);
                          setPhotos(
                            await window.electronAPI
                              .getPhotos(ht?.htKeys[hashIndex - 1])
                              .then()
                              .catch((err) =>
                                console.log('prev duplicate get error:', err)
                              )
                          );
                        } else {
                          alert('Already at the first duplicate!');
                        }
                      }
                    : () => {}
                }
                text='Previous Duplicate'
              />
              <IconAndText
                icon={GrChapterNext}
                onClick={
                  ht
                    ? async () => {
                        if (ht && ht?.htKeys?.length - 1 !== hashIndex) {
                          setToBeDeleted([]);
                          setHashIndex(hashIndex + 1);
                          setPhotos(
                            await window.electronAPI
                              .getPhotos(ht?.htKeys[hashIndex + 1])
                              .then()
                              .catch((err) =>
                                console.log('next duplicate get error:', err)
                              )
                          );
                        } else {
                          alert('No more duplicates!');
                        }
                      }
                    : () => {}
                }
                text='Next Duplicate'
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
        // height='85%'
        borderBottom='solid 6px black'
        borderLeft='solid 6px black'
        id='pg-body'
        direction='row'
      >
        {photos && photos?.length >= 0 && (
          <>
            <Flex
              height='100%'
              id='focused-image-flex'
              width='70%'
              borderRight='solid 4px black'
              direction={'column'}
            >
              <Image
                height='80%'
                padding='5'
                id='focused-image'
                objectFit='contain'
                src={`data:image/jpg;base64,${focusedImage?.image}`}
              ></Image>
              <Flex
                id='focused-image-info'
                height='20%'
                borderTop='solid 4px black'
                width={'100%'}
                top='80%'
                align='center'
                justifyContent={'space-evenly'}
                direction='column'
              >
                <Flex
                  id='focused-image-info-header'
                  direction='row'
                  width='100%'
                  align={'center'}
                  textAlign='center'
                  justifyContent='space-evenly'
                  borderBottom={'4px solid black'}
                  // paddingBottom='4'
                  fontWeight={'bold'}
                  height='20%'
                >
                  <Text fontSize={'24px'} width='25%'>
                    Location
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    Size (kB)
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    Resolution (H x W)
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    Created at
                  </Text>
                </Flex>
                <Flex
                  id='focused-image-info-body'
                  direction='row'
                  width='100%'
                  align={'center'}
                  textAlign='center'
                  height='80%'
                >
                  <Text fontSize={'24px'} width='25%'>
                    {focusedImage?.value}
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    {Math.ceil(focusedImage?.stats?.size / 1024)}
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    {focusedImage?.stats?.width} x {focusedImage?.stats?.height}
                  </Text>
                  <Text fontSize={'24px'} width='25%'>
                    {focusedImage?.stats?.birthtime?.toString()}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              id='defocused-image-flex'
              direction={'column'}
              width='30%'
              height='100%'
              overflowY='scroll'
            >
              {photos?.map((photo, index) => {
                return (
                  <Flex
                    id={`preview-defocused-image-flex-${index}`}
                    minHeight='33.33%'
                    width={`100%`}
                    border={`${
                      photo?.value === focusedImage?.value
                        ? 'solid 6px magenta'
                        : 'solid 4px black'
                    }`}
                    direction='row'
                  >
                    <Flex
                      width='50%'
                      id={`preview-image-flex-${index}`}
                      height='100%'
                    >
                      <Flex
                        id={`overlay-${index}`}
                        position='sticky'
                        direction='column'
                        height='100%'
                        justifyContent={'space-between'}
                      >
                        <Flex direction='column' position='relative'>
                          {photo?.value ===
                            sortPhotos?.highestResPhoto?.value && (
                            <Tooltip
                              title='high-res-icon'
                              label='Highest Resolution'
                              placement='top'
                            >
                              <span>
                                <Icon
                                  id={`highest-resolution-icon-${index}`}
                                  as={GrAchievement}
                                  width='30px'
                                  height='30px'
                                  margin='1'
                                />
                              </span>
                            </Tooltip>
                          )}
                          {photo?.value ===
                            sortPhotos?.highestSizePhoto?.value && (
                            <Tooltip
                              title='high-size-icon'
                              label='Highest Size'
                              placement='top'
                            >
                              <span>
                                <Icon
                                  id={`highest-size-icon-${index}`}
                                  as={GrAction}
                                  width='30px'
                                  height='30px'
                                  margin='1'
                                />
                              </span>
                            </Tooltip>
                          )}
                        </Flex>
                        <Flex direction='column' position='relative'>
                          {toBeDeleted?.includes(photo?.value) && (
                            <Tooltip
                              title='marked-for-deletion-icon'
                              label='Marked for Deletion'
                              placement='top'
                            >
                              <span>
                                <Icon
                                  as={BsTrash}
                                  width='30px'
                                  height='30px'
                                  color='red'
                                  // _hover={{ bgColor: 'red' }}
                                  // _active={{ bgColor: 'yellow' }}
                                  margin='1'
                                  zIndex='3'
                                  // alignSelf={'flex-end'}
                                  onClick={() => {
                                    if (!toBeDeleted?.includes(photo?.value)) {
                                      setToBeDeleted([
                                        ...toBeDeleted,
                                        photo?.value,
                                      ]);
                                    }
                                  }}
                                />
                              </span>
                            </Tooltip>
                          )}
                          <Tooltip
                            title='single-delete-icon'
                            label='Mark for Deletion'
                            placement='top'
                          >
                            <span>
                              <Icon
                                as={GrFormClose}
                                width='30px'
                                height='30px'
                                _hover={{ bgColor: 'red' }}
                                _active={{ bgColor: 'yellow' }}
                                margin='1'
                                zIndex='3'
                                // alignSelf={'flex-end'}
                                onClick={() => {
                                  if (!toBeDeleted?.includes(photo?.value)) {
                                    setToBeDeleted([
                                      ...toBeDeleted,
                                      photo?.value,
                                    ]);
                                  } else {
                                    //TODO: remove item from deletion list
                                  }
                                }}
                              />
                            </span>
                          </Tooltip>
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
                      ></Image>
                    </Flex>
                    <Flex
                      width='50%'
                      id={`preview-image-info-${index}`}
                      direction='column'
                      justifyContent={'space-between'}
                      onClick={() => {
                        setFocusedImage(photo);
                      }}
                    >
                      <Flex
                        direction='row'
                        width='100%'
                        id={`preview-image-info-location-${index}`}
                        maxHeight='30%'
                        textOverflow={'ellipsis'}
                        overflow='auto'
                      >
                        <Text fontSize={'12px'} width='25%' fontWeight={'bold'}>
                          Location
                        </Text>
                        <Text fontSize={'12px'} width='75%'>
                          {photo?.value}
                        </Text>
                      </Flex>
                      <Flex
                        direction='row'
                        width='100%'
                        id={`preview-image-info-size-${index}`}
                        maxHeight='20%'
                        overflow='auto'
                      >
                        <Text fontSize={'12px'} width='25%' fontWeight={'bold'}>
                          Size (kB)
                        </Text>
                        <Text fontSize={'12px'} width='75%'>
                          {Math.ceil(photo?.stats?.size / 1024)}
                        </Text>
                      </Flex>
                      <Flex
                        direction='row'
                        width='100%'
                        id={`preview-image-info-resolution-${index}`}
                        maxHeight='20%'
                        overflow='auto'
                      >
                        <Text fontSize={'12px'} width='25%' fontWeight={'bold'}>
                          Resolution (H x W)
                        </Text>
                        <Text fontSize={'12px'} width='75%'>
                          {photo?.stats?.width} x {photo?.stats?.height}
                        </Text>
                      </Flex>
                      <Flex
                        direction='row'
                        width='100%'
                        id={`preview-image-info-created-${index}`}
                        maxHeight='30%'
                        overflow='auto'
                      >
                        <Text fontSize={'12px'} width='25%' fontWeight={'bold'}>
                          Created at
                        </Text>
                        <Text fontSize={'12px'} width='75%'>
                          {photo?.stats?.birthtime?.toString()}
                        </Text>
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
