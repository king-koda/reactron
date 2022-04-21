import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

type TextHeaderProps = TextProps;

export const TextHeader = ({ children, ...rest }: TextHeaderProps) => {
  return (
    <Text
      fontSize={'24px'}
      width='auto'
      whiteSpace={'nowrap'}
      fontWeight={'bold'}
      {...rest}
    >
      {children}
    </Text>
  );
};