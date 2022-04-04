import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export const PageSidebar = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      className="pgsidebar"
      height={"100%"}
      width={"10%"}
      position="fixed"
      justifySelf={"flex-end"}
      bgColor="white"
      fill="white"
      zIndex={1}
      borderRight={"solid 6px black"}
      borderLeft={"solid 6px black"}
      borderBottom={"solid 6px black"}
      {...rest}
    ></Flex>
  );
};
