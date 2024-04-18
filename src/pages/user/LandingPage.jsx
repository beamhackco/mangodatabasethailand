import React from "react";
import Navbar from "../../components/user/LandingPage/navbar.jsx";
import Hero from "../../components/user/LandingPage/hero";
import Feature from "../../components/user/LandingPage/feature";
import Mango from "../../components/user/LandingPage/mango";
import Map from "../../components/user/LandingPage/map";
import Info from "../../components/user/LandingPage/info";
import Comment from "../../components/user/LandingPage/comment";
import Footer from "../../components/user/LandingPage/footer";

function landingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mango />
      <Feature />
      <Map />
      {/* <Info /> */}
      <Comment />
      <Footer />
    </>
  );
}

export default landingPage;
