import React, { memo, useState } from 'react';
import { Button, ConfigProvider, Flex, Table, TableColumnsType } from 'antd';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import './projectReportTable.css';
import ProjectCell from './tableCells/projectCell/ProjectCell';
import EstimatedVsActualCell from './tableCells/estimatedVsActualCell/EstimatedVsActualCell';
import TasksProgressCell from './tableCells/tasksProgressCell/TasksProgressCell';
import LastActivityCell from './tableCells/lastActivityCell/LastActivityCell';
import ProjectStatusCell from './tableCells/projectStatusCell/ProjectStatusCell';
import ProjectClientCell from './tableCells/projectClientCell/ProjectClientCell';
import ProjectTeamCell from './tableCells/projectTeamCell/ProjectTeamCell';
import ProjectManagerCell from './tableCells/projectManagerCell/ProjectManagerCell';
import ProjectDatesCell from './tableCells/projectDatesCell/ProjectDatesCell';
import ProjectHealthCell from './tableCells/projectHealthCell/ProjectHealthCell';
import ProjectCategoryCell from './tableCells/projectCategoryCell/ProjectCategoryCell';
import ProjectDaysLeftAndOverdueCell from './tableCells/projectDaysLeftAndOverdueCell/ProjectDaysLeftAndOverdueCell';
import ProjectUpdateCell from './tableCells/projectUpdateCell/ProjectUpdateCell';
import ProjectReportsDrawer from '../../../../features/reporting/projectReports/projectReportsDrawer/ProjectReportsDrawer';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleProjectReportsDrawer } from '../../../../features/reporting/projectReports/projectReportsSlice';
import { ExpandAltOutlined } from '@ant-design/icons';
import { colors } from '../../../../styles/colors';
import CustomTableTitle from '../../../../components/CustomTableTitle';

type ProjectReportsTableProps = {
  projectList: any[];
};

const ProjectsReportsTable = ({ projectList }: ProjectReportsTableProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const columnsVisibility = useAppSelector(
    (state) => state.projectReportsTableColumnsReducer
  );

  // function to handle drawer toggle
  const handleDrawerOpen = (id: string) => {
    setSelectedId(id);
    dispatch(toggleProjectReportsDrawer());
  };

  const columns: TableColumnsType = [
    {
      key: 'project',
      title: <CustomTableTitle title="Project" />,
      width: 300,
      onCell: (record) => {
        return {
          onClick: () => handleDrawerOpen(record.id),
        };
      },
      render: (record) => (
        <Flex gap={16} align="center" justify="space-between">
          <ProjectCell
            projectId={record.id}
            project={record.name}
            projectColor={record.color_code}
          />

          {/* used tailwind class to display this button only if hover the row  */}
          <Button
            className="hidden group-hover:flex"
            type="text"
            style={{
              backgroundColor: colors.transparent,
              padding: 0,
              height: 22,
              alignItems: 'center',
              gap: 8,
            }}
          >
            Open <ExpandAltOutlined />
          </Button>
        </Flex>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: 'left' as const,
    },
    {
      key: 'estimatedVsActual',
      title: <CustomTableTitle title="Estimated vs Actual" />,
      render: (record) => (
        <EstimatedVsActualCell
          actualTime={record.actual_time}
          actualTimeString={record.actual_time_string}
          estimatedTime={record.estimated_time}
          estimatedTimeString={record.estimated_time_string}
        />
      ),
      width: 230,
    },
    {
      key: 'tasksProgress',
      title: <CustomTableTitle title="Tasks Progress" />,
      render: (record) => <TasksProgressCell tasksStat={record.tasks_stat} />,
      width: 200,
    },
    {
      key: 'lastActivity',
      title: <CustomTableTitle title="Last Activity" />,
      render: (record) => (
        <LastActivityCell
          activity={record.last_activity?.last_activity_string}
        />
      ),
      width: 200,
    },
    {
      key: 'status',
      title: <CustomTableTitle title="Status" />,
      render: (record) => <ProjectStatusCell status={record.status_name} />,
      sorter: (a, b) => a.status_name.localeCompare(b.status_name),
      width: 200,
    },
    {
      key: 'dates',
      title: <CustomTableTitle title="Start/End Dates" />,
      render: (record) => (
        <ProjectDatesCell
          startDate={record.start_date}
          endDate={record.end_date}
        />
      ),
      width: 275,
    },
    {
      key: 'daysLeft',
      title: <CustomTableTitle title="Days Left/Overdue" />,
      render: (record) => (
        <ProjectDaysLeftAndOverdueCell daysLeft={record.days_left} />
      ),
      width: 200,
    },
    {
      key: 'projectHealth',
      title: <CustomTableTitle title="Project Health" />,
      render: (record) => <ProjectHealthCell />,
      width: 200,
    },
    {
      key: 'category',
      title: <CustomTableTitle title="Category" />,
      render: (record) => (
        <ProjectCategoryCell
          categoryId={record.category_id}
          categoryName={record.category_name}
          categoryColor={record.category_color}
        />
      ),
      width: 200,
    },
    {
      key: 'projectUpdate',
      title: <CustomTableTitle title="Project Update" />,
      render: (record) => <ProjectUpdateCell updates={record.update} />,
      width: 200,
    },
    {
      key: 'client',
      title: <CustomTableTitle title="Client" />,
      render: (record) => <ProjectClientCell client={record.client} />,
      sorter: (a, b) => a.client.localeCompare(b.client),
      width: 200,
    },
    {
      key: 'team',
      title: <CustomTableTitle title="Team" />,
      render: (record) => <ProjectTeamCell team={record.team_name} />,
      sorter: (a, b) => a.team_name.localeCompare(b.team_name),
      width: 200,
    },
    {
      key: 'projectManager',
      title: <CustomTableTitle title="Project Manager" />,
      render: (record) => (
        <ProjectManagerCell manager={record.project_manager} />
      ),
      width: 200,
    },
  ];

  // filter columns based on the `hidden` state from Redux
  const visibleColumns = columns.filter(
    (col) => columnsVisibility[col.key as string]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingBlock: 12,
            cellPaddingInline: 10,
          },
        },
      }}
    >
      <Table
        columns={visibleColumns}
        dataSource={projectList}
        pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
        scroll={{ x: 'max-content' }}
        onRow={(record) => {
          return {
            style: { height: 56, cursor: 'pointer' },
            className: 'group even:bg-[#4e4e4e10]',
          };
        }}
      />

      <ProjectReportsDrawer projectId={selectedId} />
    </ConfigProvider>
  );
};

export default memo(ProjectsReportsTable);
