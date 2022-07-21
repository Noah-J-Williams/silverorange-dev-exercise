import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RepoList from './components/RepoList/RepoList';
import RepoDetails from './components/RepoDetails/RepoDetails';
import './App.scss';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          //setting up routes for ease of navigation
          <Route path="/" exact={true} element={<RepoList />} />
          <Route path="/:repoId" element={<RepoDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
