import { Col, Menu, Row } from "antd";
import { UserOutlined, HeartOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons';
import React from "react";
import {useMemo, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {ProfileUserDetailsForm} from "../components/profile/details";
import {ProfileFavorites} from "../components/profile/favorites";
import {ProfileSettings} from "../components/profile/settings";


const menuItems = [
    {
        label: (<a href="/profile">User details</a>),
        key: "details",
        icon: <UserOutlined />
    },
    {
        label: (<a href="/profile/favorites">Favorites</a>),
        key: "favorites",
        icon: <HeartOutlined />
    },
    {
        label: (<a href="/profile/settings">Settings</a>),
        key: "settings",
        icon: <SettingOutlined />
    },
    { 
        type: 'divider' 
    },
    {
        label: "Log out",
        key: "logout",
        icon: <PoweroffOutlined />
    }

]

const ProfileView = (props) => {

    return (
        <Row style={styles.row}>
            <Col flex="200px" style={styles.left}>
                <h2 style={styles.menuHeader}>Profile</h2>
                <Menu mode="inline" items={menuItems} />
            </Col>
            <Col flex="auto" style={styles.right}>
                <Routes>
                    <Route path="" element={<ProfileUserDetailsForm />} />
                    <Route path="favorites" element={<ProfileFavorites />} />
                    <Route path="settings" element={<ProfileSettings />} />
                </Routes>
            </Col>
        </Row>    
    )
}

const styles = {
    row: {
        backgroud: "#fff",
        height: "100%"
    },
    menuHeader: {
        margin: "20px 0 20px 30px"
    },
    left: {
        background: "#fff",
        textAlign: "left",
    },
    right: {
        height: "100%",
        background: "#fff"
    }
}

export default ProfileView;