import { Row, Col, Button, Form, Input, notification, Result } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import axios  from 'axios';

const SignupView = (props) => {
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isLoading, setLoading] = useState(false)
    const [isSentOk, setSent] = useState(false)

    const openNotification = (type, t, d) => {
        if (t.length === 0) t = "General error";

        api[type]({
            message: t,
            description: d
        })
    }

    const onFinish = (vals) => {
        setLoading(true);

        let data = {
            email: vals.email,
            name: vals.name,
            password: vals.password,
        }

        let opts = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        // TODO: move base to config
        // TODO: models to model module
        axios.post('http://localhost:8080/auth/register', data, opts).then((resp) => {
            setSent(true);
        }).catch((err) => {
            openNotification('error', err.code, err.message)
            setLoading(false);
            form.setFieldValue("password", "")
            form.setFieldValue("password2", "")
        })

    }

    // TODO: validation on match passwords
    const formComponent = (
        <Form name="login"
              form={form}
              autoComplete="off"
              onFinish={onFinish}
              disabled={isLoading}
              style={styles.form} >

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
    )

    const succesfullComponent = (
        <Result
            status="success"
            title="Congratulation"
            subTitle="Account created and now you can sign in"
            extra={[
                <Button type="primary" key="console" href="/signin">
                    Sign in
                </Button>,
                <Button key="buy" href="/">Home</Button>,
            ]}
        />
    )

    return (
        <Row  justify="center" style={styles.container}>
            {contextHolder}
            <Col span={18}>
                <Row>
                    <Col span={10} style={styles.left}>
                    </Col>

                    <Col span={14} style={styles.right}>
                        <h1 style={styles.h}>Create Account</h1>

                        {!isSentOk ? formComponent : succesfullComponent}

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
        margin: "20px 0 50px 0",
        fontSize: "25pt",
        color: "#0f4085"
    },
    form: {
        margin: "20px 0 0 0",
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