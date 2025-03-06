import React from "react";

const ChatApp: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/mKq04Ahjjrh5TFjKVM-xrrQT3DVTIWslZmMyNlcJxx4.jpg"
              alt="User avatar"
              className="rounded-full w-10 h-10"
            />
            <span className="ml-2 text-lg font-semibold">Chats</span>
          </div>
          <div className="flex space-x-2 text-gray-500">
            <i className="fas fa-cog"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Search messages or users"
          />
        </div>

        {/* Recent Chats */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://storage.googleapis.com/a1aa/image/dh0AmYifcf0VudUDHtqN8bwFEwYDcelC5fhSHMFLOYQ.jpg"
                alt="Patrick Hendricks"
                className="rounded-full w-10 h-10"
              />
              <div>
                <h3 className="font-semibold">Patrick Hendricks</h3>
                <p className="text-sm text-gray-500">Hey! there I'm available</p>
              </div>
              <span className="ml-auto text-xs text-gray-500">05 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="https://storage.googleapis.com/a1aa/image/df0CF7_imT5d76erw6dMhuYdT-uuq7ZtPaisg2K6FYI.jpg"
              alt="Group 11223"
              className="rounded-full w-10 h-10"
            />
            <span className="ml-2 text-lg font-semibold">Group 11223</span>
            <span className="ml-2 text-green-500">
              <i className="fas fa-circle"></i>
            </span>
          </div>
          <div className="flex space-x-2 text-gray-500">
            <i className="fas fa-search"></i>
            <i className="fas fa-phone"></i>
            <i className="fas fa-video"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <img
                src="https://storage.googleapis.com/a1aa/image/dh0AmYifcf0VudUDHtqN8bwFEwYDcelC5fhSHMFLOYQ.jpg"
                alt="Patrick Hendricks"
                className="rounded-full w-10 h-10"
              />
              <div>
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <p>Good morning</p>
                  <span className="text-xs text-gray-200">10:00</span>
                </div>
                <span className="text-xs text-gray-500">Patrick Hendricks</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <img
                src="https://storage.googleapis.com/a1aa/image/fXq08HjjjPk2zUMbwSNs7nhkSrOVv-GaEZ6arB-LYCc.jpg"
                alt="Patricia Smith"
                className="rounded-full w-10 h-10"
              />
              <div>
                <div className="bg-gray-200 text-gray-800 p-2 rounded-lg">
                  <p>Good morning, How are you? What about our next meeting?</p>
                  <span className="text-xs text-gray-500">10:02</span>
                </div>
                <span className="text-xs text-gray-500">Patricia Smith</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
