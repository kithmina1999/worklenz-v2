import { useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Flex, Tag, theme } from 'antd';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { DeleteOutlined, EditOutlined, HolderOutlined, RightOutlined } from '@ant-design/icons';
import StatusDropdown from '@/components/task-list-common/statusDropdown/StatusDropdown';

interface TaskListCustomProps {
  tasks: IProjectTask[];
  color: string;
  onTaskSelect?: (taskId: string) => void;
}

const TaskListCustom = ({ tasks, color, onTaskSelect }: TaskListCustomProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();

  const selectedCount = Object.keys(rowSelection).length;

  const handleExpandClick = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const columns = useMemo<ColumnDef<IProjectTask>[]>(
    () => [
      {
        id: 'handle',
        header: () => <div></div>,
        cell: () => (
          <div>
            <HolderOutlined />
          </div>
        ),
        size: 5,
        minSize: 5,
        maxSize: 5,
      },
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
          <div>
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
        size: 10,
        minSize: 10,
        maxSize: 10,
      },
      {
        accessorKey: 'task_key',
        header: 'Key',        
        size: 60,
        align: 'center',
        cell: ({ row }) => {
          return <Tag>{row.original.task_key}</Tag>;
        },
      },
      {
        accessorKey: 'name',
        header: 'Task',
        size: 400,
        cell: ({ row }) => (
          <Flex align="center" gap={8}>
            {(row.original?.sub_tasks_count || 0) > 0 ? (
              <RightOutlined 
                style={{ 
                  cursor: 'pointer',
                  transform: expandedRows[row.id] ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s'
                }}
                onClick={() => handleExpandClick(row.id)}
              />
            ) : (
              <div style={{ width: 14 }} /> 
            )}
            {row.original.name}
          </Flex>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        cell: ({ row }) => {
          return <StatusDropdown status_id={row.original.status} onChange={() => {}} />;
        },
      },
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        size: 200,
      },
      {
        accessorKey: 'due_date',
        header: 'Due Date',
        size: 150,
      },
    ],
    [expandedRows]
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
                      borderBottom: `1px solid ${token.colorBorderSecondary}`,
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
                <>
                  <tr key={row.id}>
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
                          textAlign: index <= 2 ? 'center' : 'left',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[row.id] && row.original.sub_tasks?.map(subTask => (
                    <tr key={`${row.id}-${subTask.task_key}`}>
                      {columns.map((col, index) => (
                        <td
                          key={`${row.id}-${subTask.task_key}-${col.id}`}
                          style={{
                            position: index < 2 ? 'sticky' : 'relative',
                            left: index < 2 ? `${index * (col as any).size}px` : 'auto',
                            background: token.colorBgContainer,
                            color: token.colorText,
                            height: '50px',
                            borderBottom: `1px solid ${token.colorBorderSecondary}`,
                            textAlign: index <= 2 ? 'center' : 'left',
                            paddingLeft: index === 3 ? '32px' : undefined,
                          }}
                        >
                          {col.accessorKey ? subTask[col.accessorKey as keyof typeof subTask] : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
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
