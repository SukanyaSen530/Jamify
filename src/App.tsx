import { useMemo, useState } from "react";
import data from "./mock/music.ts";
import AudioPlayer from "./components/AudioPlayer/index.tsx";
import Carousel from "./components/Carousel/index.tsx";
import Card from "./components/Card/index.tsx";

const App = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const genres = ["All", ...new Set(data.map((item) => item.genre))];
  const [selectedSongIndex, setSelectedSongIndex] = useState<number>(-1);

  const handleGenreOnClick = (selectedGenre: string) => {
    setActiveGenre(selectedGenre);
  };

  const handleNext = () => {
    if (selectedSongIndex === null) return;

    const nextIndex = (selectedSongIndex + 1) % filteredData.length;
    setSelectedSongIndex(nextIndex);
  };

  const handlePrev = () => {
    if (selectedSongIndex === null) return;

    const prevIndex =
      (selectedSongIndex - 1 + filteredData.length) % filteredData.length;
    setSelectedSongIndex(prevIndex);
  };

  const filteredData = useMemo(() => {
    if (activeGenre === "All") return data;
    else return data.filter((item) => item.genre === activeGenre);
  }, [activeGenre]);

  return (
    <main>
      <section className="relative px-[2%] sm:px-[5%] md:px-[10%] lg:px-[15%] py-[3%] min-h-[100vh]">
        <header>
          <h1 className="sm:text-5xl md:text-7xl font-semibold tracking-[5px] text-center color-light mb-10">
            {" "}
            JamiFy 🎧{" "}
          </h1>
        </header>

        <nav className="my-4">
          <Carousel
            data={genres}
            onItemClick={handleGenreOnClick}
            activeItem={activeGenre}
          />
        </nav>

        <section className="py-2">
          <h2 className="text-[1.5rem]">
            {activeGenre === "All" ? "Top" : activeGenre} songs
          </h2>

          <div className="my-4">
            {filteredData.map((music, index) => (
              <Card
                onClick={() => setSelectedSongIndex(index)}
                key={music.id}
                index={index + 1}
                musicData={music}
                selectedSongId={filteredData[selectedSongIndex]?.id ?? null}
              />
            ))}
          </div>
        </section>
      </section>

      <footer className="sticky bottom-0 left-0 right-0">
        {selectedSongIndex !== -1 ? (
          <AudioPlayer
            musicData={filteredData[selectedSongIndex]}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        ) : null}
      </footer>
    </main>
  );
};

export default App;
