import { addFav, removeFav } from '../db'
import './cards.css'

const Cards = ({ data, isRepoInFav }) => {
  return (
    <div className="cards">
      {data?.map((repo) => (
        <div className="item" key={repo.id} id={'id' + repo.id}>
          <div>
            <p className="title">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.owner?.login} / <strong>{repo.name}</strong>
              </a>
            </p>

            <p className="desc">{repo.description}</p>

            <div className="details">
              <span>&#11088; stars: {repo.stargazers_count}</span>
              <span className="license">&#128466; {repo.license?.name || 'Licence Unavailable'}</span>
            </div>
          </div>

          <div className="favButton">
            {isRepoInFav(repo.id) ? (
              <button className="btn red round" onClick={() => removeFav(repo)}>
                Unsave
              </button>
            ) : (
              <button className="btn green round" onClick={() => addFav(repo)}>
                Save
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
