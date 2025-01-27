import { useState } from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("sended", input);
  };

  return (
    <>
        <form onSubmit={sendMessage} className="px-4 my-3 ">
          <div className="w-full relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            />
            <button 
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            ><BsSend /></button>
          </div>
        </form>
    </>
  );
};

export default MessageInput;
