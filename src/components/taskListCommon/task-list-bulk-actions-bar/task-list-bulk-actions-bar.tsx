import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Checkbox, Dropdown, Flex, Tooltip, Button, Typography, InputRef } from 'antd';
import {
  RetweetOutlined,
  TagsOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  InboxOutlined,
  DeleteOutlined,
  MoreOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { colors } from '@/styles/colors';
import { deselectAll } from '@/features/projects/bulkActions/bulkActionSlice';
import { fetchTaskGroups } from '@/features/tasks/tasks.slice';
import { taskListBulkActionsApiService } from '@/api/tasks/task-list-bulk-actions.api.service';
import {
  evt_project_task_list_bulk_archive,
  evt_project_task_list_bulk_assign_me,
  evt_project_task_list_bulk_assign_members,
  evt_project_task_list_bulk_change_phase,
  evt_project_task_list_bulk_change_priority,
  evt_project_task_list_bulk_change_status,
  evt_project_task_list_bulk_delete,
} from '@/shared/worklenz-analytics-events';
import {
  IBulkTasksPhaseChangeRequest,
  IBulkTasksPriorityChangeRequest,
  IBulkTasksStatusChangeRequest,
} from '@/types/tasks/bulk-action-bar.types';
import { ITaskStatus } from '@/types/tasks/taskStatus.types';
import { ITaskPriority } from '@/types/tasks/taskPriority.types';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';

import './task-list-bulk-actions-bar.css';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { ITeamMembersViewModel } from '@/types/teamMembers/teamMembersViewModel.types';
import { toggleTaskTemplateDrawer } from '@/features/settings/taskTemplates/taskTemplateSlice';
import TaskTemplateDrawer from '@/features/settings/taskTemplates/TaskTemplateDrawer';
import { createPortal } from 'react-dom';

const TaskListBulkActionsBar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('tasks/task-table-bulk-actions');
  const { trackMixpanelEvent } = useMixpanelTracking();

  // loading state
  const [loading, setLoading] = useState(false);
  const [updatingLabels, setUpdatingLabels] = useState(false);
  const [updatingAssignToMe, setUpdatingAssignToMe] = useState(false);
  const [updatingAssignees, setUpdatingAssignees] = useState(false);
  const [updatingArchive, setUpdatingArchive] = useState(false);
  const [updatingDelete, setUpdatingDelete] = useState(false);

  // Selectors
  const { selectedTaskIdsList } = useAppSelector(state => state.bulkActionReducer);
  const statusList = useAppSelector(state => state.taskStatusReducer.status);
  const priorityList = useAppSelector(state => state.priorityReducer.priorities);
  const phaseList = useAppSelector(state => state.phaseReducer.phaseList);
  const labelsList = useAppSelector(state => state.taskLabelsReducer.labels);
  const projectId = useAppSelector(state => state.projectReducer.projectId);
  const members = useAppSelector(state => state.teamMembersReducer.teamMembers);
  const archived = useAppSelector(state => state.taskReducer.archived);
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const membersInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<ITeamMembersViewModel>({ data: [], total: 0 });
  const [assigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);

  const filteredMembersData = useMemo(() => {
    return teamMembers?.data?.filter(member =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamMembers, searchQuery]);

  // Handlers
  const handleChangeStatus = async (status: ITaskStatus) => {
    if (!status.id || !projectId) return;
    try {
      setLoading(true);
      const body: IBulkTasksStatusChangeRequest = {
        tasks: selectedTaskIdsList,
        status_id: status.id,
      };
      const res = await taskListBulkActionsApiService.changeStatus(body, projectId);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_change_status);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePriority = async (priority: ITaskPriority) => {
    if (!priority.id || !projectId) return;
    try {
      setLoading(true);
      const body: IBulkTasksPriorityChangeRequest = {
        tasks: selectedTaskIdsList,
        priority_id: priority.id,
      };
      const res = await taskListBulkActionsApiService.changePriority(body, projectId);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_change_priority);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhase = async (phase: ITaskPhase) => {
    if (!phase.id || !projectId) return;
    try {
      setLoading(true);
      const body: IBulkTasksPhaseChangeRequest = {
        tasks: selectedTaskIdsList,
        phase_id: phase.id,
      };
      const res = await taskListBulkActionsApiService.changePhase(body, projectId);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_change_phase);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignToMe = async () => {
    if (!projectId) return;
    try {
      setUpdatingAssignToMe(true);
      const body = {
        tasks: selectedTaskIdsList,
        project_id: projectId,
      };
      const res = await taskListBulkActionsApiService.assignToMe(body);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_assign_me);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingAssignToMe(false);
    }
  };

  const handleArchive = async () => {
    if (!projectId) return;
    try {
      setUpdatingArchive(true);
      const body = {
        tasks: selectedTaskIdsList,
        project_id: projectId,
      };
      const res = await taskListBulkActionsApiService.archiveTasks(body, archived);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_archive);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingArchive(false);
    }
  };

  const handleChangeAssignees = async () => {
    if (!projectId) return;
    try {
      setUpdatingAssignees(true);
      const body = {
        tasks: selectedTaskIdsList,
        project_id: projectId,
        members: members?.data?.filter(m => m.selected),
      };
      const res = await taskListBulkActionsApiService.assignTasks(body);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_assign_members);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingAssignees(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId) return;
    try {
      setUpdatingDelete(true);
      const body = {
        tasks: selectedTaskIdsList,
        project_id: projectId,
      };
      const res = await taskListBulkActionsApiService.deleteTasks(body, projectId);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_bulk_delete);
        dispatch(deselectAll());
        dispatch(fetchTaskGroups(projectId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingDelete(false);
    }
  };

  // Menu Generators
  const getChangeOptionsMenu = () => [
    {
      key: '1',
      label: t('status'),
      children: statusList.map(status => ({
        key: status.id,
        onClick: () => handleChangeStatus(status),
        label: <Badge color={status.color_code} text={status.name} />,
      })),
    },
    {
      key: '2',
      label: t('priority'),
      children: priorityList.map(priority => ({
        key: priority.id,
        onClick: () => handleChangePriority(priority),
        label: <Badge color={priority.color_code} text={priority.name} />,
      })),
    },
    {
      key: '3',
      label: t('phase'),
      children: phaseList.map(phase => ({
        key: phase.id,
        onClick: () => handleChangePhase(phase),
        label: <Badge color={phase.color_code} text={phase.name} />,
      })),
    },
  ];

  const getLabelMenu = () =>
    labelsList.map(label => ({
      key: label.id,
      type: 'checkbox',
      label: (
        <Flex align="center" gap={8}>
          <Checkbox>
            <Badge color={label.color_code} text={label.name} />
          </Checkbox>
        </Flex>
      ),
    }));

  const getLabel = () => {
    const word = selectedTaskIdsList.length < 2 ? t('taskSelected') : t('tasksSelected');
    return `${selectedTaskIdsList.length} ${word}`;
  };

  const getAssigneesMenu = () => {
    return [
      ...(members?.data?.map(member => ({
        key: member.id,
        label: (
          <Flex align="center" justify="space-between" gap={8}>
            <Checkbox onChange={e => e.stopPropagation()}>
              <Flex align="center">
                <SingleAvatar
                  avatarUrl={member.avatar_url}
                  name={member.name}
                  email={member.email}
                />
                <Flex vertical>
                  <Typography.Text>{member.name}</Typography.Text>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {member.email}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Checkbox>
          </Flex>
        ),
      })) || []),
      {
        key: 'apply',
        label: (
          <Button
            type="primary"
            size="small"
            style={{ width: '100%' }}
            onClick={() => setAssigneeDropdownOpen(false)}
          >
            Apply
          </Button>
        ),
      },
    ];

    // return (
    //   <Flex vertical>
    //     <Input
    //       ref={membersInputRef}
    //       value={searchQuery}
    //       onChange={e => setSearchQuery(e.currentTarget.value)}
    //       placeholder={t('searchInputPlaceholder')}
    //     />

    //     <List style={{ padding: 0, height: 250, overflow: 'auto' }}>
    //       {filteredMembersData?.length ? (
    //         filteredMembersData.map(member => (
    //           <List.Item
    //             className={themeMode === 'dark' ? 'custom-list-item dark' : 'custom-list-item'}
    //             key={member.id}
    //             style={{
    //               display: 'flex',
    //               gap: 8,
    //               justifyContent: 'flex-start',
    //               padding: '4px 8px',
    //               border: 'none',
    //               cursor: 'pointer',
    //             }}
    //             // onClick={e => handleMemberChange(null, member.id || '')}
    //           >
    //             <Checkbox
    //               id={member.id}
    //               // checked={checkMemberSelected(member.id || '')}
    //               // onChange={e => handleMemberChange(e, member.id || '')}
    //             />
    //             <div>
    //               <SingleAvatar
    //                 avatarUrl={member.avatar_url}
    //                 name={member.name}
    //                 email={member.email}
    //               />
    //             </div>
    //             <Flex vertical>
    //               {member.name}

    //               <Typography.Text
    //                 style={{
    //                   fontSize: 12,
    //                   color: colors.lightGray,
    //                 }}
    //               >
    //                 {member.email}
    //               </Typography.Text>
    //             </Flex>
    //           </List.Item>
    //         ))
    //       ) : (
    //         <Empty />
    //       )}
    //     </List>

    //     <Divider style={{ marginBlock: 0 }} />

    //     <Divider style={{ marginBlock: 8 }} />

    //     <Button
    //       type="primary"
    //       style={{ alignSelf: 'flex-end' }}
    //       size="small"
    //       onClick={handleChangeAssignees}
    //     >
    //       {t('okButton')}
    //     </Button>
    //   </Flex>
    // );
  };

  const buttonStyle = { background: colors.transparent, color: colors.white };

  return (
    <div className={`bulk-actions ${selectedTaskIdsList.length > 0 ? 'open' : ''}`}>
      <Flex className="bulk-actions-inner" align="center" justify="center" gap={12}>
        <Flex>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{getLabel()}</span>
        </Flex>

        <Flex align="center">
          <Tooltip title={t('changeStatus')}>
            <Dropdown
              menu={{ items: getChangeOptionsMenu() }}
              placement="bottom"
              arrow
              trigger={['click']}
            >
              <Button
                icon={<RetweetOutlined />}
                className="borderless-icon-btn"
                style={buttonStyle}
                loading={loading}
              />
            </Dropdown>
          </Tooltip>

          <Tooltip title={t('changeLabel')}>
            <Dropdown
              menu={{
                items: getLabelMenu(),
                style: { maxHeight: '200px', overflow: 'auto' },
                multiple: true,
              }}
              placement="top"
              arrow
              trigger={['click']}
            >
              <Button
                icon={<TagsOutlined />}
                className="borderless-icon-btn"
                style={buttonStyle}
                loading={updatingLabels}
              />
            </Dropdown>
          </Tooltip>

          <Tooltip title={t('assignToMe')}>
            <Button
              icon={<UserAddOutlined />}
              className="borderless-icon-btn"
              style={buttonStyle}
              onClick={() => handleAssignToMe()}
              loading={updatingAssignToMe}
            />
          </Tooltip>

          <Tooltip title={t('changeAssignees')}>
            <Dropdown
              open={assigneeDropdownOpen}
              onOpenChange={value => setAssigneeDropdownOpen(value)}
              menu={{
                items: getAssigneesMenu(),
                style: { maxHeight: '200px', overflow: 'auto' },
                multiple: true,
              }}
              placement="top"
              arrow
              trigger={['click']}
            >
              <Button
                icon={<UsergroupAddOutlined />}
                className="borderless-icon-btn"
                style={buttonStyle}
                loading={updatingAssignees}
              />
            </Dropdown>
          </Tooltip>

          <Tooltip title={archived ? t('unarchive') : t('archive')}>
            <Button
              icon={<InboxOutlined />}
              className="borderless-icon-btn"
              style={buttonStyle}
              onClick={() => handleArchive()}
            />
          </Tooltip>

          <Tooltip title={t('delete')}>
            <Button
              icon={<DeleteOutlined />}
              className="borderless-icon-btn"
              style={buttonStyle}
              onClick={() => handleDelete()}
            />
          </Tooltip>
        </Flex>

        <Tooltip title={t('moreOptions')}>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Create Task Template',
                  onClick: () => dispatch(toggleTaskTemplateDrawer()),
                },
              ]
            }}
          >
            <Button icon={<MoreOutlined />} className="borderless-icon-btn" style={buttonStyle} />
          </Dropdown>
        </Tooltip>

        <Tooltip title={t('deselectAll')}>
          <Button
            icon={<CloseCircleOutlined />}
            onClick={() => dispatch(deselectAll())}
            className="borderless-icon-btn"
            style={buttonStyle}
          />
        </Tooltip>
      </Flex>
    </div>
  );
};

export default TaskListBulkActionsBar;
