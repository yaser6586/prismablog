import SimpleNave from "../ui/dashboardui/SimplNav";
// import { notoKufi } from "../ui/font";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <SimpleNave />

      <div lang="fa"> {children}</div>
    </div>
  );
}

export default Layout;
