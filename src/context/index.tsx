import { createContext, useContext, useReducer, useEffect, useMemo, Dispatch, ReactNode } from 'react';
import axios from 'axios';

interface State {
  isLoading: boolean;
  latestData: any[];
  randomData: any[];
  allCategories: [];
  ingredientById: Object;
  mealsByName: any[];
}

interface ProviderProps {
  children: ReactNode;
}

type Action = { type: string; payload: any };

type PartyContextType = [State, Dispatch<Action>];

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export function usePartyContext(): PartyContextType {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error('usePartyContext must be used within a PartyProvider');
  }
  return context;
}

function reducer(state: State, { type, payload }: Action): State {
  return {
    ...state,
    [type]: payload
  };
}

const INIT_STATE: State = {
  isLoading: false,
  latestData: [],
  randomData: [],
  allCategories: [],
  ingredientById: {},
  mealsByName: []
};

export default function Provider({ children }: ProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    (async () => {
      dispatch({
        type: 'isLoading',
        payload: true
      });
      await getLatestData();
      await getRandomData();
      await getAllCategories();
      dispatch({
        type: 'isLoading',
        payload: false
      });
    })();
    // eslint-disable-next-line
  }, []);
  const getLatestData = async () => {
    const result = await axios.get(`https://themealdb.com/api/json/v2/1/latest.php`);
    dispatch({
      type: 'latestData',
      payload: result.data.meals
    });
  };
  const getRandomData = async () => {
    try {
      const result = await axios.get('https://themealdb.com/api/json/v2/1/randomselection.php');
      dispatch({
        type: 'randomData',
        payload: result.data.meals
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getAllCategories = async () => {
    try {
      const result = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      dispatch({
        type: 'allCategories',
        payload: result.data.meals
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getIngredientById = async (id: string) => {
    try {
      const result = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      dispatch({
        type: 'ingredientById',
        payload: await generateDetailData(result.data.meals[0])
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getMealsByName = async (name: string) => {
    try {
      const result = await axios.get(`https://www.themealdb.com/api/json/v2/1/filter.php?i=${name}`);
      dispatch({
        type: 'mealsByName',
        payload: result.data.meals
      });
    } catch (err) {
      console.log(err);
    }
  };
  const generateDetailData = (data: any) => {
    const {
      strArea,
      strCategory,
      strInstructions,
      strMeal,
      strMealThumb,
      strSource,
      strTags,
      strYoutube,
      ...otherProps
    } = data;

    const materials: any[] = Object.keys(otherProps)
      .filter((key) => key.includes('Ingredient'))
      .map((key) => {
        const ingredient = otherProps[key];
        const measure = otherProps[`strMeasure${key.slice(-1)}`];
        return (
          ingredient &&
          measure && {
            title: ingredient,
            amount: measure
          }
        );
      })
      .filter(Boolean);

    const transformedData: any = {
      Title: strMeal,
      Category: strCategory,
      Area: strArea,
      Description: strInstructions,
      Tags: strTags,
      Materials: materials,
      Source: strSource,
      Youtube: strYoutube,
      strMealThumb
    };

    return transformedData;
  };

  return (
    // @ts-ignore
    // eslint-disable-next-line
    <PartyContext.Provider value={useMemo(() => [state, { dispatch, getIngredientById, getMealsByName }], [state])}>
      {children}
    </PartyContext.Provider>
  );
}
