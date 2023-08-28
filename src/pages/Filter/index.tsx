import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { usePartyContext } from '../../context';
import { MealCard } from '../../components/MealCard';
import './filter.scss';

const filterOptionList: filterOptionListObject[] = [
  {
    label: 'Areas',
    value: 'areas'
  },
  {
    label: 'Categories',
    value: 'categories'
  },
  {
    label: 'Ingredients',
    value: 'ingredients'
  }
];

export const Filter = () => {
  const navigate: any = useNavigate();
  const [state, { getFilterData }]: any = usePartyContext();

  const allArea = state && state?.allAreas;
  const allIngredients = state && state?.allIngredients;
  const allCategories = state && state?.allCategories;
  const filterData = state && state?.filterData;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('areas');
  const [filterText, setFilterText] = useState<string>('');
  const [filterList, setFilterList] = useState<any[]>(filterData);

  const filterClear = () => {
    setIsLoading(false);
    setSearchText('');
    setFilterOption('areas');
    setFilterText('');
    setSearchText('');
    setFilterList([]);
  };

  useEffect(() => {
    setFilterList(state.filterData);
    // eslint-disable-next-line
  }, [state.filterData]);

  useEffect(() => {
    (async () => {
      if (filterOption || filterText) {
        setIsLoading(true);
        await getFilterData(filterOption, filterText);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [filterOption, filterText]);

  useEffect(() => {
    if (filterData && searchText) {
      const data = filterData.filter(function (item: any) {
        return item.strMeal.toUpperCase().startsWith(searchText.toUpperCase());
      });
      setFilterList(data);
    } else {
      setFilterList(filterData);
    }
    // eslint-disable-next-line
  }, [searchText]);

  return (
    <div className="filter-container">
      <div>
        <div className="filter-group">
          <h3>Filter Results</h3>
          <div className="filter-controller">
            <div>
              <label>Name (contains)</label>
              <input
                type="text"
                value={searchText}
                placeholder="Text string"
                onChange={(e: any) => setSearchText(e.target.value)}
              />
            </div>
            <div>
              <div className="filter-option-selection">
                {filterOptionList.map((item: filterOptionListObject) => {
                  return (
                    <div key={item.value}>
                      <input
                        type="radio"
                        name="filter"
                        className="bg-dark"
                        value={item.value}
                        checked={filterOption === item.value}
                        onChange={(e: any) => setFilterOption(e.target.value)}
                      />
                      <label>{item.label}</label>
                    </div>
                  );
                })}
              </div>
              <select onChange={(e: any) => setFilterText(e.target.value)}>
                <option value="">
                  Select {filterOption === 'areas' ? 'Area' : filterOption === 'categories' ? 'Category' : 'Ingredient'}
                </option>
                {filterOption === 'areas' ? (
                  <>
                    {allArea &&
                      allArea.map((item: any) => {
                        return (
                          <option key={item.strArea} value={item.strArea}>
                            {item.strArea}
                          </option>
                        );
                      })}
                  </>
                ) : filterOption === 'categories' ? (
                  <>
                    {allCategories &&
                      allCategories.map((item: any) => {
                        return (
                          <option key={item.strCategory} value={item.strCategory}>
                            {item.strCategory}
                          </option>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {allIngredients &&
                      allIngredients.map((item: any) => {
                        return (
                          <option key={item.strIngredient} value={item.strIngredient}>
                            {item.strIngredient}
                          </option>
                        );
                      })}
                  </>
                )}
              </select>
            </div>
          </div>
          <button onClick={filterClear}>Clear</button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="filter-result-container">
            {filterList?.length > 0 ? (
              <div>
                {filterList?.map((item: any) => {
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
            ) : (
              <span>No search result.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
