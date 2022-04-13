import { Flex, IconProps, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs/index";

const NextFolderIcon = ({ ...rest }: IconProps) => {
  return (
    <>
      <Flex display="block" align="center" width="150px" textAlign={"center"}>
        <BsArrowRightCircleFill size="150px" />
        <Text
          fontWeight={"bold"}
          overflowWrap="normal"
          alignSelf={"center"}
          fontSize="30px"
          lineHeight={8}
        >
          Next Folder
        </Text>
      </Flex>
    </>
  );
};

export default NextFolderIcon;
