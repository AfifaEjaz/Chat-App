import React, { useState } from "react";
import useGetAllUsers from "../hooks/useGetUsers";

const UserList = () => {

  const { allUsers } = useGetAllUsers();
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`; // e.g., "10:14"
  };

  const handleUserClick = (id) => {
    setSelectedUserId(id); // Update the selected user ID on click
  }
  

  return (
    <>
      <div className="w-2/5 h-full overflow-auto">
        {
        allUsers.map((user, key) => (
          <div className={`bg-gray-200 hover:bg-purple-300 flex gap-3 p-4 cursor-pointer ${selectedUserId === user._id ? "bg-blue-300" : "bg-blue-200"}`} key={key} 
          onClick={() => handleUserClick(user._id)}>
            <img
              src={user.profile}
              alt="profile"
              className="h-12 w-16 object-cover"
              
            />
            <div className="w-full">
              <div className="flex justify-between font-medium">
                <div className="flex gap-2">
                  <p>{user.name}</p>
                  <p>online</p>
                </div>
                <span>{formatTime(user.updatedAt)}</span>
              </div>
              <p className="text-sm">Hello! How are you?</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
