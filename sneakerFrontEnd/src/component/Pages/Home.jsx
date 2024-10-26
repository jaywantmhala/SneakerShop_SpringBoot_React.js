import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import nikeBanner from "../../assets/nike-banner.webp";
import newArrival from "../../assets/new-arrival.webp";
import sneakerGrid from "../../assets/sneaker-grid.webp";
import { useSpring, animated } from "react-spring";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  ScrollTrigger.create({
    onUpdate: (self) => {
      const percentage = Math.floor(self.progress * 100);
      setScrollPercentage(percentage);
    },
  });

  const springProps = useSpring({
    scale: scrollPercentage / 100 + 1,
  });

  useEffect(() => {
    gsap.fromTo(
      ".hero-heading",
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center+=100",
        },
      }
    );

    gsap.fromTo(
      ".hero-description",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center+=120",
        },
      }
    );

    gsap.fromTo(
      ".hero-button",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.6,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center+=150",
        },
      }
    );

    gsap.fromTo(
      ".new-arrival",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".new-arrival-section",
          start: "top 90%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".new-arrival-img",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".new-arrival-section",
          start: "top 85%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".sneaker-grid",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-collection",
          start: "top 80%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="bg-white">
      <animated.div
        style={{
          transform: springProps.scale.to((s) => `scale(${s})`),
        }}
        className="fixed bottom-4 right-4 w-16 h-16 z-50"
      >
        <CircularProgressbar
          value={scrollPercentage}
          text={`${scrollPercentage}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: `rgba(62, 152, 199, ${scrollPercentage / 100})`,
            trailColor: "#eee",
          })}
        />
      </animated.div>

      <section className="hero-section relative overflow-hidden">
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${nikeBanner})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="hero-heading text-6xl md:text-8xl font-extrabold mb-4 drop-shadow-lg">
              Welcome to Sneaker Heaven
            </h1>
            <p className="hero-description text-2xl font-light mb-8 max-w-lg">
              Discover the finest collection of sneakers that elevate your
              style.
            </p>
            <Link
              to="/shop"
              className="hero-button bg-red-500 hover:bg-red-600 text-white py-4 px-10 rounded-full text-lg font-semibold transition-transform transform hover:scale-105"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </section>

      <section className="new-arrival-section relative py-32 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-16">
          <div className="md:w-1/2 space-y-6 text-center md:text-left new-arrival flex flex-col justify-center">
            <h2 className="text-6xl font-bold transition-transform transform hover:scale-105">
              Step Into Comfort
            </h2>
            <p className="text-lg font-light transition-opacity duration-300">
              Our latest sneakers blend comfort with cutting-edge design,
              keeping your feet fresh all day long.
            </p>
            <Link
              to="/shop"
              className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-full text-lg font-semibold transition-transform transform hover:scale-105"
            >
              Discover Collection
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src={newArrival}
              alt="New Sneaker Arrivals"
              className="new-arrival-img rounded-lg shadow-lg w-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="featured-collection py-24 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-12 text-gray-800">
            Featured Collection
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover the most sought-after styles of the season.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="sneaker-grid bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              >
                <img
                  src={sneakerGrid}
                  alt={`Sneaker ${index + 1}`}
                  className="w-full h-56 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {index % 2 === 0 ? "Nike Air Max 2023" : "Adidas Ultraboost"}
                </h3>
                <p className="mt-2 text-gray-600">${100 + index * 20}.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
