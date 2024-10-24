import { Checkbox, Flex, Typography } from 'antd'
import SearchDropdown from './SearchDropdown'
import SortDropdown from './SortDropdown'
import LabelsDropdown from './LabelsDropdown'
import MembersDropdown from './MembersDropdown'
import GroupByDropdown from './GroupByDropdown'
import ShowFieldsDropdown from './ShowFieldsDropdown'
import PriorityFilterDropdown from './PriorityFilterDropdown'

const TaskListFilters = () => {
    return (
        <Flex gap={8} align="center" justify="space-between">
            <Flex gap={8}>
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
                <GroupByDropdown />
            </Flex>

            <Flex gap={12}>
                <Flex gap={4} align="center">
                    <Checkbox />
                    <Typography.Text>Show archvied</Typography.Text>
                </Flex>
                {/* show fields dropdown  */}
                <ShowFieldsDropdown />
            </Flex>
        </Flex>
    )
}

export default TaskListFilters
