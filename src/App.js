import useFetch from 'react-fetch-hook'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'
import Cards from './components/Cards'
import './App.css'
import { useState } from 'react'

function App() {
  const [onTrendsView, setOnTrendsView] = useState(true)

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

      <button onClick={() => setOnTrendsView(true)}>
        Trending ({data?.items?.length})
      </button>
      <button onClick={() => setOnTrendsView(false)}>
        Favourites ({repoItems.length})
      </button>

      <Cards data={onTrendsView ? data?.items : repoItems} />
    </div>
  )
}

export default App
