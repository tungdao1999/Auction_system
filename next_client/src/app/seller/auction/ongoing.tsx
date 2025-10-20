
import { Auction } from "@/app/entities/auction";
import { createClientAxios } from "@/lib/axiosClient";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

export const SellerOngoingAuctionPage = ({ customStyle }: { customStyle?: string }) => {
    const router = useRouter();
    const [ongoingAuctions, setOngoingAuctions] = useState<any[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {
        // Fetch ongoing auctions from API and set state
        const fetchOngoingAuctions = async () => {
            try {
                const axiosClient = createClientAxios('seller');
                await axiosClient.get('/api/auction/ongoing')
                    .then(res => { setOngoingAuctions(res.data) })
                    .catch(err => { router.push('/login?role=seller') });
            }
            catch (error) {
                console.error("Error fetching ongoing auctions:", error);
            }
        };
        fetchOngoingAuctions();
    }, []);

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
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: info => (
                <Button variant="outline-primary" size="sm">Edit</Button>
            )
        }),
    ];
    const table = useReactTable({
        data: ongoingAuctions,
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
        <Card className={customStyle}>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Ongoing Auction</h5>
            </Card.Header>
            <Card.Body>
                {ongoingAuctions.length > 0 ? (
                    <Table striped bordered hover>
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
                ) : (
                    <p>No ongoing auctions at the moment.</p>
                )}
            </Card.Body>
        </Card>
    )
};