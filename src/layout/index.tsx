import React from 'react';
import { Header } from './Header';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
