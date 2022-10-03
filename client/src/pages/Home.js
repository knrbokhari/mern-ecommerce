import React from "react";
import Footer from "../components/Footer";
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
      <Footer />
    </div>
  );
};

export default Home;
