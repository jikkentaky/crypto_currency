import { Typography } from "@/app/ui-components/typography";
import styles from "./styles.module.scss";
import { TwitterIcon } from "@/app/ui-components/icons/twitter-icon";
import { TelegramIcon } from "@/app/ui-components/icons/telegram-icon";
import { WebsiteIcon } from "@/app/ui-components/icons/website-icon";
import { useWindowDimensions } from "@/hooks/use-window-dimensions";
import { PlatformLink } from "@/app/components/platform-link";
import {
  blazingPath,
  maestroPath,
  photonPath,
  bulxPath,
  bonkPath,
} from "@/lib/config";

import Link from "next/link";
import { validateLink } from "@/lib/validate-link";
import { useStore } from "@/store";
import { useMemo } from "react";
import cn from 'classnames'

const activeLinkColor = '#73A1FB'
const disabledLinkColor = '#625e5e'
const TradeBlock = () => {
  const { chosenToken } = useStore();
  const { width } = useWindowDimensions();
  const isMobileWidth = width < 1100;
console.log(chosenToken?.token)
  // TODO: refactor 
  const socialLinks = useMemo(() => <ul className={isMobileWidth ? styles["mobile-social-list"] : styles["social-list"]}>
    <li>
      <Link
        href={validateLink(chosenToken?.token?.socialLinks?.twitter || "") || ""}
        target="_blank"
        className={cn(styles.socialLink, {[styles.disabledLink]: !chosenToken?.token.socialLinks?.twitter })}
      >
        <TwitterIcon currentColor={chosenToken?.token.socialLinks?.twitter? activeLinkColor: disabledLinkColor} />
      </Link>
    </li>
    <li>
      <Link
        href={validateLink(chosenToken?.token.socialLinks?.telegram || "")}
        target="_blank"
        className={cn(styles.socialLink, {[styles.disabledLink]: !chosenToken?.token.socialLinks?.telegram })}
      >
       <TelegramIcon currentColor={chosenToken?.token.socialLinks?.telegram? activeLinkColor: disabledLinkColor} />
      </Link>
    </li>
    <li>
      <Link
        href={validateLink(chosenToken?.token.socialLinks?.website || "") }
        target="_blank"
        className={cn(styles.socialLink, {[styles.disabledLink]: !chosenToken?.token.socialLinks?.website })}
      >
         <WebsiteIcon currentColor={chosenToken?.token.socialLinks?.website? activeLinkColor: disabledLinkColor} />
      </Link>
    </li>
  </ul>, [chosenToken, isMobileWidth])

  return (
    <div className={styles["trade-block"]}>
      <Typography className={styles["title"]}>Trade now</Typography>

      <ul className={styles["list"]}>
        <li className={styles.item}>
          <PlatformLink path={blazingPath} href="https://app.blazingbot.com/" />
        </li>
        <li className={styles.item}>
          <PlatformLink
            path={maestroPath}
            href="https://www.maestrobots.com/"
          />
        </li>

        <li className={styles.item}>
          <PlatformLink
            path={photonPath}
            href="https://photon-sol.tinyastro.io/"
          />
        </li>

        <li className={styles.item}>
          <PlatformLink path={bulxPath} href="https://bull-x.io/" />
        </li>
        <li className={styles.item}>
          <PlatformLink path={bonkPath} href="#" />
        </li>
      </ul>

      <div>
        <div className={styles["about"]}>
          <Typography className={styles["about-subtitle"]}>About</Typography>

          {!isMobileWidth && socialLinks}
        </div>

        <Typography className={styles["about-description"]}>
          ONDO is the governance token for Flux FInance and the Ondo DAO.
        </Typography>

        {isMobileWidth && socialLinks}
      </div>
    </div>
  );
};
export { TradeBlock };
