import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-4">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to my application! Our mission is to provide an exceptional
          experience for our users by offering top-notch functionality and a
          user-friendly interface. This platform is designed with a focus on
          accessibility, ease of use, and security, ensuring a seamless
          experience for all.
        </p>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          We believe in constant improvement and are committed to adding
          features that make this platform more valuable for you. Your feedback
          is essential to us, and we’re excited to keep enhancing our platform
          to better meet your needs.
        </p>
      </div>
    </div>
  );
};

export default About;
