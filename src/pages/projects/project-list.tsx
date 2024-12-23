// React and core dependencies
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ant Design components and types
import { Button, Card, Flex, Input, Segmented, Table, TablePaginationConfig, Tooltip } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

// Local components
import ProjectDrawer from '@/components/projects/project-drawer/project-drawer';
import TableColumns from '@/components/ProjectList/TableColumns';
import CreateProjectButton from '@/components/projects/project-drawer/create-project-button';

// Redux hooks and actions
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchProjects, toggleDrawer } from '@/features/projects/projectsSlice';

// Constants and types
import {
  DEFAULT_PAGE_SIZE,
  FILTER_INDEX_KEY,
  PAGE_SIZE_OPTIONS,
  PROJECT_SORT_FIELD,
  PROJECT_SORT_ORDER,
} from '@/shared/constants';
import { IProjectFilter } from '@/types/project/project.types';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';

// Hooks and styles
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import './project-list.css';
import { fetchClients } from '@/features/settings/client/clientSlice';
import { fetchProjectHealth } from '@/features/projects/lookups/projectHealth/projectHealthSlice';
import { fetchProjectCategories } from '@/features/projects/lookups/projectCategories/projectCategoriesSlice';
import { fetchProjectStatuses } from '@/features/projects/lookups/projectStatuses/projectStatusesSlice';
import { getProject, setProjectId } from '@/features/project/project.slice';

// Interfaces
interface PaginationState {
  current: number;
  pageSize: number;
}

interface SorterState {
  order: string;
  columnKey: string;
}

const ProjectList: React.FC = () => {
  // Hooks
  const { t } = useTranslation('all-project-list');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useDocumentTitle('Projects');

  // Redux state
  const { loading, projects } = useAppSelector(state => state.projectsReducer);
  const { project } = useAppSelector(state => state.projectReducer);
  const { categories } = useAppSelector(state => state.projectCategoriesReducer);
  const { statuses } = useAppSelector(state => state.projectStatusesReducer);
  const { healths } = useAppSelector(state => state.projectHealthReducer);

  useEffect(() => {
    if (!healths.length) dispatch(fetchProjectHealth());
    if (!categories.length) dispatch(fetchProjectCategories());
    if (!statuses.length) dispatch(fetchProjectStatuses());
  }, [dispatch]);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [sorter, setSorter] = useState<SorterState>({
    order: localStorage.getItem(PROJECT_SORT_ORDER) ?? 'ascend',
    columnKey: localStorage.getItem(PROJECT_SORT_FIELD) ?? 'name',
  });
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Callback functions
  const getFilterIndex = useCallback(() => {
    return +(localStorage.getItem(FILTER_INDEX_KEY) || 0);
  }, []);

  const setFilterIndex = useCallback((index: number) => {
    localStorage.setItem(FILTER_INDEX_KEY, index.toString());
  }, []);

  const setSortingValues = useCallback((sorter: SorterState) => {
    localStorage.setItem(PROJECT_SORT_FIELD, sorter.columnKey);
    localStorage.setItem(PROJECT_SORT_ORDER, sorter.order);
  }, []);

    // Memoized values
    const filters = useMemo(() => Object.values(IProjectFilter), []);

    const requestParams = useMemo(() => ({
      index: pagination.current,
      size: pagination.pageSize,
      field: sorter.columnKey,
      order: sorter.order,
      filter: getFilterIndex(),
      search: searchTerm,
      statuses: selectedStatus,
      categories: selectedCategory,
    }), [
      pagination,
      sorter,
      getFilterIndex,
      searchTerm,
      selectedStatus,
      selectedCategory,
    ]);
  
    const paginationConfig = useMemo(() => ({
      current: pagination.current,
      pageSize: pagination.pageSize,
      showSizeChanger: true,
      defaultPageSize: DEFAULT_PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      size: 'small' as const,
      total: projects.total,
    }), [pagination, projects.total]);

  const getProjects = useCallback(async () => {
    try {
      await dispatch(fetchProjects(requestParams)).unwrap();
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Consider adding error handling/notification here
    }
  }, [dispatch, requestParams]);

  const handleTableChange = useCallback((
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IProjectViewModel> | SorterResult<IProjectViewModel>[]
  ) => {
    if (filters?.status_id) {
      setSelectedStatus(filters.status_id.join('+'));
    }
    if (filters?.category_id) {
      setSelectedCategory(filters.category_id.join('+'));
    }

    const newSorter = {
      order: (Array.isArray(sorter) ? sorter[0].order : sorter.order) ?? 'ascend',
      columnKey: ((Array.isArray(sorter) ? sorter[0].columnKey : sorter.columnKey) as string) ?? 'name',
    };

    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || DEFAULT_PAGE_SIZE,
    });

    setSorter(newSorter);
  }, []);

  const handleRefresh = useCallback(() => {
    getProjects();
  }, [getProjects]);

  const handleSegmentChange = useCallback((value: IProjectFilter) => {
    setFilterIndex(filters.indexOf(value));
    getProjects();
  }, [filters, setFilterIndex, getProjects]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Effects
  useEffect(() => {
    setSortingValues(sorter);
    getProjects();
  }, [searchTerm, selectedStatus, selectedCategory, pagination, sorter, setSortingValues, getProjects]);

  const setSelectedProjectId = useCallback((id: string) => {
    if (id) {
      dispatch(setProjectId(id));
      dispatch(getProject(id));
      dispatch(toggleDrawer());
    }
  }, [dispatch]);

  return (
    <div style={{ marginBlock: 65, minHeight: '90vh' }}>
      <PageHeader
        className="site-page-header"
        title={`${projects.total} ${t('projects')}`}
        style={{ padding: '16px 0' }}
        extra={
          <Flex gap={8} align="center">
            <Tooltip title={t('refreshProjects')}>
              <Button
                shape="circle"
                icon={<SyncOutlined spin={loading} />}
                onClick={handleRefresh}
                aria-label="Refresh projects"
              />
            </Tooltip>
            <Segmented<IProjectFilter>
              options={filters}
              defaultValue={filters[getFilterIndex()] ?? filters[0]}
              onChange={handleSegmentChange}
            />
            <Input
              placeholder={t('placeholder')}
              suffix={<SearchOutlined />}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search projects"
            />
            <CreateProjectButton />
          </Flex>
        }
      />
      <Card className="project-card">
        <Table<IProjectViewModel>
          columns={TableColumns(navigate, statuses, categories, setSelectedProjectId)}
          dataSource={projects.data}
          rowKey={record => record.id || ''}
          loading={loading}
          size="small"
          onChange={handleTableChange}
          pagination={paginationConfig}
        />
      </Card>

      <ProjectDrawer
        categories={categories}
        statuses={statuses}
        healths={healths}
      />
    </div>
  );
};

export default ProjectList;
