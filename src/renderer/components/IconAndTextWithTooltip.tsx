import { Tooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';
import CustomIcon, { CustomIconProps } from './icons/CustomIcon';

type IconAndTextWithTooltipProps = CustomIconProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
};

const IconAndTextWithTooltip = ({
  tooltipProps,
  ...rest
}: IconAndTextWithTooltipProps) => {
  return (
    <Tooltip placement="top" openDelay={0} {...tooltipProps}>
      <span>
        <CustomIcon {...rest} />
      </span>
    </Tooltip>
  );
};

export default IconAndTextWithTooltip;
