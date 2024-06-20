import { MobileBottomNav, Sidebar, MobileTopNav } from "@/components/custom";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <div className="w-full md:flex">
      <MobileTopNav />
      <Sidebar />
      <section className="flex flex-1 lg:h-screen h-svh">
        <Outlet />
      </section>

      <MobileBottomNav />
    </div>
  );
};

export default PrivateRoutes;
