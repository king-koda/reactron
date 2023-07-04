import {
  Flex,
  FlexProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const PageNavbar = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      className="pgnavbar"
      height="20%"
      width="100%"
      // top="calc(20%)"
      bgColor="rgba(0, 0, 0, 0.0)"
      zIndex={3}
      // fill='white'
      // position={'fixed'}
      borderBottom="solid 2px black"
      // borderLeft={'solid 2px black'}
      // borderRight={'solid 2px black'}
      // borderTop={'solid 2px black'}
      // padding='25px'
      {...rest}
    >
      {children}
      {/* <Tabs width="100%" height="100%">
        <TabPanels>
          <TabPanel tabIndex={0}>
            <Text color="white">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={1}>
            <Text color="white">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={2}>
            <Text color="white">dawdawd</Text>
          </TabPanel>
          <TabPanel tabIndex={3}>
            <Text color="white">dawdawd</Text>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </Flex>
  );
};

export default PageNavbar;
