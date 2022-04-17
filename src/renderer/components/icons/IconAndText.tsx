import {
  Button,
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IconContext, IconType } from "react-icons";

export type IconAndTextProps = {
  icon?: IconType;
  text?: string;
  flex?: ComponentWithAs<any>;
  iconProps?: IconProps;
  textProps?: TextProps;
  flexProps?: FlexProps;
  onClick?: () => any;
};

const IconAndText = ({
  icon,
  text,
  flex,
  onClick,
  iconProps,
  textProps,
  flexProps,
  ...rest
}: IconAndTextProps) => {
  return (
    <Flex
      width="100px"
      height="100px"
      display="block"
      align="center"
      textAlign={"center"}
      onClick={onClick}
      userSelect="none"
      _hover={{ cursor: "pointer", border: "solid 2px blue" }}
      {...flexProps}
    >
      {/* <IconContext.Provider
        value={{ color: "blue", size: "50px", style: { color: "yellow" } }}
      > */}
      <Icon
        paddingTop={3}
        alignSelf="center"
        as={icon}
        type="button"
        textAlign={"center"}
        fontSize="50px"
        color="yellow"
        {...iconProps}
      />
      {/* </IconContext.Provider> */}
      <Text
        fontWeight={"bold"}
        fontSize="15px"
        width="100px"
        marginTop={-1}
        textAlign={"center"}
        textColor={"black"}
        {...textProps}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default IconAndText;
