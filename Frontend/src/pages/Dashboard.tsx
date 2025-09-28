import { Link } from "react-router";
import Map from "./Map";

export default function Dashboard() {
  return (
    <>
      <Link to="/profile">Profile</Link>
      <Map />
    </>
  );
}
