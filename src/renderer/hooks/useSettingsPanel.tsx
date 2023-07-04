import { Checkbox, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { MdSelectAll } from 'react-icons/md';
import { BestPhotos } from 'renderer/components/utils';

type Props = {
  keepHighestResolution: boolean;
  toggleKeepHighestResolution: () => boolean;
  setAutoMarkAll: (markAll: boolean) => void;
  setAutoDeleteOnFolderChange: (autoDelete: boolean) => void;
  autoDeleteOnFolderChange: boolean;
  keepHighestSize: boolean;
  toggleKeepHighestSize: () => boolean;
  autoMarkAll: boolean;
};

const SettingsPanel = ({
  keepHighestResolution,
  toggleKeepHighestResolution,
  setAutoMarkAll,
  setAutoDeleteOnFolderChange,
  autoDeleteOnFolderChange,
  keepHighestSize,
  toggleKeepHighestSize,
  autoMarkAll,
}: Props) => {
  const toast = useToast();

  return (
    <Flex
      id="settings"
      direction="column"
      height="100%"
      width="100%"
      borderRight="solid 2px black"
    >
      <Flex
        direction="row"
        width="100%"
        borderBottom="solid 2px black"
        height="30%"
        align="center"
        justifyContent="center"
      >
        <Text fontSize="30px" alignSelf="center" fontWeight="white">
          Settings
        </Text>
      </Flex>

      <Flex direction="column" height="70%" width="100%" overflow="auto">
        <Flex>
          <Icon height="30px" width="30px" as={MdSelectAll} paddingX={1} />
          <Text fontSize="20px" fontWeight="bold">
            Mark all for Deletion Options:
          </Text>
        </Flex>

        <Checkbox
          fontSize="18px"
          paddingX={1}
          isChecked={keepHighestResolution}
          onChange={() => {
            toggleKeepHighestResolution();
            if (!keepHighestResolution) {
              toast({
                title: 'Success:',
                description: 'Keep Highest Resolution Toggled ON.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
            }
            if (keepHighestResolution) {
              toast({
                title: 'Warning:',
                description: 'Keep Highest Resolution Toggled OFF.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              });
            }
          }}
        >
          <Text fontSize="18px">Keep Highest Resolution Photo</Text>
        </Checkbox>
        <Checkbox
          paddingX={1}
          isChecked={keepHighestSize}
          onChange={() => {
            if (toggleKeepHighestSize()) {
              if (!keepHighestSize) {
                toast({
                  title: 'Success:',
                  description: 'Keep Highest Size Toggled ON.',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }
              if (keepHighestSize) {
                toast({
                  title: 'Warning:',
                  description: 'Keep Highest Size Toggled OFF.',
                  status: 'warning',
                  duration: 2000,
                  isClosable: true,
                });
              }
            }
          }}
        >
          <Text fontSize="18px">Keep Highest Size Photo</Text>
        </Checkbox>
        <Checkbox
          fontSize="18px"
          paddingX={1}
          isChecked={autoMarkAll}
          onChange={() => {
            if (!autoMarkAll)
              alert(
                'WARNING: Pressing Next/ Previous will now automatically mark all photos for DELETION that match the config!'
              );
            setAutoMarkAll(!autoMarkAll);
            if (!autoMarkAll) {
              toast({
                title: 'Success:',
                description: 'Auto Mark All Toggled ON.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
            }
            if (autoMarkAll) {
              toast({
                title: 'Warning:',
                description: 'Auto Mark All Toggled OFF.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              });
            }
          }}
        >
          <Text fontSize="18px">Auto Mark All</Text>
        </Checkbox>
        <Checkbox
          fontSize="18px"
          paddingX={1}
          isChecked={autoDeleteOnFolderChange}
          onChange={() => {
            if (!autoDeleteOnFolderChange) {
              alert(
                'WARNING: Pressing Next/ Previous will now automatically DELETE photos marked for DELETION!'
              );
            }
            setAutoDeleteOnFolderChange(!autoDeleteOnFolderChange);
            if (!autoDeleteOnFolderChange) {
              toast({
                title: 'Success:',
                description: 'Auto Delete Photos on Next/ Previous Toggled ON.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              });
            }
            if (autoDeleteOnFolderChange) {
              toast({
                title: 'Warning:',
                description:
                  'Auto Delete Photos on Next/ Previous Toggled OFF.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              });
            }
          }}
        >
          <Text fontSize="18px">Auto Delete Photos ON Next/ Previous</Text>
        </Checkbox>
      </Flex>
    </Flex>
  );
};

type UseSettingsPanelProps = {
  setToBeDeleted: (photosToBeDeleted: string[]) => void;
  toBeDeleted: string[];
  sortedPhotos: BestPhotos;
};

const useSettingsPanel = ({
  setToBeDeleted,
  toBeDeleted,
  sortedPhotos,
}: UseSettingsPanelProps): {
  keepHighestResolution: boolean;
  keepHighestSize: boolean;
  autoMarkAll: boolean;
  autoDeleteOnFolderChange: boolean;
  SettingsPanel: JSX.Element;
} => {
  // checkboxes
  const [keepHighestResolution, setKeepHighestResolution] =
    useState<boolean>(false);
  const [keepHighestSize, setKeepHighestSize] = useState<boolean>(false);
  const [autoMarkAll, setAutoMarkAll] = useState<boolean>(false);
  const [autoDeleteOnFolderChange, setAutoDeleteOnFolderChange] =
    useState<boolean>(false);

  const toggleKeepHighestSize = () => {
    if (toBeDeleted?.includes(sortedPhotos?.highestSizePhoto?.value)) {
      const oldToBeDeleted = cloneDeep(toBeDeleted);
      const newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
        return !(tbd === sortedPhotos?.highestSizePhoto?.value);
      });
      setToBeDeleted(newToBeDeleted);
    }
    setKeepHighestSize(!keepHighestSize);
    return true;
  };

  const toggleKeepHighestResolution = () => {
    if (toBeDeleted?.includes(sortedPhotos?.highestResPhoto?.value)) {
      const oldToBeDeleted = cloneDeep(toBeDeleted);
      const newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
        return !(tbd === sortedPhotos?.highestResPhoto?.value);
      });
      setToBeDeleted(newToBeDeleted);
    }
    setKeepHighestResolution(!keepHighestResolution);
    return true;
  };

  const settingsPanel = (
    <SettingsPanel
      autoDeleteOnFolderChange={autoDeleteOnFolderChange}
      autoMarkAll={autoMarkAll}
      keepHighestResolution={keepHighestResolution}
      keepHighestSize={keepHighestSize}
      setAutoDeleteOnFolderChange={setAutoDeleteOnFolderChange}
      setAutoMarkAll={setAutoMarkAll}
      toggleKeepHighestResolution={toggleKeepHighestResolution}
      toggleKeepHighestSize={toggleKeepHighestSize}
    />
  );

  return {
    keepHighestResolution,
    keepHighestSize,
    autoMarkAll,
    autoDeleteOnFolderChange,
    SettingsPanel: settingsPanel,
  };
};

export default useSettingsPanel;
