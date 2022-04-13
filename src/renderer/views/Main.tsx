import { Button, Flex } from "@chakra-ui/react";
import { BasePage } from "./BasePage";
import React, { useState } from "react";
import Logger from "js-logger";

export const Main = () => {
  const [hashIndex, setHashIndex] = useState<number>(0);
  const [ht, setHt] = useState<any>(undefined);

  Logger.debug("ht", ht);

  return (
    <BasePage>
      <Flex bgColor="black"></Flex>
      <Button
        id="syncBtn"
        size="200px"
        onClick={async () => {
          await window.electronAPI
            .walkFs()
            .then((result) => {
              Logger.debug("walkFs FE result:", result);
              setHt(result);
            })
            .catch((err) => Logger.debug("fuck button error: ", err));
        }}
      >
        FUCK
      </Button>
      <Button id="syncBtn" size="200px" onClick={() => {}}>
        NEXT HASH
      </Button>
      {ht && (
        <Flex mt="200px" fontSize="50px">
          Hash: {ht[hashIndex]}
        </Flex>
      )}
    </BasePage>
  );
};
