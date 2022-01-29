import useFetch from 'react-fetch-hook'
import { db } from './db'
import './App.css'
import { useLiveQuery } from 'dexie-react-hooks'
import Cards from './components/Cards'

function App() {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const formattedDate = date.toISOString().split('T')[0]

  const baseUrl = 'https://api.github.com/search/repositories'
  const url = `${baseUrl}?q=created:>${formattedDate}&sort=stars&order=desc`
  const { data, isLoading, error } = useFetch(url)

  const favRepos = useLiveQuery(() => db.favRepos?.toArray())
  const repoItems = favRepos?.map(item => item.repo)

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error Fetching Data...</p>}

      <h1>Favourites</h1>
      <Cards data={repoItems} />

      <h1>Trending: {formattedDate}</h1>
      <Cards data={data?.items} />
    </div>
  );
}

export default App
