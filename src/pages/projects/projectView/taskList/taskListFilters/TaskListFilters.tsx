import { Checkbox, Flex, Typography } from 'antd';
import SearchDropdown from './SearchDropdown';
import SortDropdown from './SortDropdown';
import LabelsDropdown from './LabelsDropdown';
import MembersDropdown from './MembersDropdown';
import GroupByDropdown from './GroupByDropdown';
import ShowFieldsDropdown from './ShowFieldsDropdown';
import PriorityFilterDropdown from './PriorityFilterDropdown';

interface TaskListFiltersProps {
  position: 'board' | 'list';
}

const TaskListFilters: React.FC<TaskListFiltersProps> = ({position}) => {
  return (
    <Flex gap={8} align="center" justify="space-between">
      <Flex gap={8} wrap={'wrap'}>
        {/* search dropdown  */}
        <SearchDropdown />
        {/* sort dropdown  */}
        <SortDropdown />
        {/* prioriy dropdown  */}
        <PriorityFilterDropdown />
        {/* labels dropdown  */}
        <LabelsDropdown />
        {/* members dropdown  */}
        <MembersDropdown />
        {/* group by dropdown */}
        {position === 'list' && <GroupByDropdown />}
      </Flex>

      {position === 'list' && 
      <Flex gap={12} wrap={'wrap'}>
        <Flex gap={4} align="center">
          <Checkbox />
          <Typography.Text>Show archvied</Typography.Text>
        </Flex>
        {/* show fields dropdown  */}
        <ShowFieldsDropdown />
      </Flex>
      }
    </Flex>
  );
};

export default TaskListFilters;
