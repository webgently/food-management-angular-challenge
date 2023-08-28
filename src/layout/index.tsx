import React from 'react';
import { Spinner } from '../components/Spinner';
import { usePartyContext } from '../context';
import { Header } from './Header';

export const Layout = ({ children }: any) => {
  const [state]: any = usePartyContext();

  return (
    <>
      <Header />
      {state.isLoading ? <Spinner /> : <>{children}</>}
    </>
  );
};
