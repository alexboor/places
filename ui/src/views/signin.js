import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col, Button, Form, Input, notification} from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from "axios";

const SigninView = (props) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification()
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!!props.token) navigate("/")
    })

    const openNotification = (type, t = "", d) => {
        if (t.length === 0) t = "General error";

        api[type]({
            message: t,
            description: d
        })
    }

    const onFinish = (v) => {
        setLoading(true)

        let data = {
            email: v.email,
            password: v.pass
        }

        let opts = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.post("http://localhost:8080/auth/signin", data, opts)
            .then((resp) => {
                console.log(resp)
                if (resp.status === 201) {
                    localStorage.setItem("token", resp.data.token)
                    navigate("/")
                }

            })
            .catch((err) => {
                openNotification('error', err.code, err.message)
                form.setFieldValue("password", "")
                setLoading(false)
                console.log('err')
                console.log(err)
            })

    }

    return (
        <Row  justify="center" style={styles.container}>
            {contextHolder}

            <Col span={18}>
                <Row>
                    <Col span={10} style={styles.left}>
                    </Col>

                    <Col span={14} style={styles.right}>
                        <h1 style={styles.h}>Sign In</h1>

                        <Form name="login"
                              autoComplete="off"
                              onFinish={onFinish}
                              disabled={isLoading}
                              form={form} >
                            {/*<Alert message="Try modify " type="info" showIcon />*/}

                            <Form.Item name="email" rules={[{ required: true, message: "Input your email" }]}>
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item name="pass"
                                       rules={[{ required: true, message: "Input your password" }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password again" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary"
                                        shape="round"
                                        size="large"
                                        htmlType="submit"
                                        className="login-form-button"
                                        block
                                        loading={isLoading}
                                >Login</Button><br/>
                                
                            </Form.Item>
                            <Form.Item>
                                or <a href="/signup">register</a>
                            </Form.Item>
                            
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const styles = {
    container: {
        margin: "100px 0 0 0",
        
    },
    h: {
        margin: "20px 0 70px 0",
        fontSize: "25pt",
        color: "#0f4085"
    },
    left: {
        minHeight: "560px",
        borderRadius: "10px 0 0 10px",
        padding: "50px 20px",
        background: "#fff url(login.png) no-repeat center center",
        backgroundSize: "80%"
    },
    right: {
        minHeight: "100px",
        background: "#fff",
        borderRadius: "0 10px 10px 0",
        padding: "50px 150px"
    }
}

export default SigninView;