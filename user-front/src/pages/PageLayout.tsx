import HeaderPage from "@/components/HeaderPage";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <HeaderPage />

      <div className="flex flex-1 flex-col border-2 p-4">{children}</div>
    </div>
  );
};

export default PageLayout;
