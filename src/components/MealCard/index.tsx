import React from 'react';
import './mealcard.scss';

export const MealCard = ({ image, title, onClick }: any) => {
  return (
    <div className="meal-category-item" onClick={onClick}>
      <img src={image} alt={title} />
      <p className="font-mulish">{title}</p>
    </div>
  );
};
