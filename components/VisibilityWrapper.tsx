import { ReactNode } from "react";

export const VisibilityWrapper = ({ visible, children }:{ visible: boolean, children: ReactNode}) => {
    return visible ? children : null;
};