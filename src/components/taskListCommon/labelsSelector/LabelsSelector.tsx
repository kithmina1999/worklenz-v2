/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Flex,
  Input,
  InputRef,
  List,
  Typography,
} from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { colors } from '../../../styles/colors';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { ITaskLabel } from '../../../types/label.type';
import { toggleLabel } from '../../../features/tasks/taskSlice';
import { useTranslation } from 'react-i18next';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { updateTaskLabel } from '@/features/tasks/tasks.slice';
import { useAuthService } from '@/hooks/useAuth';
import { SocketEvents } from '@/shared/socket-events';
import { useSocket } from '@/socket/socketContext';
import { ILabelsChangeResponse } from '@/types/tasks/taskList.types';

interface LabelsSelectorProps {
  task: IProjectTask;
}

const LabelsSelector = ({ task }: LabelsSelectorProps) => {
  const { t } = useTranslation('task-list-table');
  const { socket, connected } = useSocket();
  const dispatch = useAppDispatch();
  
  const labelInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { labels } = useAppSelector(state => state.taskLabelsReducer);
  const [labelList, setLabelList] = useState<ITaskLabel[]>([]);

  const currentSession = useAuthService().getCurrentSession();

  const handleLabelsChange = (labels: ILabelsChangeResponse) => {
    dispatch(updateTaskLabel(labels));
  };

  const handleLabelChange = (label: ITaskLabel) => {
    const labelData = {
      task_id: task.id,
      label_id: label.id,
      parent_task: task.parent_task_id,
      team_id: currentSession?.team_id,
    };

    socket?.emit(SocketEvents.TASK_LABELS_CHANGE.toString(), JSON.stringify(labelData));
  };

  const handleCreateLabel = () => {
    const labelData = {
      task_id: task.id,
      label: searchQuery,
      parent_task: task.parent_task_id,
      team_id: currentSession?.team_id,
    };
  };

  useEffect(() => {
    setLabelList(labels);
  }, [labels, task.labels]);

  useEffect(() => {
    if (connected) {
      socket?.on(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
      socket?.on(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);
    }

    return () => {
      socket?.removeListener(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
      socket?.removeListener(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);
    };
  }, [connected]);

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
                className="custom-list-item"
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
                  onChange={() => task.id && dispatch(toggleLabel({ taskId: task.id, label }))}
                />

                <Flex gap={8}>
                  <Badge color={label.color_code} />
                  {label.name}
                </Flex>
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

        <Divider style={{ margin: 0 }} />

        <Button
          type="primary"
          style={{ alignSelf: 'flex-end' }}
          onClick={() => handleCreateLabel()}
        >
          {t('okButton')}
        </Button>
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
  );
};

export default LabelsSelector;
