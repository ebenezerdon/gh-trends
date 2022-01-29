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

  const favourites = useLiveQuery(() => db.favRepos?.toArray())

  return (
    <div className="App">
      <h1>{formattedDate}</h1>
      <Cards data={data}/>
    </div>
  );
}

export default App
