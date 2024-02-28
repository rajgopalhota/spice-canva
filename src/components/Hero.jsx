import React from "react";
import "../styles/Hero.css";
import img1 from "./../assets/herobg.jpg";
import chef from "../assets/loaders/chef.gif";
import { IoFastFood } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { GiFireBowl } from "react-icons/gi";

export default function Hero() {
  return (
    <>
      <div className="hero-container">
        <div className="hero">
          <img
            data-aos="fade-up"
            src={img1}
            alt="Delicious Food"
            className="hero-image"
          />
          <h1 className="hero-head" data-aos="fade-up">
            Spice - Mania <GiFireBowl />
          </h1>
          <img src={chef} alt="Chef" className="chef-image" />
          <div className="hero-buttons">
            <button className="order-button" data-aos="zoom-in">
              <IoFastFood />
              &nbsp;Spl Recipes
            </button>
            <button className="menu-button" data-aos="zoom-in">
              <ImSpoonKnife />
              &nbsp;View Recipes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
