import { ComponentWithAs, FlexProps, IconProps, TextProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
export declare type IconAndTextProps = {
    icon?: IconType;
    text?: string;
    flex?: ComponentWithAs<any>;
    iconProps?: IconProps;
    textProps?: TextProps;
    flexProps?: FlexProps;
};
declare const IconAndText: ({ icon, text, flex, iconProps, textProps, flexProps, ...rest }: IconAndTextProps) => JSX.Element;
export default IconAndText;
