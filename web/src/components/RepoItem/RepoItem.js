import React from 'react';
import { Link } from 'react-router-dom';
import './RepoItem.scss';
export default function RepoItem({
  repoId,
  name,
  description,
  language,
  forksCount,
}) {
  //deconstructs the props and displays the data inside a link that takes the user to RepoDetails
  return (
    <Link className="repo-item__link" to={`/${repoId}`}>
      <div className="repo-item">
        <p className="repo-item__text">Name: {name}</p>
        <p className="repo-item__text">Description: {description}</p>
        <p className="repo-item__text">Language: {language}</p>
        <p className="repo-item__text">Forks: {forksCount}</p>
      </div>
    </Link>
  );
}
