import type { UserResponseT } from "../schema/user/profile.schema";

type ProfileSuccessT = Exclude<UserResponseT, { message: string }>;

export default function ProfileCard({ data }: { data: ProfileSuccessT }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Profile</h2>
      {data.profileImageUrl && (
        <img
          src={data.profileImageUrl}
          alt={`${data.name}'s profile`}
          className="mb-4 h-24 w-24 rounded-full object-cover"
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
  );
}
