import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Tum Hi Ho xxxxxxx",
    artist: "Phatnv",
    mp3: new Audio(
      "https://res.cloudinary.com/dvnxdtrzn/video/upload/v1730968541/shopDEV/file_example_MP3_700KB_ba6bln.mp3"
    ),
    img: "/assets/Arijit-1.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Ae Dil Hai Mushkil",
    artist: "Phatnv",
    mp3: new Audio("/assets/mp3/ae.mp3"),
    img: "/assets/Arijit-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Mirchi Awards",
    artist: "Phatnv",
    mp3: new Audio("/assets/mp3/Mashup.mp3"),
    img: "/assets/Arijit-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Judaiyaan",
    artist: "Phatnv",
    mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
    img: "/assets/Arijit-4.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Phatnv",
    mp3: new Audio("/assets/mp3/Heeriye.m4a"),
    img: "/assets/Arijit-1.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tu hi Hai Aashiqui",
    artist: "Phatnv",
    mp3: new Audio("/assets/mp3/Tu Hi Hai Aashiqui.mp3"),
    img: "/assets/Arijit-2.jpg",
  },
];

const Home = () => {
  const { getUser } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const search = async (query) => {
    const { data } = await axios.get("http://localhost:3000/search", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        query,
      },
    });

    console.log(data);
    setTracks(() => {
      return data.data.tracks?.map((item) => {
        return {
          id: item._id,
          title: item?.title,
          genre: item?.genre,
          artist: item?.artist,
          album: item?.album,
          mp3: item?.mp3Url?.includes("http")
            ? new Audio(item?.mp3Url)
            : new Audio("/assets/mp3/Tu Hi Hai Aashiqui.mp3"),
          img: item?.thumnailUrl,
        };
      });
    });
    setPlaylists(() => {
      return data.data.playlists?.map((item) => {
        return {
          id: item._id,
          title: item?.title,
          artist: item?.description,
          album: "",
          mp3:
            item?.tracks && item?.tracks[0]?.mp3Url?.includes("http")
              ? new Audio(item?.tracks[0]?.mp3Url)
              : new Audio("/assets/mp3/Tu Hi Hai Aashiqui.mp3"),
          img: item?.albumCover,
        };
      });
    });
  };
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    // getUser();
    search(query);
  }, [query]);
  return (
    <Layout>
      <Navbar />
      <div className={`px-2 w-full text-left py-4 relative `}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => handleQuery(e)}
          className={`block w-[400px] rounded-full pl-16 border-0 text-gray-500 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[2px] focus:ring-inset focus:ring-white outline-none p-3 hover:ring-white/20 bg-[#333232]`}
        />
        <FiSearch className="absolute font-bold text-2xl left-4 top-7 " />
      </div>
      <div className=" bg-orange-300 bg-gradient-to-b from-black/30 to-black/80 ml-2 px-4 py-4 pb-20 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl text-white font-bold hover:underline cursor-pointer">
            Tracks
          </span>
        </div>
        <div className="grid  gap-6 grid-cols-4">
          {[...(tracks ?? [])].map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl text-white font-bold hover:underline cursor-pointer">
            Playlist
          </span>
        </div>
        <div className="grid  gap-6 grid-cols-4">
          {[...(playlists ?? [])].map((song, i) => {
            return <Card key={song.id} idx={i} song={song} isPlaylist={true} />;
          })}
        </div>
      </div>
      <SongBar />
    </Layout>
  );
};

export default Home;
