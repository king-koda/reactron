import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageBody = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className='pg-body'
      bgColor='rgba(0, 0, 0, 0.0)'
      zIndex={3}
      position={'fixed'}
      {...rest}
    >
      {children}
    </Flex>
  );
};
