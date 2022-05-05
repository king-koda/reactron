/// <reference types="react" />
import { TextProps, TooltipProps } from '@chakra-ui/react';
declare type TextWithTooltipProps = TextProps & {
    tooltipProps?: Omit<TooltipProps, 'children'>;
};
export declare const TextWithTooltip: ({ tooltipProps, children, ...rest }: TextWithTooltipProps) => JSX.Element;
export {};
