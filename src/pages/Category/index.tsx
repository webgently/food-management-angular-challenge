import React from 'react';
import { usePartyContext } from '../../context';
import { MealCard } from '../../components/MealCard';
import './category.scss';

export const Category = () => {
  const [state]: any = usePartyContext();
  const mealCategories = state && state?.mealCategories;

  return (
    <div className="category-container">
      <div>
        {mealCategories &&
          mealCategories.map((item: any) => {
            return <MealCard key={item.strCategory} image={item.strCategoryThumb} title={item.strCategory} />;
          })}
      </div>
    </div>
  );
};
