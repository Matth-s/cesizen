import AppDescription from "@/components/home-page/AppDescription";
import Intro from "@/components/home-page/Intro";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Intro />
      <AppDescription />
    </div>
  );
};

export default HomePage;
