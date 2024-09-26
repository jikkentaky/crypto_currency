import { Loader } from '@/app/ui-components/loader';
import { useStore } from '@/store';
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
  const { isLoading } = useStore();
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
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        timeScale: {
          visible: false,
        },
        rightPriceScale: {
          visible: false,
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
    isLoading ? <Loader height={'385px'} /> : <div ref={chartContainerRef} />
  );
};