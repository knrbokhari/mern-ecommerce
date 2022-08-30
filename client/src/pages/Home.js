import React from "react";
import HomeBanner from "../components/HomeBanner";
import HomeCategories from "../components/HomeCategories";
import HomeProduct from "../components/HomeProduct";
import WhyUs from "../components/WhyUs";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <WhyUs />
      <HomeProduct />
      <HomeCategories />
    </div>
  );
};

export default Home;
