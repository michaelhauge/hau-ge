import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageTitle } from "notion-utils";
import type { ExtendedRecordMap } from "notion-types";
import { getNotionPage } from "@/lib/notion-client";
import { NotionPage } from "@/components/notion/NotionPage";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

async function fetchPageSafe(
  pageId: string,
): Promise<ExtendedRecordMap | null> {
  try {
    return await getNotionPage(pageId);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageId: string }>;
}): Promise<Metadata> {
  const { pageId } = await params;
  const recordMap = await fetchPageSafe(pageId);
  if (!recordMap) return { title: "Page not found" };
  const title = getPageTitle(recordMap) || "Page";
  return {
    title,
    description: `${title} | Michael Hauge`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const recordMap = await fetchPageSafe(pageId);
  if (!recordMap) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <NotionPage recordMap={recordMap} rootPageId={pageId} />
    </article>
  );
}
