import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Layout, Flex, } from "antd";
import { MenuComponent } from "./components/menu";
import { MenuUserButton } from "./components/menu_user_buttons"
import './App.css';
import {useMemo, useState} from "react";
import IndexView from "./views";
import SigninView from "./views/signin";
import SignupView from "./views/signup";

const { Header, Content, Footer } = Layout;

const parseToken = (t) => {
    let base64Url = t.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map( (c) =>
        ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))).join(''));

    return JSON.parse(jsonPayload);
}

const App = () => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [userEmail, setUserEmail] = useState(() => parseToken(token)["sub"])

    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: "/",
                element: <IndexView />,
            },
            {
                path: "/signin",
                element: <SigninView token={token} setToken={setToken} />,
            },
            {
                path: "/signup",
                element: <SignupView token={token} />,
            }
        ]);
    }, [token, setToken])


  return (
    <div className="App">
      <Layout className="layout" style={styles.layout}>
            <Header style={styles.header}>
                <a href="/"><h2 style={styles.logo}>Places</h2></a>
                <Flex justify="space-between" align="center" style={{width: "100%"}}>
                    <MenuComponent />
                </Flex>
                <MenuUserButton token={token} userEmail={userEmail} />
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

