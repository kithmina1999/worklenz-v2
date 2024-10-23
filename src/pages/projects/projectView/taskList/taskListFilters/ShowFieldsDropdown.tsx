import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Dropdown, Flex, List, Space } from 'antd'
import React from 'react'

const ShowFieldsDropdown = () => {
    // showFields dropdown items
    type ShowFieldsType = {
        key: string
        label: string
    }

    const showFieldsList: ShowFieldsType[] = [
        { key: 'key', label: 'Key' },
        { key: 'description', label: 'Description' },
        { key: 'progress', label: 'Progress' },
        { key: 'members', label: 'Members' },
        { key: 'labels', label: 'Labels' },
        { key: 'status', label: 'Status' },
        { key: 'priority', label: 'Priority' },
        { key: 'timeTracking', label: 'Time Tracking' },
        { key: 'estimation', label: 'Estimation' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'completedDate', label: 'Completed Date' },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'lastUpdated', label: 'Last Updated' },
        { key: 'reporter', label: 'Reporter' },
        { key: 'phase', label: 'Phase' },
    ]

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
                            <Checkbox id={item.key} />
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
