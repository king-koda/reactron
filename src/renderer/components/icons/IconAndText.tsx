import {
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

export type IconAndTextProps = FlexProps & {
  isDisabled?: boolean;
  icon?: IconType;
  text?: string;
  flex?: ComponentWithAs<any>;
  iconProps?: IconProps;
  textProps?: TextProps;
  onClick?: () => any;
  isButton?: boolean;
};

const IconAndText = ({
  icon,
  text,
  flex,
  onClick,
  iconProps,
  textProps,
  isDisabled = false,
  isButton = true,
  ...rest
}: IconAndTextProps) => {
  return (
    <Flex
      display='block'
      align='center'
      textAlign={'center'}
      opacity={!isDisabled ? 1 : 0.3}
      onClick={isButton && !isDisabled ? onClick : undefined}
      userSelect={isButton && !isDisabled ? 'none' : undefined}
      {...rest}
    >
      <Icon
        margin={3}
        alignSelf='center'
        as={icon}
        width='60px'
        height='60px'
        type='button'
        textAlign={'center'}
        fontSize='50px'
        _hover={
          isButton && !isDisabled
            ? { cursor: 'pointer', border: 'solid 2px blue' }
            : undefined
        }
        {...iconProps}
      />
      <Text
        fontWeight={'bold'}
        fontSize='15px'
        width='100px'
        marginTop={-1}
        textAlign={'center'}
        textColor={'black'}
        {...textProps}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default IconAndText;
