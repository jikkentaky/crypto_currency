'use client'

import { useStore } from "@/store"
import { TokenFilterResultType } from "@/types/tokenFilterResultType.type"
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable,  Row, ColumnSort } from "@tanstack/react-table"
import { memo, useEffect, useMemo, useState } from "react"
import styles from './styles.module.scss'
import cn from 'classnames'
import { PriceArrowIcon } from "@/app/ui-components/icons/price-arrow-icon"
import { SortArrowIcon } from "@/app/ui-components/icons/sort-arrow-icon"
import { PlatformLink } from "@/app/components/platform-link"
import { blazingPath, maestroPath, photonPath, bulxPath, bonkPath, defaultPath } from "@/lib/config"
import Image from 'next/image'
import { formatTokenPrice } from "@/lib/format-token-price"
import { convertNumber } from "@/lib/convert-number"
import { formatPercentage } from "@/lib/format-percentage"
import { useSortedTokens } from "@/hooks/use-sorted.tokens"
import { SORTING_BY } from "@/types/bubbles.type"

const CoinsTable = () => {
  const { topTokensList, setChosenToken, setIsOpenModal } = useStore();
  const { tokens, setTokens, sortTokensByColumn, sorting } = useSortedTokens()

  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const tableElement = document.querySelector(`.${styles.table}`) as HTMLElement;
      if (tableElement) {
        const scrollTop = window.scrollY;
        const tableTop = tableElement.offsetTop;
        const newTranslateY = Math.max(0, scrollTop - tableTop);
        setTranslateY(newTranslateY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useMemo(() => {
    topTokensList && setTokens(topTokensList);
  }, [topTokensList]);

  const columnHelper = createColumnHelper<TokenFilterResultType>();

  const onClick = (tokenId: string) => {
    setChosenToken(tokenId);
    setIsOpenModal(true);
  }

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
      columnHelper.accessor((row) => row.token.name, {
        id: 'name',
        cell: (info) => {
          const row = info.row.original;
          return (
            <button
              className={cn(styles.button,
                { [styles.selected]: true })
              }
              key={row.token.id}
              onClick={() => onClick(row.token.address)}
            >
              <p className={styles['col-name']} title={row.token.name}>
                <Image
                  loading="lazy"
                  src={row.token.info.imageThumbUrl || defaultPath}
                  width={20}
                  height={20}
                  alt={row.token.name}
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
      columnHelper.accessor((row) => row.priceUSD, {
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
      columnHelper.accessor((row) => row.marketCap, {
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
      columnHelper.accessor((row) => row.volume24, {
        id: 'volume24',
        cell: (info) => (
          <span>
            ${convertNumber(info.getValue())}
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
            1H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change4, {
        id: 'change4',
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
            4H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change12, {
        id: 'change12',
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
            12H
          </span>
        ),
      }),
      columnHelper.accessor((row) => row.change24, {
        id: 'change24',
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
    data: tokens || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sorting as ColumnSort[],
    },
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
                      [styles.links]: header.id === 'links',
                    })}
                    key={header.id}
                    onClick={() => {
                      if (header.id === 'links') return;
                      sortTokensByColumn(header.column.id as SORTING_BY)
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

          {tokens?.length && (
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