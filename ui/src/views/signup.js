import { Row, Col, Button, Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import axios  from 'axios';

const SignupView = () => {
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isLoading, setLoading] = useState(false)

    const openNotification = (type, t, d) => {
        if (t.length === 0) t = "General error";

        api[type]({
            message: t,
            description: d
        })
    }

    const onFinish = (vals) => {
        axios.post('http://localhost:8080/auth/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: vals.email,
                name: vals.name,
                password: vals.password,
            }
        }).then((resp) => {
            console.log(resp)
        }).catch((err) => {
            openNotification('error', '', err.message)
            console.log(err)
        })



        setLoading(true);
    }

    return (
        <Row  justify="center" style={styles.container}>
            {contextHolder}
            <Col span={18}>
                <Row>
                    <Col span={10} style={styles.left}>
                    </Col>

                    <Col span={14} style={styles.right}>
                        <h1 style={styles.h}>Create Account</h1>

                        <Form name="login"
                              form={form}
                              autoComplete="off"
                              onFinish={onFinish}
                              disabled={isLoading} >

                            <Form.Item name="username" rules={[{ required: true, message: "Input your username" }]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item name="email" rules={[{ required: true, message: "Input your email" }]}>
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true, message: "Input your password" }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>

                            <Form.Item name="password2"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Must be the same password"
                                           }
                                       ]}>
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
                                >Register</Button><br/>
                                
                            </Form.Item>
                            <Form.Item>
                                or <a href="/signin">sign in</a>
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
        background: "#fff url(sign-up.png) no-repeat center center",
        backgroundSize: "contain"
    },
    right: {
        minHeight: "100px",
        background: "#fff",
        borderRadius: "0 10px 10px 0",
        padding: "50px 150px"
    }
}

export default SignupView;