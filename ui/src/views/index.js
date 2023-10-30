import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MenuComponent from "../components/menu";

const { Header, Content, Footer } = Layout;

const IndexView = () => {
    return (
        <Layout className="layout">
            <Header style={{ display: "flex", alignItems: "center" }}>
                <h2 style={styles.logo}>Places</h2>
                <MenuComponent />
                <Avatar style={{backgroundColor: "#b0aeae"}} icon={<UserOutlined />}/>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            </Content>
            <Footer style={{textAlign: "center"}}>
            </Footer>
        </Layout>
    )
}

export default IndexView;

const styles = {
    logo: {
        color: "#eee",
        margin: "0 20px 0 0"
    }
}