import { Text, TextProps, Tooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';

type TextWithTooltipProps = TextProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
};

const TextWithTooltip = ({
  tooltipProps,
  children,
  ...rest
}: TextWithTooltipProps) => {
  return (
    <Tooltip placement="top" openDelay={250} {...tooltipProps}>
      <Text
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        {...rest}
      >
        {children}
      </Text>
    </Tooltip>
  );
};
export default TextWithTooltip;
