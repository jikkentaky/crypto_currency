'use client'

import { useStore } from "@/store"
import { TokenFilterResultType } from "@/types/tokenFilterResultType.type"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, ColumnSort, ColumnResizeMode, ColumnSizingState } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import styles from './styles.module.scss'
import cn from 'classnames'

const CoinsTable = () => {
  const { topTokensList } = useStore();

  const tableData = useMemo(() => topTokensList, [topTokensList]);

  const columnHelper = createColumnHelper<TokenFilterResultType>();

  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const toggleSorting = (columnId: string) => {
    setSorting((oldSorting) => {
      const currentSort = oldSorting.find((sort) => sort.id === columnId);

      if (!currentSort) {
        return [{ id: columnId, desc: true }];
      }

      if (currentSort.desc) {
        return [{ id: columnId, desc: false }];
      }

      return [{ id: columnId, desc: true }];
    });
  };

  const columns: ColumnDef<TokenFilterResultType, string>[] = [
    columnHelper.accessor((_row, index) => (index + 1).toString(), {
      id: 'RANK',
      cell: (info) => <p>{info.getValue() || '-'}</p>,
      header: () => (
        <span>
          RANK
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.token.name.length > 10 ? row.token.name.slice(0, 10) + '...' : row.token.name, {
      id: 'name',
      cell: (info) => {
        const row = info.row.original;
        return (
          <p style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '20px'
          }}
          >
            <img
              loading="lazy"
              src={row.token.info.imageThumbUrl}
              alt={row.token.name}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />

            {info.getValue()}
          </p>
        );
      },
      header: () => (
        <span>
          NAME
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.priceUSD, {
      id: 'priceUSD',
      cell: (info) => (
        <span>
          {Number(info.getValue()).toLocaleString('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })}
        </span>
      ),
      header: () => (
        <span>
          PRICE
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.marketCap, {
      id: 'marketCap',
      cell: (info) => <p>{info.getValue() || '-'}</p>,
      header: () => (
        <span>
          M CAP
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.volume24, {
      id: 'volume24',
      cell: (info) => <p>{info.getValue() || '-'}</p>,
      header: () => (
        <span>
          24H VOLUME
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.change1, {
      id: 'change1',
      cell: (info) => <p>{Number(info.getValue()).toFixed(2) + '%' || '-'}</p>,
      header: () => (
        <span>
          HOUR
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.change4, {
      id: 'change4',
      cell: (info) => <p>{Number(info.getValue()).toFixed(2) + '%' || '-'}</p>,
      header: () => (
        <span>
          4 HOUR
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.change12, {
      id: 'change12',
      cell: (info) => <p>{Number(info.getValue()).toFixed(2) + '%' || '-'}</p>,
      header: () => (
        <span>
          12 HOUR
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.change24, {
      id: 'change24',
      cell: (info) => <p>{Number(info.getValue()).toFixed(2) + '%' || '-'}</p>,
      header: () => (
        <span>
          24 HOUR
        </span>
      ),
    }),
    columnHelper.accessor(() => '', {
      id: 'links',
      cell: (info) => <p>{info.getValue() || '-'}</p>,
      minSize: 500,
      header: () => (
        <span>
          LINKS
        </span>
      ),
    }),
  ]

  const sizes: ColumnSizingState = {
    columnSizingStart: 95,
  };

  const table = useReactTable({
    columns,
    data: tableData || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    state: {
      sorting,
      columnSizing: sizes,
    },
    onSortingChange: setSorting,
  });

  return (
    <table className={styles['table']}>
      <thead className={styles['table-head']}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className={cn(styles['table-th'], {
                  [styles.links]: header.id === 'links',
                })}
                key={header.id}
                onClick={() => toggleSorting(header.column.id)}
                style={{ width: `${header.getSize()}px`, }}

              >
                {header.column.getIsSorted() === 'asc' ? ' ▲' : ' ▼'}

                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {tableData && tableData.length > 0 && (
        <tbody className={styles['table-body']}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles['table-row']}>
              {row.getVisibleCells().map((cell) => {
                const columnId = cell.column.id;
                const value = Number(cell.getValue());
                const isChangeColumn = columnId === 'change1' || columnId === 'change4' || columnId === 'change12' || columnId === 'change24';
                const cellClass = cn(styles['table-cell'], {
                  [styles['positive']]: isChangeColumn && value > 0,
                  [styles['negative']]: isChangeColumn && value < 0,
                  [styles['neutral']]: isChangeColumn && value === 0,
                  [styles['border']]: isChangeColumn,
                });

                return (
                  <td className={cellClass} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export { CoinsTable };

