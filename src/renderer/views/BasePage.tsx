import { ButtonGroup, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import NextFolderIcon from "../components/icons/NextFolderIcon";
import PreviousFolderIcon from "../components/icons/PreviousFolderIcon";
import { PageBG } from "../components/PageBG";
import { PageBody } from "../components/PageBody";
import { PageNavbar } from "../components/PageNavbar";
import { PageSidebar } from "../components/PageSidebar";

export const BasePage = ({ children }: FlexProps) => {
  return (
    <PageBG>
      <Flex>
        <PageNavbar>
          <ButtonGroup>
            <Flex justifyContent="space-between">
              <PreviousFolderIcon />
              <NextFolderIcon />
            </Flex>
          </ButtonGroup>
        </PageNavbar>
        <PageSidebar left="90%"></PageSidebar>
        <PageBody left="0%">{children}</PageBody>
      </Flex>
    </PageBG>
  );
};
