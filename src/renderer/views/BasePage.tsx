import { Button, ButtonGroup, Flex, FlexProps, Text } from "@chakra-ui/react";
import Logger from "js-logger";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { GrSelect, GrScan, GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import IconAndText from "../components/icons/IconAndText";
import NextFolderIcon from "../components/icons/NextFolderIcon";
import PreviousFolderIcon from "../components/icons/PreviousFolderIcon";
import { PageBG } from "../components/PageBG";
import { PageBody } from "../components/PageBody";
import { PageNavbar } from "../components/PageNavbar";
import { PageSidebar } from "../components/PageSidebar";

export const BasePage = ({ children }: FlexProps) => {
  const [hashIndex, setHashIndex] = useState<number>(0);
  const [ht, setHt] = useState<any>(undefined);

  Logger.debug("ht", ht);

  return (
    <PageBG>
      <Flex>
        <PageNavbar>
          <Flex justifyContent={"space-evenly"} width={"100%"}>
            <IconContext.Provider value={{ color: "blue", size: "50px" }}>
              <Flex>
                <IconAndText icon={GrSelect} text="Select Root Folder" />
              </Flex>
              <Flex>
                <IconAndText
                  icon={GrScan}
                  text="Scan for Duplicates"
                  onClick={async () => {
                    await window.electronAPI
                      .walkFs()
                      .then((result) => {
                        console.log("walkFs FE result:", result);
                        setHt(result);
                      })
                      .catch((err) => Logger.debug("fuck button error: ", err));
                  }}
                  // iconProps={{ color: "yellow.200" }}
                />
              </Flex>
              <Flex>
                <IconAndText icon={GrCaretPrevious} text="Previous Duplicate" />
              </Flex>
              <Flex>
                <IconAndText icon={GrCaretNext} text="Next Duplicate" />
              </Flex>
            </IconContext.Provider>
          </Flex>
        </PageNavbar>
        {/* <Text>Hash:</Text> */}
        {ht && <Flex>{ht[hashIndex]}</Flex>}
        {/* <PageSidebar left="90%"></PageSidebar> */}
        <PageBody left="0%">{children}</PageBody>
      </Flex>
    </PageBG>
  );
};
