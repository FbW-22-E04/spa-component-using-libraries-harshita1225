import { useEffect, useState } from 'react'
import './App.css';
import filterList from './filter'
import PigeonMap from './components/PigeonMap'
import ProviderList from './components/ProviderList'

function App() {
  const [foundProviders, setFoundProviders] = useState([]) 
  const [allProviders, setAllProviders] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function loadProviders() {
      const res = await fetch('http://api.citybik.es/v2/networks')
      const data = await res.json()
      setAllProviders(data.networks)
    }
    loadProviders()
  }, [])

  useEffect(() => {
    const filteredProviders = filterList(allProviders, searchTerm)
    setFoundProviders(filteredProviders)
  }, [searchTerm, allProviders])

  function searchTermChanged(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="App">
      <input type='search' placeholder='Search' onChange={searchTermChanged} />
        <PigeonMap foundProviders={foundProviders} searchTerm={searchTerm} />
        <ProviderList foundProviders={foundProviders} />
    </div>
  );
}

export default App;
