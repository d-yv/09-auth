import css from "./SidebarNotes.module.css";
import Link from "next/link";

const tags: string[] = [
  "All",
  "Personal",
  "Work",
  "Shopping",
  "Meeting",
  "Todo",
];

export default function SideBarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
