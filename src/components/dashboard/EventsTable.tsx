'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { Eye, Edit, Trash2, ChevronRight, ChevronLeft } from 'lucide-react'
import moment from 'moment-jalaali'
import { Badge } from '@/components/ui/badge'

export interface EventRow {
  id: string
  title: string
  slug: string
  city: string
  startDate: Date
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  viewCount: number
  saveCount: number
  featuredImage?: string | null
}

interface EventsTableProps {
  data: EventRow[]
  onDelete: (id: string) => void
}

const statusLabels = {
  APPROVED: 'تأیید شده',
  PENDING: 'در انتظار',
  REJECTED: 'رد شده',
}

const statusColors = {
  APPROVED: 'bg-green-100 text-green-700 border-green-300',
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  REJECTED: 'bg-red-100 text-red-700 border-red-300',
}

export const EventsTable: React.FC<EventsTableProps> = ({ data, onDelete }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<EventRow>[] = [
    {
      accessorKey: 'title',
      header: 'عنوان',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {row.original.featuredImage ? (
              <Image
                src={row.original.featuredImage}
                alt={row.original.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                بدون تصویر
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{row.original.title}</p>
            <p className="text-sm text-gray-500">{row.original.city}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'وضعیت',
      cell: ({ row }) => (
        <Badge
          className={`${statusColors[row.original.status]} px-3 py-1 rounded-full text-xs font-medium border`}
        >
          {statusLabels[row.original.status]}
        </Badge>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'تاریخ',
      cell: ({ row }) => (
        <span className="text-sm text-gray-600" dir="rtl">
          {moment(row.original.startDate).format('jYYYY/jMM/jDD')}
        </span>
      ),
    },
    {
      accessorKey: 'viewCount',
      header: 'بازدید',
      cell: ({ row }) => (
        <span className="text-sm text-gray-600" dir="ltr">
          {row.original.viewCount.toLocaleString('fa-IR')}
        </span>
      ),
    },
    {
      accessorKey: 'saveCount',
      header: 'ذخیره',
      cell: ({ row }) => (
        <span className="text-sm text-gray-600" dir="ltr">
          {row.original.saveCount.toLocaleString('fa-IR')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'عملیات',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/events/${row.original.slug}`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="مشاهده"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/organizations/dashboard/events/${row.original.id}/edit`}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="ویرایش"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(row.original.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="جستجوی رویداد..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  رویدادی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            نمایش {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}{' '}
            تا{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            از {table.getFilteredRowModel().rows.length} رویداد
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
