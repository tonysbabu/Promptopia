"use client";
import Profile from "@components/Profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const ProfilePage = () => {
  const params = useParams();
  const userId = params.id;
  const [prompts, setPrompts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/${userId}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    };
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${userId}/prompt`);
      const prompts = await response.json();
      setPrompts(prompts);
    };
    if (userId) {
      fetchUser();
      fetchPosts();
    }
  }, [userId]);
  return (
    <Profile
      name={user?.username}
      desc="Welcome to your personalized profile section"
      data={prompts}
    />
  );
};

export default ProfilePage;
