import { Button, Flex, Select, Typography } from 'antd';
import React, { useState } from 'react';
import StatusGroupTables from '../../../projects/projectView/taskList/groupTables/statusTables/StatusGroupTables';
import PriorityGroupTables from '../../../projects/projectView/taskList/groupTables/priorityTables/PriorityGroupTables';
import { TaskType } from '../../../../types/task.types';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { PageHeader } from '@ant-design/pro-components';
import { ArrowLeftOutlined, CaretDownFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import SearchDropdown from '../../../projects/projectView/taskList/taskListFilters/SearchDropdown';
import { useSelectedProject } from '../../../../hooks/useSelectedProject';
import { useTranslation } from 'react-i18next';
import { toggleDrawer as togglePhaseDrawer } from '../../../../features/projects/singleProject/phase/phaseSlice';
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice';
import PhaseDrawer from '../../../../features/projects/singleProject/phase/PhaseDrawer';
import StatusDrawer from '../../../../features/projects/status/StatusDrawer';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';

const ProjectTemplateEditView = () => {
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { templateId, templateName } = useParams();
  type GroupTypes = 'status' | 'priority' | 'phase';

  const [activeGroup, setActiveGroup] = useState<GroupTypes>('status');

  const handleChange = (value: string) => {
    setActiveGroup(value as GroupTypes);
  };

  const { t } = useTranslation('taskListFilters');

  // get selected project from useSelectedPro
  const selectedProject = useSelectedProject();

  //get phases details from phases slice
  const phase =
    useAppSelector((state) => state.phaseReducer.phaseList).find(
      (phase) => phase.projectId === selectedProject?.projectId
    ) || null;

  const groupDropdownMenuItems = [
    { key: 'status', value: 'status', label: t('statusText') },
    { key: 'priority', value: 'priority', label: t('priorityText') },
    {
      key: 'phase',
      value: 'phase',
      label: phase ? phase?.phase : t('phaseText'),
    },
  ];
  return (
    <div style={{ marginBlock: 80, minHeight: '80vh' }}>
      <PageHeader
        className="site-page-header"
        title={
          <Flex gap={8} align="center">
            <ArrowLeftOutlined
              style={{ fontSize: 16 }}
              onClick={() => navigate(-1)}
            />
            <Typography.Title
              level={4}
              style={{ marginBlockEnd: 0, marginInlineStart: 12 }}
            >
              {templateName}
            </Typography.Title>
          </Flex>
        }
        style={{ padding: 0, marginBlockEnd: 24 }}
      />
      <Flex vertical gap={16}>
        <Flex gap={8} wrap={'wrap'}>
          <SearchDropdown />
          <Flex align="center" gap={4} style={{ marginInlineStart: 12 }}>
            Group by:
            <Select
              defaultValue={'status'}
              options={groupDropdownMenuItems}
              onChange={handleChange}
              suffixIcon={<CaretDownFilled />}
            />
          </Flex>
          {activeGroup === 'phase' ? (
            <Button
              type="primary"
              onClick={() => dispatch(togglePhaseDrawer())}
            >
              Add Phase
            </Button>
          ) : activeGroup === 'status' ? (
            <Button type="primary" onClick={() => dispatch(toggleDrawer())}>
              Add Status
            </Button>
          ) : (
            ''
          )}
        </Flex>

        <StatusGroupTables datasource={dataSource} />
        <PriorityGroupTables datasource={dataSource} />
      </Flex>
      {/* phase drawer  */}
      <PhaseDrawer />
      {/* status drawer  */}
      <StatusDrawer />
    </div>
  );
};
export default ProjectTemplateEditView;
