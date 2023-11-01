import {RouterProvider} from "react-router-dom"
import { Layout, Flex, } from "antd";
import { MenuComponent } from "./components/menu";
import { router } from "./routes";
import { MenuUserButton } from "./components/menu_user_buttons"
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout className="layout" style={styles.layout}>
            <Header style={styles.header}>
                <a href="/"><h2 style={styles.logo}>Places</h2></a>
                <Flex justify="space-between" align="center" style={{width: "100%"}}>
                    <MenuComponent />
                </Flex>
                <MenuUserButton />
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
  layout: {
    height: "100%",
  },
  header: {
      display: "flex", 
      alignItems: "center", 
      width: "100%"
  },
  logo: {
      color: "#eee",
      margin: "0 20px 7px 0"
  },
}

export default App;

