import React from "react";
import "./Card.css";
import { FaPause, FaPencilAlt, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { pauseSong, playSong } from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import { ImgDfPl, ImgDfTrack } from "../../assets";
import { PiGarageFill } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
const Card = ({
  song,
  idx,
  isDetail = false,
  isPlaylist = false,
  isInList,
  updateFunc,
}) => {
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
  const { resetEverything, setSongIdx } = useGlobalContext();
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    console.log("playing");
    setSongIdx(idx);
    console.log(idx);
    if (isPlaying) {
      masterSong.mp3.currentTime = 0;
      masterSong.mp3.pause();
      resetEverything();
    }
    dispatch(playSong(song));
  };
  const handlePause = () => {
    dispatch(pauseSong());
  };
  return (
    song &&
    (!isDetail ? (
      <div className="card col-span-1 p-4 rounded-lg">
        <div className="relative">
          <img src={song?.img ?? ImgDfTrack} className="h-[10rem]" alt="" />
          <div>
            {masterSong.id === song.id && isPlaying ? (
              <button
                onClick={handlePause}
                className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3"
              >
                <FaPause className="text-black text-xl" />
              </button>
            ) : (
              <button
                onClick={() => handlePlay(song)}
                className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3"
              >
                <FaPlay className="text-black text-xl" />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-sm font-semibold my-2">{song.title}</h3>
        <p className="text-xs text-gray-400 leading-4">
          {song.album} - {song.artist}
        </p>
      </div>
    ) : (
      <div className="col-span-1 card">
        <div
          // key={track?._id}
          className="grid grid-cols-8 items-center cursor-pointer bg-white/5 hover:bg-white/20 p-3 rounded-sm my-1"
        >
          <div className="flex gap-4 py-2 col-span-5">
            <div>
              {masterSong.id === song.id && isPlaying ? (
                <button
                  onClick={handlePause}
                  className="flex items-center play_btn rounded-[50%] bg-green-500 justify-center p-3"
                >
                  <FaPause className="text-black text-xl" />
                </button>
              ) : (
                <button
                  onClick={() => handlePlay(song)}
                  className="flex items-center play_btn  rounded-[50%] bg-green-500 justify-center p-3"
                >
                  <FaPlay className="text-black text-xl" />
                </button>
              )}
            </div>
            <div>
              <img
                src={song?.img ?? ImgDfTrack}
                width={50}
                height={50}
                alt=""
              />
            </div>
            <div>
              <h3 className="text-base font-medium mb-2">{song.title}</h3>
              <p className="text-sm text-white/80">
                in album:
                <span>
                  {" "}
                  {song.album} of Artist: {song.artist}
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-2">{song?.genre}</div>
          {isDetail && (
            <div className="col-span-1 ml-6">
              {isInList ? (
                <BiTrash
                  className=""
                  onClick={() => {
                    updateFunc("remove", song.id);
                    // setSeletedTrack(track);
                    // handleOpenEditTrack();
                  }}
                />
              ) : (
                <IoMdAddCircleOutline
                  onClick={() => {
                    updateFunc("add", song.id);
                  }}
                  className=""
                />
              )}
            </div>
          )}
        </div>
      </div>
    ))
  );
};

export default Card;
