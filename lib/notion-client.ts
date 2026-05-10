import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

let api: NotionAPI | null = null;

function getClient(): NotionAPI {
  if (!api) {
    api = new NotionAPI();
  }
  return api;
}

export async function getNotionPage(pageId: string): Promise<ExtendedRecordMap> {
  return getClient().getPage(pageId);
}
