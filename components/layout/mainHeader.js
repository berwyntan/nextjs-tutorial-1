import Link from "next/link";
import classes from "./mainHeader.module.css";
import { UserButton } from "@clerk/nextjs";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
      <UserButton />
    </header>
  );
};

export default MainHeader;
