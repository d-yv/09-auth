"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

const tags: string[] = [
  "All",
  "Personal",
  "Work",
  "Shopping",
  "Meeting",
  "Todo",
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
        Notes {isOpen ? "▴" : "▾"}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          {/* <li className={css.menuItem}> */}
            {tags.map((tag) => (
              <li className={css.menuItem} key={tag}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  onClick={() => setIsOpen(false)}
                >
                  {tag}
                </Link>
              </li>
            ))}
          {/* </li> */}
        </ul>
      )}
    </div>
  );
}
