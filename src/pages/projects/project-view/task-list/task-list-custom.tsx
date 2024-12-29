import { useMemo, useRef, useState } from 'react';
import { Avatar, Checkbox, DatePicker, Flex, Select, Tag, theme } from 'antd';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  VisibilityState,
  Row,
  Column,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import {
  HolderOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StatusDropdown from '@/components/task-list-common/statusDropdown/StatusDropdown';
import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import Avatars from '@/components/avatars/Avatars';
import LabelsSelector from '@/components/task-list-common/labelsSelector/labels-selector';
import CustomColorLabel from '@/components/task-list-common/labelsSelector/custom-color-label';
import './task-list-custom.css';
import TaskListInstantTaskInput from './task-list-instant-task-input/task-list-instant-task-input';
import TaskRowName from '@/components/task-list-common/task-row/task-row-name/task-row-name';
interface TaskListCustomProps {
  tasks: IProjectTask[];
  color: string;
  onTaskSelect?: (taskId: string) => void;
}

const TaskListCustom: React.FC<TaskListCustomProps> = ({ tasks, color, onTaskSelect }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const statuses = useAppSelector(state => state.taskStatusReducer.status);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();

  const selectedCount = Object.keys(rowSelection).length;

  const handleExpandClick = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleTaskSelect = (taskId: string) => {
    onTaskSelect?.(taskId);
  };

  const columns = useMemo<ColumnDef<IProjectTask>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            style={{ padding: '8px 6px 8px 0!important' }}
          />
        ),
        cell: ({ row }) => (
          <Flex align="center" gap={4}>
            <HolderOutlined style={{ cursor: 'move' }} />
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </Flex>
        ),
        size: 47,
        minSize: 47,
        maxSize: 47,
      },
      {
        accessorKey: 'task_key',
        header: 'Key',
        size: 85,
        minSize: 85,
        maxSize: 85,
        cell: ({ row }) => (
          <Tag onClick={() => handleTaskSelect(row.original.id || '')} style={{ cursor: 'pointer' }}>
            {row.original.task_key}
          </Tag>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Task',
        size: 450,
        cell: ({ row }) => (
          <TaskRowName
            task={row.original}
            isSubTask={false}
            expandedTasks={Object.keys(expandedRows)}
            setSelectedTaskId={() => {}}
            toggleTaskExpansion={() => {}}
          />
          // <Flex align="center" gap={8} style={{ cursor: 'pointer', position: 'relative' }}>
          //   {(row.original?.sub_tasks_count || 0) > 0 ? (
          //     <RightOutlined
          //       style={{
          //         transform: expandedRows[row.id] ? 'rotate(90deg)' : 'none',
          //         transition: 'transform 0.2s',
          //       }}
          //       onClick={(e) => {
          //         e.stopPropagation();
          //         handleExpandClick(row.id);
          //       }}
          //     />
          //   ) : (
          //     <div style={{ width: 14 }} />
          //   )}
          //   <span onClick={() => handleTaskSelect(row.original.id || '')}>{row.original.name}</span>
          //   <Input
          //     style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'none' }}
          //     defaultValue={row.original.name}
          //     onBlur={(e) => {
          //       // Handle name change
          //       console.log('New name:', e.target.value);
          //     }}
          //   />
          //   <div style={{ position: 'absolute', top: 0, right: 0, display: 'none' }}>Open</div>
          // </Flex>
        ),
      },
      {
        accessorKey: 'names',
        header: 'Assignees',
        size: 159,
        cell: ({ row }) => (
          <Flex align="center" gap={8}>
            <Avatars key={`${row.original.id}-assignees`} members={row.original.names || []} maxCount={3} />
            <Avatar
              size={28}
              icon={<PlusOutlined />}
              className="avatar-add"
              style={{
                backgroundColor: '#ffffff',
                border: '1px dashed #c4c4c4',
                color: '#000000D9',
                cursor: 'pointer',
              }}
            />
          </Flex>
        ),
      },
      {
        accessorKey: 'end_date',
        header: 'Due Date',
        size: 149,
        cell: ({ row }) => (
          <span><DatePicker key={`${row.original.id}-end-date`} placeholder="Set a due date" suffixIcon={null} variant='borderless' /></span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: ({ row }) => (
          <StatusDropdown
            key={`${row.original.id}-status`}
            statusList={statuses}
            status_id={row.original.status}
            onChange={(statusId) => {
              // Handle status change
              console.log('Status changed:', statusId);
            }}
          />
        ),
      },
      {
        accessorKey: 'labels',
        header: 'Labels',
        cell: ({ row }) => (
          <Flex>
            {
              row.original.labels?.map(label => 
                <CustomColorLabel key={`${row.original.id}-${label.id}`} label={label} />
              )
            }
            <LabelsSelector taskId={row.original.id} />
          </Flex>
        ),
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
        size: 149,
        cell: ({ row }) => (
          <span><DatePicker placeholder="Set a start date" suffixIcon={null} variant='borderless' /></span>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 149,
        cell: ({ row }) => (
          <span><Select variant='borderless' options={[{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} /></span>
        ),
      },
    ],
    [expandedRows, statuses, token.colorPrimary]
  );

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    overscan: 20,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <div
      className="task-list-custom"
      style={{
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div
        ref={tableContainerRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowX: 'auto',
          maxHeight: '100%',
        }}
      >
        <div style={{ width: 'fit-content', borderCollapse: 'collapse' }}>
          <div className="table-header">
            {table.getHeaderGroups().map(headerGroup => (
              <div key={headerGroup.id} className="table-row">
                {headerGroup.headers.map((header, index) => (
                  <div
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: index < 2 ? 'sticky' : 'relative',
                      left: 'auto',
                      background: token.colorBgElevated,
                      zIndex: 1,
                      color: token.colorText,
                      height: '40px',
                      borderTop: `1px solid ${token.colorBorderSecondary}`,
                      borderBottom: `1px solid ${token.colorBorderSecondary}`,
                      borderRight: `1px solid ${token.colorBorderSecondary}`,
                      textAlign: index === 0 ? 'right' : 'left',
                      fontWeight: 'normal',
                      padding: '0 8px',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="table-body">
            {paddingTop > 0 && (
              <div style={{ height: `${paddingTop}px` }} />
            )}
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index];
              return (
                <React.Fragment key={row.id}>
                  <div
                    className="table-row"
                    style={{
                      '&:hover div': {
                        background: `${token.colorFillAlter} !important`,
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <div
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          position: index < 2 ? 'sticky' : 'relative',
                          left: 'auto',
                          background: token.colorBgContainer,
                          color: token.colorText,
                          height: '42px',
                          borderBottom: `1px solid ${token.colorBorderSecondary}`,
                          borderRight: `1px solid ${token.colorBorderSecondary}`,
                          padding: '0 8px',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                  </div>
                  {expandedRows[row.id] &&
                    row.original.sub_tasks?.map(subTask => (
                      <div
                        key={subTask.task_key}
                        className="table-row"
                        style={{
                          '&:hover div': {
                            background: `${token.colorFillAlter} !important`,
                          },
                        }}
                      >
                        {columns.map((col, index) => (
                          <div
                            key={`${subTask.task_key}-${col.id}`}
                            style={{
                              width: col.getSize(),
                              position: index < 2 ? 'sticky' : 'relative',
                              left: index < 2 ? `${index * col.getSize()}px` : 'auto',
                              background: token.colorBgContainer,
                              color: token.colorText,
                              height: '42px',
                              borderBottom: `1px solid ${token.colorBorderSecondary}`,
                              borderRight: `1px solid ${token.colorBorderSecondary}`,
                              paddingLeft: index === 3 ? '32px' : '8px',
                              paddingRight: '8px',
                            }}
                          >
                            {flexRender(col.cell, {
                              getValue: () => subTask[col.id as keyof typeof subTask] ?? null,
                              row: { original: subTask } as Row<IProjectTask>,
                              column: col as Column<IProjectTask>,
                              table,
                            })}
                          </div>
                        ))}
                      </div>
                    ))}
                </React.Fragment>
              );
            })}
            {paddingBottom > 0 && (
              <div style={{ height: `${paddingBottom}px` }} />
            )}
          </div>
        </div>
      </div>
      <TaskListInstantTaskInput />
      {/* {selectedCount > 0 && (
        <Flex
          justify="space-between"
          align="center"
          style={{
            padding: '8px 16px',
            background: token.colorBgElevated,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            bottom: 0,
            zIndex: 2,
          }}
        >
          <span>{selectedCount} tasks selected</span>
          <Flex gap={8}>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Flex>
        </Flex>
      )} */}
    </div>
  );
};

export default TaskListCustom;
