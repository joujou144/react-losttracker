import { Navigate, Outlet } from "react-router-dom";
import hero from "/assets/hero.jpg";
import logo from "/assets/Logo-light-blur.svg";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="flex items-center justify-between overflow-x-hidden overflow-y-scroll">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-svh lg:h-screen">
            <div className="p-6 w-[435px] lg:w-[490px]">
              <img
                src={logo}
                alt="losttracker-logo"
                className="block lg:hidden mb-6 h-auto w-auto"
              />
              <Outlet />
            </div>
          </div>

          <SideBackground />
        </section>
      )}
    </>
  );
};

const SideBackground = () => {
  return (
    <div className="hidden lg:block lg:order-first relative w-1/2 h-svh lg:h-screen">
      <div className="z-10 absolute inset-0 bg-gray-200 opacity-70 " />
      <img
        src={hero}
        alt="losttracker-bg-image"
        className="h-full object-cover bg-no-repeat w-full bg-center"
      />

      <img
        src={logo}
        alt="losttracker-logo"
        className="z-30 absolute top-24 left-20 w-[200px] h-auto"
      />
      <h1 className="z-30 text-primary-700 banner-text absolute left-20 bottom-24 max-w-xs md:max-w-md lg:max-w-lg">
        Search. Hope. <br />
        Find Them Alive.
      </h1>
    </div>
  );
};

export default AuthLayout;
