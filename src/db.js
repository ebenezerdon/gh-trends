import Dexie from 'dexie'

const db = new Dexie('ghTrends')
db.version(1).stores({
  favRepos: 'id, repo'
})

const addFav = repo => {
  db.favRepos.add({ id: repo.id, repo })
}

const removeFav = repo => {
  db.favRepos.delete(repo.id)
}

export { db, addFav, removeFav }
