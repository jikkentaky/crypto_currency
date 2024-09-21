'use client'

import { useStore } from "@/store"
import { TokenFilterResultType } from "@/types/tokenFilterResultType.type"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, ColumnSort, Row, } from "@tanstack/react-table"
import { memo, useMemo, useState } from "react"
import styles from './styles.module.scss'
import cn from 'classnames'
import { BBIcon, MaestroIcon, PhotonIcon, BullxIcon, BonkIcon } from "@/app/ui-components/icons"
import { PriceArrowIcon } from "@/app/ui-components/icons/price-arrow-icon"
import { SortArrowIcon } from "@/app/ui-components/icons/sort-arrow-icon"

const CoinsTable = () => {
  const { topTokensList } = useStore();

  const tableData = useMemo(() => topTokensList, [topTokensList]);

  const columnHelper = createColumnHelper<TokenFilterResultType>();

  const [sorting, setSorting] = useState<ColumnSort[]>([{ id: 'RANK', desc: false }]);

  const toggleSorting = (columnId: string) => {
    setSorting((oldSorting) => {
      const currentSort = oldSorting.find((sort) => sort.id === columnId);

      if (!currentSort) {
        return [{ id: columnId, desc: false }];
      }

      if (currentSort.desc) {
        return [{ id: columnId, desc: false }];
      }

      return [{ id: columnId, desc: true }];
    });
  };

  const columns = useMemo<Array<ColumnDef<TokenFilterResultType, any>>>(
    () => [
      columnHelper.accessor((_row, index) => (index + 1).toString(), {
        id: 'RANK',
        cell: (info) => <p>{info.getValue()}</p>,
        header: () => (
          <span>
            RANK
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.token.name.length > 10 ? row.token.name.slice(0, 8) + '...' : row.token.name, {
        id: 'name',
        cell: (info) => {
          const row = info.row.original;
          return (
            <p className={styles['col-name']} title={row.token.name}>
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
            ${info.getValue().toLocaleString('en-US', {
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
        cell: (info) => (
          <span>
            ${info.getValue().toLocaleString('en-US')}
          </span>
        ),
        header: () => (
          <span>
            M CAP
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.volume24, {
        id: 'volume24',
        cell: (info) => (
          <span>
            ${info.getValue().toLocaleString('en-US')}
          </span>
        ),
        header: () => (
          <span>
            24H VOL
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change1, {
        id: 'change1',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = Math.abs(value).toFixed(2) + '%';

          return (
            <p className={styles['price-change']}>
              <PriceArrowIcon className={cn({ [styles['up-r']]: value < 0 })} />
              {formattedValue}
            </p>
          );
        },
        header: () => (
          <span>
            1H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change4, {
        id: 'change4',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = Math.abs(value).toFixed(2) + '%';

          return (
            <p className={styles['price-change']}>
              <PriceArrowIcon className={cn({ [styles['up-r']]: value < 0 })} />
              {formattedValue}
            </p>
          );
        },
        header: () => (
          <span>
            4H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change12, {
        id: 'change12',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = Math.abs(value).toFixed(2) + '%';

          return (
            <p className={styles['price-change']}>
              <PriceArrowIcon className={cn({ [styles['up-r']]: value < 0 })} />
              {formattedValue}
            </p>
          );
        },
        header: () => (
          <span>
            12H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change24, {
        id: 'change24',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = Math.abs(value).toFixed(2) + '%';

          return (
            <p className={styles['price-change']}>
              <PriceArrowIcon className={cn({ [styles['up-r']]: value < 0 })} />
              {formattedValue}
            </p>
          );
        },
        header: () => (
          <span>
            24H
          </span>
        ),
      }),
      columnHelper.accessor(() => '', {
        id: 'links',
        cell: () => <div className={styles['links-content']}>
          <BBIcon />
          <MaestroIcon />
          <PhotonIcon />
          <BullxIcon />
          <BonkIcon />
        </div>,
        header: () => (
          <span>
            LINKS
          </span>
        ),
      }),
    ], [])

  const table = useReactTable({
    columns,
    data: tableData || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    topTokensList?.length && <div className={styles.border}>
      <div className={styles.container}>
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
                    onClick={() => {
                      if (header.id === 'links') return;

                      toggleSorting(header.column.id)
                    }}
                    style={{ width: `${header.getSize()}px`, }}
                  >
                    <div className={cn(header.id === 'links' && styles.end, styles['table-th-content'])}>
                      {header.id !== 'links' &&
                        <SortArrowIcon
                          className={cn(header.column.getIsSorted() == 'asc' && styles.up)}
                        />
                      }

                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {tableData && tableData.length > 0 && (
            <tbody className={styles['table-body']}>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export { CoinsTable };

const TableRow = memo(({ row }: { row: Row<TokenFilterResultType> }) => {
  return (
    <tr key={row.id} className={styles['table-row']}>
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            className={cn(styles['table-cell'])}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr >
  );
});