import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { adminStore} from './app/adminStore';
import { AdminPage } from './admin';
import { AdminMarket } from './admin/adminMarket';
import { AdminMarketPopUp } from './admin/adminMarketPopUp';
import { AddAdminMarketProduct } from './admin/addAdminMarketCard';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Link,
  Routes,
} from "react-router-dom";
import { UserLk } from './user/lk';
import { Clan } from './user/clan';
import { ClanWar } from './user/clanWar';
import { Leaderboard } from './user/leaderboard';
import { Marketplace } from './user/marketplace';
import { TransactionHistory } from './user/transaction_history';

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path="admin"element={<Provider store={adminStore}><AdminPage></AdminPage></Provider>}></Route>
          <Route path='admin/market' element={<Provider store={adminStore}><AdminMarket></AdminMarket></Provider>}></Route>
          <Route path='admin/market/:id' element={<Provider store={adminStore}><AdminMarketPopUp></AdminMarketPopUp></Provider>}></Route>
          <Route path='admin/market/add' element={<Provider store={adminStore}><AddAdminMarketProduct></AddAdminMarketProduct></Provider>}></Route>
          <Route path="hr"></Route>
          <Route path="user/events/" element={<UserLk />} />
          <Route path='user/clan' element={<Clan />} />
          <Route path='user/clan-war' element={<ClanWar />} />
          <Route path='user/leaderboard' element={<Leaderboard />} />
          <Route path='user/marketplace' element={<Marketplace />} />
          <Route path='user/transaction-history' element={<TransactionHistory />} />
    </Route>
          
  )
);


root.render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>
);

