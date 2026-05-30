import Navigation from "./navigation";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigation />
      <div className="content-container mt-3">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;