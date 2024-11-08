import { Avatar, Button, Flex, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../../../styles/colors';
import { TableProps } from 'antd/lib';
import { simpleDateFormat } from '../../../../../../utils/simpleDateFormat';
import { mockTaskData, MockTaskType } from '../../mockData/mockTaskData';
import { getStatusColor } from '../../../../../../utils/getStatusColor';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import CustomAvatar from '../../../../../../components/CustomAvatar';
import { PlusOutlined } from '@ant-design/icons';

const OverLoggedTasksTable = () => {
  // get currently hover row
  const [hoverRow, setHoverRow] = useState<string | null>(null);

  // get theme details from theme reducer
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  // get status data from status slice
  const statusList = useAppSelector((state) => state.statusReducer.status);

  // filter over logged tasks from the mock task data
  const overLoggedTaskList = mockTaskData.filter((task) => task.loggedTime);

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: 'Name',
      render: (record: MockTaskType) => (
        <Typography.Text
          style={{
            color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
          }}
        >
          {record.task}
        </Typography.Text>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: MockTaskType) => (
        <Flex
          gap={4}
          style={{
            width: 'fit-content',
            borderRadius: 24,
            paddingInline: 6,
            backgroundColor: getStatusColor(
              statusList?.find((status) => status.name === record.status)
                ?.category || '',
              themeMode
            ),
            color: colors.darkGray,
            cursor: 'pointer',
          }}
        >
          <Typography.Text
            ellipsis={{ expanded: false }}
            style={{
              color: colors.darkGray,
              fontSize: 13,
            }}
          >
            {record.status}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'members',
      title: 'Members',
      render: (record: MockTaskType) =>
        record.members ? (
          <Avatar.Group>
            {record.members.map((member) => (
              <CustomAvatar avatarName={member.memberName} size={26} />
            ))}
          </Avatar.Group>
        ) : (
          <Button
            disabled
            type="dashed"
            shape="circle"
            size="small"
            icon={
              <PlusOutlined
                style={{
                  fontSize: 12,
                  width: 22,
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            }
          />
        ),
    },
    {
      key: 'overLoggedTime',
      title: 'Over Logged Time',
      render: (record: MockTaskType) => (
        <Typography.Text
          style={{
            color: hoverRow === record.taskId ? colors.skyBlue : 'inherit',
          }}
        >
          {record.loggedTime}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Table
      className="custom-two-colors-row-table"
      dataSource={overLoggedTaskList}
      columns={columns}
      rowKey={(record) => record.taskId}
      pagination={{
        showSizeChanger: false,
        defaultPageSize: 10,
      }}
      onRow={(record) => {
        return {
          onMouseEnter: () => setHoverRow(record.taskId),
          onMouseLeave: () => setHoverRow(null),
          style: {
            cursor: 'pointer',
            height: 36,
          },
        };
      }}
    />
  );
};

export default OverLoggedTasksTable;
