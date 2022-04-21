import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageBG = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      id='pg-bg'
      height={'100vh'}
      width={'100vw'}
      // bgColor='white'
      zIndex='4'
      // border={"solid 6px black"}
      {...rest}
    >
      {children}
    </Flex>
  );
};
