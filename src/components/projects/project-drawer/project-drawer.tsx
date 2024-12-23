import { useEffect, useRef, useState } from 'react';

import {
  AutoComplete,
  Badge,
  Button,
  ColorPicker,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  Form,
  Input,
  InputRef,
  Select,
  Skeleton,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { createProject, toggleDrawer } from '../../../features/projects/projectsSlice';
import { addCategory } from '../../../features/settings/categories/categoriesSlice';

import { projectColors } from '../../../lib/project/projectConstants';
import { colors } from '../../../styles/colors';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';
import { IProjectCategory } from '@/types/project/projectCategory.types';

import { PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { fetchClients } from '@/features/settings/client/clientSlice';
import { getStatusIcon } from '@/utils/projectUtils';
import { IProjectHealth } from '@/types/project/projectHealth.types';
import { IProjectStatus } from '@/types/project/projectStatus.types';
import { useTranslation } from 'react-i18next';
import { getTeamMembers } from '@/features/team-members/team-members.slice';
import Avatars from '@/components/avatars/Avatars';
import ProjectManagerDropdown from '../project-manager-dropdown/project-manager-dropdown';

const ProjectDrawer = ({
  categories,
  statuses,
  healths,
}: {
  categories: IProjectCategory[];
  statuses: IProjectStatus[];
  healths: IProjectHealth[];
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('project-drawer');

  // get categories list from categories reducer
  const { clients, loading: loadingClients } = useAppSelector(state => state.clientReducer);
  const { project, projectId, projectLoading } = useAppSelector(state => state.projectReducer);

  useEffect(() => {
    if (!clients.data?.length)
      dispatch(fetchClients({ index: 1, size: 5, field: null, order: null, search: null }));
  }, [dispatch]);

  // state for show category add input box
  const [isAddCategoryInputShow, setIsAddCategoryInputShow] = useState<boolean>(false);
  const [categoryText, setCategoryText] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);

  const isDrawerOpen = useAppSelector(state => state.projectsReducer.isProjectDrawerOpen);

  const [form] = Form.useForm();

  // function for handle form submit
  const handleFormSubmit = (values: any) => {
    const newProject: IProjectViewModel = {
      name: values.name,
      color_code: values.color,
      status_id: values.status,
      category_id: values.category,
      health_id: values.health,
      notes: values.notes,
      client_id: values.client,
      project_manager: values.projectManager,
      start_date: values.startDate,
      end_date: values.endDate,
      working_days: values.estWorkingDays,
      man_days: values.estManDays,
      hours_per_day: values.hrsPerDay,
    };
    dispatch(createProject(newProject));
    form.resetFields();
    dispatch(toggleDrawer());
  };

  // status selection options
  const statusOptions = [
    ...statuses.map((status, index) => ({
      key: index,
      value: status.id,
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {status.icon && status.color_code && getStatusIcon(status.icon, status.color_code)}
          {status.name}
        </Typography.Text>
      ),
    })),
  ];

  // health selection options
  const healthOptions = [
    ...healths.map((status, index) => ({
      key: index,
      value: status.id,
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Badge color={status.color_code} /> {status.name}
        </Typography.Text>
      ),
    })),
  ];

  const categoryOptions = [
    ...categories.map((category, index) => ({
      key: index,
      value: category.id,
      label: category.name,
    })),
  ];

  // client options
  const clientOptions = [
    ...(clients.data?.map((client, index) => ({
      key: index,
      value: client.id,
      label: client.name,
    })) || []),
  ];

  // category input ref
  const categoryInputRef = useRef<InputRef>(null);

  const handleCategoryInputFocus = (open: boolean) => {
    setTimeout(() => {
      categoryInputRef.current?.focus();
    }, 0);
  };

  // show input to add new category
  const handleShowAddCategoryInput = () => {
    setIsAddCategoryInputShow(true);
    handleCategoryInputFocus(true);
  };

  // function to handle category add
  const handleAddCategoryItem = (category: string) => {
    const newCategory: IProjectCategory = {
      name: category,
      color_code: '#ee87c5',
    };

    dispatch(addCategory(newCategory));
    setCategoryText('');
    setIsAddCategoryInputShow(false);
  };

  const handleClientSearch = (value: string): void => {
    if (value.length > 2 || value.length === 0)
      dispatch(
        fetchClients({ index: 1, size: 5, field: null, order: null, search: value || null })
      );
  };

  const visibleChanged = (visible: boolean) => {
    if (visible && project?.id) {
      setEditMode(true);
      form.setFieldsValue({
        ...project,
      });
    }
  };

  return (
    <Drawer
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          {editMode ? t('editProject') : t('createProject')}
        </Typography.Text>
      }
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      destroyOnClose
      afterOpenChange={visibleChanged}
    >
      {
        <Skeleton active paragraph={{ rows: 12 }} loading={projectLoading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
              color: projectColors[0],
              status: statuses.find(status => status.is_default)?.id,
              health: healths.find(health => health.is_default)?.id,
              client: [],
              working_days: 0,
              man_days: 0,
              hours_per_day: 8,
            }}
          >
            <Form.Item
              name="name"
              label={t('name')}
              rules={[
                {
                  required: true,
                  message: t('pleaseEnterAName'),
                },
              ]}
            >
              <Input placeholder={t('enterProjectName')} />
            </Form.Item>
            <Form.Item name="color_code" label={t('projectColor')} layout="horizontal" required>
              <ColorPicker />
            </Form.Item>
            <Form.Item name="status_id" label={t('status')}>
              <Select options={statusOptions} />
            </Form.Item>
            <Form.Item name="health_id" label={t('health')}>
              <Select options={healthOptions} />
            </Form.Item>
            <Form.Item name="category_id" label={t('category')}>
              {!isAddCategoryInputShow ? (
                <Select
                  options={categoryOptions}
                  placeholder={t('addCategory')}
                  dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Button
                        style={{ width: '100%' }}
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleShowAddCategoryInput}
                      >
                        {t('newCategory')}
                      </Button>
                    </>
                  )}
                />
              ) : (
                <Flex vertical gap={4}>
                  <Input
                    ref={categoryInputRef}
                    placeholder={t('enterCategoryName')}
                    value={categoryText}
                    onChange={e => setCategoryText(e.currentTarget.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddCategoryItem(categoryText)}
                  />
                  <Typography.Text style={{ color: colors.lightGray }}>
                    {t('hitEnterToCreate')}
                  </Typography.Text>
                </Flex>
              )}
            </Form.Item>
            <Form.Item name="notes" label={t('notes')}>
              <Input.TextArea placeholder={t('enterNotes')} />
            </Form.Item>
            <Form.Item
              name="client"
              label={
                <Typography.Text>
                  {t('client')}&nbsp;
                  <Tooltip title={t('youCanManageClientsUnderSettings')}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Typography.Text>
              }
            >
              <AutoComplete
                options={clientOptions}
                allowClear
                onSearch={handleClientSearch}
                placeholder={t('typeToSearchClients')}
                dropdownRender={menu => (
                  <>
                    {loadingClients && <Spin />}
                    {menu}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item name="project_manager" label={t('projectManager')} layout="horizontal">
              <ProjectManagerDropdown />
            </Form.Item>
            <Form.Item name="date" layout="horizontal">
              <Flex gap={8}>
                <Form.Item name="start_date" label={t('startDate')}>
                  <DatePicker />
                </Form.Item>
                <Form.Item name="end_date" label={t('endDate')}>
                  <DatePicker />
                </Form.Item>
              </Flex>
            </Form.Item>
            <Form.Item name="working_days" label={t('estimateWorkingDays')}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="man_days" label={t('estimateManDays')}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="hours_per_day" label={t('hoursPerDay')}>
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{ width: '100%' }} htmlType="submit">
                {editMode ? t('update') : t('create')}
              </Button>
            </Form.Item>
          </Form>
        </Skeleton>
      }
    </Drawer>
  );
};

export default ProjectDrawer;
