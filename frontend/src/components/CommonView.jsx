import { Table, Tag, Avatar,Space, FloatButton, Modal,message, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { PrivateApi, PublicApi } from "../axiosInstance";

const CommonView = ()=>{
  const [records,setRecords] = useState([])
useEffect(()=>{
    PublicApi.get('record/').then((res)=>{
      setRecords(res.data)
    })
  },[])
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
  ];
      
    return(
        <>
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
        </ConfigProvider></>
    )
}
export default CommonView;