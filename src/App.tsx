import { useMemo, useState } from "react";
import data, { type Music } from "./mock/music.ts";
import AudioPlayer from "./components/AudioPlayer/index.tsx";

function App() {
  const [activeGenre, setActiveGenre] = useState("All");
  const genres = ["All", ...new Set(data.map((item) => item.genre))];
  const [selectedSong, setSelectedSong] = useState<Music | null>(null);

  const handleGenreOnClick = (selectedGenre: string) => {
    setActiveGenre(selectedGenre);
  };

  const filteredData = useMemo(() => {
    if (activeGenre === "All") return data;
    else return data.filter((item) => item.genre === activeGenre);
  }, [activeGenre]);

  return (
    <main className="p-6">
      <h1>Jamify</h1>

      <div className="flex gap-2">
        {genres?.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreOnClick(genre)}
            className="bg-amber-300 px-2 min-w-[100px] rounded-md cursor-pointer"
          >
            {genre}
          </button>
        ))}
      </div>

      {filteredData.map((music) => (
        <div key={music.id} onClick={() => setSelectedSong(music)}>
          {music.name}
        </div>
      ))}

      {selectedSong ? <AudioPlayer musicData={selectedSong} /> : null}
    </main>
  );
}

export default App;
