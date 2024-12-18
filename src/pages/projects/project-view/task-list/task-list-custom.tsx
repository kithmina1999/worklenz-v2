import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import './task-list-custom.css';

const TanStackTable = ({ 
  data, 
  columns 
}: {
  data: any[];
  columns: { accessorKey: string }[];
}) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    columns.reduce((acc: Record<string, boolean>, col) => {
      acc[col.accessorKey] = true;
      return acc;
    }, {})
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // row height
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const isAnyRowSelected = Object.keys(rowSelection).length > 0;

  const toggleRowSelection = (rowId: string) => {
    setRowSelection((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <div className="table-container">
      <div className="column-toggle">
        {columns.map((col) => (
          <label key={col.accessorKey}>
            <input
              type="checkbox"
              checked={columnVisibility[col.accessorKey] || false}
              onChange={() =>
                setColumnVisibility((prev) => ({
                  ...prev,
                  [col.accessorKey]: !prev[col.accessorKey],
                }))
              }
            />
            {col.accessorKey}
          </label>
        ))}
      </div>

      <div className="table" ref={parentRef} style={{ overflow: 'auto', maxHeight: '400px' }}>
        <div
          style={{
            height: `${totalSize}px`,
            position: 'relative',
            width: '100%',
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                className={`table-row ${
                  rowSelection[row.id] ? 'row-selected' : ''
                }`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => toggleRowSelection(row.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="table-cell">
                    {cell.getValue() as React.ReactNode}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {isAnyRowSelected && (
        <div className="action-bar">
          <button onClick={() => console.log('Action 1 executed')}>Action 1</button>
          <button onClick={() => console.log('Action 2 executed')}>Action 2</button>
        </div>
      )}
    </div>
  );
};

export default TanStackTable;
