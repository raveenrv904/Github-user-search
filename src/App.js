import { useState } from "react";
import "./index.css";
import "./App.css";

const API_URL = "https://api.github.com";

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

export default function App() {
  const [user, setUser] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(event) {
    setUser(event.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const results = await fetchResults(user);
    setResults(results);
    setUser("");
    console.log(results)
  }

  return (
    <div className="app">
      <main className="main">
        <h2 className="title">GitHub User Search</h2>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={user}
        />
        <div id="results">
          <div>
            <h3>Results</h3>
            {results.map((user) => (
              <User
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} className="user-profile" alt="Profile" width="50" height="50" />
      <a href={url} className="user-url btn" target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}

function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="input-field"
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />
      <button type="submit" className="btn-search btn">Search</button>
    </form>
  );
}
