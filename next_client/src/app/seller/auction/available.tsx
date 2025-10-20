'use client';

import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auction } from "@/app/entities/auction";
import { createClientAxios } from "@/lib/axiosClient";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button, Card, Container, Form, Table } from 'react-bootstrap';
import AddEditModal from "./modal/addEdit";

export default function SellerAvailableAuctionPage({customStyle}: {customStyle?: string}) {
    const router = useRouter();
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [scheduleAuction, setScheduleAuction] = React.useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = React.useState<Auction | undefined>(undefined);
    const [addEditMode, setAddEditMode] = React.useState<'add' | 'edit' | 'view' | 'hide'>('hide');

    const columnHelper = createColumnHelper<Auction>();
        const columns = [
            columnHelper.accessor('startTime', {
                header: 'Start Time',
                cell: info => new Date(info.getValue()).toLocaleString(),
                footer: info => info.column.id,
            }),
            columnHelper.accessor('title', {
                header: 'Title',
                cell: info => info.getValue(),
                footer: info => info.column.id,
            }),
            columnHelper.accessor('startingPrice', {
                header: 'Starting Price',
                cell: info => `${info.getValue()} VND`,
                footer: info => info.column.id,
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: info => (
                    <Button variant="outline-primary" size="sm">Edit</Button>
                )
            }),
        ];

    const table = useReactTable({
            data: scheduleAuction,
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
    useEffect(() => {
        const fetchScheduledAuctions = async () => {
            try {
                const axiosInstance = await createClientAxios('seller');
                await axiosInstance.get('/api/auction/scheduled')
                    .then(res => { setScheduleAuction(res.data); })
                    .catch(err => { router.push('/login?role=seller'); });
            } catch (error) {
                console.error('Error fetching scheduled auctions:', error);
            }
        };

        fetchScheduledAuctions();
    }, []);

    return (
         <Card className={customStyle}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Schedule Auction</h5>
                    <div className='d-flex'>
                        <Button variant="primary" onClick={() => setAddEditMode('add')}>
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Auction
                        </Button>
                        <Button variant="secondary" className="ms-2">
                            <i className="bi bi-calendar-event me-2"></i>
                            Edit Auction
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search all columns..."
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            style={{ maxWidth: '300px' }}
                        />
                        <Button variant="outline-secondary" className="ms-2">
                            <i className="bi bi-funnel"></i> Filter
                        </Button>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id}
                                            style={{
                                                width: header.getSize(),
                                                cursor: header.column.getCanSort() ? 'pointer' : 'default'
                                            }}
                                            onClick={header.column.getToggleSortingHandler()}>
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
                <AddEditModal 
                mode={addEditMode}
                auction={selectedAuction} 
                onClose={() =>
                    { 
                        setAddEditMode('hide')
                        setSelectedAuction(undefined);
                    }
                }/>
            </Card>
    );
}
