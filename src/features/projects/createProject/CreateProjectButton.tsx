import { Dropdown } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from '../projectSlice'
import { DownOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons'

const CreateProjectButton = () => {
    const dispatch = useAppDispatch()

    const items = [
        {
            key: '1',
            label: (
                <div>
                    <ImportOutlined /> Import from template
                </div>
            ),
        },
    ]

    return (
        <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            onClick={() => dispatch(toggleDrawer())}
            menu={{ items }}
        >
            <EditOutlined /> Create Project
        </Dropdown.Button>
    )
}

export default CreateProjectButton
