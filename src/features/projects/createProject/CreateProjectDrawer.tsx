import {
    Badge,
    Button,
    DatePicker,
    Drawer,
    Dropdown,
    Flex,
    Form,
    Input,
    message,
    Select,
    Tag,
    Typography,
} from 'antd'
import React from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { createProject, toggleDrawer } from './createProjectSlice'
import {
    CheckCircleTwoTone,
    ClockCircleOutlined,
    ClockCircleTwoTone,
    CloseCircleTwoTone,
    PlusCircleOutlined,
    QuestionCircleOutlined,
    StopOutlined,
} from '@ant-design/icons'
import { colors } from '../../../styles/colors'
import { ProjectType } from '../../../types/project'

const CreateProjectDrawer = () => {
    const isDrawerOpen = useAppSelector(
        (state) => state.createProjectReducer.isDrawerOpen
    )
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    // function for handle form submit
    const handleFormSubmit = (values: any) => {
        const newProject: ProjectType = {
            name: values.name,
            isFavourite: false,
            color: values.color,
        }
        dispatch(createProject(newProject))
        message.success('project created!')
        form.resetFields()
        dispatch(toggleDrawer())
    }

    // status selection options
    const statusOptions = [
        {
            value: 'cancelled',
            label: (
                <Typography.Text>
                    <CloseCircleTwoTone twoToneColor={colors.vibrantOrange} />{' '}
                    Cancelled
                </Typography.Text>
            ),
        },
        {
            value: 'blocked',
            label: (
                <Typography.Text>
                    <StopOutlined /> Blocked
                </Typography.Text>
            ),
        },
        {
            value: 'onHold',
            label: (
                <Typography.Text>
                    <StopOutlined /> On Hold
                </Typography.Text>
            ),
        },
        {
            value: 'proposed',
            label: (
                <Typography.Text>
                    <ClockCircleOutlined /> Proposed
                </Typography.Text>
            ),
        },
        {
            value: 'inPlanning',
            label: (
                <Typography.Text>
                    <ClockCircleOutlined /> In Planning
                </Typography.Text>
            ),
        },
        {
            value: 'inProgress',
            label: (
                <Typography.Text>
                    <ClockCircleTwoTone twoToneColor={colors.limeGreen} /> In
                    Progress
                </Typography.Text>
            ),
        },
        {
            value: 'Completed',
            label: (
                <Typography.Text>
                    <CheckCircleTwoTone twoToneColor={colors.limeGreen} />{' '}
                    Completed
                </Typography.Text>
            ),
        },
        {
            value: 'continuos',
            label: (
                <Typography.Text>
                    <ClockCircleTwoTone twoToneColor={colors.limeGreen} />{' '}
                    Continuos
                </Typography.Text>
            ),
        },
    ]

    // health selection options
    const healthOptions = [
        {
            value: 'notSet',
            label: (
                <Typography.Text style={{ display: 'flex', gap: 4 }}>
                    <Badge color={colors.paleBlue} /> Not Set
                </Typography.Text>
            ),
        },
        {
            value: 'needAttention',
            label: (
                <Typography.Text style={{ display: 'flex', gap: 4 }}>
                    <Badge color={colors.lightBeige} />
                    Need Attention
                </Typography.Text>
            ),
        },
        {
            value: 'atRish',
            label: (
                <Typography.Text style={{ display: 'flex', gap: 4 }}>
                    <Badge color={colors.vibrantOrange} /> At Risk
                </Typography.Text>
            ),
        },
        {
            value: 'good',
            label: (
                <Typography.Text style={{ display: 'flex', gap: 4 }}>
                    <Badge color={colors.limeGreen} /> Good
                </Typography.Text>
            ),
        },
    ]

    const projectColors = [
        '#154c9b',
        '#3b7ad4',
        '#70a6f3',
        '#7781ca',
        '#9877ca',
        '#c178c9',
        '#ee87c5',
        '#ca7881',
        '#75c9c0',
        '#75c997',
        '#80ca79',
        '#aacb78',
        '#cbbc78',
        '#cb9878',
        '#bb774c',
    ]

    const items = [
        ...projectColors.map((color, index) => ({
            key: index,
            label: (
                <Tag
                    color={color}
                    style={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                    }}
                />
            ),
        })),
    ]

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    Create Project
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleDrawer())}
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a Name',
                        },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    layout="horizontal"
                    label="Project color"
                    name="color"
                    required
                >
                    <Dropdown
                        menu={{ items }}
                        overlayStyle={{
                            height: 200,
                            overflow: 'scroll',
                            borderRadius: 8,
                            boxShadow: `1px 1px 10px #5f5f5f1f`,
                        }}
                    >
                        <Tag
                            color="#154c9b"
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                            }}
                        />
                    </Dropdown>
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select defaultValue={'proposed'} options={statusOptions} />
                </Form.Item>
                <Form.Item label="Health" name="health">
                    <Select defaultValue={'notSet'} options={healthOptions} />
                </Form.Item>
                <Form.Item label="Categorey" name="categorey">
                    <Select
                        options={healthOptions}
                        placeholder="Add a category to the project"
                    />
                </Form.Item>
                <Form.Item label="Notes" name="notes">
                    <Input.TextArea placeholder="Notes" />
                </Form.Item>
                <Form.Item
                    label={
                        <Typography.Text>
                            Client <QuestionCircleOutlined />
                        </Typography.Text>
                    }
                    name="client"
                >
                    <Input placeholder="Select client" />
                </Form.Item>
                <Form.Item
                    label="Project Manager"
                    name="projectManager"
                    layout="horizontal"
                >
                    <Button
                        type="dashed"
                        shape="circle"
                        icon={<PlusCircleOutlined />}
                    />
                </Form.Item>
                <Form.Item name="date" layout="horizontal">
                    <Flex gap={8}>
                        <Form.Item name="startDate" label="Start Date">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="endDate" label="End Date">
                            <DatePicker />
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item label="Estimate working days" name="estWorkingDays">
                    <Input type="number" defaultValue="0" />
                </Form.Item>
                <Form.Item label="Estimate man days" name="estManDays">
                    <Input type="number" defaultValue="0" />
                </Form.Item>
                <Form.Item label="Hours per day" name="hrsPerDay">
                    <Input type="number" defaultValue="8" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        htmlType="submit"
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default CreateProjectDrawer
