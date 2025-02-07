import { Drawer, Flex, Form, Select, Typography } from 'antd';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getAllProjectMembers, toggleProjectMemberDrawer } from './projectMembersSlice';
import { colors } from '@/styles/colors';
import { nanoid } from '@reduxjs/toolkit';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { List } from 'antd/es/form/Form';
import { IMentionMemberViewModel } from '@/types/project/projectComments.types';

const ProjectMemberDrawer = () => {
  const { isDrawerOpen, allMembersList } = useAppSelector(state => state.projectMemberReducer);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const fetchProjectMembers = async () => {
    if (!projectId) return;
    dispatch(getAllProjectMembers(projectId));
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const newMember: any = {
        memberId: nanoid(),
        memberName: values.name,
        memberEmail: values.email,
        memberRole: 'member',
        completedTasks: 0,
        totalAssignedTasks: 0,
      };
      dispatch(toggleProjectMemberDrawer());
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>Project Members</Typography.Text>
      }
      open={isDrawerOpen}
      onClose={() => dispatch(toggleProjectMemberDrawer())}
      afterOpenChange={() => {
        fetchProjectMembers();
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item name="memberName" label="Add members by adding their name or email">
          <Select
            placeholder="Type name or email"
            showSearch
            onSearch={onSearch}
            onChange={onChange}
            options={allMembersList.map(member => ({
              key: member.id,
              value: member.name,
              label: (
                <Flex gap={8} align="center">
                  <SingleAvatar
                    avatarUrl={member.avatar_url}
                    name={member.name}
                    email={member.email}
                  />
                  <Flex vertical>
                    <Typography.Text
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {member.name}
                    </Typography.Text>

                    <Typography.Text
                      style={{
                        fontSize: 14,
                        color: colors.lightGray,
                      }}
                    >
                      {member.email}
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

  );
};

export default ProjectMemberDrawer;
