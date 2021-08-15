import React from "react";

type Props = {
    color: string;
}

export function HeatMapSquare({color}: Props) {
    return(
        <svg version="1.1"
            baseProfile="full"
            width="20" height="20"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="18" fill={color} stroke="white" />
        </svg>
    )
};
