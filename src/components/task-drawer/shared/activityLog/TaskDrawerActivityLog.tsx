import { Timeline, Typography, Flex, ConfigProvider, Tag } from 'antd';
import { useEffect, useState } from 'react';
import {
  IActivityLog,
  IActivityLogAttributeTypes,
  IActivityLogsResponse,
} from '@/types/tasks/task-activity-logs-get-request';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { taskActivityLogsApiService } from '@/api/tasks/task-activity-logs.api.service';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ArrowRightOutlined } from '@ant-design/icons';

const TaskDrawerActivityLog = () => {
  const [activityLogs, setActivityLogs] = useState<IActivityLogsResponse>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedTaskId } = useAppSelector(state => state.taskReducer);

  const fetchActivityLogs = async () => {
    if (!selectedTaskId) return;
    setLoading(true);
    try {
      const res = await taskActivityLogsApiService.getActivityLogsByTaskId(selectedTaskId);
      if (res.done) {
        setActivityLogs(res.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderAttributeType = (activity: IActivityLog) => {
    switch (activity.attribute_type) {
      case IActivityLogAttributeTypes.ASSIGNEES:
        return (
          <Flex gap={4} align="center">
            <SingleAvatar
              avatarUrl={activity.assigned_user?.avatar_url}
              name={activity.assigned_user?.name}
            />
            <Typography.Text>{activity.assigned_user?.name}</Typography.Text>
            <ArrowRightOutlined />
            <Tag color={'default'}>{activity.attribute_type}</Tag>
          </Flex>
        );

      case IActivityLogAttributeTypes.LABEL:
        return <Typography.Text strong>{activity.attribute_type}</Typography.Text>;

      case IActivityLogAttributeTypes.PHASE:
        return <Typography.Text strong>{activity.attribute_type}</Typography.Text>;

      default:
        return null;
    }
  };

  useEffect(() => {
    !loading && fetchActivityLogs();
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Timeline: { itemPaddingBottom: 32, dotBorderWidth: '1.5px' },
        },
      }}
    >
      <Timeline style={{ marginBlockStart: 24 }}>
        {activityLogs.logs?.map((activity, index) => (
          <Timeline.Item key={index}>
            <Flex gap={8} align="center">
              <SingleAvatar
                avatarUrl={activity.done_by?.avatar_url}
                name={activity.done_by?.name}
              />
              <Flex vertical gap={4}>
                <Flex gap={4} align="center">
                  <Typography.Text strong>{activity.done_by?.name}</Typography.Text>
                  <Typography.Text>{activity.log_text}</Typography.Text>
                  <Typography.Text strong>{activity.attribute_type}.</Typography.Text>
                </Flex>
                {renderAttributeType(activity)}
              </Flex>
            </Flex>
          </Timeline.Item>
        ))}
      </Timeline>
    </ConfigProvider>
  );
};

export default TaskDrawerActivityLog;
