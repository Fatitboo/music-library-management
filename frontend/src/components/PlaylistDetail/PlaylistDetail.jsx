import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImgDfPl } from "../../assets";
import { Input } from "@material-tailwind/react";
import Swal from "sweetalert2";

const PlaylistDetail = () => {
  const { id } = useParams();
  const [selectedText, setSelectedText] = useState("");
  const [playlistDetail, setPlaylistDetail] = useState({});
  const [tracks, setTracks] = useState([]);
  const [trackInPlaylist, setTrackInPlaylist] = useState([]);
  const getPlaylistDetail = async (id) => {
    axios.get("http://localhost:3000/playlists/" + id).then((data) => {
      console.log("🚀 ~ axios.post ~ rs:", data.data.data);
      const rs = data.data.data;
      setPlaylistDetail(rs);
      setTrackInPlaylist(() => {
        return rs.tracks?.map((item) => {
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
    });
  };
  const getAllTracksNotInPlaylist = async () => {
    const res = await fetch(
      "http://localhost:3000/playlists/" + id + "/tracks-not-add",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let d = await res.json();
    console.log(d);
    setTracks(() => {
      return d.data?.map((item) => {
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
  };

  const handleChangeSearch = (e) => {
    setSelectedText(e.target.value);
  };
  const handleUpdateTracksOnPlaylist = async (action, trackId) => {
    Swal.fire({
      title: "Notify",
      text: `Do you want to ${action} this track?`,
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:3000/playlists/${id}/tracks/${trackId}`, {
            action,
          })
          .then(() => {
            getPlaylistDetail(id);
          });
      }
    });
  };
  useEffect(() => {
    getAllTracksNotInPlaylist();
    getPlaylistDetail(id);
  }, [id]);
  return (
    <Layout>
      <Navbar />

      <div className=" bg-blue-gray-600 ml-2  py-4 pb-20 home ">
        <div className="flex p-3 px-6">
          <img
            src={playlistDetail?.albumCover ?? ImgDfPl}
            className="h-[10rem]"
            alt=""
          />
          <div className="ml-5 mb-4 pt-4 ">
            <div className=" text-white mb-3 ">Playlist</div>
            <span className="text-5xl  font-bold hover:underline cursor-pointer">
              {playlistDetail?.title}
            </span>
            <div className="mt-5">{playlistDetail?.description}</div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-black/30 to-black/80 px-6 pt-5">
          <div className="">
            <div className="text-xl text-white font-bold ">
              Tracks on playlist
            </div>
          </div>
          <div className=" h-52 overflow-auto">
            {(trackInPlaylist ?? []).map((song, i) => {
              return (
                <Card
                  key={song.id}
                  idx={i}
                  song={song}
                  isDetail={true}
                  isInList={true}
                  updateFunc={handleUpdateTracksOnPlaylist}
                />
              );
            })}
          </div>
          <div className="flex justify-between my-4 items-center">
            <span className="text-xl text-white font-bold hover:underline cursor-pointer">
              Brower new tracks
            </span>
          </div>
          <div className="w-[60%] my-4">
            <Input
              label="Search"
              onChange={(e) => handleChangeSearch(e)}
              color="white"
              className=""
            />
          </div>
          <div className=" h-72 overflow-auto ">
            {(tracks ?? [])
              .filter((item) => {
                return !trackInPlaylist.includes(item);
              })
              .filter((item) =>
                item.title
                  .toLocaleLowerCase()
                  .includes(selectedText.toLocaleLowerCase())
              )
              .map((song, i) => {
                return (
                  <Card
                    key={song.id}
                    idx={i}
                    song={song}
                    isDetail={true}
                    isInList={false}
                    updateFunc={handleUpdateTracksOnPlaylist}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <SongBar />
    </Layout>
  );
};

export default PlaylistDetail;
