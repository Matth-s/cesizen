import HeaderPage from "@/components/HeaderPage";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="safe-area flex min-h-dvh flex-col bg-white">
      <HeaderPage />

      <main className="flex flex-1 flex-col p-4">{children}</main>
    </div>
  );
};

export default PageLayout;
