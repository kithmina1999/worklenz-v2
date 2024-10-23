import React, { useState } from 'react'
import { Dropdown, Menu, Checkbox } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const AddMembersDropdown: React.FC = () => {
    const [checkedMembers, setCheckedMembers] = useState<string[]>([])

    const handleCheck = (member: string) => {
        setCheckedMembers((prevChecked) =>
            prevChecked.includes(member)
                ? prevChecked.filter((m) => m !== member)
                : [...prevChecked, member]
        )
    }

    const inviteItems = [
        {
            key: '1',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 1')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 1')}
                >
                    Invite Member 1
                </Checkbox>
            ),
        },
        {
            key: '2',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 2')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 2')}
                >
                    Invite Member 2
                </Checkbox>
            ),
        },
        {
            key: '3',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 3')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 3')}
                >
                    Invite Member 3
                </Checkbox>
            ),
        },
        {
            key: '4',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 3')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 3')}
                >
                    Invite Member 4
                </Checkbox>
            ),
        },
        {
            key: '5',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 3')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 3')}
                >
                    Invite Member 5
                </Checkbox>
            ),
        },
    ]

    return (
        <Dropdown
            menu={{ items: inviteItems }}
            trigger={['click']}
            overlayStyle={{
                zIndex: 1000,
                overflowY: 'auto',
                maxHeight: '352px',
                width: '300px',
            }}
        >
            <PlusOutlined />
        </Dropdown>
    )
}

export default AddMembersDropdown
