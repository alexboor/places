import { Row, Col, Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import React from "react";

const SignupView = () => {
    return (
        <Row  justify="center" style={styles.container}>
            <Col span={18}>
                <Row>
                    <Col span={10} style={styles.left}>
                    </Col>

                    <Col span={14} style={styles.right}>
                        <h1 style={styles.h}>Create Account</h1>

                        <Form name="login">
                            <Form.Item name="username" rules={[{ required: true, message: "Input your username" }]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: "Input your email" }]}>
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Input your password" }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item name="password2" rules={[{ required: true, message: "Input your password" }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password again" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" shape="round" size="large" htmlType="submit" className="login-form-button" block >Register</Button><br/>
                                
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
        background: "#1677ff",
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