import React, { useEffect, useRef, useState } from "react";
import {Row, Col, Avatar, Tag, Modal, Upload} from "antd";
import { UserOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from "antd-img-crop";
import {UserProfileModalNameForm} from "./modal_name";
import axios from "axios";

const API_URL_BASE = "http://localhost:8080/api/v1"
const CONTENT_URL_BASE = "http://localhost:8080/content"

/**
 * Read base64 from given file
 * @param img
 * @param callback
 */
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}


const avatarPreview = () => {
    console.logI("preview")
}

/**
 * Main user detail component shows on /profile address
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const ProfileUserDetailsForm = (props) => {
    const [modalAvatarOpen, setModalAvatarOpen] = useState(false)
    const [avatarLoading, setAvatarLoading] = useState()
    const [avatarImgUrl, setAvatarImgUrl] = useState(`${CONTENT_URL_BASE}/avatar/${props.uid}/`)

    const [modalNameOpen, setModalNameOpen] = useState(false)
    const [modalNameLoading, setModalNameLoading] = useState(false)

    const [modalEmailOpen, setModalEmailOpen] = useState(false)
    const [modalPassOpen, setModalPassOpen] = useState(false)

    const [user, setUser] = useState({})

    const init = useRef(false)
    useEffect(() => {
        if (!init.current) {
            init.current = true

            getUserData(props)
        }
    }, [props])

    const getUserData = (props) => {
        const opts = {
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
        }

        axios.get(`${API_URL_BASE}/users/${props.uid}/`, opts).then((resp) => {
                setUser(resp.data)
        }).catch((err) => {
            if (err.response.status === 403) {
                props.globalActions.logout()
            }
        })
    }

    const beforeUpload = (file) => {

    }

    const avatarUpload = ({file, onProgress}) => {
        setAvatarLoading(true)
        setAvatarImgUrl(null)
        const frmData = new FormData()
        const opts = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${props.token}`
            },
        }
        frmData.append("avatar", file)

        axios.post(`${API_URL_BASE}/users/${props.uid}/avatar/`, frmData, opts).then((resp) => {
            setAvatarImgUrl(`${CONTENT_URL_BASE}/avatar/${props.uid}/?t=${Date.now()}`)
            setAvatarLoading(true)
        }).catch((err) => {
            console.log("err", err)
        })
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
        setModalNameLoading(true)

        axios({
            url: `${API_URL_BASE}/users/${props.uid}/`,
            method: 'put',
            data: {name: user.name},
            headers: {
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/json",
            }
        }).then((resp) => {
            setUser({
                ...user,
                name: resp.data.name,
            })
        }).catch((err) => {
            console.log("err", err)
        }).finally(() => {
            setModalNameLoading(false)
            setModalNameOpen(false)
        })


        
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

    const uploadButton = (
        <div>
            {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{marginTop: 8}}>
                {avatarLoading ? "Uploading" : "Upload"}
            </div>
        </div>
    );

    return (
        <div style={styles.container} >
            <Row justify="start" align="middle">
                <Col style={styles.avatarCol} >
                    <ImgCrop rotationSlider showReset cropShape="round">
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            showUploadList={false}
                            customRequest={avatarUpload}
                            maxCount="1"
                        > 
                        {avatarImgUrl ?
                                <Avatar size={100}
                                        icon={<UserOutlined />}
                                        src={avatarImgUrl}
                                />
                                : uploadButton
                            }
                        </Upload>
                    </ImgCrop>
                </Col>
                <Col>
                    <h1>{user.name} <small><a href="#" onClick={handleModalNameOpen}><EditOutlined /></a></small></h1>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>ID:</Col>
                <Col style={styles.colRight}>{user.id}</Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Email:</Col>
                <Col style={styles.colRight}>{user.email} <a href="#" onClick={handleModalEmailOpen}><EditOutlined /></a></Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Status:</Col>
                <Col style={styles.colRight}>
                    {user.activated ? 
                        <Tag icon={<CheckCircleOutlined />} color="success">Active</Tag> :
                        <Tag icon={<CloseCircleOutlined />} color="error">Not activated</Tag>
                    }
                    
                </Col>
            </Row>
            <Row>
                <Col span={4} style={styles.colLeft}>Password</Col>
                <Col style={styles.colRight}><a href="#" onClick={handleModalPassOpen}><EditOutlined /></a></Col>
            </Row>

            <Modal title="Upload new profile picture" open={modalAvatarOpen} onOk={handleModalAvatarOk} onCancel={handleModalAvatarCancel} confirmLoading={false}>
                <UserProfileModalNameForm />
            </Modal>

            <Modal title="Setup new name" open={modalNameOpen} onOk={handleModalNameOk} onCancel={handleModalNameCancel} confirmLoading={modalNameLoading}>
                <UserProfileModalNameForm onFinish={handleModalNameOk} setUser={setUser} user={user} />
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
