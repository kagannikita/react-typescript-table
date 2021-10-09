import React from 'react';
import './style.css';
import {UsersTable} from "./components/UsersTable";
import { BrowserRouter, Route,} from 'react-router-dom'
import {EmptyPage} from "./components/EmptyPage";

function App() {
  return (
      <BrowserRouter>
          <Route component={UsersTable} exact path="/" />
        <Route component={EmptyPage} exact path="/users/:id" />
      </BrowserRouter>
  );
}

export default App;
