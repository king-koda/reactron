import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export const PageSidebar = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      className='pgsidebar'
      height={'100%'}
      width={'10%'}
      position='fixed'
      justifySelf={'flex-end'}
      bgColor='white'
      fill='white'
      zIndex={3}
      borderRight={'solid 4px darkblue'}
      borderLeft={'solid 4px darkblue'}
      borderBottom={'solid 4px darkblue'}
      borderTop={'solid 4px darkblue'}
      {...rest}
    ></Flex>
  );
};
