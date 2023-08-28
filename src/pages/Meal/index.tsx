import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePartyContext } from '../../context';
import './meal.scss';

export const Meal = () => {
  const navigate: any = useNavigate();
  const slug: any = useParams();
  const [state, { getIngredientById }]: any = usePartyContext();
  const ingredientData = state && state?.ingredientById;

  useEffect(() => {
    (async () => {
      await getIngredientById(slug?.id);
    })();
    // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="meal-container">
      <div>
        <span className="font-mulish" onClick={() => navigate('/filter')}>
          Back
        </span>
        <div>
          <div className="image-container">
            <img src={ingredientData.strMealThumb} alt={ingredientData.strMeal} />
          </div>
          <div className="detail-steps">
            {Object.keys(ingredientData)
              .slice(0, Object.keys(ingredientData).length - 1)
              .map((key: string) => {
                return (
                  <div key={key}>
                    {key === 'Materials' ? (
                      <>
                        {ingredientData[key].length > 0 && (
                          <div className="material-container">
                            {key} :{' '}
                            <div className="material-group">
                              {ingredientData[key].map((item: any) => {
                                return (
                                  <div key={item.title} onClick={() => navigate(`/ingredients/${item.title}`)}>
                                    <img
                                      src={`https://www.themealdb.com/images/ingredients/${item.title}-Small.png`}
                                      alt={item.title}
                                    />
                                    <p>{`${item.title} / ${item.amount}`}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {ingredientData[key] && (
                          <div>
                            {key} :{' '}
                            {key === 'Source' || key === 'Youtube' ? (
                              <a href={ingredientData[key]}>{ingredientData[key]}</a>
                            ) : (
                              <span>{ingredientData[key]}</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
