import { useEffect, useState } from "react";

const API_KEY = "bKflKeJmgG9wu4f1UPVYpFl5IVpaMBukW5LsrlzX";
const BASE = "https://api.watchmode.com/v1";

export default function App() {
  const [titles, setTitles] = useState([]);
  const [banner, setBanner] = useState(null);
  const [type, setType] = useState("movie");

  useEffect(() => {
    fetch(
      `${BASE}/list-titles/?apiKey=${API_KEY}&types=${type}&providers=netflix&limit=20`
    )
      .then(res => res.json())
      .then(data => {
        setTitles(data.titles);
        setBanner(
          data.titles[Math.floor(Math.random() * data.titles.length)]
        );
      });
  }, [type]);

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>ASFLIX</h2>
        <div>
          <button onClick={() => setType("movie")}>Movies</button>
          <button onClick={() => setType("tv")}>Series</button>
        </div>
      </div>

      {/* BANNER */}
      {banner && (
        <header
          className="banner"
          style={{
            backgroundImage: `url(${banner.poster})`
          }}
        >
          <h1>{banner.title}</h1>
          <p>Available on Netflix</p>
        </header>
      )}

      {/* LIST */}
      <h2 className="section">
        {type === "movie" ? "Netflix Movies" : "Netflix Series"}
      </h2>

      <div className="row">
        {titles.map(item => (
          <img
            key={item.id}
            src={item.poster}
            alt={item.title}
          />
        ))}
      </div>
    </>
  );
}
