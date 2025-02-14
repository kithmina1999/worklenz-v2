import { Button, Flex } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks/useAppSelector';
import { themeWiseColor } from '@/utils/themeWiseColor';
import BoardSectionCardHeader from './board-section-card-header';
import { PlusOutlined } from '@ant-design/icons';
import BoardViewTaskCard from '../board-task-card/board-view-task-card';
import BoardViewCreateTaskCard from '../board-task-card/board-view-create-task-card';
import { ITaskListGroup } from '@/types/tasks/taskList.types';

interface IBoardSectionCardProps {  
  taskGroup: ITaskListGroup;
}

const BoardSectionCard = ({ taskGroup }: IBoardSectionCardProps) => {
  const [name, setName] = useState<string>(taskGroup.name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [showNewCardTop, setShowNewCardTop] = useState<boolean>(false);
  const [showNewCardBottom, setShowNewCardBottom] = useState<boolean>(false);

  const { t } = useTranslation('kanban-board');

  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  const scrollContainerRef = useRef<any>(null);

  useEffect(() => {
    if (showNewCardBottom && scrollContainerRef.current) {
      const timeout = setTimeout(() => {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [taskGroup.tasks, showNewCardBottom]);

  return (
    <Flex
      vertical
      gap={16}
      style={{
        minWidth: 375,
        outline: isHover
          ? `1px solid ${themeWiseColor('#edeae9', '#ffffff12', themeMode)}`
          : 'none',
        padding: 8,
        borderRadius: 12,
      }}
      className="h-[600px] max-h-[600px] overflow-y-scroll"
    >
      <BoardSectionCardHeader
        id={taskGroup.id}
        name={name}
        tasksCount={taskGroup?.tasks.length}
        isLoading={isLoading}
        setName={setName}
        colorCode={themeWiseColor(
          taskGroup?.color_code,
          taskGroup?.color_code_dark,
          themeMode
        )}
        onHoverChange={setIsHover}
        setShowNewCard={setShowNewCardTop}
      />

      <Flex
        vertical
        gap={16}
        ref={scrollContainerRef}
        style={{
          borderRadius: 6,
          height: taskGroup?.tasks.length <= 0 ? 600 : 'auto',
          maxHeight: taskGroup?.tasks.length <= 0 ? 600 : 'auto',
          overflowY: 'scroll',
          padding: taskGroup?.tasks.length <= 0 ? 8 : 1,
          background:
            taskGroup?.tasks.length <= 0 &&
            !showNewCardTop &&
            !showNewCardBottom
              ? themeWiseColor(
                  'linear-gradient( 180deg, #fafafa, rgba(245, 243, 243, 0))',
                  'linear-gradient( 180deg, #2a2b2d, rgba(42, 43, 45, 0))',
                  themeMode
                )
              : 'transparent',
        }}
      >
        <Flex vertical gap={16} align="center">
          {showNewCardTop && (
            <BoardViewCreateTaskCard
              position="top"
              sectionId={taskGroup.id}
              setShowNewCard={setShowNewCardTop}
            />
          )}

          {taskGroup.tasks.map((task: any) => (
            <BoardViewTaskCard sectionId={taskGroup.id} task={task}  />
          ))}

          {showNewCardBottom && (
            <BoardViewCreateTaskCard
              position="bottom"
              sectionId={taskGroup.id}
              setShowNewCard={setShowNewCardBottom}
            />
          )}
        </Flex>

        <Button
          type="text"
          style={{
            height: '38px',
            width: '100%',
            borderRadius: 6,
            boxShadow: 'none',
          }}
          icon={<PlusOutlined />}
          onClick={() => setShowNewCardBottom(true)}
        >
          {t('addTask')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default BoardSectionCard;
