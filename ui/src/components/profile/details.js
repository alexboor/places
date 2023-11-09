import React, { useState } from "react";
import {Row, Col, Avatar, Tag, Modal} from "antd";
import { UserOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {UserProfileModalNameForm} from "./modal_name";


export const ProfileUserDetailsForm = (props) => {
    const [modalAvatarOpen, setModalAvatarOpen] = useState(false)

    const [modalNameOpen, setModalNameOpen] = useState(false)
    const [name, setName] = useState()

    const [modalEmailOpen, setModalEmailOpen] = useState(false)
    const [modalPassOpen, setModalPassOpen] = useState(false)

    const handleModalAvatarOpen = () => {
        setModalAvatarOpen(true);
    }

    const handleModalAvatarOk = () => {
        console.log("avatar: click ok")
        setModalAvatarOpen(false)
    }

    const handleModalAvatarCancel = () => {
        console.log("avatar: cancel")
        setModalAvatarOpen(false)
    }

    const handleModalNameOpen = () => {
        setModalNameOpen(true)
    }

    const handleModalNameOk = () => {
        console.log(name)
        setModalNameOpen(false)
    }

    const handleModalNameCancel = () => {
        setModalNameOpen(false)
    }

    const handleModalEmailOpen = () => {
        setModalEmailOpen(true)
    }

    const handleModalEmailOk = () => {
        setModalEmailOpen(false)
    }

    const handleModalEmailCancel = () => {
        setModalEmailOpen(false)
    }

    const handleModalPassOpen = () => {
        setModalPassOpen(true)
    }

    const handleModalPassOk = () => {
        setModalPassOpen(false)
    }

    const handleModalPassCancel = () => {
        setModalPassOpen(false)
    }


    return (
        <div style={styles.container} >
            <Row justify="start" align="middle">
                <Col style={styles.avatarCol} >
                    <a href="#" onClick={handleModalAvatarOpen}>
                        <Avatar size={100} icon={<UserOutlined />} /><br/>
                        Change
                    </a>
                </Col>
                <Col>
                    <h1>user name <small><a href="#" onClick={handleModalNameOpen}><EditOutlined /></a></small></h1>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>ID:</Col>
                <Col style={styles.colRight}>123-123-123-2311</Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Email:</Col>
                <Col style={styles.colRight}>mail@sta.im <a href="#" onClick={handleModalEmailOpen}><EditOutlined /></a></Col>
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
                <Col style={styles.colRight}><a href="#" onClick={handleModalPassOpen}><EditOutlined /></a></Col>
            </Row>

            <Modal title="Upload new profile picture" open={modalAvatarOpen} onOk={handleModalAvatarOk} onCancel={handleModalAvatarCancel} confirmLoading={false}>
                <UserProfileModalNameForm />
            </Modal>

            <Modal title="Setup new name" open={modalNameOpen} onOk={handleModalNameOk} onCancel={handleModalNameCancel} confirmLoading={false}>
                <UserProfileModalNameForm onFinish={handleModalNameOk} setName={setName} />
            </Modal>

            <Modal title="Setup new email" open={modalEmailOpen} onOk={handleModalEmailOk} onCancel={handleModalEmailCancel} confirmLoading={false}>
                <p>setup new email</p>
            </Modal>

            <Modal title="Setup new password" open={modalPassOpen} onOk={handleModalPassOk} onCancel={handleModalPassCancel} confirmLoading={false}>
                <p>setup new password</p>
            </Modal>

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
