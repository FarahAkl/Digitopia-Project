import { Link } from "react-router";
import Header from "../ui/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative flex h-[90vh] items-center justify-center overflow-hidden">
        <img src="/landing-bg.jpg" className="h-full w-full object-cover" />
        <div className="absolute z-[1000] flex h-full flex-col items-center justify-center px-5 text-center">
          <h1 className="mb-5 text-6xl font-bold text-blue-50">
            Welcome to GreenEye
          </h1>
          <p className="my-2 w-3/4 text-xl text-blue-50">
            From deserts to green lands — tackling desertification for a
            sustainable tomorrow.
          </p>
          <Link
            to="/map"
            className="bg-primary hover:bg-secondary mt-5 rounded-sm px-6 py-2 text-xl text-blue-50 shadow-2xl transition-all"
          >
            Tracking the desertification
          </Link>
        </div>
      </div>
    </>
  );
}
