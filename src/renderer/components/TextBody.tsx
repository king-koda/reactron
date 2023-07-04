import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

type TextBodyProps = TextProps;

const TextBody = ({ children, ...rest }: TextBodyProps) => {
  return (
    <Text
      fontSize="20px"
      width="25%"
      textOverflow="ellipsis"
      overflow="auto"
      height="100%"
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TextBody;
