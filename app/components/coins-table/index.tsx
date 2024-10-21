'use client'

import { useStore } from "@/store"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable, Row } from "@tanstack/react-table"
import { memo, useMemo } from "react"
import styles from './styles.module.scss'
import cn from 'classnames'
import { PriceArrowIcon } from "@/app/ui-components/icons/price-arrow-icon"
import Image from 'next/image'
import { formatTokenPrice } from "@/lib/format-token-price"
import { convertNumber } from "@/lib/convert-number"
import { formatPercentage } from "@/lib/format-percentage"
import { CoingeckoCoinData } from "@/types/coingecko.type"
import { useScrollTranslate } from "@/hooks/use-scroll-translate"

const CoinsTable = () => {
  const { topTokensList, setChosenToken, setIsOpenModal } = useStore();
  const translateY = useScrollTranslate({ styles });
  const columnHelper = createColumnHelper<CoingeckoCoinData>();

  const onClick = (tokenId: string) => {
    setChosenToken(tokenId);
    setIsOpenModal(true);
  }

  const columns = useMemo<Array<ColumnDef<CoingeckoCoinData, any>>>(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => {
          const row = info.row.original;
          return (
            <button
              className={cn(styles.button,
                { [styles.selected]: true })
              }
              key={row.id}
              onClick={() => onClick(row.id)}
            >
              <p className={styles['col-name']} title={row.name}  key={row.id}>
                <Image
                  loading="lazy"
                  src={row.image}
                  width={20}
                  height={20}
                  alt={row.name}
                  style={{ marginRight: '8px' }}
                />

                {info.getValue()}
              </p>
            </button>
          );
        },
        header: () => (
          <span>
            NAME
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.current_price, {
        id: 'priceUSD',
        cell: (info) => (
          <span>
            ${formatTokenPrice(info.getValue())}
          </span>
        ),
        header: () => (
          <span>
            PRICE
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.market_cap, {
        id: 'marketCap',
        cell: (info) => (
          <span>
            ${convertNumber(info.getValue())}
          </span>
        ),
        header: () => (
          <span>
            M CAP
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.total_volume, {
        id: 'volume',
        cell: (info) => (
          <span>
            ${convertNumber(info.getValue())}
          </span>
        ),
        header: () => (
          <span>
            VOLUME
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.price_change_percentage_1h_in_currency, {
        id: 'price_change_percentage_1h_in_currency',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = formatPercentage(value) + ' %';

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
            HOUR
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.price_change_percentage_24h, {
        id: 'price_change_percentage_24h',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = formatPercentage(value) + ' %';

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
            DAY
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.price_change_percentage_7d_in_currency, {
        id: 'price_change_percentage_7d_in_currency',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = formatPercentage(value) + ' %';

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
            WEEK
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.price_change_percentage_30d_in_currency, {
        id: 'price_change_percentage_30d_in_currency',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = formatPercentage(value) + ' %';

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
            MONTH
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.price_change_percentage_1y_in_currency, {
        id: 'price_change_percentage_1y_in_currency',
        cell: (info) => {
          const value = info.getValue();
          const formattedValue = formatPercentage(value) + ' %';

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
            YEAR
          </span>
        ),
      }),
    ], [])

  const table = useReactTable({
    columns,
    data: topTokensList || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    topTokensList?.length &&
    <div className={styles.border}>
      <div className={styles.container}>
        <table className={styles['table']}>
          <thead className={styles['table-head']} style={{ transform: `translateY(${translateY - 1}px)` }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={cn(styles['table-th'], {
                    })}
                    key={header.id}
                    style={{ width: `${header.getSize()}px`, }}
                  >
                    <div>
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

          {topTokensList?.length && (
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

const TableRow = memo(({ row }: { row: Row<CoingeckoCoinData> }) => {
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