import { useEffect, useState } from "react";
import { BiLibrary, BiTrash } from "react-icons/bi";
import { FaPlus, FaPencilAlt } from "react-icons/fa";
import "./Sidebar.css";
import { AddTrackDialog } from "../ModalPopupTrack/addTrack";
import { Button, Input } from "@material-tailwind/react";
import { EditTrackDialog } from "../ModalPopupTrack/editTrack";
import { ImgDfPl, ImgDfTrack } from "../../assets";
import { EditPlaylistDialog } from "../ModalPopupPlaylist/editPlaylist";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSeletedTrack] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [selectedTag, setSeletedTag] = useState("Tracks");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openEditTrack, setOpenEditTrack] = useState(false);
  const handleOpenEditTrack = () => setOpenEditTrack(!openEditTrack);
  const [openEditPlaylist, setOpenEditPlaylist] = useState(false);
  const handleOpenEditPlaylist = () => setOpenEditPlaylist(!openEditPlaylist);
  const [selectedTextTrack, setSelectedTextTrack] = useState("");
  const [selectedTextPlaylist, setSelectedTextPlaylist] = useState("");
  const [selectedIdUpdateTracks, setSelectedIdUpdateTracks] = useState("");
  const navigate = useNavigate();
  const getAllPlaylists = async () => {
    const res = await fetch("http://localhost:3000/playlists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let d = await res.json();
    console.log(d);
    setPlaylists(d.data);
  };
  const getAllTracks = async () => {
    const res = await fetch("http://localhost:3000/tracks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let d = await res.json();
    console.log(d);
    setTracks(d.data);
  };
  const handleAddPlaylist = async () => {
    const dataPost = {
      title: "New playlist of user" + Math.random() * 1000,
      description: "New playlist description of user",
      albumCover:
        "https://res.cloudinary.com/dvnxdtrzn/image/upload/v1730969976/shopDEV/images_df_pl_rzukko.png",
    };
    axios.post("http://localhost:3000/playlists/", dataPost).then((rs) => {
      console.log("🚀 ~ axios.post ~ rs:", rs);
      const id = rs.data.data._id;
      setSelectedIdUpdateTracks(id);
      getAllPlaylists();
      navigate("/playlist/" + id);
    });
  };
  const handleChangeSearchTrack = (e) => {
    setSelectedTextTrack(e.target.value);
  };
  const handleDelete = async (id, type) => {
    Swal.fire({
      title: "Notify",
      text: `Do you want to delete this ${type}?`,
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/${type}s/${id}`)
          .then(() => {
            if (type === "track") {
              getAllTracks();
            }
            if (type === "playlist") {
              getAllPlaylists();
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: `This track exist in playlist!`,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          });
      }
    });
  };
  const handleChangeSearchPlaylist = (e) => {
    setSelectedTextPlaylist(e.target.value);
  };
  useEffect(() => {
    if (selectedTag === "Tracks") {
      getAllTracks();
    }
    if (selectedTag === "Playlists") {
      getAllPlaylists();
    }
  }, [selectedTag]);

  return (
    <div className="w-2/5 fixed left-0 top-0 sidebar p-2 h-full">
      <div className="mt-2 secondary_bg rounded-lg px-2 py-2">
        <div className="flex px-4 justify-between mb-4 items-center gap-4">
          <div className="flex gap-2 items-center">
            <BiLibrary className="font-bold text-xl" />
            <span> Music Library Management</span>
          </div>
          <button className="hover:bg-black/25 rounded-[50%] p-2">
            <FaPlus className="font-bold text-xl" />
          </button>
        </div>
        <div className="btns flex gap-4 mb-4 ml-4">
          <button
            onClick={() => {
              setSeletedTag("Tracks");
            }}
            className={`rounded-full mt-4 px-4   py-2  text-sm ${
              selectedTag == "Tracks"
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            Tracks
          </button>
          <button
            onClick={() => {
              setSeletedTag("Playlists");
            }}
            className={`rounded-full mt-4 px-4   py-2  text-sm ${
              selectedTag == "Playlists"
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            Playlists
          </button>
        </div>
        {selectedTag === "Tracks" ? (
          <div className="px-4">
            <div className="flex justify-between items-center">
              <div className="w-[60%]">
                <Input
                  label="Search"
                  onChange={(e) => handleChangeSearchTrack(e)}
                  color="white"
                  className=""
                />
              </div>
              <Button onClick={handleOpen} variant="gradient">
                {"Add Track"}
              </Button>
            </div>
            {open && (
              <AddTrackDialog
                action={"add"}
                open={open}
                handleOpen={handleOpen}
                getAllTracks={getAllTracks}
              />
            )}
            {openEditTrack && (
              <EditTrackDialog
                action={"edit"}
                open={openEditTrack}
                selectedTrack={selectedTrack}
                handleOpen={handleOpenEditTrack}
                getAllTracks={getAllTracks}
              />
            )}
          </div>
        ) : (
          <div className="px-4">
            <div className="flex justify-between items-center">
              <div className="w-[60%]">
                <Input
                  label="Search"
                  onChange={(e) => handleChangeSearchPlaylist(e)}
                  color="white"
                  className=""
                />
              </div>
              <Button onClick={handleAddPlaylist} variant="gradient">
                Add Playlist
              </Button>
            </div>
            {openEditPlaylist && (
              <EditPlaylistDialog
                open={openEditPlaylist}
                selectedPlaylist={selectedPlaylist}
                handleOpen={handleOpenEditPlaylist}
                getAllPlaylists={getAllPlaylists}
              />
            )}
          </div>
        )}
        <div className="overflow-auto h-[700px]">
          {selectedTag === "Tracks" ? (
            <div className="my-6 px-4">
              {[
                ...(tracks ?? []).filter((item) =>
                  item?.title
                    ?.toLocaleLowerCase()
                    .includes(selectedTextTrack.toLocaleLowerCase())
                ),
              ].map((track) => {
                return (
                  <div
                    key={track?._id}
                    className="grid grid-cols-8 items-center cursor-pointer bg-white/5 hover:bg-white/20 p-3 rounded-sm my-2"
                  >
                    <div className="flex gap-4 py-2 col-span-5">
                      <div>
                        <img
                          src={track?.thumnailUrl ?? ImgDfTrack}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-2">
                          {track.title}
                        </h3>
                        <p className="text-sm text-white/80 text-ellipsis w-56 line-clamp-1">
                          in album:
                          <span>
                            {" "}
                            {track.album} of Artist: {track.artist}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2">{track?.genre}</div>
                    <div className="col-span-1 ml-6 flex gap-2">
                      <FaPencilAlt
                        onClick={() => {
                          setSeletedTrack(track);
                          handleOpenEditTrack();
                        }}
                      />
                      <BiTrash
                        onClick={() => handleDelete(track?._id, "track")}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="my-6 px-4">
              {[
                ...(playlists ?? []).filter((item) =>
                  item?.title
                    ?.toLocaleLowerCase()
                    .includes(selectedTextPlaylist.toLocaleLowerCase())
                ),
              ].map((playlist) => {
                return (
                  <div
                    key={playlist?._id}
                    onClick={() => {
                      setSelectedIdUpdateTracks(playlist?._id);
                      navigate("/playlist/" + playlist?._id);
                    }}
                    className={`grid grid-cols-8 items-center cursor-pointer ${
                      selectedIdUpdateTracks === playlist?._id
                        ? "bg-white/30"
                        : "bg-white/5"
                    } hover:bg-white/20 p-3 rounded-sm my-2`}
                  >
                    <div className="flex gap-4 py-2 col-span-5">
                      <div>
                        <img
                          src={
                            playlist?.albumCover.includes("http")
                              ? playlist?.albumCover
                              : ImgDfPl
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-2">
                          {playlist?.title}
                        </h3>
                        <p className="text-sm text-white/80 text-ellipsis w-72 line-clamp-1">
                          {playlist?.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-1 ml-6 flex gap-2">
                      <FaPencilAlt
                        onClick={() => {
                          setSelectedPlaylist(playlist);
                          handleOpenEditPlaylist();
                        }}
                      />
                      <BiTrash
                        onClick={() => handleDelete(playlist?._id, "playlist")}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
