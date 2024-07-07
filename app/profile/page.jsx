"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const handleEdit = (prompt) => {
    router.push(`/update-prompt/?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete the prompt");
    try {
      if (hasConfirmed) {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPrompts(prompts.filter((p) => p._id !== prompt._id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user?.id}/prompt`);
      const prompts = await response.json();
      setPrompts(prompts);
    };
    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session?.user?.id]);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile section"
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      data={prompts}
    />
  );
};

export default MyProfile;
