import {RouterProvider} from "react-router-dom"
import { Layout, Avatar, Flex, } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MenuComponent from "./components/menu";
import { router } from "./routes"
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout className="layout">
            <Header style={styles.header}>
                <h2 style={styles.logo}>Places</h2>  
                <Flex justify="space-between" align="center" style={{width: "100%"}}>
                    <MenuComponent />
                    <Avatar style={styles.avatar} icon={<UserOutlined />}/>
                </Flex>
            </Header>

            <Content style={{ padding: '0 50px' }}>
                <RouterProvider router={router} />
            </Content>

            <Footer style={{textAlign: "center"}}>
            </Footer>
        </Layout>
    </div>
  );
}

const styles = {
  header: {
      display: "flex", 
      alignItems: "center", 
      width: "100%"
  },
  logo: {
      color: "#eee",
      margin: "0 20px 0 0"
  },
  avatar: {
      backgroundColor: "#b0aeae", 
      flex: "center"
  }
}

export default App;

