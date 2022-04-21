import { ComponentWithAs, FlexProps, IconProps, TextProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
export declare type IconAndTextProps = FlexProps & {
    isDisabled?: boolean;
    icon?: IconType;
    text?: string;
    flex?: ComponentWithAs<any>;
    iconProps?: IconProps;
    textProps?: TextProps;
    onClick?: () => any;
    isButton?: boolean;
};
declare const IconAndText: ({ icon, text, flex, onClick, iconProps, textProps, isDisabled, isButton, ...rest }: IconAndTextProps) => JSX.Element;
export default IconAndText;
