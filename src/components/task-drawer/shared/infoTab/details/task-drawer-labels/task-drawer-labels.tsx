import { PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Form,
  Input,
  InputRef,
  List,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { ITaskLabel } from '@/types/label.type';
import { useAuthService } from '@/hooks/useAuth';
import { SocketEvents } from '@/shared/socket-events';
import { useSocket } from '@/socket/socketContext';
import { ITaskViewModel } from '@/types/tasks/task.types';
import { ALPHA_CHANNEL } from '@/shared/constants';
import { TFunction } from 'i18next';

interface TaskDrawerLabelsProps {
  task: ITaskViewModel;
  t: TFunction;
}

const TaskDrawerLabels = ({ task, t }: TaskDrawerLabelsProps) => {
  const { socket } = useSocket();

  const labelInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { labels } = useAppSelector(state => state.taskLabelsReducer);
  const [labelList, setLabelList] = useState<ITaskLabel[]>([]);

  const currentSession = useAuthService().getCurrentSession();
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const handleLabelChange = (label: ITaskLabel) => {
    try {
      const labelData = {
        task_id: task.id,
        label_id: label.id,
        parent_task: task.parent_task_id,
        team_id: currentSession?.team_id,
      };
      socket?.emit(SocketEvents.TASK_LABELS_CHANGE.toString(), JSON.stringify(labelData));
    } catch (error) {
      console.error('Error changing label:', error);
    }
  };

  const handleCreateLabel = () => {
    if (!searchQuery.trim()) return;
    const labelData = {
      task_id: task.id,
      label: searchQuery.trim(),
      parent_task: task.parent_task_id,
      team_id: currentSession?.team_id,
    };
    socket?.emit(SocketEvents.CREATE_LABEL.toString(), JSON.stringify(labelData));
  };

  useEffect(() => {
    setLabelList(labels as ITaskLabel[]);
  }, [labels, task?.labels]);

  // used useMemo hook for re render the list when searching
  const filteredLabelData = useMemo(() => {
    return labelList.filter(label => label.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [labelList, searchQuery]);

  const labelDropdownContent = (
    <Card
      className="custom-card"
      styles={{ body: { padding: 8, overflow: 'hidden', overflowY: 'auto', maxHeight: '255px' } }}
    >
      <Flex vertical gap={8}>
        <Input
          ref={labelInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
          placeholder={t('labelInputPlaceholder')}
          onKeyDown={e => {
            const isLabel = filteredLabelData.findIndex(
              label => label.name?.toLowerCase() === searchQuery.toLowerCase()
            );
            if (isLabel === -1) {
              if (e.key === 'Enter') {
                handleCreateLabel();
              }
            }
          }}
        />

        <List style={{ padding: 0, maxHeight: 300, overflow: 'scroll' }}>
          {filteredLabelData.length ? (
            filteredLabelData.map(label => (
              <List.Item
                className={themeMode === 'dark' ? 'custom-list-item dark' : 'custom-list-item'}
                key={label.id}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 8,
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={label.id}
                  checked={
                    task?.labels
                      ? task?.labels.some(existingLabel => existingLabel.id === label.id)
                      : false
                  }
                  onChange={() => handleLabelChange(label)}
                >
                  <Flex gap={8}>
                    <Badge color={label.color_code} />
                    {label.name}
                  </Flex>
                </Checkbox>
              </List.Item>
            ))
          ) : (
            <Typography.Text
              style={{ color: colors.lightGray }}
              onClick={() => handleCreateLabel()}
            >
              {t('labelsSelectorInputTip')}
            </Typography.Text>
          )}
        </List>
      </Flex>
    </Card>
  );

  // function to focus label input
  const handleLabelDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Form.Item name="labels" label={t('details.labels')}>
      <Flex gap={8}>
        {task?.labels?.map((label, index) => (
          <Tag
            key={label.id}
            color={label.color_code + ALPHA_CHANNEL}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              height: 18,
              fontSize: 11,
            }}
          >
            {label.name}
          </Tag>
        ))}
        <Dropdown
          trigger={['click']}
          dropdownRender={() => labelDropdownContent}
          onOpenChange={handleLabelDropdownOpen}
        >
          <Button
            type="dashed"
            icon={<PlusOutlined style={{ fontSize: 11 }} />}
            style={{ height: 18 }}
            size="small"
          />
        </Dropdown>
      </Flex>
    </Form.Item>
  );
};

export default TaskDrawerLabels;
