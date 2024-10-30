// src/components/AuthTransitionWrapper.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Outlet } from 'react-router-dom';

const AuthTransitionWrapper = () => {
  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        timeout={200}
        classNames="auth-page"
        unmountOnExit
      >
        <div className="auth-page">
          <Outlet />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AuthTransitionWrapper;