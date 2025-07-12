import { useMemo, useState } from "react";
import data, { type Music } from "./mock/music.ts";
import AudioPlayer from "./components/AudioPlayer/index.tsx";
import Carousel from "./components/Carousel/index.tsx";
import Card from "./components/Card/index.tsx";

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
    <main className="bg-gray min-h-screen p-4 md:p-10 pb-50 md:pb-30 flex flex-col gap-8">
      <h1 className="text-5xl text-center text-accent font-bold">
        {" "}
        Jamify 🎧{" "}
      </h1>

      <div>
        <h2 className="text-xl pb-2"> Genre </h2>
        <Carousel
          data={genres}
          onItemClick={handleGenreOnClick}
          activeItem={activeGenre}
        />
      </div>

      <div>
        <h2 className="text-xl pb-2">
          {activeGenre === "All" ? "Top" : activeGenre} songs
        </h2>
        {filteredData.map((music, index) => (
          <Card
            onClick={() => setSelectedSong(music)}
            key={music.id}
            index={index + 1}
            musicData={music}
            selectedSongId={selectedSong?.id}
          />
        ))}
      </div>

      {selectedSong ? <AudioPlayer musicData={selectedSong} /> : null}
    </main>
  );
}

export default App;
