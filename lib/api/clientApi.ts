import type {Note} from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export type RegisterRequest = {
    email: string,
    password: string,
}

export type LoginRequest =  {
    email: string,
    password: string,
}

export type UpdateMeRequest = {
    username?: string,
}

export async function getMe () {
const res = await nextServer.get<User>('users/me');
return res.data;
};

export async function updateMe (data: UpdateMeRequest): Promise<User> {
const res = await nextServer.patch<User>('users/me', data);
return res.data;
}

export async function register (data: RegisterRequest) {
const res = await nextServer.post<User>('auth/register', data);
return res.data
}

export async function login (data: LoginRequest) {
const res = await nextServer.post<User>('auth/login', data);
return res.data
}

export async function logout (): Promise<void> {
await nextServer.post('auth/logout');
}

export async function checkSession () {
    const res = await nextServer.get('/auth/session');
    return res;
};

export async function createNote (newNote: CreateNoteParams): Promise<Note> {
    
    const res = await nextServer.post<Note>('/notes', newNote, {headers: {
        'Content-Type': 'application/json',
    }});
    return res.data;
}

export async function deleteNote (id: string): Promise<Note> {
    const res = await nextServer.delete<Note>(`/notes/${id}`, {headers: {
        'Content-Type': 'application/json',
    }})
    return res.data;
}

export async function fetchNoteById (id: string): Promise<Note>  {
    const res = await nextServer.get<Note>(`/notes/${id}`, {headers: {
        'Content-Type': 'application/json',
    }});
    return res.data;
}

export async function fetchNotes (page: number, query: string, tag?: string): Promise<NoteResponse> {
    const params = {
        params: {
            search: query,
            tag: tag,
            page: page,
            perPage: 12,
        },
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await nextServer.get<NoteResponse>('/notes', params);
    return response.data;
}
