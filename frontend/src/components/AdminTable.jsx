
import { Table, Tag, Avatar,Space, FloatButton, Modal, } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined,LogoutOutlined} from "@ant-design/icons";
import React, { useState } from "react";
const AdminTable  = ()=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const columns = [
        {
            title: '#',
            key: 'rank',
            dataIndex: 'rank',
            render: (rank) => (
              <>
                {
                    rank ===1?
                    <Tag color={'green'} key={rank}>
                      1st
                    </Tag>:
                    <Tag color={'blue'} key={rank}>{rank}</Tag>

                }
              </>
            ),
          },
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <Avatar src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" />,
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Quiz 1 (50%)',
          dataIndex: 'quiz1',
          key: 'quiz1',
        },
        {
          title: 'Quiz 2 (50%)',
          dataIndex: 'quiz2',
          key: 'quiz2',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle" style={{'cursor':'pointer'}}>
              <EditOutlined/>
              <DeleteOutlined/>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          rank: 1
        },
        {
            key: '2',
            name: 'John Brown2',
            rank: 2
          },
      ];
    return(
      <>

        <Table columns={columns} dataSource={data} />
        <FloatButton
          icon={<PlusOutlined onclick={()=>{
            setIsModalOpen(!isModalOpen)
          }}/>}
          type="primary"
          style={{right:94}}
        />
        <FloatButton
          icon={<LogoutOutlined />}
          type="default"
          style={{right:14,backgroundColor:'red'}}
          onClick={()=>{
            localStorage.removeItem('token')
            window.location.reload()
          }}
        />
        <Modal>
          
        </Modal>
      </>
    )
}
export default AdminTable;