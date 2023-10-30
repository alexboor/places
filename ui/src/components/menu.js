import React from "react";
import { Menu } from "antd";

const items = [
    {
        label: "Home",
        key: "home",
    },
    {
        label: "Profile",
        key: "profile",
    }
]

const MenuComponent = () => {

    return (
        <Menu theme="dark" mode="horizontal" items={items} />
    )
}

export default MenuComponent;