import { formatTokenPrice } from '@/lib/format-token-price';
import { Bar } from '@/types/bar.type';
import { createChart, ColorType } from 'lightweight-charts';
import React, { FC, useEffect, useRef } from 'react';

type Colors = {
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  areaTopColor?: string;
  areaBottomColor?: string;
}

type Props = {
  data: Bar[];
  colors?: Colors;
}

export const ChartComponent: FC<Props> = (props) => {
  const {
    data,
    colors: {
      backgroundColor = '#0a0a0a',
      lineColor = '#9CBC72',
      textColor = 'white',
      areaTopColor = 'rgba(156, 188, 114, 0.9)',
      areaBottomColor = 'rgba(156, 188, 114, 0.01)',
    } = {},
  } = props;

  const height = 385;
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      if (!chartContainerRef || !chartContainerRef.current) return;
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };


      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
          fontFamily: 'Roboto, sans-serif',
          fontSize: 20,
        },
        width: chartContainerRef.current.clientWidth,
        height,
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          visible: true,
          borderVisible: true,
        },
        localization: {
          priceFormatter: (price: number) => {
            return formatTokenPrice(price);
          },
        },
      });
      chart.timeScale().fitContent();

      const newSeries = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      });
      newSeries.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
    <div ref={chartContainerRef} style={{ height: `${height}px` }} />
  );
};
