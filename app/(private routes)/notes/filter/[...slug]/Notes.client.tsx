"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./App.module.css";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

type NoteListClientProps = { tag?: string };

export default function NoteListClient({ tag }: NoteListClientProps) {
  const [searchText, setSearchText] = useState("");
  const [debouncedText] = useDebounce(searchText, 500);
  const [page, setPage] = useState(1);
  const router = useRouter();
  // const [isModalOpen, setModalOpen] = useState(false);
  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedText]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedText, page, tag],
    queryFn: () => fetchNotes(page, debouncedText || "", tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={searchText} onUpdate={setSearchText} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !isError && data?.notes?.length === 0 && (
          <p>No notes found</p>
        )}
        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}

        {/* {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )} */}
      </main>
    </div>
  );
}
