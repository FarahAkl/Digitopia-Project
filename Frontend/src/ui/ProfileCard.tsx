import type { UserResponseT } from "../schema/user/profile.schema";
import Card from "./Card";
import Heading from "./Heading";

type ProfileSuccessT = Exclude<UserResponseT, { message: string }>;

export default function ProfileCard({ data }: { data: ProfileSuccessT }) {
  return (
    <Card>
      <div className="z-[1000] m-10 max-w-md rounded-xl border-2 border-green-700 bg-white p-4 px-6 text-green-900 shadow-lg [&_p]:my-4">
        <Heading>Profile</Heading>
        {data.profileImageUrl && (
          <img
            src={
              "/default-user.jpg"
              // data.profileImageUrl === null
              //   ? "/default-user.jpg"
              //   : data.profileImageUrl
            }
            alt={`${data.name}'s profile`}
            className="mx-auto my-6 h-24 w-24 rounded-full object-cover"
          />
        )}
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {data.role}
        </p>
        {data.location && (
          <div className="mt-2">
            <strong>Location:</strong>
            <p>{data.location}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
