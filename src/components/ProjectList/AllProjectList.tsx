import { Avatar, Badge, Pagination, Progress, Rate, Space, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { formatDistanceToNow } from 'date-fns';
import './AllProjectList.css'

interface DataType {
  key: string;
  name: string;
  client: string;
  category: string;
  status: string;
  tasksProgress: number;
  lastUpdated: Date;
  members: string[];
}

const avatarColors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Rate count={1} style={{marginRight: '0.5rem'}} tooltips={['Add to favourites']}/>
            <Badge color="geekblue" style={{marginRight: '0.5rem'}}/>
            <a>{text}</a>
        </div> )
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Tasks Progress',
    key: 'tasksProgress',
    dataIndex: 'tasksProgress',
    render: count => (
        <Progress percent={count} />
    )
  },
  {
    title: 'Last Updated',
    key: 'lastUpdated',
    dataIndex: 'lastUpdated',
    render: (date: Date) => formatDistanceToNow(new Date(date), { addSuffix: true }),
  },
  {
    title: 'Members',
    key: 'members',
    dataIndex: 'members',
    render: (members: string[]) => (
      <Avatar.Group>
        {members.map((member, index) => (
          <Tooltip key={index} title={member}>
            <Avatar style={{ backgroundColor: avatarColors[index % avatarColors.length] }}>
              {member.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Worklenze UI rebuild',
    client: '-',
    category: '-',
    status: 'Proposed',
    tasksProgress: 12,
    lastUpdated: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
    members: ['Chathuranga Pathum', 'Chamika Jayasri', 'Raveesha Dilanka', 'Sachintha Prasad'],
  },
];

const AllProjectList: React.FC = () => {
  return (

        <Table columns={columns} dataSource={data} rowClassName={() => 'custom-row'}
        pagination={{
            showSizeChanger: true,
            defaultPageSize: 20,
          }}
        />

  );
};

export default AllProjectList;
