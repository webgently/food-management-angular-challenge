import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../layout';
import { Home } from '../pages/Home';
import { Category } from '../pages/Category';
import { Filter } from '../pages/Filter';
import { Meal } from '../pages/Meal';
import { Ingredient } from '../pages/Ingredient';

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/category" element={<Category />} />
          <Route path="/meals/:id" element={<Meal />} />
          <Route path="/ingredients/:name" element={<Ingredient />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
