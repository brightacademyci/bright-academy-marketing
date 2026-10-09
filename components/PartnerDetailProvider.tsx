"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLanguage } from "./LanguageProvider";
import { DETAIL_PARAM, detailUi, parseDetailId, type DetailId } from "@/lib/partners-detail";

interface DetailContextValue {
  openId: DetailId | null;
  /** Ids visited before the current one (for the in-dialog "Back" button). */
  trail: DetailId[];
  triggerRef: { current: Element | null };
  open: (id: DetailId, trigger?: Element | null) => void;
  /** Move to another detail view without leaving the dialog. */
  navigate: (id: DetailId) => void;
  back: () => void;
  close: () => void;
}

const DetailContext = createContext<DetailContextValue | null>(null);

export function usePartnerDetail() {
  const ctx = useContext(DetailContext);
  if (!ctx) throw new Error("usePartnerDetail must be used within PartnerDetailProvider");
  return ctx;
}

function urlFor(id: DetailId | null) {
  const u = new URL(window.location.href);
  if (id) u.searchParams.set(DETAIL_PARAM, id);
  else u.searchParams.delete(DETAIL_PARAM);
  return `${u.pathname}${u.search}${u.hash}`;
}

function idFromUrl(): DetailId | null {
  return parseDetailId(new URLSearchParams(window.location.search).get(DETAIL_PARAM));
}

/**
 * Open/closed state of the partner detail dialog, kept in the URL
 * (`/partners?detail=offer-main`) so that:
 *  - the browser Back button closes the dialog instead of leaving the page;
 *  - a detail view can be shared or bookmarked;
 *  - nothing is refetched (history.pushState/replaceState only — no router
 *    navigation, no server round-trip).
 * The id in the URL is checked against an allowlist before use.
 *
 * History model: opening pushes ONE entry. Moving between views inside the
 * dialog replaces that entry, so Back always returns to the page itself.
 */
export function PartnerDetailProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<DetailId | null>(null);
  const [trail, setTrail] = useState<DetailId[]>([]);
  const triggerRef = useRef<Element | null>(null);
  const pushed = useRef(false);

  // Deep link on first load + browser Back/Forward.
  useEffect(() => {
    const initial = idFromUrl();
    if (initial) setOpenId(initial);
    const onPop = () => {
      const id = idFromUrl();
      pushed.current = id !== null;
      setTrail([]);
      setOpenId(id);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const open = useCallback((id: DetailId, trigger?: Element | null) => {
    triggerRef.current = trigger ?? document.activeElement;
    setTrail([]);
    setOpenId(id);
    if (pushed.current || idFromUrl()) {
      window.history.replaceState(null, "", urlFor(id));
    } else {
      window.history.pushState(null, "", urlFor(id));
    }
    pushed.current = true;
  }, []);

  const navigate = useCallback(
    (id: DetailId) => {
      setTrail((tr) => (openId ? [...tr, openId] : tr));
      setOpenId(id);
      window.history.replaceState(null, "", urlFor(id));
    },
    [openId],
  );

  const back = useCallback(() => {
    const prev = trail[trail.length - 1];
    if (!prev) return;
    setTrail(trail.slice(0, -1));
    setOpenId(prev);
    window.history.replaceState(null, "", urlFor(prev));
  }, [trail]);

  const close = useCallback(() => {
    setTrail([]);
    setOpenId(null);
    if (pushed.current) {
      pushed.current = false;
      // Undo the entry we pushed; popstate then finds no id and stays closed.
      window.history.back();
    } else {
      window.history.replaceState(null, "", urlFor(null));
    }
  }, []);

  const value = useMemo(
    () => ({ openId, trail, triggerRef, open, navigate, back, close }),
    [openId, trail, open, navigate, back, close],
  );
  return <DetailContext.Provider value={value}>{children}</DetailContext.Provider>;
}

/**
 * A real <button> that opens a detail view. Children should be phrasing
 * content (spans), not <p>/<div>. The accessible name is the visible text plus
 * a visually hidden "view details" so screen-reader users know what happens.
 */
export function DetailTrigger({
  id,
  className = "",
  children,
}: {
  id: DetailId;
  className?: string;
  children: ReactNode;
}) {
  const { open } = usePartnerDetail();
  const { lang } = useLanguage();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => open(id, e.currentTarget)}
      className={`text-left transition focus-visible:outline-offset-2 ${className}`}
    >
      {children}
      <span className="sr-only">, {detailUi(lang).viewDetails}</span>
    </button>
  );
}
