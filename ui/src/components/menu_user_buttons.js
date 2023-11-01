import React from "react";
import { Avatar, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const isLogged = () => {
    return false;
}

export const MenuUserButton = () => {



    return (
        isLogged() ? <a href="/"><Avatar style={styles.avatar} icon={<UserOutlined />}/></a> :
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
    }
}


