import React, { useEffect } from 'react';
import { MealCard } from '../../components/MealCard';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartyContext } from '../../context';
import './ingredient.scss';

export const Ingredient = () => {
  const navigate: any = useNavigate();
  const slug: any = useParams();
  const [state, { getMealsByName }]: any = usePartyContext();

  const mealsByName = state && state?.mealsByName;

  useEffect(() => {
    (async () => {
      await getMealsByName(slug?.name);
    })();
    // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="ingredients-container">
      <div>
        <span className="font-mulish" onClick={() => navigate('/')}>
          Back
        </span>
        <div>
          <div className="image-container">
            <img src={`https://www.themealdb.com/images/ingredients/${slug?.name}.png`} alt={slug?.name} />
          </div>
          <div className="meals-group">
            {mealsByName.map((item: any) => {
              return (
                <MealCard
                  key={item.idMeal}
                  image={item.strMealThumb}
                  title={item.strMeal}
                  onClick={() => navigate(`/meals/${item.idMeal}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
