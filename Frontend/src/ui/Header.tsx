import { Link, NavLink } from "react-router";

export default function Header() {
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
      <Link
        to="/login"
        className="text-primary rounded-xl bg-amber-50 px-6 py-2 font-semibold shadow-sm"
      >
        Log in
      </Link>
    </header>
  );
}
