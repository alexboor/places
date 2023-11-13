import { Form, Input } from "antd";
import React, { useEffect } from "react";

export const UserProfileModalNameForm = (props) => {
    const [form] = Form.useForm();

    useEffect(() => form.setFieldValue("name", props.user.name), [props, form])


    const onChange = (v) => {
        // console.log()
        props.setUser({
            ...props.user,
            name: v.name,
        })
    } 

    return (
        <Form onFinish={props.onFinish} onValuesChange={onChange} style={styles.form} form={form}>
            <Form.Item label="Input new name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

const styles = {
    form: {
        margin: "40px 0",
    }
}

