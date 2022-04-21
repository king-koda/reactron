import { Tooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';
import IconAndText, { IconAndTextProps } from './icons/IconAndText';

type IconAndTextWithTooltipProps = IconAndTextProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
};

export const IconAndTextWithTooltip = ({
  tooltipProps,
  ...rest
}: IconAndTextWithTooltipProps) => {
  return (
    <Tooltip placement='top' openDelay={500} {...tooltipProps}>
      <span>
        <IconAndText {...rest} />
      </span>
    </Tooltip>
  );
};
