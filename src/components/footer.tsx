import React from "react";

const Footer = () => {
  return (
    <div className="container flex justify-center">
      <div className="text-1xl text-black text-center">
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Lohith
        <p>&copy; 2024 WeatherCast</p>
      </div>
    </div>
  );
};

export default Footer;
