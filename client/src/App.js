import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <MainNavigation />
        <main className="container">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </main>
        {/* <footer className="container text-center .fixed-bottom">
          <p className="">&copy; WessCoby 2019. All Rights Reserved.</p>
        </footer> */}
      </Fragment>
  </BrowserRouter>
  );
}

export default App;
