import { lazy, Suspense } from "react";

const AI = lazy(() => import("../../../../db/awesome/AI.mdx"));

const Mdx = ({ cat }: { cat: string }) => {
  return <Suspense fallback="loading...">{cat === "ai" && <AI />}</Suspense>;
};

export default Mdx;
