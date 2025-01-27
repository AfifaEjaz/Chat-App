import React from "react";
import NavigationBar from "../components/NavigationBar";
import UserList from "../components/UserList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { TiMessages } from "react-icons/ti";

const ChatPage = () => {
  const noChatSelected = true;
  return (
    <>
      <NavigationBar />

      <UserList />
      <div className="chat-container flex flex-col bg-gray-200 w-full overflow-auto">
        <div className="w-full flex" style={{ height: "90vh" }}>
          {noChatSelected ? (
            <ChatPage />
          ) : (
            <>
              {/* Header  */}
              <div className="border border-gray-300 px-4 py-2 mb-2">
                <span className="label-text">To: </span>
                <span className="text-gray-900 font-bold">John Doe</span>
              </div>

              {/* Messages  */}
              <MessageList />
              <MessageList />
              <MessageList />
              <MessageList />
              <MessageList />
              <MessageList />

              {/* Message Input  */}
              <MessageInput />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;

const NoChat = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <dic className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome John Doe!</p>
          <p>Select a chat to start messaging</p>
          <TiMessages />
        </dic>
      </div>
    </>
  );
};
