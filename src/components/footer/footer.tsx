"use client"
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [comment, setComment] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí enviarías el correo electrónico (integración con un backend o servicio como Nodemailer)
    setEmailSent(true);
    setComment("");
  };

  return (
    <div className="bg-gray-900 text-white">
      <footer className="max-w-screen-xl mx-auto py-10 px-4">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h5 className="text-xl font-semibold mb-4">OUR WORLD</h5>
            <ul className="space-y-2">
              <li><a href="#!" className="hover:text-gray-400">About us</a></li>
              <li><a href="#!" className="hover:text-gray-400">Collections</a></li>
              <li><a href="#!" className="hover:text-gray-400">Environmental philosophy</a></li>
              <li><a href="#!" className="hover:text-gray-400">Artist collaborations</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h5 className="text-xl font-semibold mb-4">ASSISTANCE</h5>
            <ul className="space-y-2">
              <li><a href="#!" className="hover:text-gray-400">Contact us</a></li>
              <li><a href="#!" className="hover:text-gray-400">Size Guide</a></li>
              <li><a href="#!" className="hover:text-gray-400">Shipping Information</a></li>
              <li><a href="#!" className="hover:text-gray-400">Returns & Exchanges</a></li>
              <li><a href="#!" className="hover:text-gray-400">Payment</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-span-2">
            <h5 className="text-xl font-semibold mb-4">Leave a Comment</h5>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition"
              >
                Send Comment
              </button>
            </form>
            {emailSent && (
              <p className="mt-2 text-green-500">Thank you! Your comment has been sent.</p>
            )}
          </div>
        </div>

        {/* Footer copyright */}
        <div className="text-center py-4 mt-8 border-t border-gray-700">
          <span>&copy; 2024 All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
