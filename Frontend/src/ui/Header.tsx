import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  const { token, logout } = useAuth();
  return (
    <header className="bg-primary flex h-[10vh] items-center justify-between px-5 py-4 text-amber-50">
      <div className="flex items-center justify-center gap-1">
        <img src="/logo.png" alt="logo" className="w-24" />
        <p className="hidden text-2xl font-semibold text-green-900 md:block">
          GreenEye
        </p>
      </div>
      <ul className="text-medium flex flex-1 items-center justify-evenly">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </ul>
      {token === null ? (
        <Link
          to="/login"
          className="rounded-xl bg-green-50 px-6 py-2 font-semibold text-green-700 shadow-sm hover:bg-green-100"
        >
          Log in
        </Link>
      ) : (
        <div className="flex items-center gap-6">
          <Link to="/profile">
            <FaRegUserCircle size='30'/>
          </Link>
          <button
            onClick={logout}
            className="rounded-xl bg-red-50 px-6 py-2 font-semibold text-red-600 shadow-sm hover:bg-red-100"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
