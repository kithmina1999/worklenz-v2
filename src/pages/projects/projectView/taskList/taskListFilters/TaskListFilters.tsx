import { Checkbox, Flex, Typography } from 'antd';
import SearchDropdown from './SearchDropdown';
import SortFilterDropdown from './SortFilterDropdown';
import LabelsFilterDropdown from './LabelsFilterDropdown';
import MembersFilterDropdown from './MembersFilterDropdown';
import GroupByFilterDropdown from './GroupByFilterDropdown';
import ShowFieldsFilterDropdown from './ShowFieldsFilterDropdown';
import PriorityFilterDropdown from './PriorityFilterDropdown';

const TaskListFilters = () => {
  return (
    <Flex gap={8} align="center" justify="space-between">
      <Flex gap={8} wrap={'wrap'}>
        {/* search dropdown  */}
        <SearchDropdown />
        {/* sort dropdown  */}
        <SortFilterDropdown />
        {/* prioriy dropdown  */}
        <PriorityFilterDropdown />
        {/* labels dropdown  */}
        <LabelsFilterDropdown />
        {/* members dropdown  */}
        <MembersFilterDropdown />
        {/* group by dropdown */}
        <GroupByFilterDropdown />
      </Flex>

      <Flex gap={12} wrap={'wrap'}>
        <Flex gap={4} align="center">
          <Checkbox />
          <Typography.Text>Show archvied</Typography.Text>
        </Flex>
        {/* show fields dropdown  */}
        <ShowFieldsFilterDropdown />
      </Flex>
    </Flex>
  );
};

export default TaskListFilters;
