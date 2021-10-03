import { useState } from "react";
import Card from "./Card";
import "./Home.css";

export default function Home({ musicData }) {
  const [filteredArray, setFilteredArray] = useState(musicData);
  const genres = ["All", ...new Set(musicData.map((item) => item.genre))];

  const handleClick = (genre) => {
    if (genre.toLowerCase() === "all") setFilteredArray(musicData);
    else
      setFilteredArray(
        musicData.filter(
          (item) => item.genre.toLowerCase() === genre.toLowerCase()
        )
      );
  };

  return (
    <section className="section_body">
      <div className="genres">
        {genres.map((item) => (
          <button key={item} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
      </div>

      <div>
        {filteredArray.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
