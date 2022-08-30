import React from "react";
import HomeBanner from "../components/HomeBanner";
import HomeCategories from "../components/HomeCategories";
import WhyUs from "../components/WhyUs";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <WhyUs />
      <HomeCategories />
    </div>
  );
};

export default Home;
