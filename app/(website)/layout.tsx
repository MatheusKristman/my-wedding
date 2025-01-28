import { ReactNode } from "react";

import { Header } from "./components/header";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
