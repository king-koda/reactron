import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

const PageSidebar = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      className="pgsidebar"
      height="100%"
      width="10%"
      position="fixed"
      justifySelf="flex-end"
      bgColor="white"
      fill="white"
      zIndex={3}
      // borderRight={'solid 2px black'}
      // borderLeft={'solid 2px black'}
      // borderBottom={'solid 2px black'}
      // borderTop={'solid 2px black'}
      {...rest}
    />
  );
};

export default PageSidebar;
