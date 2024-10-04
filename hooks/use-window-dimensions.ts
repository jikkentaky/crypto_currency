import { appConfig } from '@/lib/config';
import { useState, useEffect } from 'react';
const { aside } = appConfig

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    function handleResize() {
      // // const scroll = window.innerWidth > 1110 ? 10 : 5
      // // let width

      // // if (window.innerWidth > 1920) {
      // //   width = 1920 - aside
      // // } else if (window.innerWidth > 1110) {
      // //   width = window.innerWidth - aside - scroll
      // // } else {
      // //   width = window.innerWidth
      // // }

      // const header = window.innerWidth > 1100 ? 81 : 60
      // const footer = window.innerWidth <= 1100 ? 105 : 0
      // const height = window.innerHeight - header - footer

      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
}

export { useWindowDimensions };