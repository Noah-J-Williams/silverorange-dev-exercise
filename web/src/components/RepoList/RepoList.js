import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from '../RepoItem/RepoItem';
import './RepoList.scss';
export default function RepoList() {
  const [repos, setRepos] = useState({ loading: true });
  const [languages, setLanuages] = useState();
  const [filter, setFilter] = useState('All');

  //gets the list of repos sorted in reverse chronological order
  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(
          res.data.sort((a, b) => {
            return Date.parse(b.created_at) - Date.parse(a.created_at);
          })
        );
      })
      .catch((err) => {
        return err;
      });
  }, []);

  //this looks at all the languages in the repos we have and collects all of the languages for making filter buttons
  useEffect(() => {
    const languageArray = ['All'];
    for (let i = 0; i < repos.length; i++) {
      if (!languageArray.includes(repos[i].language)) {
        languageArray.push(repos[i].language);
      }
    }
    setLanuages(languageArray);
  }, [repos]);

  //event listener to change the filtered language
  const languageFilter = (e) => {
    setFilter(e.target.name);
  };

  //if our page is not loading, map through the languages to create each sort button
  return !repos.loading ? (
    <main className="repo-list">
      <div className="repo-list__button-holder">
        {languages.map((lang) => {
          return (
            <button
              className="repo-list__button"
              key={lang}
              name={lang}
              onClick={languageFilter}
            >
              {lang}
            </button>
          );
        })}
      </div>
      //if the filter is the default 'All' show all repos
      {filter === 'All'
        ? repos.map((repo) => {
            return (
              <RepoItem
                key={repo.id}
                repoId={repo.id}
                name={repo.name}
                description={repo.description ? repo.description : 'N/A'}
                language={repo.language}
                forksCount={repo.forks_count}
              />
            );
          })
          //otherwise we filter by the selected language
        : repos
            .filter((repo) => repo.language === filter)
            .map((repo) => {
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
