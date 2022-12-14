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
import { UserTable } from './admin/userTable';
import { AdminUserCard } from './admin/adminUserCard';
import { AdminClans } from './admin/adminClans';
import { AddUser } from './admin/addUser';
import { UserLk } from './user/lk';
import { Clan } from './user/clan';
import { HR } from './hr';
import { hrStore } from './app/hrStore';
import { AddEvent } from './hr/addEvent';
import { RegUsers } from './hr/regUsers';
import { TransactionHistory } from './hr/transactionHistory';
import { Transaction } from './Transaction';
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
          <Route path='admin/users' element={<Provider store={adminStore}><UserTable></UserTable></Provider>}></Route>
          <Route path='admin/users/:tg' element={<Provider store={adminStore}><AdminUserCard></AdminUserCard></Provider>}></Route>
          <Route path='admin/clans/:id' element={<Provider store={adminStore}><AdminClans></AdminClans></Provider>}></Route>
          <Route path='admin/users/add' element={<Provider store={adminStore}><AddUser></AddUser></Provider>}></Route>
          <Route path="/admin/transaction" element={<Provider store={adminStore}><TransactionHistory></TransactionHistory></Provider>}></Route>

          <Route path="hr" element={<Provider store={hrStore}><HR></HR></Provider>}></Route>
          <Route path="hr/addEvent" element={<Provider store={hrStore}><AddEvent></AddEvent></Provider>}></Route>
          <Route path="/hr/events/reg/:name" element={<Provider store={hrStore}><RegUsers></RegUsers></Provider>}></Route>
          <Route path="/hr/transaction" element={<Provider store={hrStore}><TransactionHistory></TransactionHistory></Provider>}></Route>
          <Route path="user/lk/" element={<UserLk />} />
          <Route path='user/clan' element={<Clan />} /> 

          <Route path="transaction" element={<Transaction></Transaction>}></Route>
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

