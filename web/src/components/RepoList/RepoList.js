import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from '../RepoItem/RepoItem';

export default function RepoList() {
  const [repos, setRepos] = useState({ loading: true });
  const [language, setLanuages] = useState();
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
    const languages = [];
    for (let i = 0; i < repos.length; i++) {
      if (!languages.includes(repos[i].language)) {
        languages.push(repos[i].language);
      }
    }
    setLanuages(languages);
  }, [repos]);

  return !repos.loading ? (
    <main>
      {language.map((lang) => {
        return (
          <button key={lang} name={lang}>
            {lang}
          </button>
        );
      })}
      {repos.map((repo) => {
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
