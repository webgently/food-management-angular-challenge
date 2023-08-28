import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MealCard } from '../../components/MealCard';
import { usePartyContext } from '../../context';
import './home.scss';

export const Home = () => {
  const navigate: any = useNavigate();
  const [state]: any = usePartyContext();
  const latestData = state && state?.latestData;
  const randomData = state && state?.randomData;

  return (
    <div className="home-container">
      <div>
        <div>
          <h4>Latest Meals</h4>
          <div className="home-meal-group">
            {latestData.map((item: any) => {
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
        <div>
          <h4>Random Meals</h4>
          <div className="home-meal-group">
            {randomData.map((item: any) => {
              return (
                <MealCard
                  key={item.idMeal}
                  image={item.strMealThumb}
                  title={item.Title}
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
