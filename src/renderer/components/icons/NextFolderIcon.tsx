import { Flex, IconProps, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs/index";

const NextFolderIcon = ({ ...rest }: IconProps) => {
  return (
    <>
      <Flex display={"block"} align="center" paddingX="40px">
        <BsArrowRightCircleFill size="200px" />
        <Text fontWeight={"bold"} fontSize="40px">
          Next Folder
        </Text>
      </Flex>
    </>
  );
};

export default NextFolderIcon;
