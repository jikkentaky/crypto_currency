import { FC } from "react";
import Image from "next/image";

type Props = {
  path: string,
  href: string
  size?: number
}

const PlatformLink: FC<Props> = ({ path, href, size = 40 }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <Image
        loading="lazy"
        src={path}
        alt="Maestro"
        width={size}
        height={size}
      />
    </a>
  );
};

export { PlatformLink };