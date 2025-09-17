import css from "./NotesClient.module.css";
import NoteListClient from "./Notes.client";
import { fetchServerNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug[0]} Notes`,
    description: `${slug[0]} Notes`,
    openGraph: {
      title: `${slug[0]} Notes`,
      description: `${slug[0]} Notes`,
      url: `https://09-auth-ten-teal.vercel.app/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${slug[0]} Notes`,
        },
      ],
    },
  };
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const tag = slug[0] === "All" ? undefined : slug[0];

  queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag: tag }],
    queryFn: () => fetchServerNotes(1, "", tag),
  });
  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteListClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
