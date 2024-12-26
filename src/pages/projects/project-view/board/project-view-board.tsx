import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TaskType } from '@/types/task.types';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import CommonStatusSection from '../../../../components/board/commonStatusSection/CommonStatusSection';
import { useMediaQuery } from 'react-responsive';
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice';
import CommonPrioritySection from '../../../../components/board/common-priority-section/common-priority-section';
import CommonPhaseSection from '../../../../components/board/common-phase-section/common-phase-section';
import CommonMembersSection from '../../../../components/board/common-members-section/common-members-section';

const ProjectViewBoard: React.FC = () => {
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );
  const setOfStatus = useAppSelector((state) => state.statusReducer.status);
  const setOfPriority = useAppSelector(
    (state) => state.priorityReducer.priority
  );
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: '(max-width: 1275px)' });
  const groupBy = useAppSelector(
    (state) => state.groupByFilterDropdownReducer.groupBy
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TaskListFilters position={'board'} />
      <div
        style={{
          width: '100%',
          padding: '0 12px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '14px',
        }}
      >
        <div
          style={{
            paddingTop: '6px',
            display: 'flex',
            justifyContent:
              setOfStatus.length > 3
                ? 'flex-start'
                : isTablet
                  ? 'flex-start'
                  : 'center',
            gap: '10px',
            overflowX: 'scroll',
            paddingBottom: '10px',
          }}
        >
          {groupBy === 'status' &&
            setOfStatus?.map((status) => {
              // Filter tasks based on the current status
              const filteredTasks = dataSource.filter(
                (task) => task.status === status.category
              );
              return (
                <CommonStatusSection
                  key={status.name}
                  status={status.name}
                  category={status.category}
                  id={status.id}
                  dataSource={filteredTasks}
                />
              );
            })}
          {groupBy === 'priority' &&
            setOfPriority?.map((priority) => {
              // Filter tasks based on the current status
              const filteredTasks = dataSource.filter(
                (task) => task.priority === priority.category
              );
              return (
                <CommonPrioritySection
                  key={priority.name}
                  status={priority.name}
                  category={priority.category}
                  id={priority.id}
                  dataSource={filteredTasks}
                />
              );
            })}

          {groupBy === 'phase' &&
            Array.from(new Set(dataSource.map((task) => task.phase))).map(
              (phase) => {
                const filteredTasks = dataSource.filter(
                  (task) => task.phase === phase
                );
                return (
                  <CommonPhaseSection
                    key={phase || 'Unmapped'}
                    status={phase || 'Unmapped'}
                    category={phase || 'unmapped'}
                    id={phase || 'Unmapped'}
                    dataSource={filteredTasks}
                  />
                );
              }
            )}

          {groupBy === 'members' &&
            Array.from(
              new Set(
                dataSource.flatMap((task) => {
                  if (task.members?.length === 0) {
                    return ['unassigned']; // No members, categorize as "Unassigned"
                  }
                  if (task.members && task.members.length > 1) {
                    // Combine all member names into a single category
                    return [
                      task.members
                        .map((member) => member.memberName)
                        .join(', '),
                    ];
                  }
                  return [task.members && task.members[0].memberName]; // Single member
                })
              )
            ).map((category) => {
              // Filter tasks based on the current category
              const filteredTasks = dataSource.filter((task) => {
                if (category === 'unassigned') {
                  return task.members?.length === 0; // Tasks with no members
                }
                if (task.members && task.members.length > 1) {
                  // Check if the category matches all member names
                  return (
                    category ===
                    task.members.map((member) => member.memberName).join(', ')
                  );
                }
                return task.members && category === task.members[0]?.memberName; // Single member
              });

              return (
                <CommonMembersSection
                  status={category || 'Unassigned'} // Pass the category name
                  key={category} // Unique key for the category
                  category={category || 'unassigned'} // Pass the category name
                  id={category || 'Unassigned'} // Pass the category name as id
                  dataSource={filteredTasks} // Pass the tasks for this category
                />
              );
            })}

          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(toggleDrawer())}
            style={{ flexShrink: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectViewBoard;
