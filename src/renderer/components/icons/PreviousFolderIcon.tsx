import { Flex, IconProps, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs/index";

const PreviousFolderIcon = ({ ...rest }: IconProps) => {
  return (
    <>
      <Flex display="block" align="center" width="150px" textAlign={"center"}>
        <BsArrowLeftCircleFill size="150px" />
        <Text
          fontWeight={"bold"}
          overflowWrap="normal"
          alignSelf={"center"}
          fontSize="30px"
          lineHeight={8}
        >
          Prev Folder
        </Text>
      </Flex>
    </>
  );
};

export default PreviousFolderIcon;
