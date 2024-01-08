import SimpleNave from "../ui/dashboardui/SimplNav";
import SimpleHeroSection from "../ui/dashboardui/simpleHeroSection";
// import { notoKufi } from "../ui/font";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <SimpleHeroSection />

      <div lang="fa"> {children}</div>
    </div>
  );
}

export default Layout;
