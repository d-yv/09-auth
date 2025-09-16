import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NoteResponse } from "./clientApi";

async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

export async function checkServerSession() {
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return res;
}

export async function getServerMe() {
  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return res.data;
}

export async function fetchServerNotes(
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> {
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      search: query,
      tag,
      page,
      perPage: 12,
    },
    headers: {
      "Content-Type": "application/json",
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
}

export async function fetchServerNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: await getCookieHeader(),
    },
  });
  return res.data;
}