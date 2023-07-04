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

export type CustomIconProps = FlexProps & {
  isDisabled?: boolean;
  icon?: IconType;
  flex?: ComponentWithAs<any>;
  iconProps?: IconProps;
  textProps?: TextProps;
  onClick?: () => any;
  isButton?: boolean;
};

const CustomIcon = ({
  icon,
  flex,
  onClick,
  iconProps,
  textProps,
  isDisabled = false,
  isButton = true,
  ...rest
}: CustomIconProps) => {
  let buttonHover;
  if (isButton && !isDisabled) {
    buttonHover = { cursor: 'pointer', border: 'solid 2px lightgreen' };
  } else if (isButton && isDisabled) {
    buttonHover = { cursor: 'not-allowed', border: 'solid 2px red' };
  }

  return (
    <Flex
      borderRadius="25%"
      height="60px"
      width="60px"
      opacity={!isDisabled ? 1 : 0.3}
      onClick={isButton && !isDisabled ? onClick : undefined}
      userSelect={isButton && !isDisabled ? 'none' : undefined}
      _hover={buttonHover}
      justifyContent="center"
      {...rest}
    >
      <Icon
        mt="2"
        as={icon}
        width="75%"
        height="75%"
        textAlign="center"
        alignItems="center"
        {...iconProps}
      />
    </Flex>
  );
};

export default CustomIcon;
