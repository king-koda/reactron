import { Text, TextProps, Tooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';

type TextWithTooltipProps = TextProps & {
  tooltipProps?: Omit<TooltipProps, 'children'>;
};

export const TextWithTooltip = ({
  tooltipProps,
  children,
  ...rest
}: TextWithTooltipProps) => {
  return (
    <Tooltip placement='top' openDelay={500} {...tooltipProps}>
      <Text
        width={'100%'}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        whiteSpace={'nowrap'}
        {...rest}
      >
        {children}
      </Text>
    </Tooltip>
  );
};
