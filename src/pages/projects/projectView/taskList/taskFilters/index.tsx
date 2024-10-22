import { MoreOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, Flex, Typography } from 'antd'
import SearchDropdown from './SearchDropdown'
import SortDropdown from './SortDropdown'
import PriorityDropdown from './PriorityDropdown'
import LabelsDropdown from './LabelsDropdown'
import MembersDropdown from './MembersDropdown'
import GroupByDropdown from './GroupByDropdown'

const TaskListFilters = () => {
    return (
        <Flex gap={8} align="center" justify="space-between">
            <Flex gap={8}>
                {/* search dropdown  */}
                <SearchDropdown />
                {/* sort dropdown  */}
                <SortDropdown />
                {/* prioriy dropdown  */}
                <PriorityDropdown />
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
                <Dropdown>
                    <Flex align="center" gap={4}>
                        <Button icon={<MoreOutlined />}>Show fields</Button>
                    </Flex>
                </Dropdown>
            </Flex>
        </Flex>
    )
}

export default TaskListFilters
