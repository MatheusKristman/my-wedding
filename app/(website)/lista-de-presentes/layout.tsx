// import { GiftListTutorialModal } from "./components/gift-list-tutorial-modal";

interface GiftListLayoutProps {
  children: React.ReactNode;
}

export default function GiftListLayout({ children }: GiftListLayoutProps) {
  return (
    <>
      {/* <GiftListTutorialModal /> */}

      {children}
    </>
  );
}
