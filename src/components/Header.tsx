/**
 * @file Header.tsx
 * @author Salman Nouman
 * @date 2026-02-27
 * @description Component that displays application header and user profile.
 */

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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
          C
        </div>
        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Creddit</h1>
      </div>

      <div className="flex items-center gap-3">
        {error ? (
          <span className="text-red-500 text-sm">{error}</span>
        ) : profile ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium text-sm hidden md:inline">
              {profile.firstName} {profile.lastName}
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-blue-700 transition-colors">
              {getInitials(profile.firstName, profile.lastName)}
            </div>
          </div>
        ) : (
          <div className="animate-pulse flex items-center gap-3">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        )}
      </div>
    </header>
  );
};
