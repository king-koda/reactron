import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  FlexProps,
  Icon,
  Image,
  Tooltip,
  Text,
} from '@chakra-ui/react';

export const CustomTooltip = (children, label) => {
  return (
    <Tooltip label={label} placement='top'>
      <span>
        <Text
          fontSize='20px'
          fontWeight={'bold'}
          paddingX='6px'
          text-overflow={'ellipsis'}
          overflow={'hidden'}
          width={`100%`}
          white-space={'nowrap'}
        >
          {children}
        </Text>
      </span>
    </Tooltip>
  );
};
