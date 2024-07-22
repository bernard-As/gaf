import './App.css';
import React, {useState} from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { GrUserAdmin } from "react-icons/gr";
import { RiParentLine } from "react-icons/ri";
import Admin from './components/Admin';
import CommonView from './components/CommonView';
const { Header, Content, Footer, Sider } = Layout;
// const items = [RiParentLine, GrUserAdmin].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
//   }),
// );

const items = [
  {
    key: '1',
    icon: React.createElement(RiParentLine),
    label: 'Parents',
  },
  {
    key: '2',
    icon: React.createElement(GrUserAdmin),
    label: 'Rectorat',
  }
]
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  }
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={onClick}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
         <center> <h1>{
          current === '2' ? 
          'GAF-Admin':
          'GAF-Pupils-Grades'
        } </h1></center>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: '83vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {
              current ==='2'?<Admin/>
              :<CommonView/>
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          GAF ©{new Date().getFullYear()} Powered by GAF Media group
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;