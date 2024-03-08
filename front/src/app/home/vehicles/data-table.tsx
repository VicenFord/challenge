"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Check, X } from 'lucide-react';


import {
  SortingState,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })
  

  return (
    <div>
        <div className="flex items-center py-4">
        <Input
          placeholder="Filter by brand..."
          value={(table.getColumn("brand")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("brand")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ms-1"
        />
      </div>

    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-virtualisa">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center text-sm text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  if(cell.column.id === "plate") {
                    return(
                    <TableCell key={cell.id} className="text-center">
                      {(cell.getValue() as string).toUpperCase()}
                    </TableCell>
                    )
                  }

                  if(cell.column.id === "is_available") {
                    return(
                    <TableCell key={cell.id} className="text-center">
                      {cell.getValue() ? <Check style={{ color: "green", margin: "auto" }} /> : <X style={{ color: "red", margin: "auto" }} />}
                    </TableCell>
                    )
                  }
                  
                  return <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
    
  )
}
