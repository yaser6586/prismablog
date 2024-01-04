import SimpleNave from "../ui/dashboardui/SimplNav";
// import { notoKufi } from "../ui/font";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <div>
        <SimpleNave />
      </div>
      {children}
    </div>
  );
}

export default Layout;
