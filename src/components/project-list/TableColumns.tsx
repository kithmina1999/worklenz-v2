import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAuthService } from '@/hooks/useAuth';
import { IProjectCategory } from '@/types/project/projectCategory.types';
import { IProjectStatus } from '@/types/project/projectStatus.types';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';
import { InlineMember } from '@/types/teamMembers/inlineMember.types';
import { ColumnsType } from 'antd/es/table';
import { ColumnFilterItem } from 'antd/es/table/interface';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';
import Avatars from '../avatars/avatars';
import { ActionButtons } from './project-list-table/project-list-actions/project-list-actions';
import { CategoryCell } from './project-list-table/project-list-category/project-list-category';
import { ProgressListProgress } from './project-list-table/project-list-progress/progress-list-progress';
import { ProjectListUpdatedAt } from './project-list-table/project-list-updated-at/project-list-updated';
import { ProjectNameCell } from './project-list-table/project-name/project-name-cell';

const createFilters = (items: { id: string; name: string }[]) =>
  items.map(item => ({ text: item.name, value: item.id })) as ColumnFilterItem[];

const TableColumns = (
  navigate: NavigateFunction,
  statuses: IProjectStatus[],
  categories: IProjectCategory[],
  setProjectId: (id: string) => void,
  filteredCategories: string[]
): ColumnsType<IProjectViewModel> => {
  const { t } = useTranslation('all-project-list');
  const dispatch = useAppDispatch();
  const isOwnerOrAdmin = useAuthService().isOwnerOrAdmin();

  const columns = useMemo(
    () => [
      {
        title: t('name'),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        showSorterTooltip: false,
        defaultSortOrder: 'ascend',
        render: (text: string, record: IProjectViewModel) => (
          <ProjectNameCell navigate={navigate} key={record.id} t={t} record={record} />
        ),
      },
      {
        title: t('client'),
        dataIndex: 'client_name',
        key: 'client_name',
        sorter: true,
        showSorterTooltip: false,
      },
      {
        title: t('category'),
        dataIndex: 'category',
        key: 'category_id',
        filters: createFilters(
          categories.map(category => ({ id: category.id || '', name: category.name || '' }))
        ),
        filteredValue: filteredCategories,
        onFilter: (value: string, record: IProjectViewModel) =>
          record.category_id?.startsWith(value) || false,
        render: (text: string, record: IProjectViewModel) => (
          <CategoryCell key={record.id} t={t} record={record} />
        ),
        sorter: true,
      },
      {
        title: t('status'),
        dataIndex: 'status',
        key: 'status_id',
        filters: createFilters(
          statuses.map(status => ({ id: status.id || '', name: status.name || '' }))
        ),
        onFilter: (value: string, record: IProjectViewModel) =>
          record.status?.startsWith(value) || false,
        sorter: true,
        showSorterTooltip: false,
      },
      {
        title: t('tasksProgress'),
        dataIndex: 'tasksProgress',
        key: 'tasksProgress',
        render: (_: string, record: IProjectViewModel) => <ProgressListProgress record={record} />,
      },
      {
        title: t('updated_at'),
        dataIndex: 'updated_at',
        key: 'updated_at',
        sorter: true,
        showSorterTooltip: false,
        render: (_: string, record: IProjectViewModel) => <ProjectListUpdatedAt record={record} />,
      },
      {
        title: t('members'),
        dataIndex: 'names',
        key: 'members',
        render: (members: InlineMember[]) => <Avatars members={members} />,
      },
      {
        title: '',
        key: 'button',
        dataIndex: '',
        render: (record: IProjectViewModel) => (
          <ActionButtons
            t={t}
            record={record}
            setProjectId={setProjectId}
            dispatch={dispatch}
            isOwnerOrAdmin={isOwnerOrAdmin}
          />
        ),
      },
    ],
    [t, categories, statuses, filteredCategories]
  );

  return columns as ColumnsType<IProjectViewModel>;
};

export default TableColumns;
