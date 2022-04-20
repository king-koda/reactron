import {
  Button,
  ButtonGroup,
  Flex,
  FlexProps,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import Logger from 'js-logger';
import React, { useEffect, useMemo, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
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
  console.log('toBeDeleted', toBeDeleted);
  return (
    <PageBG bgColor={'#B0E0E6'}>
      <Flex width='100%' height='100%'>
        <PageNavbar height='15%' width='100%' bgColor='rgba(0, 0, 0, 0.0)'>
          <Flex justifyContent={'space-evenly'} width={'100%'} align='center'>
            <Flex width='50%' align='left' direction={'column'}>
              <Flex width='50%' align='center' direction={'row'}>
                <Text fontWeight={'bold'} fontSize='20px'>
                  #
                </Text>
                {ht && (
                  <Text fontSize='20px' fontWeight={'bold'} paddingX='6px'>
                    {ht?.htKeys[hashIndex]}
                  </Text>
                )}
              </Flex>
              <Flex width='50%' align='center' direction={'row'}>
                <Text fontWeight={'bold'} fontSize='20px'>
                  Total Scanned Files:
                </Text>
                {ht && (
                  <Text fontSize='20px' fontWeight={'bold'} paddingX='6px'>
                    {ht?.extra?.totalFiles}
                  </Text>
                )}
              </Flex>
            </Flex>
            <IconContext.Provider value={{ color: 'blue', size: '50px' }}>
              <Flex>
                <IconAndText icon={GrSelect} text='Select Root Folder' />
              </Flex>
              <Flex>
                <IconAndText
                  icon={GrScan}
                  text='Scan for Duplicates'
                  onClick={async () => {
                    await window.electronAPI
                      .walkFs()
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
              <Flex>
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
              </Flex>
              <Flex>
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
            </IconContext.Provider>
          </Flex>
        </PageNavbar>
        {/* <PageNavbar
          top="20%"
          borderTop="undefined"
          height="10%"
          align="center"
        ></PageNavbar> */}
        {/* <PageNavbar
          top="30%"
          borderTop="undefined"
          height="10%"
          align="center"
        ></PageNavbar> */}

        {/* <PageSidebar left="90%"></PageSidebar> */}
        <PageBody
          left='0%'
          top='15%'
          height='85%'
          borderBottom='solid 1px black'
          id='pgbody'
        >
          <Flex width={'100%'} height={'100%'} display='flex'>
            {photos && photos?.length >= 0 && (
              <Flex direction='row' width={'100%'}  
                              height='100%' 
              >
                <Flex
                  height='75%'
                  id='focusedImageFlex'
                  width='70%'
                  direction={'column'}
                >
                  <Flex 
                    height='65%'
                    justifyContent={'center'}
                    position='fixed'
                    right='30%'
                    width={'70%'}
                    padding='5'
                  >
                    <Image
                      id='focusedImage'
                      objectFit='contain'
                      src={`data:image/jpg;base64,${focusedImage?.image}`}
                    ></Image>
                  </Flex>
                  <Flex
                    height='20%'
                    borderTop='solid 1px black'
                    width={'70%'}
                    top='80%'
                    direction='row'
                    align='center'
                    justifyContent={'space-evenly'}
                    position='fixed'
                  >
                    <Flex
                      direction='column'
                      width='100%'
                      height='100%'
                      align={'center'}
                    >
                      <Flex
                        direction='row'
                        width='100%'
                        align={'center'}
                        textAlign='center'
                        justifyContent='space-evenly'
                        borderBottom={'1px solid black'}
                        // paddingBottom='4'
                        fontWeight={'bold'}
                        height='30%'
                      >
                        <Text fontSize={'12px'} width="25%">Name</Text>
                        <Text fontSize={'12px'} width="25%">Size</Text>
                        <Text fontSize={'12px'} width="25%">Resolution</Text>
                        <Text fontSize={'12px'} width="25%">Created at</Text>
                      </Flex>
                      <Flex
                        direction='row'
                        width='100%'
                        align={'center'}
                        textAlign='center'
                        height='70%'
                      >
                        <Text fontSize={'12px'} width="25%">{focusedImage?.value}</Text>
                        <Text fontSize={'12px'} width="25%">
                          {Math.ceil(focusedImage?.stats?.size / 1024)}
                        </Text>
                        <Text fontSize={'12px'} width="25%">
                          {focusedImage?.stats?.width} x
                          {focusedImage?.stats?.height}
                        </Text>
                        <Text fontSize={'12px'} width="25%">
                          {focusedImage?.stats?.birthtime?.toString()}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  id='defocused-images'
                  direction={'column'}
                  width='30%'
                  height='100%'
                  borderLeft='solid 1px black'
                  overflowY='scroll'
                >
                  {photos &&
                    photos?.map((photo, index) => {
                      return (
                        <Flex
                          maxHeight='33.33%'
                          maxWidth={`100%`}
                          border={`${
                            photo?.value === focusedImage?.value
                              ? 'solid 6px magenta'
                              : 'solid 2px black'
                          }`}
                          direction='row'
                        >
                          {photo?.value ===
                            sortPhotos?.highestResPhoto?.value && (
                            <Icon
                              as={GrAchievement}
                              width='50px'
                              position='sticky'
                              height='50px'
                              margin='1'
                            />
                          )}
                          {photo?.value ===
                            sortPhotos?.highestSizePhoto?.value && (
                            <Icon
                              as={GrContract}
                              width='50px'
                              position='sticky'
                              height='50px'
                              margin='1'
                            />
                          )}

                          <Image
                            id={`duplicate-photo-${index}`}
                            width={'100%'}
                            height='100%'
                            objectFit='contain'
                            padding='5'
                            onClick={() => {
                              setFocusedImage(photo);
                            }}
                            ml={`${
                              photo?.value ===
                              sortPhotos?.highestResPhoto?.value
                                ? photo?.value ===
                                  sortPhotos?.highestSizePhoto?.value
                                  ? -28
                                  : -14
                                : photo?.value ===
                                  sortPhotos?.highestSizePhoto?.value
                                ? -14
                                : undefined
                            }`}
                            src={`data:image/jpg;base64,${photo?.image}`}
                          ></Image>
                          <Icon
                            as={GrFormClose}
                            width='50px'
                            position='sticky'
                            height='50px'
                            margin='1'
                            ml={`${-12}`}
                            zIndex='3'
                            onClick={() => {
                              if (!toBeDeleted?.includes(photo?.value)) {
                                setToBeDeleted([...toBeDeleted, photo?.value]);
                              }
                            }}
                          />
                        </Flex>
                      );
                    })}
                </Flex>
              </Flex>
            )}
          </Flex>
        </PageBody>
      </Flex>
    </PageBG>
  );
};
