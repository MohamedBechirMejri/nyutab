import { lazy, Suspense } from "react";

const Main = lazy(() => import("../../../../db/awesome/main.mdx"));

const Mdx = ({ cat }: { cat: string }) => {
  return <Suspense fallback="loading...">{cat === "" && <Main />}</Suspense>;
};

export default Mdx;
