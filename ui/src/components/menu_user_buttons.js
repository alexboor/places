import React, {useState} from "react";
import {Avatar, Button, Space, Dropdown, Typography, Divider} from "antd";
import { UserOutlined } from "@ant-design/icons";

export const MenuUserButton = (props) => {
    const [user, setUser] = useState(() => {

    });

    const items = [
        {
            key: "profile",
            label: (
                <a href="/profile">Profile</a>
            ),
        },
        {
            keu: "logout",
            label: (
                <a href="#" onClick={(e) => {
                    e.preventDefault()
                    props.logout()
               }}>Logout</a>
            )
        }
    ]

    const userComponent =
        <Space split={<Divider type="vertical" />} style={styles.email}>
            <Typography.Link href="/profile" >{props.userEmail}</Typography.Link>
            <Dropdown menu={{items}}>
                <Avatar style={styles.avatar} icon={<UserOutlined />}/>
            </Dropdown>
        </Space>


    return (
        !!props.token ? userComponent :

        <Space>
            <Button shape="round" href="/signin">Sign in</Button>
            <Button type="primary" shape="round" href="/signup">Sign up</Button>
        </Space>
    )
}

const styles = {
    avatar: {
        backgroundColor: "#b0aeae", 
        flex: "center"
    },
    email: {
        width: "250px",
        textAlign: "right"
    }
}


