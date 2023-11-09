import { Form, Input } from "antd";
import React, { useEffect } from "react";

export const UserProfileModalNameForm = (props) => {
    const [form] = Form.useForm();


    const onChange = (v) => props.setName(v.name)

    return (
        <Form onFinish={props.onFinish} onValuesChange={onChange} >
            <Form.Item label="Input new name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

