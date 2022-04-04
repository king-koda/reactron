import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { PageBG } from "../components/PageBG";
import { PageBody } from "../components/PageBody";
import { PageHeader } from "../components/PageHeader";
import { PageNavbar } from "../components/PageNavbar";
import { PageSidebar } from "../components/PageSidebar";

export const BasePage = ({ children }: FlexProps) => {
  return (
    <PageBG>
      <Flex>
        <PageHeader></PageHeader>
        <PageNavbar></PageNavbar>
        <PageSidebar></PageSidebar>
        <PageBody>{children}</PageBody>
      </Flex>
    </PageBG>
  );
};
