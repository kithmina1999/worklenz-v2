import { useMemo, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Flex, Tag, theme } from 'antd';
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
  DeleteOutlined,
  EditOutlined,
  HolderOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import StatusDropdown from '@/components/task-list-common/statusDropdown/StatusDropdown';
import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import Avatars from '@/components/avatars/Avatars';

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
        size: 40,
        minSize: 40,
        maxSize: 40,
      },
      {
        accessorKey: 'task_key',
        header: 'Key',
        size: 85,
        cell: ({ row }) => (
          <Tag onClick={() => handleTaskSelect(row.original.id || '')} style={{ cursor: 'pointer' }}>
            {row.original.task_key}
          </Tag>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Task',
        size: 400,
        cell: ({ row }) => (
          <Flex align="center" gap={8} style={{ cursor: 'pointer' }}>
            {(row.original?.sub_tasks_count || 0) > 0 ? (
              <RightOutlined
                style={{
                  transform: expandedRows[row.id] ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpandClick(row.id);
                }}
              />
            ) : (
              <div style={{ width: 14 }} />
            )}
            <span onClick={() => handleTaskSelect(row.original.id || '')}>{row.original.name}</span>
          </Flex>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: ({ row }) => (
          <StatusDropdown
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
        accessorKey: 'names',
        header: 'Assignee',
        size: 160,
        cell: ({ row }) => (
          <Flex align="center" gap={8}>
            <Avatars members={row.original.names || []} maxCount={3} />
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
        accessorKey: 'due_date',
        header: 'Due Date',
        size: 150,
        cell: ({ row }) => (
          <span>{row.original.due_date ? new Date(row.original.due_date).toLocaleDateString() : '-'}</span>
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
    estimateSize: () => 35,
    overscan: 10,
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
        maxHeight: '100%',
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
          overflow: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: index < 2 ? 'sticky' : 'relative',
                      left: index < 1 ? `${index * header.getSize()}px` : 'auto',
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index];
              return (
                <React.Fragment key={row.id}>
                  <tr
                    style={{
                      '&:hover td': {
                        background: `${token.colorFillAlter} !important`,
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        key={cell.id}
                        style={{
                          position: index < 2 ? 'sticky' : 'relative',
                          left: index < 2 ? `${index * cell.column.getSize()}px` : 'auto',
                          background: token.colorBgContainer,
                          color: token.colorText,
                          height: '50px',
                          borderBottom: `1px solid ${token.colorBorderSecondary}`,
                          borderRight: `1px solid ${token.colorBorderSecondary}`,
                          padding: '0 8px',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[row.id] &&
                    row.original.sub_tasks?.map(subTask => (
                      <tr 
                        key={subTask.task_key}
                        style={{
                          '&:hover td': {
                            background: `${token.colorFillAlter} !important`,
                          },
                        }}
                      >
                        {columns.map((col, index) => (
                          <td
                            key={`${subTask.task_key}-${col.id}`}
                            style={{
                              position: index < 2 ? 'sticky' : 'relative',
                              left: index < 2 ? `${index * (col as any).size}px` : 'auto',
                              background: token.colorBgContainer,
                              color: token.colorText,
                              height: '50px',
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
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedCount > 0 && (
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
      )}
    </div>
  );
};

export default TaskListCustom;
