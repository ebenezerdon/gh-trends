import { addFav, removeFav } from '../db'
import './cards.css'

const Cards = ({ data }) => {
  return (
    <div className="cards">
      {data?.map(repo => (
        <div className="item" key={repo.id}>
          <img className="img" src={repo.owner?.avatar_url} alt="" />
          <h3>{repo.name}</h3>
          <p>stars: {repo.stargazers_count}</p>
          <button onClick={() => addFav(repo)}>Add to Favorites</button>
          <button onClick={() => removeFav(repo)}>Remove from Favorites</button>
          <a href={repo.html_url} target="_blank" rel="noreferrer">Open in GitHub</a>
        </div>
      ))}
    </div>
  )
}

export default Cards
