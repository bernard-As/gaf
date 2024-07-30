
import { Table, Tag, Avatar,Space, FloatButton, Modal,message, ConfigProvider } from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined,LogoutOutlined} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Add from "./Add";
import { PrivateApi, PublicApi } from "../axiosInstance";
import Edit from "./Edit";
const AdminTable  = ({f})=>{
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [fun,setFun] = useState(true)
  const [currEdit,setcurrEdit] = useState(0)
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [records,setRecords] = useState([])
  useEffect(()=>{
    PublicApi.get('record/').then((res)=>{
      setRecords(res.data)
    })
  },[isModalOpen,fun,isModalEditOpen])
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
                      1
                    </Tag>:
                    <Tag color={'blue'} key={rank}>{rank}</Tag>

                }
              </>
            ),
          },
          {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: (img) => <Avatar src={img} />,
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
          title: 'Total (100%)',
          dataIndex: 'total',
          key: 'total',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle" style={{'cursor':'pointer'}}>
              <EditOutlined
              onClick={()=>{
                setcurrEdit(record.key)
                setIsModalEditOpen(true)

              }}
              />
              <DeleteOutlined 
                onClick={()=>{
                  PrivateApi.delete('record/'+record.key+'/').then((res)=>{
                    if(res.status===204){messageApi.success('Record deleted successfully')
                      setFun(!fun)
                    }else{
                      messageApi.error('Record not deleted')
                    }
                  })
                }}
              />
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
        {contextHolder}
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg:'rgba(42, 131, 183, 0.856)'
              },
            },
          }}
        >
        <Table columns={columns} dataSource={records} bordered/>
        </ConfigProvider>
        <FloatButton
          icon={<PlusOutlined onClick={()=>{
            setIsModalOpen(!isModalOpen)
          }}/>}
          type="primary"
          style={{right:94}}
          onClick={()=>setIsModalOpen(!isModalOpen)}
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
        <Modal
          title="Add a reccord"
          open={isModalOpen}
          // onOk={}
          onOk={handleOk}
          onCancel={()=>setIsModalOpen(false)}
          okText={'Add'}
        >
          <Add f={f}/>
        </Modal>
        <Modal
          title="Edit a reccord"
          open={isModalEditOpen}
          // onOk={}
          onOk={handleOk}
          onCancel={()=>setIsModalEditOpen(false)}
          okText={'Cancel'}
        >
          <Edit f={f} id={currEdit}/>
        </Modal>
      </>
    )
}
export default AdminTable;