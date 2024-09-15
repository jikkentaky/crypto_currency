import { Loader } from '@/app/ui-components/loader';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = '#2a2a2a',
      lineColor = '#9CBC72',
      textColor = 'white',
      areaTopColor = 'rgba(156, 188, 114, 0.9)',
      areaBottomColor = 'rgba(156, 188, 114, 0.01)',
    } = {},
  } = props;

  const chartContainerRef = useRef<any>(null);

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
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
    props.isLoading ? <Loader height={385} /> : <div ref={chartContainerRef} />
  );
};