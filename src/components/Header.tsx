import { useEffect, useState } from "react";
import { getProfile, type UserProfile } from "../services/api";

interface HeaderProps {
  token: string;
}

export const Header = ({ token }: HeaderProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Could not load user profile");
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <header
      style={{
        borderBottom: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>Creddit App</h2>
      <div>
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : profile ? (
          <span>
            Welcome, <strong>{profile.firstName} {profile.lastName}</strong> ({profile.username})
          </span>
        ) : (
          <span>Loading profile...</span>
        )}
      </div>
    </header>
  );
};
