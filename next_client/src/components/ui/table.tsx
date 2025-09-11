import * as React from "react";

export function Table({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="table-responsive w-100">
            <table
                className={`table table-sm ${className ?? ""}`}
                {...props}
            />
        </div>
    );
}

export function TableHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return <thead className={className} {...props} />;
}

export function TableBody({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody className={className} {...props} />
    );
}

export function TableFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tfoot className={`table-secondary fw-medium ${className ?? ""}`} {...props} />
    );
}

export function TableRow({
    className,
    ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr className={className} {...props} />
    );
}

export function TableHead({
    className,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className={`align-middle fw-medium text-secondary ${className ?? ""}`}
            {...props}
        />
    );
}

export function TableCell({
    className,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            className={`align-middle ${className ?? ""}`}
            {...props}
        />
    );
}
