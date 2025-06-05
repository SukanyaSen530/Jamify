const data: Music[] = [
  {
    id: "A1",
    name: "Param Sundari",
    album: "Mimi",
    singers: "Shreya Ghoshal",
    genre: "Indian Film Pop",
    year: 2021,
    imgUrl:
      "http://a10.gaanacdn.com/images/albums/78/4419378/crop_480x480_4419378.jpg",
    file: "/music/param-sundari.mp3",
  },
  {
    id: "C3",
    name: "Valam",
    album: "Made in China",
    singers: "Arijit Singh",
    genre: "Romantic",
    year: 2019,
    imgUrl:
      "http://a10.gaanacdn.com/images/song/2/28407802/crop_480x480_1571209833.jpg",
    file: "/music/valam.mp3",
  },

  {
    id: "D4",
    name: "Mann Mera",
    album: "Table N0. 21",
    singers: "Gajendra Verma",
    genre: "Romantic",
    year: 2012,
    imgUrl: "https://i1.sndcdn.com/artworks-000232511376-qdhzy4-t500x500.jpg",
    file: "/music/mann-mera.mp3",
  },
  {
    id: "G7",
    name: "Muqabla",
    album: "Street Dancer 3D",
    singers: "Yash Narvekar, Parampara Thakur",
    genre: "Indian Film Pop",
    year: 2020,
    imgUrl:
      "http://a10.gaanacdn.com/images/song/96/29147296/crop_480x480_1576899539.jpg",
    file: "/music/muqabla.mp3",
  },
  {
    id: "I9",
    name: "LSD - Genius",
    album: "Singles",
    singers: "Sia, Diplo, Labrinth",
    genre: "Pop",
    year: 2018,
    imgUrl:
      "https://images.genius.com/549e74fbfc6a67c6f343edd8dbfa0bf3.1000x1000x1.jpg",
    file: "/music/genius.mp3",
  },
  {
    id: "J10",
    name: "Break My Heart",
    album: "Singles",
    singers: "Dua Lipa",
    genre: "Pop",
    year: 2020,
    imgUrl:
      "https://i1.sndcdn.com/artworks-V78SOvyhOCaBHR3F-0tipuA-t500x500.jpg",
    file: "/music/break-my-heart.mp3",
  },
  {
    id: "M13",
    name: "Man Alive",
    album: "Woosh",
    singers: "Deep Purple",
    genre: "Rock",
    year: 2020,
    imgUrl:
      "https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/05/c4/e1/05c4e15e-6b60-06a7-f4e0-a58560dbe9f5/4029759147459.jpg/400x400cc.jpeg",
    file: "/music/man-alive.mp3",
  },
  {
    id: "N14",
    name: "Tum Hi Ho",
    album: "Aashiqui 2",
    singers: "Arijit Singh",
    genre: "Emotional Ballads",
    year: 2013,
    imgUrl:
      "http://a10.gaanacdn.com/images/albums/17/92317/crop_480x480_92317.jpg",
    file: "/music/tum-hi-ho.mp3",
  },
  {
    id: "Q15",
    name: "Teri Hogaiyaan",
    album: "Broken But Beautiful",
    singers: "Vishal Mishra",
    genre: "Emotional Ballads",
    year: 2019,
    imgUrl:
      "https://c-cl.cdn.smule.com/rs-s-sf-1/arr/9f/38/0700dc87-faea-4af0-828a-e373215f8ecf_1024.jpg",
    file: null,
  },
];

export interface Music {
  id: string;
  name: string;
  album: string;
  singers: string;
  genre: string;
  year: number;
  imgUrl: string;
  file: string | null;
}

export default data;
