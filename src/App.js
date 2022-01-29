import useFetch from 'react-fetch-hook'
import { db, addFav, removeFav } from './db'
import './App.css'
import { useLiveQuery } from 'dexie-react-hooks'

function App() {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const formattedDate = date.toISOString().split('T')[0]

  const baseUrl = 'https://api.github.com/search/repositories'
  const url = `${baseUrl}?q=created:>${formattedDate}&sort=stars&order=desc`
  const { data, isLoading, error } = useFetch(url)

  const favourites = useLiveQuery(() => db.favRepos?.toArray())
  console.log('==fav==>', favourites)

  return (
    <div className="App">
      <h1>{formattedDate}</h1>
      {data?.items?.map(repo => (
        <div key={repo.id}>
          <img src={repo.owner?.avatar_url} alt="" />
          <h3>{repo.name}</h3>
          <p>stars: {repo.stargazers_count}</p>
          <button onClick={() => addFav(repo)}>Add to Favorites</button>
          <button onClick={() => removeFav(repo)}>Remove from Favorites</button>
          <a href={repo.html_url} target="_blank" rel="noreferrer">Open in GitHub</a>
        </div>
      ))}
    </div>
  );
}

export default App
