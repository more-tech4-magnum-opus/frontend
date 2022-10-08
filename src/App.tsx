import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { adminStore} from './app/adminStore';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { AdminPage } from './admin';
import { AdminMarket } from './admin/adminMarket';
import { AdminMarketPopUp } from './admin/adminMarketPopUp';
import { AddAdminMarketProduct } from './admin/addAdminMarketCard';

function App() {
  
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/hr">HR</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
  );
}

export default App;
