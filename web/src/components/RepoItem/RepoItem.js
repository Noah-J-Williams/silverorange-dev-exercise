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
  return (
    <Link className="repo-item__link" to={`/${repoId}`}>
      <div className="repo-item">
        <p className="repo-item__text">{name}</p>
        <p className="repo-item__text">{description}</p>
        <p className="repo-item__text">{language}</p>
        <p className="repo-item__text">{forksCount}</p>
      </div>
    </Link>
  );
}
