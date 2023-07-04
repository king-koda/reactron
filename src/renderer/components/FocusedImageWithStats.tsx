import { Flex, Image } from '@chakra-ui/react';
import TextBody from './TextBody';
import TextHeader from './TextHeader';
import { Photo } from './utils';

type Props = {
  focusedImage: Photo;
};

const FocusedImageWithStats = ({ focusedImage }: Props) => {
  const { image, value, stats } = focusedImage;
  return (
    <Flex
      id="focused-image-flex"
      height="100%"
      width="70%"
      borderRight="solid 2px black"
      direction="column"
    >
      <Image
        height="80%"
        padding="5"
        id="focused-image"
        objectFit="contain"
        src={`data:image/jpg;base64,${image}`}
      />
      <Flex
        id="focused-image-info-flex"
        height="20%"
        borderTop="solid 2px black"
        width="100%"
        top="80%"
        direction="column"
      >
        <Flex
          id="focused-image-info-header"
          direction="row"
          width="100%"
          align="center"
          textAlign="center"
          justifyContent="space-evenly"
          borderBottom="4px solid black"
          fontWeight="bold"
          height="20%"
        >
          <TextHeader width="25%">Location</TextHeader>
          <TextHeader width="25%">Size (kB)</TextHeader>
          <TextHeader width="25%">Resolution (H x W)</TextHeader>
          <TextHeader width="25%">Created at</TextHeader>
        </Flex>
        <Flex
          id="focused-image-info-body"
          direction="row"
          width="100%"
          align="center"
          textAlign="center"
          height="80%"
          padding="2"
        >
          <TextBody width="25%">{value}</TextBody>
          <TextBody width="25%">{Math.ceil(stats?.size / 1024)}</TextBody>
          <TextBody width="25%">
            {stats?.width} x {stats?.height}
          </TextBody>
          <TextBody width="25%">{stats?.birthtime?.toString()}</TextBody>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FocusedImageWithStats;
