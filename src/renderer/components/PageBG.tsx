import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

const PageBG = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      id="pg-bg"
      height="100vh"
      width="100vw"
      zIndex={6}
      border="solid 2px black"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default PageBG;
