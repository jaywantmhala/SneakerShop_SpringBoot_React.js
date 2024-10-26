import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

const Contact = () => {
  const { user } = useApp();
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      {user ? (
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-4">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                className="w-full mt-1 p-2 border rounded-lg"
                required
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-600">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Contact;
