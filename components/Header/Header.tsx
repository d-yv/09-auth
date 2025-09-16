import TagsMenu from "@/components/TagsMenu/TagsMenu";
import css from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <AuthNavigation />
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
