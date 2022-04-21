import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

type TextBodyProps = TextProps;

export const TextBody = ({ children, ...rest }: TextBodyProps) => {
  return (
    <Text
      fontSize={'20px'}
      width='25%'
      textOverflow='ellipsis'
      overflow={'auto'}
      fontWeight='bold'
      height='100%'
      {...rest}
    >
      {children}
    </Text>
  );
};
