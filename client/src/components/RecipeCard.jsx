import React from "react";
import { LuAlarmClock } from "react-icons/lu";
import { IoMdBookmarks } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import "../styles/recipe.css";
import { Link } from "react-router-dom";

const RecipeCard = ({
  id,
  title,
  image,
  veg,
  time,
  ingredients,
  servings,
  description,
}) => {
  return (
    <div className="recipecard" data-aos="zoom-in">
      <div className="ft-recipe">
        <div className="ft-recipe__thumb">
          <h3>
            {veg ? (
              <span className="veg">VEG</span>
            ) : (
              <span className="non-veg">NON-VEG</span>
            )}
          </h3>
          <img src={image} alt={title} />
        </div>
        <div className="ft-recipe__content">
          <header className="content__header">
            <div className="row-wrapper">
              <h2 className="recipe-title">{title}</h2>
              <div className="user-rating"></div>
            </div>
            <ul className="recipe-details">
              <li className="recipe-details-item time">
                <i>
                  <LuAlarmClock />
                </i>
                <span className="value">{time}</span>
                <span className="title">Minutes</span>
              </li>
              <li className="recipe-details-item ingredients">
                <i>
                  <IoMdBookmarks />
                </i>
                <span className="value">{ingredients.length}</span>
                <span className="title">Ingredients</span>
              </li>
              <li className="recipe-details-item servings">
                <i>
                  <IoPersonOutline />
                </i>
                <span className="value">{servings}</span>
                <span className="title">Serving</span>
              </li>
            </ul>
          </header>
          <p className="description">{description.slice(0, 50)}</p>
          <footer className="content__footer">
            <Link to={`/recipes/read/${id}/detailed-${title}`}>View Recipe</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
