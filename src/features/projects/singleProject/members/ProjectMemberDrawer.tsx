import { Avatar, Drawer, Flex, Form, message, Select, Typography } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { toggleDrawer } from './projectMembersSlice'
import { avatarNamesMap } from '../../../../shared/constants'
import { colors } from '../../../../styles/colors'

const ProjectMemberDrawer = () => {
    // get member list from members slice where which is updated with navbar invite button
    const membersList = useAppSelector(
        (state) => state.memberReducer.membersList
    )

    // get drawer state from project member reducer
    const isDrawerOpen = useAppSelector(
        (state) => state.projectMemberReducer.isDrawerOpen
    )

    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    console.log(membersList)

    const onChange = (value: string) => {
        console.log(`selected ${value}`)
    }

    const onSearch = (value: string) => {
        console.log('search:', value)
    }

    // this function for handle form submit
    const handleFormSubmit = async (values: any) => {
        // try {
        //     const newClient: ClientType = {
        //         clientId: nanoid(),
        //         clientName: values.name,
        //         project: null,
        //     }
        //     dispatch(addClient(newClient))
        //     dispatch(toggleProjectMemberDrawer())
        //     form.resetFields()
        //     message.success(t('createClientSuccessMessage'))
        // } catch (error) {
        //     message.error(t('createClientErrorMessage'))
        // }
    }

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    Project Members
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleDrawer())}
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    name="memberName"
                    label="Add members by adding their name or email"
                >
                    <Select
                        showSearch
                        onSearch={onSearch}
                        onChange={onChange}
                        options={membersList.map((member) => ({
                            key: member.memberId,
                            value: member.memberName,
                            label: (
                                <Flex gap={8} align="center">
                                    <Avatar
                                        style={{
                                            backgroundColor:
                                                avatarNamesMap[
                                                    member.memberName[0]?.toUpperCase()
                                                ],
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        {member.memberName[0]?.toUpperCase()}
                                    </Avatar>
                                    <Flex vertical>
                                        <Typography.Text
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {member.memberName}
                                        </Typography.Text>

                                        <Typography.Text
                                            style={{
                                                fontSize: 14,
                                                color: colors.lightGray,
                                            }}
                                        >
                                            {member?.memberEmail}
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            ),
                        }))}
                        suffixIcon={false}
                    />
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default ProjectMemberDrawer
