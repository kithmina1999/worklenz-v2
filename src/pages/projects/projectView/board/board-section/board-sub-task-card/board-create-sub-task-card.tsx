import { Flex, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  addSubtask,
  GROUP_BY_PHASE_VALUE,
  GROUP_BY_PRIORITY_VALUE,
  GROUP_BY_STATUS_VALUE,
} from '@features/board/board-slice';
import { themeWiseColor } from '@/utils/themeWiseColor';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getCurrentGroup } from '@/features/tasks/tasks.slice';
import { useAuthService } from '@/hooks/useAuth';
import { ITaskCreateRequest } from '@/types/tasks/task-create-request.types';
import { useParams } from 'react-router-dom';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';

type BoardCreateSubtaskCardProps = {
  sectionId: string;
  parentTaskId: string;
  setShowNewSubtaskCard: (x: boolean) => void;
};

const BoardCreateSubtaskCard = ({
  sectionId,
  parentTaskId,
  setShowNewSubtaskCard,
}: BoardCreateSubtaskCardProps) => {
  const { socket, connected } = useSocket();
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [newSubtaskName, setNewSubtaskName] = useState<string>('');

  const cardRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation('kanban-board');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { projectId } = useParams();
  const currentSession = useAuthService().getCurrentSession();

  const dispatch = useAppDispatch();

  const createRequestBody = (): ITaskCreateRequest | null => {
    if (!projectId || !currentSession) return null;
    const body: ITaskCreateRequest = {
      project_id: projectId,
      name: newSubtaskName,
      reporter_id: currentSession.id,
      team_id: currentSession.team_id,
    };

    const groupBy = getCurrentGroup();
    if (groupBy.value === GROUP_BY_STATUS_VALUE) {
      body.status_id = sectionId || undefined;
    } else if (groupBy.value === GROUP_BY_PRIORITY_VALUE) {
      body.priority_id = sectionId || undefined;
    } else if (groupBy.value === GROUP_BY_PHASE_VALUE) {
      body.phase_id = sectionId || undefined;
    }

    if (parentTaskId) {
      body.parent_task_id = parentTaskId;
    }
    return body;
  };

  const handleAddSubtask = () => {
    if (creatingTask || !projectId || !currentSession || newSubtaskName.trim() === '' || !connected) return;

    try {
      setCreatingTask(true);
      const body = createRequestBody();
      if (!body) return;

      socket?.emit(SocketEvents.QUICK_TASK.toString(), JSON.stringify(body));
      socket?.once(SocketEvents.QUICK_TASK.toString(), (task: IProjectTask) => {
        setCreatingTask(false);
        console.log('task', task);
      });
    } catch (error) {
      console.error('Error adding task:', error);
      setCreatingTask(false);
    }
  };

  const handleCancelNewCard = (e: React.FocusEvent<HTMLDivElement>) => {
    if (cardRef.current && !cardRef.current.contains(e.relatedTarget)) {
      setNewSubtaskName('');
      setShowNewSubtaskCard(false);
    }
  };

  return (
    <Flex
      ref={cardRef}
      vertical
      gap={12}
      style={{
        width: '100%',
        padding: 12,
        backgroundColor: themeMode === 'dark' ? '#292929' : '#fafafa',
        borderRadius: 6,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      className={`outline-1 ${themeWiseColor('outline-[#edeae9]', 'outline-[#6a696a]', themeMode)} hover:outline`}
      onBlur={handleCancelNewCard}
    >
      <Input
        autoFocus
        value={newSubtaskName}
        onChange={e => setNewSubtaskName(e.target.value)}
        onPressEnter={handleAddSubtask}
        onBlur={newSubtaskName.length > 0 ? handleAddSubtask : () => null}
        placeholder={t('newSubtaskNamePlaceholder')}
        style={{
          width: '100%',
          borderRadius: 6,
          padding: 8,
        }}
      />
    </Flex>
  );
};

export default BoardCreateSubtaskCard;
function setCreatingTask(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function onNewTaskReceived(arg0: IAddNewTask) {
  throw new Error('Function not implemented.');
}

