import React, { memo, useState } from 'react';
import { ConfigProvider, Table, TableColumnsType } from 'antd';
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

type ProjectReportsTableProps = {
  projectList: any[];
};

const ProjectsReportsTable = ({ projectList }: ProjectReportsTableProps) => {
  const [hoverRow, setHoverRow] = useState<string | null>(null);

  const columnsVisibility = useAppSelector(
    (state) => state.projectReportsTableColumnsReducer
  );

  console.log('Project list:', projectList);

  const columns: TableColumnsType = [
    {
      key: 'project',
      title: 'Project',
      width: 300,
      render: (record) => (
        <ProjectCell
          projectId={record.id}
          project={record.name}
          projectColor={record.color_code}
          hoverRow={hoverRow || ''}
        />
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: 'left' as const,
    },
    {
      key: 'estimatedVsActual',
      title: 'Estimated vs Actual',
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
      title: 'Tasks Progress',
      render: (record) => <TasksProgressCell tasksStat={record.tasks_stat} />,
      width: 200,
    },
    {
      key: 'lastActivity',
      title: 'Last Activity',
      render: (record) => (
        <LastActivityCell
          activity={record.last_activity?.last_activity_string}
        />
      ),
      width: 200,
    },
    {
      key: 'status',
      title: 'Status',
      render: (record) => <ProjectStatusCell status={record.status_name} />,
      sorter: (a, b) => a.status_name.localeCompare(b.status_name),
      width: 200,
    },
    {
      key: 'dates',
      title: 'Start/End Dates',
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
      title: 'Days Left/Overdue',
      render: (record) => (
        <ProjectDaysLeftAndOverdueCell daysLeft={record.days_left} />
      ),
      width: 200,
    },
    {
      key: 'projectHealth',
      title: 'Project Health',
      render: (record) => <ProjectHealthCell />,
      width: 200,
    },
    {
      key: 'category',
      title: 'Category',
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
      title: 'Project Update',
      render: (record) => <ProjectUpdateCell updates={record.update} />,
      width: 200,
    },
    {
      key: 'client',
      title: 'Client',
      render: (record) => <ProjectClientCell client={record.client} />,
      sorter: (a, b) => a.client.localeCompare(b.client),
      width: 200,
    },
    {
      key: 'team',
      title: 'Team',
      render: (record) => <ProjectTeamCell team={record.team_name} />,
      sorter: (a, b) => a.team_name.localeCompare(b.team_name),
      width: 200,
    },
    {
      key: 'projectManager',
      title: 'Project Manager',
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

  // apply row styles for the table
  const rowClassName = (record: any, index: number) =>
    index % 2 === 0 ? 'even-row' : 'odd-row';

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
        rowClassName={rowClassName}
        onRow={(record) => {
          return {
            onMouseEnter: () => setHoverRow(record.id),
            onMouseLeave: () => setHoverRow(null),
            style: { height: 56 },
          };
        }}
      />
    </ConfigProvider>
  );
};

export default memo(ProjectsReportsTable);
