import './App.css';
import { useState } from 'react';
import playButton from './images/play-button.svg'

function App() {

  let searchTerm;
  const [data, setData] = useState();

  const setSearchTerm = () => {
    searchTerm = document.getElementById('searchText').value
  }

  const handleSearch = async () => {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        if(data[0].word) setData(data);
        else setData('Word not found');
        console.log(data);
      });
  }

  const playAudio = () => {
    let audio = new Audio(data[0].phonetics[0].audio);
    audio.play();
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className="App">
      <header>
        <h1>Online Dictionary</h1>
        <div className="searchBox">
          <input onChange={setSearchTerm} onKeyDown={handleEnterPress} type="text" name="searchText" id="searchText" />
          <button onClick={handleSearch} className="searchButton">Search</button>
        </div>
      </header>
      {data && <main>
        <section className='section-header'>
          <div>
            <h2>{data[0].word}</h2>
            <span>{data[0].phonetic}</span>
          </div>
          {data[0].phonetics[0].audio && <img src={playButton} alt="Preview pronunciation" id='playButton' onClick={playAudio} width={50} height={50} />}
        </section>
        <section>
          <h3>Definitions</h3>
          <ul>
            {data[0].meanings[0].definitions.map(meaning => {
              return <li key={meaning.definition}>{meaning.definition}</li>
            })}
          </ul>
          <span className='sourceText'>Source: <a target="_blank" rel="noreferrer" href={data[0].sourceUrls[0]}>{data[0].sourceUrls[0]}</a></span>
        </section>
      </main>}
    </div>
  );
}

export default App;
