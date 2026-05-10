"use client";

import dynamic from "next/dynamic";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

import "react-notion-x/src/styles.css";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false },
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}

export function NotionPage({ recordMap, rootPageId }: NotionPageProps) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      rootPageId={rootPageId}
      fullPage={false}
      darkMode={false}
      mapPageUrl={(id: string) => `/n/${id.replace(/-/g, "")}`}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
      }}
    />
  );
}
