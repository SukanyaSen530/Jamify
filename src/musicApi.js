const musicData = [
  {
    id: "A1",
    name: "Param Sundari",
    album: "Mimi",
    singers: "Shreya Ghoshal",
    genre: "Party",
    year: "2021",
    imgUrl:
      "http://a10.gaanacdn.com/images/albums/78/4419378/crop_480x480_4419378.jpg"
  },
  {
    id: "B2",
    name: "Thora Thora Pyaar Hua",
    album: "Singles",
    singers: "Stebin Ben",
    genre: "Romantic",
    year: "2021",
    imgUrl:
      "https://c.saavncdn.com/959/Thoda-Thoda-Pyaar-Hindi-2021-20210212084501-500x500.jpg"
  },
  {
    id: "C3",
    name: "Valam",
    album: "Made in China",
    singers: "Arijit Singh",
    genre: "Romantic",
    year: "2019",
    imgUrl:
      "http://a10.gaanacdn.com/images/song/2/28407802/crop_480x480_1571209833.jpg"
  },
  {
    id: "D4",
    name: "Mann Mera",
    album: "Table N0. 21",
    singers: "Gajendra Verma",
    genre: "Romantic",
    year: "2012",
    imgUrl: "https://i1.sndcdn.com/artworks-000232511376-qdhzy4-t500x500.jpg"
  },
  {
    id: "E5",
    name: " Chura Liya Hai Tumne Jo Dil Ko",
    album: "Yaadon Ki Baaraat",
    singers: "Mohammad Rafi, Asha Bhosle",
    genre: "Romantic",
    year: "1973",
    imgUrl:
      "http://a10.gaanacdn.com/images/albums/51/2927751/crop_480x480_2927751.jpg"
  },
  {
    id: "F6",
    name: "Soniyo",
    album: "Raaz: The Mystery Continues",
    singers: "Shreya Ghoshal",
    genre: "Romantic",
    year: "2010",
    imgUrl:
      "https://a10.gaanacdn.com/gn_img/albums/D0PKLqr3Gl/0PKLRwrWGl/size_xxl.webp"
  },
  {
    id: "G7",
    name: "Muqabla",
    album: "Street Dancer 3D",
    singers: "Yash Narvekar, Parampara Thakur",
    genre: "Party",
    year: "2020",
    imgUrl:
      "http://a10.gaanacdn.com/images/song/96/29147296/crop_480x480_1576899539.jpg"
  },
  {
    id: "H8",
    name: "Jalebi Baby",
    album: "Singles",
    singers: "Jason Derulo, Tesher",
    genre: "Party",
    year: "2021",
    imgUrl: "https://i.scdn.co/image/ab67616d0000b2737dd52961eb9ee34cd232d251"
  },
  {
    id: "I9",
    name: "LSD - Genius",
    album: "Singles",
    singers: "Sia, Diplo, Labrinth",
    genre: "Pop",
    year: "2018",
    imgUrl:
      "https://images.genius.com/549e74fbfc6a67c6f343edd8dbfa0bf3.1000x1000x1.jpg"
  },
  {
    id: "J10",
    name: "Break My Heart",
    album: "Singles",
    singers: "Dua Lipa",
    genre: "Pop",
    year: "2020",
    imgUrl:
      "https://i1.sndcdn.com/artworks-V78SOvyhOCaBHR3F-0tipuA-t500x500.jpg"
  },
  {
    id: "K11",
    name: "Moves Like Jagger",
    album: "Maroon 5",
    singers: "Adam Levine, Christina Aguilera",
    genre: "Pop",
    year: "2011",
    imgUrl:
      "https://m.media-amazon.com/images/M/MV5BMTUxMzFhZGQtZjNjZC00YzRhLWE2ZTMtN2ZkYWJkOTIyODViXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg"
  },
  {
    id: "L12",
    name: " All Time Low",
    album: "Singles",
    singers: "Getaway Green ",
    genre: "Rock",
    year: "2020",
    imgUrl:
      "https://img.discogs.com/vZS-CIz4_Y42-YimdA19hGFMrds=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-15002830-1591294045-2411.jpeg.jpg"
  },
  {
    id: "M13",
    name: "Man Alive",
    album: "Woosh",
    singers: "Deep Purple",
    genre: "Rock",
    year: "2020",
    imgUrl:
      "https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/05/c4/e1/05c4e15e-6b60-06a7-f4e0-a58560dbe9f5/4029759147459.jpg/400x400cc.jpeg"
  },
  {
    id: "N14",
    name: "Milne Hai Mujhse Aayi",
    album: "Aashiqui 2",
    singers: "Arijit Singh",
    genre: "Sad",
    year: "2013",
    imgUrl:
      "http://a10.gaanacdn.com/images/albums/17/92317/crop_480x480_92317.jpg"
  },
  {
    id: "O15",
    name: "Jiyein Kyun",
    album: "Dum Maaro Dum",
    singers: "Papon",
    genre: "Sad",
    year: "2011",
    imgUrl:
      "https://a10.gaanacdn.com/gn_img/albums/2lV3dl13Rg/lV3dkyEKRg/size_xxl.webp"
  },
  {
    id: "P14",
    name: "Dua Ban Ja",
    album: "It happened in Calcutta",
    singers: "Harshdeep Kaur, Akhil Sachdeva",
    genre: "Sad",
    year: "2020",
    imgUrl:
      "https://c.saavncdn.com/048/It-Happened-in-Calcutta-Hindi-2020-20200319095606-500x500.jpg"
  },
  {
    id: "Q15",
    name: "Teri Hogaiyaan",
    album: "Broken But Beautiful",
    singers: "Vishal Mishra",
    genre: "Sad",
    year: "2019",
    imgUrl:
      "https://c-cl.cdn.smule.com/rs-s-sf-1/arr/9f/38/0700dc87-faea-4af0-828a-e373215f8ecf_1024.jpg"
  },
  {
    id: "R16",
    name: "In The Name Of Love",
    album: "Singles",
    singers: "Martin Garrix, Bebe Rexha",
    genre: "Pop",
    year: "2016",
    imgUrl:
      "https://m.media-amazon.com/images/M/MV5BMGVjN2M1OTItNjNjMi00ZDNlLWI3ZmQtZjk3NjkwYjgyYjU1XkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_.jpg"
  }
];

export default musicData;
