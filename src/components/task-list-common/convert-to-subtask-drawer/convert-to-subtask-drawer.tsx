import {
  Drawer,
  Tag,
  Typography,
  Flex,
  Table,
  Button,
  Tooltip,
} from 'antd/es';
import { TFunction } from 'i18next';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setConvertToSubtaskDrawerOpen } from '@/features/tasks/tasks.slice';
import { RightOutlined } from '@ant-design/icons';
import CustomSearchbar from '@/components/CustomSearchbar';

interface ConvertToSubtaskDrawerProps {
  t: TFunction;
}

const ConvertToSubtaskDrawer = ({ t }: ConvertToSubtaskDrawerProps) => {
  const dispatch = useAppDispatch();
  const { convertToSubtaskDrawerOpen, taskGroups } = useAppSelector(state => state.taskReducer);
  const selectedTask = useAppSelector(state => state.bulkActionReducer.selectedTasks[0]);
  const [searchText, setSearchText] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<boolean[]>([]);
  const [converting, setConverting] = useState(false);

  const toggleGroup = (index: number) => {
    const newExpanded = [...expandedGroups];
    newExpanded[index] = !newExpanded[index];
    setExpandedGroups(newExpanded);
  };

  const convertToSubTask = (groupId: string | undefined, taskId: string | undefined) => {
    console.log('groupId', groupId);
    console.log('taskId', taskId);
    if (!groupId || !taskId) return;
    setConverting(true);
    // Add your conversion logic here
    // After conversion:
    setConverting(false);
  };

  const filteredTasks = useMemo(
    () =>
      taskGroups.map(group => ({
        ...group,
        tasks: group.tasks.filter(task => task?.name?.toLowerCase().includes(searchText.toLowerCase()))
      })).filter(group => group.tasks.length > 0),
    [searchText, taskGroups]
  );

  return (
    <Drawer
      open={convertToSubtaskDrawerOpen}
      onClose={() => dispatch(setConvertToSubtaskDrawerOpen(false))}
      title={t('convertToSubtask')}
      width={700}
    >
      <Flex vertical gap={12}>
        <CustomSearchbar
          searchQuery={searchText}
          setSearchQuery={setSearchText}
          placeholderText={t('searchByNameInputPlaceholder')}
        />
      </Flex>
      {filteredTasks.map((item, index) => (
        <div key={item.id}>
          <Button
            key={`group-button-${item.id}`}
            className="w-full"
            style={{
              backgroundColor: item.color_code,
              border: 'none',
              borderBottomLeftRadius: expandedGroups[index] ? 0 : 4,
              borderBottomRightRadius: expandedGroups[index] ? 0 : 4,
              color: '#000',
              marginTop: 6,
              justifyContent: 'flex-start',
              width: 'auto',
            }}
            onClick={() => toggleGroup(index)}
          >
            <Flex key={`group-flex-${item.id}`} align="center" gap={8}>
              <RightOutlined rotate={expandedGroups[index] ? 90 : 0} />
              <Typography.Text strong>{item.name}</Typography.Text>
            </Flex>
          </Button>
          <div
            key={`group-content-${item.id}`}
            style={{
              borderLeft: `3px solid ${item.color_code}`,
              transition: 'all 0.3s ease-in-out',
              maxHeight: expandedGroups[index] ? '2000px' : '0',
              opacity: expandedGroups[index] ? 1 : 0,
              overflow: expandedGroups[index] ? 'visible' : 'hidden',
            }}
          >
            <Table
              key={`group-table-${item.id}`}
              size="small"
              columns={[
                {
                  title: '',
                  dataIndex: 'task_key',
                  key: 'task_key',
                  width: 100,
                  className: 'text-center',
                  render: (text: string) => <Tag key={`tag-${text}`}>{text}</Tag>,
                },
                {
                  title: 'Task',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => (
                    <Tooltip title={text}>
                      <Typography.Text
                        style={{
                          width: 520,
                        }}
                        ellipsis={{ tooltip: text }}
                      >
                        {text}
                      </Typography.Text>
                    </Tooltip>
                  ),
                },
              ]}
              dataSource={item.tasks}
              pagination={false}
              scroll={{ x: 'max-content' }}
              onRow={record => {    
                return {
                  onClick: () => convertToSubTask(item.id, record.id),
                  style: { height: 38, cursor: 'pointer' },
                  className: 'group even:bg-[#4e4e4e10]',
                };
              }}
            />
          </div>
        </div>
      ))}
    </Drawer>
  );
};

export default ConvertToSubtaskDrawer;
