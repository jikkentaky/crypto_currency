import { useState, useEffect, FC } from "react";

type Props = {
  styles: {
    [key: string]: string;
  }
}

const useScrollTranslate = ({ styles }: Props) => {
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

  return translateY;
};

export { useScrollTranslate };