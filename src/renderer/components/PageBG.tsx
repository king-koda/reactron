import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export const PageBG = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      height={"100vh"}
      width={"100vw"}
      bgColor="white"
      // border={"solid 6px black"}
      {...rest}
    >
      {children}
    </Flex>
  );
};
