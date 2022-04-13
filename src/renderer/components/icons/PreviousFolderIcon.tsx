import { Flex, IconProps, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs/index";

const PreviousFolderIcon = ({ ...rest }: IconProps) => {
  return (
    <>
      <Flex display={"block"} align="center" paddingX="40px">
        <BsArrowLeftCircleFill size="200px" />
        <Text fontWeight={"bold"} fontSize="40px">
          Prev Folder
        </Text>
      </Flex>
    </>
  );
};

export default PreviousFolderIcon;
