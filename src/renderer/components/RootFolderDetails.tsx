import { Flex, Icon, useToast } from '@chakra-ui/react';
import { GrScan, GrSelect } from 'react-icons/gr';
import { HiDuplicate } from 'react-icons/hi';
import { MdOutlineHome } from 'react-icons/md';
import IconAndTextWithTooltip from './IconAndTextWithTooltip';
import TextBody from './TextBody';
import TextHeader from './TextHeader';
import TextWithTooltip from './TextWithTooltip';
import { HashTableReturn } from './utils';

type RootFolderSelectorProps = {
  selectRootFolder: () => Promise<boolean>;
};

const RootFolderSelector = ({ selectRootFolder }: RootFolderSelectorProps) => {
  const toast = useToast();

  return (
    <IconAndTextWithTooltip
      tooltipProps={{
        id: 'select-root-folder-button',
        label: 'Select Root Folder',
      }}
      icon={GrSelect}
      onClick={async () => {
        if (await selectRootFolder()) {
          toast({
            description: 'Successfully Selected Root Folder.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            description: 'Error Selecting Root Folder.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      }}
    />
  );
};

type DuplicateScannerProps = {
  scanForDuplicates: () => Promise<boolean>;
  rootFolder: string;
};

const DuplicateScanner = ({
  scanForDuplicates,
  rootFolder,
}: DuplicateScannerProps) => {
  const toast = useToast();

  return (
    <IconAndTextWithTooltip
      tooltipProps={{
        id: 'scan-for-duplicates-button',
        label: 'Scan for Duplicates',
      }}
      icon={GrScan}
      isDisabled={!rootFolder}
      onClick={async () => {
        if (await scanForDuplicates()) {
          toast({
            description: 'Successfully Scanned for Duplicates.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            description: 'Error Scanning for Duplicates.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      }}
    />
  );
};

type Props = RootFolderSelectorProps &
  DuplicateScannerProps & {
    hashTable: HashTableReturn;
  };

const RootFolderDetails = ({
  rootFolder,
  hashTable,
  selectRootFolder,
  scanForDuplicates,
}: Props) => {
  return (
    <>
      <Flex
        id="root-folder-details"
        width="100%"
        direction="row"
        align="center"
      >
        <RootFolderSelector selectRootFolder={selectRootFolder} />
        <Icon as={MdOutlineHome} height="40px" width="40px" paddingX="4px" />
        <TextHeader>Root Folder:</TextHeader>
        {rootFolder && (
          <TextWithTooltip
            tooltipProps={{ label: rootFolder }}
            fontSize="24px"
            paddingX="6px"
          >
            {rootFolder}
          </TextWithTooltip>
        )}
      </Flex>
      <Flex
        id="duplicate-info-flex"
        width="100%"
        direction="row"
        align="center"
      >
        <DuplicateScanner
          rootFolder={rootFolder}
          scanForDuplicates={scanForDuplicates}
        />
        <Icon as={HiDuplicate} height="40px" width="40px" paddingX="4px" />
        <TextHeader>Duplicates Found:</TextHeader>
        {hashTable && (
          <TextWithTooltip
            paddingX="6px"
            fontSize="24px"
            tooltipProps={{ label: hashTable?.extra?.totalFiles }}
          >
            {hashTable?.extra?.totalFiles}
          </TextWithTooltip>
        )}
      </Flex>
    </>
  );
};

export default RootFolderDetails;
