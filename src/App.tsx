import { useMemo, useState, lazy, Suspense } from "react";
import data from "./mock/music.ts";

import Card from "./components/Card/index.tsx";
const Carousel = lazy(() => import("./components/Carousel/index.tsx"));
const AudioPlayer = lazy(() => import("./components/AudioPlayer/index.tsx"));

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
      <section className="relative px-[3%] sm:px-[5%] md:px-[10%] lg:px-[15%] py-[10%] sm:py-[5%] md:py-[7%] min-h-[100vh]">
        <header>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[5px] text-center color-light mb-6">
            JamiFy 🎧
          </h1>
        </header>

        <nav className="my-4">
          <Suspense
            fallback={<div className="skeleton h-[3rem] w-full py-4" />}
          >
            <Carousel
              data={genres}
              onItemClick={handleGenreOnClick}
              activeItem={activeGenre}
            />
          </Suspense>
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
        <Suspense
          fallback={
            <div className="h-[84px] bg-[var(--neu-light)] w-full p-4 flex justify-between">
              <p className="h-[54px] w-[150px] skeleton" />
              <p className="h-[54px] w-[150px] skeleton" />
              <p className="h-[54px] w-[150px] skeleton" />
            </div>
          }
        >
          {selectedSongIndex !== -1 ? (
            <AudioPlayer
              musicData={filteredData[selectedSongIndex]}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          ) : null}
        </Suspense>
      </footer>
    </main>
  );
};

export default App;
