import {
    Avatar,
    Button,
    Drawer,
    Flex,
    Form,
    message,
    Select,
    Typography,
} from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleUpdateMemberDrawer, updateMember } from './memberSlice'
import { colors } from '../../../styles/colors'
import { MemberType } from '../../../types/member'
import { avatarNamesMap } from '../../../shared/constants'

type UpdateMemberDrawerProps = {
    selectedMemberId: string | null
}

const UpdateMemberDrawer = ({ selectedMemberId }: UpdateMemberDrawerProps) => {
    // get job titles from redux - job reducer
    const jobsList = useAppSelector((state) => state.jobReducer.jobsList)

    const [form] = Form.useForm()

    // get all members lists from redux - add member reducer
    const owner = useAppSelector((state) => state.memberReducer.owner)
    const membersList = useAppSelector(
        (state) => state.memberReducer.membersList
    )

    // all members
    const allMembersList: MemberType[] = useMemo(
        () => [owner, ...membersList],
        [owner, membersList]
    )

    const isDrawerOpen = useAppSelector(
        (state) => state.memberReducer.isUpdateMemberDrawerOpen
    )
    const dispatch = useAppDispatch()

    // get currently selected member
    const selectedMember = allMembersList.find(
        (member) => member.memberId === selectedMemberId
    )

    useEffect(() => {
        if (selectedMember) {
            form.setFieldsValue({
                jobTitle: selectedMember?.jobTitle,
                access: selectedMember.memberRole,
            })
        }
    }, [form, selectedMember])

    // this function for handle form submit
    const handleFormSubmit = async (values: any) => {
        try {
            if (selectedMember) {
                const updatedMember: MemberType = {
                    ...selectedMember,
                    jobTitle: values.jobTitle,
                    memberRole: values.access,
                }
                dispatch(updateMember(updatedMember))
                dispatch(toggleUpdateMemberDrawer())
                message.success('Member updated Successfully!')
            }
        } catch (error) {
            message.error('Member updated Failed!')
        }
    }

    // function to resend invitation
    const resendInvitation = () => {
        dispatch(toggleUpdateMemberDrawer())
        message.success('Invitation sent successfully!')
    }

    // function to get name
    const getMemberName = () => {
        if (selectedMember?.memberName) {
            return selectedMember.memberName
        } else return selectedMember?.memberEmail.split('@')[0]
    }

    const selectedMemberName: string = getMemberName() || ''

    return (
        <Drawer
            title={
                <Flex gap={8} align="center">
                    <Avatar
                        style={{
                            backgroundColor:
                                avatarNamesMap[
                                    selectedMemberName[0]?.toUpperCase()
                                ],
                            verticalAlign: 'middle',
                        }}
                    >
                        {selectedMemberName[0]?.toUpperCase()}
                    </Avatar>

                    <Flex vertical gap={4}>
                        <Typography.Text
                            style={{
                                textTransform: 'capitalize',
                            }}
                        >
                            {selectedMemberName}
                        </Typography.Text>

                        <Typography.Text
                            style={{
                                fontSize: 14,
                                color: colors.lightGray,
                            }}
                        >
                            {selectedMember?.memberEmail}
                        </Typography.Text>
                    </Flex>
                </Flex>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleUpdateMemberDrawer())}
        >
            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                initialValues={{ access: 'member' }}
            >
                <Form.Item label="Job Title" name="jobTitle">
                    <Select
                        size="middle"
                        placeholder="Select the job title (Optional)"
                        options={jobsList.map((job) => ({
                            label: job.jobTitle,
                            value: job.jobTitle,
                        }))}
                        suffixIcon={false}
                    />
                </Form.Item>

                <Form.Item
                    label="Access"
                    name="access"
                    rules={[{ required: true }]}
                >
                    <Select
                        disabled={selectedMember?.memberRole === 'owner'}
                        options={[
                            { value: 'member', label: 'Member' },
                            { value: 'admin', label: 'Admin' },
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Flex vertical gap={8}>
                        <Button
                            type="primary"
                            style={{ width: '100%' }}
                            htmlType="submit"
                        >
                            Update
                        </Button>

                        <Button
                            type="dashed"
                            style={{ width: '100%' }}
                            onClick={resendInvitation}
                            disabled={selectedMember?.memberRole === 'owner'}
                        >
                            Resend invitaion
                        </Button>

                        <Flex vertical style={{ marginBlockStart: 8 }}>
                            <Typography.Text
                                style={{
                                    fontSize: 12,
                                    color: colors.lightGray,
                                }}
                            >
                                Added 3 hours ago
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    fontSize: 12,
                                    color: colors.lightGray,
                                }}
                            >
                                Updated 3 hours ago
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default UpdateMemberDrawer
