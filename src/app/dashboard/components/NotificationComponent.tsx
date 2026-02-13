"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { EditProfileModal, UserProfile } from "./EditProfileModal";
import { getUserProfile } from "@/app/actions/profileActions";

const NotificationComponent = () => {
  // Use the Shared UserProfile Type
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [hasNotifications, setHasNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch data from Server Action
        const data = await getUserProfile();

        if (isMounted && data) {
          // Cast response to UserProfile interface
          setUserProfile(data as unknown as UserProfile);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, []);

  const handleProfileUpdate = (updatedUser: UserProfile) => {
    setUserProfile((prev) => {
      if (!prev) return updatedUser;
      return { ...prev, ...updatedUser };
    });
  };

  const finalImage = userProfile?.profile_picture || "/bugakingLogo.png";

  if (loading) {
    return <div className="animate-pulse w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full"></div>;
  }

  return (
    <>
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        <button className="p-2 text-[#171512]/40 hover:text-[#d0a539] transition-colors relative group">
          <Bell size={24} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d0a539] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d0a539]"></span>
            </span>
          )}
        </button>

        <div 
          onClick={() => setIsModalOpen(true)}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-[#d0a539]/20 hover:border-[#d0a539] p-0.5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div
            className="h-full w-full rounded-full bg-cover bg-center bg-gray-100"
            style={{
              backgroundImage: `url('${finalImage}')`,
            }}
          ></div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={userProfile}
        onSuccess={handleProfileUpdate}
      />
    </>
  );
};

export default NotificationComponent;