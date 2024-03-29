import useFetch from 'react-fetch-hook'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'
import Cards from './components/Cards'
import './App.css'
import { useState } from 'react'

function App() {
  const [onFavView, setOnFavView] = useState(false)

  const date = new Date()
  date.setDate(date.getDate() - 7)
  const formattedDate = date.toISOString().split('T')[0]

  const baseUrl = 'https://api.github.com/search/repositories'
  const url = `${baseUrl}?q=created:>${formattedDate}&sort=stars&order=desc&per_page=30`
  const { data, isLoading, error } = useFetch(url)

  // @ts-ignore
  const favRepos = useLiveQuery(() => db.favRepos?.toArray())
  const repoItems = favRepos?.map((item) => item.repo)

  const isRepoInFav = (repoId) => {
    return repoItems?.filter((item) => item.id === repoId).length
  }

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error Fetching Data...</p>}

      <h1>Most starred repos since {formattedDate}</h1>

      <nav>
        <button className={`btn ${!onFavView && 'blue'}`} onClick={() => setOnFavView(false)}>
          Trending ~ {data?.items?.length}
        </button>
        <button className={`btn ${onFavView && 'blue'}`} onClick={() => setOnFavView(true)}>
          Favorites ~ {repoItems?.length}
        </button>
      </nav>

      <Cards data={onFavView ? repoItems : data?.items} isRepoInFav={isRepoInFav} />

      {onFavView && repoItems?.length < 1 && <h1>You have not saved any repos yet</h1>}
    </div>
  )
}

export default App
