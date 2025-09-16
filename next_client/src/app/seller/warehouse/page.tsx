'use client';

import React, { useState, useMemo } from 'react';
import { Table, Button, Form, Container, Card } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table';

interface WarehouseItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

const columnHelper = createColumnHelper<WarehouseItem>();

export default function SellerWarehousePage() {
  const mockData: WarehouseItem[] = [
    { id: 1, name: 'Item A', quantity: 100, location: 'Shelf 1', status: 'in-stock', lastUpdated: '2025-09-15' },
    { id: 2, name: 'Item B', quantity: 5, location: 'Shelf 2', status: 'low-stock', lastUpdated: '2025-09-14' },
    { id: 3, name: 'Item C', quantity: 0, location: 'Shelf 3', status: 'out-of-stock', lastUpdated: '2025-09-13' },
    { id: 4, name: 'Item D', quantity: 250, location: 'Shelf 4', status: 'in-stock', lastUpdated: '2025-09-16' },
     { id: 5, name: 'Item A', quantity: 100, location: 'Shelf 1', status: 'in-stock', lastUpdated: '2025-09-15' },
    { id: 6, name: 'Item B', quantity: 5, location: 'Shelf 2', status: 'low-stock', lastUpdated: '2025-09-14' },
    { id: 7, name: 'Item C', quantity: 0, location: 'Shelf 3', status: 'out-of-stock', lastUpdated: '2025-09-13' },
    { id: 8, name: 'Item D', quantity: 250, location: 'Shelf 4', status: 'in-stock', lastUpdated: '2025-09-16' },
     { id: 9, name: 'Item A', quantity: 100, location: 'Shelf 1', status: 'in-stock', lastUpdated: '2025-09-15' },
    { id: 10, name: 'Item B', quantity: 5, location: 'Shelf 2', status: 'low-stock', lastUpdated: '2025-09-14' },
    { id: 11, name: 'Item C', quantity: 0, location: 'Shelf 3', status: 'out-of-stock', lastUpdated: '2025-09-13' },
    { id: 12, name: 'Item D', quantity: 250, location: 'Shelf 4', status: 'in-stock', lastUpdated: '2025-09-16' },
  ];

  const [data, setData] = useState(mockData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      size: 50,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      size: 200,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      size: 100,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      size: 150,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
  ];

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    state: {
      globalFilter,
      sorting
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Warehouse Inventory</h5>
          <Button variant="primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add Item
          </Button>
        </Card.Header>
        <Card.Body>
          {/* Global Search */}
          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search all columns..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>

          {/* Table */}
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ 
                        width: header.getSize(),
                        cursor: header.column.getCanSort() ? 'pointer' : 'default'
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="d-flex align-items-center">
                          {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                          )}
                          {header.column.getIsSorted() && (
                          <span >
                            {header.column.getIsSorted() === 'asc' ? '🔼' : '🔽'}
                          </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} entries
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {'<<'}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}