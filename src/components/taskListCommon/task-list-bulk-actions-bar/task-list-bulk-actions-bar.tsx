import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks/useAppSelector';
import './task-list-bulk-actions-bar.css';
import { Badge, Dropdown, Flex, Tooltip } from 'antd';
import { Button } from 'antd/es';
import { colors } from '@/styles/colors';
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
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deselectAll } from '@/features/projects/bulkActions/bulkActionSlice';

const TaskListBulkActionsBar = () => {
  const { selectedTaskIdsList } = useAppSelector(state => state.bulkActionReducer);
  const { t } = useTranslation('tasks/task-table-bulk-actions');
  const dispatch = useAppDispatch();

  const statusList = useAppSelector(state => state.taskStatusReducer.status);
  const priorityList = useAppSelector(state => state.priorityReducer.priorities);
  const phaseList = useAppSelector(state => state.phaseReducer.phaseList);

  const getLabel = () => {
    const w = selectedTaskIdsList.length < 2 ? t('taskSelected') : t('tasksSelected');
    return `${selectedTaskIdsList.length} ${w}`;
  };

  const closeContainer = () => {
    dispatch(deselectAll());
  };

  const changeStatusItems = [
    {
      key: '1',
      label: 'Status',
      children: statusList.map(status => ({
        key: status.id,
        label: status.name
      })),
    },
    {
      key: '2',
      label: 'Priority',
      children: priorityList.map(priority => ({
        key: priority.id,
        label: priority.name,
      })),
    },
    {
      key: '3',
      label: 'Phase',
      children: phaseList.map(phase => ({
        key: phase.id,
        label: phase.name,
      })),
    },
  ];

  return (
    <div className={`bulk-actions ${selectedTaskIdsList.length > 0 ? 'open' : ''}`}>
      <Flex className="bulk-actions-inner" align="center" justify="center" gap={12}>
        <Flex>{getLabel()}</Flex>
        <Flex align="center">
          <Tooltip title={t('changeStatus')}>
            <Dropdown
              menu={{ items: changeStatusItems }}
              placement="bottom"
              arrow
              trigger={['click']}
            >
              <Button
                icon={<RetweetOutlined />}
                className="borderless-icon-btn"
                style={{ background: colors.transparent, color: colors.white }}
              />
            </Dropdown>
          </Tooltip>

          <Tooltip title={t('changeLabel')}>
            <Button
              icon={<TagsOutlined />}
              className="borderless-icon-btn"
              style={{ background: colors.transparent, color: colors.white }}
            />
          </Tooltip>

          <Tooltip title={t('assignToMe')}>
            <Button
              icon={<UserAddOutlined />}
              className="borderless-icon-btn"
              style={{ background: colors.transparent, color: colors.white }}
            />
          </Tooltip>

          <Tooltip title={t('changeAssignees')}>
            <Button
              icon={<UsergroupAddOutlined />}
              className="borderless-icon-btn"
              style={{ background: colors.transparent, color: colors.white }}
            />
          </Tooltip>

          <Tooltip title={t('archive')}>
            <Button
              icon={<InboxOutlined />}
              className="borderless-icon-btn"
              style={{ background: colors.transparent, color: colors.white }}
            />
          </Tooltip>

          <Tooltip title={t('delete')}>
            <Button
              icon={<DeleteOutlined />}
              className="borderless-icon-btn"
              style={{ background: colors.transparent, color: colors.white }}
            />
          </Tooltip>
        </Flex>

        <Tooltip title={t('moreOptions')}>
          <Button
            icon={<MoreOutlined />}
            className="borderless-icon-btn"
            style={{ background: colors.transparent, color: colors.white }}
          />
        </Tooltip>

        <Tooltip title={t('deselectAll')}>
          <Button
            icon={<CloseCircleOutlined />}
            onClick={closeContainer}
            className="borderless-icon-btn"
            style={{ background: colors.transparent, color: colors.white }}
          />
        </Tooltip>
      </Flex>
    </div>
  );
};

export default TaskListBulkActionsBar;
