import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageBody = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className='pg-body'
      height={'100%'}
      width={'100%'}
      bgColor='rgba(0, 0, 0, 0.0)'
      // top='20%'
      left='10%'
      zIndex={3}
      position={'fixed'}
      borderBottom={'solid 6px black'}
      borderLeft={'solid 6px black'}
      borderRight={'solid 6px black'}
      {...rest}
    >
      {children}
    </Flex>
  );
};
