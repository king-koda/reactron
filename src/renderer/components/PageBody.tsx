import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export const PageBody = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className="pg-body"
      height={"80%"}
      width={"90%"}
      bgColor="white"
      top="20%"
      left="10%"
      zIndex={3}
      position={"fixed"}
      borderBottom={"solid 6px black"}
      borderLeft={"solid 6px black"}
      {...rest}
    >
      {children}
    </Flex>
  );
};
