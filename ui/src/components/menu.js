import React from "react";
import { Menu } from "antd";

const items = [
    {
        label: "Home",
        key: "home",
    },
    {
        label: "Popular",
        key: "popular",
    }
]

export const MenuComponent = () => {

    return (
        <Menu theme="dark" mode="horizontal" items={items} />
    )
}