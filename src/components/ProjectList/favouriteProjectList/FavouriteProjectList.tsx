import { Avatar, Badge, Button, Progress, Rate, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import './FavouriteProjectList.css'
import { InboxOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface DataType {
    key: string;
    name: string;
    client: string;
    category: string;
    status: string;
    totalTasks: number;
    completedTasks: number;
    lastUpdated: Date;
    members: string[];
  }
  
  // Define avatar colors
  const avatarColors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];
  
  
  const FavouriteProjectList : React.FC = () => {

   const { t } = useTranslation('allProjectList');  // Use the hook inside the component

  const columns: ColumnsType<DataType> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Rate count={1} style={{ marginRight: '0.5rem' }} tooltips={['Add to favourites']} />
          <Badge color="geekblue" style={{ marginRight: '0.5rem' }} />
          <>{text}</>
        </div>
      )
    },
    {
      title: t('client'),  // Use t() for translation
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: t('category'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: t('status'),
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: t('tasksProgress'),
      key: 'tasksProgress',
      dataIndex: 'tasksProgress',
      render: (text, record) => {
        const { totalTasks, completedTasks } = record;
        const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        return <Tooltip title={`${completedTasks} / ${totalTasks} tasks completed.`}><Progress percent={percent} /></Tooltip>;
      }
    },
    {
      title: t('lastUpdated'),
      key: 'lastUpdated',
      dataIndex: 'lastUpdated',
      render: (date: Date) => {
        const now = new Date();
        const updatedDate = new Date(date);
    
        const timeDifference = now.getTime() - updatedDate.getTime();
        const minuteInMs = 60 * 1000;
        const hourInMs = 60 * minuteInMs;
        const dayInMs = 24 * hourInMs;
    
        let displayText = '';
        
        if (timeDifference < hourInMs) {
          const minutesAgo = Math.floor(timeDifference / minuteInMs);
          displayText = `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
        } else if (timeDifference < dayInMs) {
          const hoursAgo = Math.floor(timeDifference / hourInMs);
          displayText = `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
        } else if (timeDifference < 7 * dayInMs) {
          const daysAgo = Math.floor(timeDifference / dayInMs);
          displayText = `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
        } else {
          displayText = updatedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }
  
        return (
          <> 
            {displayText}
          </>
        );
      },
    },
    {
      title: t('members'),
      key: 'members',
      dataIndex: 'members',
      render: (members: string[]) => (
        <Avatar.Group>
          {members.map((member, index) => (
            <Tooltip key={index} title={member}>
              <Avatar style={{ backgroundColor: avatarColors[index % avatarColors.length], width: '28px', height: '28px', border: 'none' }}>
                {member.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: '',
      key: 'button',
      dataIndex: '',
      render: () => (
        <div>
          <Tooltip title={t('setting')}>
            <Button style={{ marginRight: '8px' }} size="small">
              <SettingOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={t('archive')}>
            <Button size="small">
              <InboxOutlined />
            </Button>
          </Tooltip>
        </div>
      )
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'Worklenze UI rebuild',
      client: '-',
      category: '-',
      status: 'Proposed',
      totalTasks: 10,
      completedTasks: 6,
      lastUpdated: new Date('2024-09-08T08:30:00'),
      members: ['Chathuranga Pathum', 'Chamika Jayasri', 'Raveesha Dilanka'],
    },
  ];
    return (
        <Table
          columns={columns}
          dataSource={data}
          className="custom-table"
          rowClassName={() => 'custom-row'}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 20,
          }}
        />
      );
};

export default FavouriteProjectList;
