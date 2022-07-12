import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RepoList from './components/RepoList/RepoList';
import './App.css';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<RepoList />} />
          {/* <Route path='/:repoId' element={<RepoDetails/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
