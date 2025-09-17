import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const user = await getServerMe();
    return {
      title: `${user.username} - NoteHub`,
      description: `Profile page of ${user.username}`,
      openGraph: {
        title: `${user.username} - NoteHub`,
        description: `Profile page of ${user.username}`,
        url: `https://09-auth-ten-teal.vercel.app/profile`,
        images: [
          {
            url: user.avatar,
            width: 1200,
            height: 630,
            alt: `${user.username}'s Avatar`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Not authorized - NoteHub",
      description: "You need to sign in to view this profile.",
    };
  }
}

export default async function Profile() {
  try {
    const user = await getServerMe();

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    );
  } catch {
    redirect("/sign-in");
  }
}
