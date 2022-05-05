/// <reference types="react" />
import { TooltipProps } from '@chakra-ui/react';
import { IconAndTextProps } from './icons/IconAndText';
declare type IconAndTextWithTooltipProps = IconAndTextProps & {
    tooltipProps?: Omit<TooltipProps, 'children'>;
};
export declare const IconAndTextWithTooltip: ({ tooltipProps, ...rest }: IconAndTextWithTooltipProps) => JSX.Element;
export {};
