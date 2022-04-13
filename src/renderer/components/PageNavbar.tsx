import {
  Flex,
  FlexProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const PageNavbar = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className="pgnavbar"
      height={"20%"}
      width={"100%"}
      //top="calc(20%)"
      bgColor="white"
      zIndex={4}
      fill="white"
      position={"fixed"}
      borderBottom={"solid 6px black"}
      borderLeft={"solid 6px black"}
      borderRight={"solid 6px black"}
      borderTop={"solid 6px black"}
      padding="25px"
      {...rest}
    >
      {children}
      {/* <Tabs width="100%" height="100%">
        <TabPanels>
          <TabPanel tabIndex={0}>
            <Text color="black">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={1}>
            <Text color="black">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={2}>
            <Text color="black">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={3}>
            <Text color="black">dawdawd</Text>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </Flex>
  );
};
