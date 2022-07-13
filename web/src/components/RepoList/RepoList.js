import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from '../RepoItem/RepoItem';

export default function RepoList() {
  const [repos, setRepos] = useState({ loading: true });
  const [languages, setLanuages] = useState();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(
          res.data.sort((a, b) => {
            return b.created_at - a.created_at;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const languageArray = ['All'];
    for (let i = 0; i < repos.length; i++) {
      if (!languageArray.includes(repos[i].language)) {
        languageArray.push(repos[i].language);
      }
    }
    setLanuages(languageArray);
  }, [repos]);

  const languageFilter = (e) => {
    setFilter(e.target.name);
    return () => setValue(value => value + 1);
  };

  return !repos.loading ? (
    <main>
      {languages.map((lang) => {
        return (
          <button key={lang} name={lang} onClick={languageFilter}>
            {lang}
          </button>
        );
      })}
      {filter === 'All' ? repos.map((repo) => {
        return (
          <RepoItem
            key={repo.id}
            repoId={repo.id}
            name={repo.name}
            description={repo.description}
            language={repo.language}
            forksCount={repo.forks_count}
          />
        );
      }):
      repos.filter(repo => repo.language === filter).map((repo) => {
        return (
          <RepoItem
            key={repo.id}
            repoId={repo.id}
            name={repo.name}
            description={repo.description}
            language={repo.language}
            forksCount={repo.forks_count}
          />
        );
      })}
    </main>
  ) : (
    <h1>If the page hasn't loaded shortly, try refreshing it.</h1>
  );
}
