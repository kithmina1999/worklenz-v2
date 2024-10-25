import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Dropdown, Flex, List, Space } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { toggleColumnVisibility } from '../../../../../features/projects/singleProject/taskListColumns/taskColumnsSlice'

const ShowFieldsDropdown = () => {
    // get columns list without task name from projectViewTaskListColumn reducer
    const columns =
        useAppSelector(
            (state) => state.projectViewTaskListColumnsReducer.columnsList
        )?.filter((col) => col.title !== 'Task') || []

    const dispatch = useAppDispatch()

    // showFields dropdown items
    type ShowFieldsType = {
        key: string
        label: string
        hidden: boolean
    }

    const showFieldsList: ShowFieldsType[] = columns
        .filter((col) => col.key !== undefined)
        .map((col) => ({
            key: col.key as string,
            label: col.title as string,
            hidden: col.hidden as boolean,
        }))

    // custom dropdown content
    const showFieldsDropdownContent = (
        <Card
            className="custom-card"
            style={{ height: 300, overflowY: 'scroll' }}
            styles={{ body: { padding: 0 } }}
        >
            <List style={{ padding: 0 }}>
                {showFieldsList.map((item) => (
                    <List.Item
                        className="custom-list-item"
                        key={item.key}
                        style={{
                            display: 'flex',
                            gap: 8,
                            padding: '4px 8px',
                            border: 'none',
                        }}
                    >
                        <Space>
                            <Checkbox
                                id={item.key}
                                checked={!item.hidden}
                                onClick={() =>
                                    dispatch(toggleColumnVisibility(item.key))
                                }
                            />
                            {item.label}
                        </Space>
                    </List.Item>
                ))}
            </List>
        </Card>
    )

    return (
        <Dropdown
            overlayClassName="custom-dropdown"
            trigger={['click']}
            dropdownRender={() => showFieldsDropdownContent}
        >
            <Flex align="center" gap={4}>
                <Button icon={<MoreOutlined />}>Show fields</Button>
            </Flex>
        </Dropdown>
    )
}

export default ShowFieldsDropdown
