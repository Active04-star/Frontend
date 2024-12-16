import React from "react";
import Image from "next/image";

const FieldCards: React.FC = () => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1555421689-491a97ff2040?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
      }}
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          <div className="flex flex-col">
            <div className="bg-white shadow-md rounded-3xl p-4">
              <div className="flex-none lg:flex">
                <div className="h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Just a flower"
                    width={200}
                    height={200}
                    className="w-full object-scale-down lg:object-cover lg:h-48 rounded-2xl"
                  />
                </div>
                <div className="flex-auto ml-3 justify-evenly py-2">
                  <div className="flex flex-wrap">
                    <div className="w-full flex-none text-xs text-blue-700 font-medium">
                      Shop
                    </div>
                    <h2 className="flex-auto text-lg font-medium">
                      Massive Dynamic
                    </h2>
                  </div>
                  <div className="flex py-4 text-sm text-gray-500">
                    <div className="flex-1 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p>Cochin, KL</p>
                    </div>
                    <div className="flex-1 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>05-25-2021</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-sm font-medium">
                    <button className="mb-2 md:mb-0 bg-gray-900 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-800">
                      Edit Shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Repite otras tarjetas aquí */}
        </div>
      </div>
    </div>
  );
};

export default FieldCards;
