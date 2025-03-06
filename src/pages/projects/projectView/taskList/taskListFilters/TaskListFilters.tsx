import React from 'react';
import Flex from 'antd/es/flex';
import Checkbox from 'antd/es/checkbox';
import Typography from 'antd/es/typography';

import { useTranslation } from 'react-i18next';
import { fetchLabels } from '@/features/taskAttributes/taskLabelSlice';
import { fetchPriorities } from '@/features/taskAttributes/taskPrioritySlice';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  fetchLabelsByProject,
  fetchTaskAssignees,
  toggleArchived,
} from '@/features/tasks/tasks.slice';
import { getTeamMembers } from '@/features/team-members/team-members.slice';
import useTabSearchParam from '@/hooks/useTabSearchParam';

const SearchDropdown = React.lazy(() => import('./SearchDropdown'));
const SortFilterDropdown = React.lazy(() => import('./SortFilterDropdown'));
const LabelsFilterDropdown = React.lazy(() => import('./LabelsFilterDropdown'));
const MembersFilterDropdown = React.lazy(() => import('./MembersFilterDropdown'));
const GroupByFilterDropdown = React.lazy(() => import('./GroupByFilterDropdown'));
const ShowFieldsFilterDropdown = React.lazy(() => import('./ShowFieldsFilterDropdown'));
const PriorityFilterDropdown = React.lazy(() => import('./PriorityFilterDropdown'));

interface TaskListFiltersProps {
  position: 'board' | 'list';
}

const TaskListFilters: React.FC<TaskListFiltersProps> = ({ position }) => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useAppDispatch();
  const { projectView } = useTabSearchParam();

  const priorities = useAppSelector(state => state.priorityReducer.priorities);

  const projectId = useAppSelector(state => state.projectReducer.projectId);
  const archived = useAppSelector(state => state.taskReducer.archived);

  const handleShowArchivedChange = () => {
    dispatch(toggleArchived());
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!priorities.length) {
        await dispatch(fetchPriorities());
      }
      if (projectId) {
        await dispatch(fetchLabelsByProject(projectId));
        await dispatch(fetchTaskAssignees(projectId));
      }
      dispatch(
        getTeamMembers({ index: 0, size: 100, field: null, order: null, search: null, all: true })
      );
    };

    fetchInitialData();
  }, [dispatch, priorities.length, projectId]);

  return (
    <Flex gap={8} align="center" justify="space-between">
      <Flex gap={8} wrap={'wrap'}>
        <SearchDropdown />
        {projectView === 'list' && <SortFilterDropdown />}
        <PriorityFilterDropdown priorities={priorities} />
        <LabelsFilterDropdown />
        <MembersFilterDropdown />
        <GroupByFilterDropdown />
      </Flex>

      {position === 'list' && (
        <Flex gap={12} wrap={'wrap'}>
          <Flex
            gap={4}
            align="center"
            style={{ cursor: 'pointer' }}
            onClick={handleShowArchivedChange}
          >
            <Checkbox checked={archived} />
            <Typography.Text>{t('showArchivedText')}</Typography.Text>
          </Flex>
          {/* show fields dropdown  */}
          <ShowFieldsFilterDropdown />
        </Flex>
      )}
    </Flex>
  );
};

export default TaskListFilters;
