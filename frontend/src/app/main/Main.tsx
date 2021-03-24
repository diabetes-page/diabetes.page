import { includes } from 'lodash';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { toHomePage } from '../../pages';
import { toLoginPage } from '../../pages/login';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { RootState } from '../../redux/root/state';
import { Auth } from './auth/Auth';
import { Loading } from './loading/Loading';
import { Navigation } from './navigation/Navigation';
import { Snackbar } from './snackbar/Snackbar';

export type MainProps = {
  requiresAuth?: boolean;
  children: ReactNode;
};

export function Main({
  requiresAuth = true,
  children,
}: MainProps): JSX.Element {
  const authLoading = useSelector((state: RootState) =>
    includes(state.loading.initial, SET_LOGGED_IN),
  );
  const hasAuth = useSelector((state: RootState) => !!state.login?.loggedIn);
  const content = useContent(authLoading, hasAuth, requiresAuth, children);

  return (
    <>
      <Snackbar />
      <Auth />
      {content}
    </>
  );
}

function useContent(
  authLoading: boolean,
  hasAuth: boolean,
  requiresAuth: boolean,
  children: ReactNode,
): JSX.Element | null {
  const router = useRouter();

  if (authLoading) {
    return <Loading />;
  } else if (hasAuth && requiresAuth) {
    return <Navigation>{children}</Navigation>;
  } else if (!hasAuth && !requiresAuth) {
    return <>{children}</>;
  } else if (hasAuth && !requiresAuth) {
    router.push(toHomePage());
    return <Loading />;
  } else {
    router.push(toLoginPage());
    return <Loading />;
  }
}
