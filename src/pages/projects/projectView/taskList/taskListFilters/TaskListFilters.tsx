import { Checkbox, Flex, Typography } from 'antd';
import SearchDropdown from './SearchDropdown';
import SortFilterDropdown from './SortFilterDropdown';
import LabelsFilterDropdown from './LabelsFilterDropdown';
import MembersFilterDropdown from './MembersFilterDropdown';
import GroupByFilterDropdown from './GroupByFilterDropdown';
import ShowFieldsFilterDropdown from './ShowFieldsFilterDropdown';
import PriorityFilterDropdown from './PriorityFilterDropdown';
import { useTranslation } from 'react-i18next';
import { fetchLabels } from '@/features/taskAttributes/taskLabelSlice';
import { fetchPriorities } from '@/features/taskAttributes/taskPrioritySlice';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskAssignees, toggleArchived } from '@/features/tasks/tasks.slice';
import { getTeamMembers } from '@/features/team-members/team-members.slice';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface TaskListFiltersProps {
  position: 'board' | 'list';
}

const TaskListFilters: React.FC<TaskListFiltersProps> = ({ position }) => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useAppDispatch();
  // Selectors
  const priorities = useAppSelector(state => state.priorityReducer.priorities);
  
  const labels = useAppSelector(state => state.taskLabelsReducer.labels);
  const taskAssignees = useAppSelector(state => state.taskReducer.taskAssignees);
  const projectId = useAppSelector(state => state.projectReducer.projectId);
  const archived = useAppSelector(state => state.taskReducer.archived);
  
  const handleShowArchivedChange = () => {
    dispatch(toggleArchived());
  }

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!priorities.length) {
        await dispatch(fetchPriorities());
      }
      if (!labels.length) {
        await dispatch(fetchLabels());
      }
      if (!taskAssignees?.length && projectId) {
        await dispatch(fetchTaskAssignees(projectId));
      }
      dispatch(getTeamMembers({ index: 0, size: 100, field: null, order: null, search: null, all: true }));
    };

    fetchInitialData();
  }, [dispatch, priorities.length, labels.length, projectId]);

  return (
    <Flex gap={8} align="center" justify="space-between">
      <Flex gap={8} wrap={'wrap'}>
        {/* search dropdown  */}
        <SearchDropdown />
        {/* sort dropdown  */}
        <SortFilterDropdown />
        {/* prioriy dropdown  */}
        <PriorityFilterDropdown priorities={priorities} />
        {/* labels dropdown  */}
        <LabelsFilterDropdown labels={labels} />
        {/* members dropdown  */}
        <MembersFilterDropdown members={taskAssignees || []} />
        {/* group by dropdown */}
        <GroupByFilterDropdown />
      </Flex>

      {position === 'list' && (
        <Flex gap={12} wrap={'wrap'}>
          <Flex gap={4} align="center" style={{cursor: 'pointer'}} onClick={handleShowArchivedChange}>
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
