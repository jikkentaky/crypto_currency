'use client'

import { useStore } from "@/store"
import { TokenFilterResultType } from "@/types/tokenFilterResultType.type"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable, ColumnSort, Row } from "@tanstack/react-table"
import { memo, useCallback, useMemo, useState } from "react"
import styles from './styles.module.scss'
import cn from 'classnames'
import { PriceArrowIcon } from "@/app/ui-components/icons/price-arrow-icon"
import { SortArrowIcon } from "@/app/ui-components/icons/sort-arrow-icon"
import { sortFilterTokens } from "@/app/api/lib";
import { PlatformLink } from "@/app/components/platform-link"
import { blazingPath, maestroPath, photonPath, bulxPath, bonkPath } from "@/lib/config"
import Image from 'next/image'

const CoinsTable = () => {
  const { topTokensList } = useStore();
  const [tableData, setTableData] = useState<TokenFilterResultType[] | null>(null);

  useMemo(() => {
    setTableData(topTokensList);
  }, [topTokensList]);

  const columnHelper = createColumnHelper<TokenFilterResultType>();

  const [sorting, setSorting] = useState<ColumnSort[]>([{ id: 'rank', desc: false }]);

  const toggleSorting = useCallback((columnId: string) => {
    setSorting((oldSorting) => {
      const currentSort = oldSorting.find((sort) => sort.id === columnId);

      const desc = currentSort ? !currentSort.desc : false;
      const newSorting = [{ id: columnId, desc }];

      sortFilterTokens(tableData, columnId as keyof TokenFilterResultType, newSorting[0].desc ? 'desc' : 'asc')
        .then(setTableData);

      return newSorting;
    });
  }, [tableData]);

  const columns = useMemo<Array<ColumnDef<TokenFilterResultType, any>>>(
    () => [
      columnHelper.accessor((row) => row.rank, {
        id: 'rank',
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
              <Image
                loading="lazy"
                src={row.token.info.imageThumbUrl || ''}
                width={20}
                height={20}
                alt={row.token.name}
                style={{ marginRight: '8px' }}
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
              <PriceArrowIcon className={cn({
                [styles['up-r']]: value > 0,
                [styles['down-r']]: value < 0
              })} />
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
              <PriceArrowIcon className={cn({
                [styles['up-r']]: value > 0,
                [styles['down-r']]: value < 0
              })} />
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
              <PriceArrowIcon className={cn({
                [styles['up-r']]: value > 0,
                [styles['down-r']]: value < 0
              })} />
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
              <PriceArrowIcon className={cn({
                [styles['up-r']]: value > 0,
                [styles['down-r']]: value < 0
              })} />
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
          <PlatformLink path={blazingPath} href="https://app.blazingbot.com/" size={24} />
          <PlatformLink path={maestroPath} href="https://www.maestrobots.com/" size={24} />
          <PlatformLink path={photonPath} href="https://photon-sol.tinyastro.io/" size={24} />
          <PlatformLink path={bulxPath} href="https://bull-x.io/" size={24} />
          <PlatformLink path={bonkPath} href="#" size={24} />
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
    state: {
      sorting,
    },
  });

  return (
    topTokensList?.length &&
    <div className={styles.border}>
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
            className={cn(styles['table-cell'], {
              [styles.links]: cell.column.id === 'links',
            })}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr >
  );
});