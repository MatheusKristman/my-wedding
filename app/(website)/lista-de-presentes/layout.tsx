import { GiftListTutorialModal } from "./components/tutorial-modal/gift-list-tutorial-modal";

interface GiftListLayoutProps {
  children: React.ReactNode;
}

export default function GiftListLayout({ children }: GiftListLayoutProps) {
  return (
    <>
      <GiftListTutorialModal />

      {children}
    </>
  );
}
