import { Drawer, Flex, Form, Select, Typography, List, Button, AutoComplete } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  addProjectMember,
  createByEmail,
  deleteProjectMember,
  getAllProjectMembers,
  toggleProjectMemberDrawer,
} from './projectMembersSlice';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { DeleteOutlined, MailOutlined } from '@ant-design/icons';
import { getTeamMembers } from '@/features/team-members/team-members.slice';
import logger from '@/utils/errorLogger';
import { validateEmail } from '@/utils/validateEmail';

const ProjectMemberDrawer = () => {
  const { t } = useTranslation('project-view/project-member-drawer');
  const { isDrawerOpen, currentMembersList, isLoading } = useAppSelector(
    state => state.projectMemberReducer
  );
  const { teamMembers, loading: teamMembersLoading } = useAppSelector(state => state.teamMembersReducer);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const fetchProjectMembers = async () => {
    if (!projectId) return;
    dispatch(getAllProjectMembers(projectId));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(
          getTeamMembers({
            index: 1,
            size: 5,
            field: null,
            order: null,
            search: searchTerm,
            all: true,
          })
        );
      }
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  const handleSelectChange = async (memberId: string) => {
    if (!projectId || !memberId) return;

    try {
      const res = await dispatch(addProjectMember({ memberId, projectId })).unwrap();
      if (res.done) {
        form.resetFields();
        await fetchProjectMembers();
      }
    } catch (error) {
      logger.error('Error adding member:', error);
    }
  };

  const handleDeleteMember = async (memberId: string | undefined) => {
    if (!memberId || !projectId) return;

    try {
      const res = await dispatch(deleteProjectMember({ memberId, projectId })).unwrap();
      if (res.done) {
        await fetchProjectMembers();
      }
    } catch (error) {
      logger.error('Error deleting member:', error);
    }
  };

  const handleOpenChange = () => {
    if (isDrawerOpen) {
      fetchProjectMembers();
      dispatch(
        getTeamMembers({
          index: 1,
          size: 5,
          field: null,
          order: null,
          search: null,
          all: true,
        })
      );
    }
  };

  const sendInvite = async () => {
    if (!validateEmail(searchTerm) || !projectId) return;
    if (typeof searchTerm !== "string" || !searchTerm.length) return;

    try {
      const email = searchTerm.trim().toLowerCase();
      const body = {
        email,
        projectId,
      };
      setIsInviting(true);
      const res = await dispatch(createByEmail(body)).unwrap();
      if (res.done) {
        form.resetFields();
        await fetchProjectMembers();  
      }
    } catch (error) {
      logger.error('Error sending invite:', error);
    } finally {
      setIsInviting(false);
      setSearchTerm('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendInvite();
    }
  };

  const renderMemberOption = (member: any) => (
    <Flex gap={4} align="center">
      <SingleAvatar avatarUrl={member.avatar_url} name={member.name} email={member.email} />
      <Flex vertical>
        <Typography.Text style={{ textTransform: 'capitalize' }}>{member.name}</Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {member.email}
        </Typography.Text>
      </Flex>
    </Flex>
  );

  const renderNotFoundContent = () => (
    <Flex>
      <Button block type="primary" onClick={sendInvite} loading={isInviting}>
        <span>
          <MailOutlined /> &nbsp;
          { validateEmail(searchTerm) ? t('inviteAsAMember') : t('inviteNewMemberByEmail')}
        </span>
      </Button>
    </Flex>
  );

  return (
    <Drawer
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>{t('title')}</Typography.Text>
      }
      open={isDrawerOpen}
      onClose={() => dispatch(toggleProjectMemberDrawer())}
      afterOpenChange={handleOpenChange}
    >
      <Form form={form} layout="vertical" onFinish={handleSelectChange}>
        <Form.Item name="memberName" label={t('searchLabel')}>
          <Select
            loading={teamMembersLoading}
            placeholder={t('searchPlaceholder')}
            showSearch
            onSearch={handleSearch}
            onChange={handleSelectChange}
            onKeyDown={handleKeyDown}
            options={teamMembers?.data?.map(member => ({
              key: member.id,
              value: member.id,
              label: renderMemberOption(member),
            }))}
            filterOption={false}
            notFoundContent={renderNotFoundContent()}
          />
        </Form.Item>
      </Form>

      <List
        loading={isLoading}
        bordered
        size="small"
        itemLayout="horizontal"
        dataSource={currentMembersList}
        renderItem={member => (
          <List.Item key={member.id}>
            <Flex gap={4} align="center" justify="space-between" style={{ width: '100%' }}>
              {renderMemberOption(member)}
              <Button
                onClick={() => handleDeleteMember(member.id)}
                size="small"
                icon={<DeleteOutlined />}
              />
            </Flex>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default ProjectMemberDrawer;
