"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    getMe()
      .then((freshUser) => {
        setUserEmail(freshUser.email);
        setUsername(freshUser.username);
        setAvatarUrl(freshUser.avatar);
        setUser(freshUser);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError("Failed to load profile data.");
      });
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateMe({ username });
      setUser({ username, email: userEmail, avatar: avatarUrl });
      router.push("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <p>Email: {userEmail}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
