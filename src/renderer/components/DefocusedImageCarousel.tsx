import { Divider, Flex, Image } from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { GrAchievement, GrAction, GrFormClose, GrUndo } from 'react-icons/gr';
import IconAndTextWithTooltip from './IconAndTextWithTooltip';
import TextBody from './TextBody';
import TextHeader from './TextHeader';
import { BestPhotos, Photo } from './utils';

type Props = {
  focusedImage: Photo;
  setFocusedImage: (photo: Photo) => void;
  photos: Photo[];
  sortedPhotos: BestPhotos;
  toBeDeleted: string[];
  markForDeletion: (photo: Photo) => void;
};

const DefocusedImageCarousel = ({
  focusedImage,
  setFocusedImage,
  photos,
  sortedPhotos,
  toBeDeleted,
  markForDeletion,
}: Props) => {
  const { highestResPhoto, highestSizePhoto } = sortedPhotos;
  const { value: focusedImageValue } = focusedImage;

  return (
    <Flex
      id="defocused-image-flex"
      direction="column"
      width="30%"
      height="100%"
      overflowY="scroll"
      borderRight="solid 2px black"
    >
      {photos &&
        photos?.length >= 0 &&
        photos?.map((photo, index) => {
          return (
            <Flex
              id={`preview-defocused-image-flex-${index}`}
              minHeight="33.33%"
              width="100%"
              borderBottom={
                photos?.length - 1 !== index ? 'solid 2px black' : undefined
              }
              border={`${
                photo?.value === focusedImageValue
                  ? 'solid 6px magenta'
                  : undefined
              }`}
              direction="row"
            >
              <Flex
                width="50%"
                id={`preview-image-flex-left-${index}`}
                height="100%"
              >
                <Flex
                  id={`preview-image-flex-overlay-${index}`}
                  position="sticky"
                  direction="column"
                  height="100%"
                  justifyContent="space-between"
                >
                  <Flex direction="column" position="relative">
                    {photo?.value === highestResPhoto?.value && (
                      <IconAndTextWithTooltip
                        tooltipProps={{
                          title: 'high-res-icon',
                          label: 'Highest Resolution',
                        }}
                        id={`highest-resolution-icon-${index}`}
                        icon={GrAchievement}
                        width="30px"
                        height="30px"
                        iconProps={{
                          margin: undefined,
                          width: '30px',
                          height: '30px',
                        }}
                        margin="1"
                        isButton={false}
                      />
                    )}
                    {photo?.value === highestSizePhoto?.value && (
                      <IconAndTextWithTooltip
                        tooltipProps={{
                          title: 'high-size-icon',
                          label: 'Highest Size',
                        }}
                        id={`highest-size-icon-${index}`}
                        icon={GrAction}
                        width="30px"
                        height="30px"
                        iconProps={{
                          margin: undefined,
                          width: '30px',
                          height: '30px',
                        }}
                        margin="1"
                        isButton={false}
                      />
                    )}
                  </Flex>
                  <Flex direction="column" position="relative">
                    {toBeDeleted?.includes(photo?.value) && (
                      <IconAndTextWithTooltip
                        tooltipProps={{
                          title: 'marked-for-deletion-icon',
                          label: 'Marked for Deletion',
                        }}
                        id={`marked-for-deletion-icon-${index}`}
                        icon={BsTrash}
                        width="30px"
                        height="30px"
                        iconProps={{
                          margin: undefined,
                          width: '30px',
                          height: '30px',
                          color: 'red',
                        }}
                        margin="1"
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
                      width="30px"
                      height="30px"
                      margin="1"
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
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  padding="5"
                  ml="-10"
                  onClick={() => {
                    setFocusedImage(photo);
                  }}
                  src={`data:image/jpg;base64,${photo?.image}`}
                />
              </Flex>
              <Flex
                width="50%"
                id={`preview-image-info-${index}`}
                direction="column"
                justifyContent="space-between"
                padding="2"
                onClick={() => {
                  setFocusedImage(photo);
                }}
              >
                <Flex
                  direction="column"
                  width="100%"
                  id={`preview-image-location-${index}`}
                  maxHeight="30%"
                  textOverflow="ellipsis"
                  overflow="auto"
                >
                  <TextHeader fontSize="16px" width="100%">
                    Location
                  </TextHeader>
                  <TextBody fontSize="14px" width="100%">
                    {photo?.value}
                  </TextBody>
                </Flex>
                <Divider variant="solid" />
                <Flex
                  direction="column"
                  width="100%"
                  id={`preview-image-size-${index}`}
                  maxHeight="20%"
                  overflow="auto"
                >
                  <TextHeader fontSize="16px" width="100%">
                    Size (kB)
                  </TextHeader>
                  <TextBody fontSize="14px" width="100%">
                    {Math.ceil(photo?.stats?.size / 1024)}
                  </TextBody>
                </Flex>
                <Divider variant="solid" />
                <Flex
                  direction="column"
                  width="100%"
                  id={`preview-image-resolution-${index}`}
                  maxHeight="20%"
                  overflow="auto"
                >
                  <TextHeader fontSize="16px" width="100%">
                    Resolution (H x W)
                  </TextHeader>
                  <TextBody fontSize="14px" width="100%">
                    {photo?.stats?.width} x {photo?.stats?.height}
                  </TextBody>
                </Flex>
                <Divider variant="solid" />
                <Flex
                  direction="column"
                  width="100%"
                  id={`preview-image-created-${index}`}
                  maxHeight="30%"
                  overflow="auto"
                >
                  <TextHeader fontSize="16px" width="100%">
                    Created at
                  </TextHeader>
                  <TextBody fontSize="14px" width="100%">
                    {photo?.stats?.birthtime?.toString()}
                  </TextBody>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
    </Flex>
  );
};
export default DefocusedImageCarousel;
