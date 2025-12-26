import { useEffect, useState } from "react";

const API_KEY = "bKflKeJmgG9wu4f1UPVYpFl5IVpaMBukW5LsrlzX";
const BASE_URL = "https://api.watchmode.com/v1";

export default function App() {
  const [titles, setTitles] = useState([]);
  const [banner, setBanner] = useState(null);
  const [type, setType] = useState("movie");

  useEffect(() => {
    fetch(
      `${BASE_URL}/list-titles/?apiKey=${API_KEY}&types=${type}&providers=netflix&limit=25`
    )
      .then(res => res.json())
      .then(data => {
        const validTitles = data.titles.filter(t => t.poster);
        setTitles(validTitles);
        setBanner(
          validTitles[Math.floor(Math.random() * validTitles.length)]
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
          style={{ backgroundImage: `url(${banner.poster})` }}
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
          <div
            className="card"
            key={item.id}
            onClick={() => window.open(item.web_url, "_blank")}
          >
            <img src={item.poster} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
