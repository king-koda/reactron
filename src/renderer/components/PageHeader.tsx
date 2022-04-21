import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageHeader = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      className='pgheader'
      height={'20%'}
      width={'100vw'}
      bgColor='white'
      zIndex={2}
      position={'fixed'}
      border={'solid 4px darkblue'}
      {...rest}
    ></Flex>
  );
};
