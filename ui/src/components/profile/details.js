import React from "react";
import {Row, Col, Avatar, Tag} from "antd";
import { UserOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';


export const ProfileUserDetailsForm = (props) => {


    return (
        <div style={styles.container} >
            <Row justify="start" align="middle">
                <Col style={styles.avatarCol} >
                    <a href="#">
                        <Avatar size={100} icon={<UserOutlined />} /><br/>
                        Change
                    </a>
                </Col>
                <Col>
                    <h1>user name <small><a href=""><EditOutlined /></a></small></h1>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>ID:</Col>
                <Col style={styles.colRight}>123-123-123-2311</Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Email:</Col>
                <Col style={styles.colRight}>mail@sta.im <a href="#"><EditOutlined /></a></Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Status:</Col>
                <Col style={styles.colRight}>
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        success
                    </Tag>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Password</Col>
                <Col style={styles.colRight}><a href="#"><EditOutlined /></a></Col>
            </Row>
        </div>
    )
}

const styles = {
    container: {
        background: "",
        margin: "25px"
    },
    avatarCol: {
        padding: "50px"
    },
    colLeft: {
        padding: "15px 10px",
        fontWeight: "bold",
        textAlign: "left",
        margin: "0 0 0 40px"
    },
    colRight: {
        padding: "15px 10px"
    }
}
