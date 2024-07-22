import { Table, Tag, Avatar,Space } from "antd";
const CommonView = ()=>{
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
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
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
        <Table columns={columns} dataSource={data} />
    )
}
export default CommonView;