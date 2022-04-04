import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export const PageBody = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className="pg-body"
      height={"70%"}
      width={"90%"}
      bgColor="white"
      top="30%"
      left="10%"
      zIndex={3}
      position={"fixed"}
      borderRight={"solid 6px black"}
      borderBottom={"solid 6px black"}
      {...rest}
    >
      {children}
    </Flex>
  );
};
