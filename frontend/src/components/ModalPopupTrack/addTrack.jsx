import { useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TextInput from "../TextInput/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ImgDfTrack } from "../../assets";
import LoadingComponent from "../Loading/Loading";
export function AddTrackDialog({
  action,
  handleOpen,
  open,
  selectedTrack,
  getAllTracks,
}) {
  const genres = [
    "Pop music",
    "Hip hop music",
    "Rock music",
    "Rhythm and blues",
    "Soul music",
    "Reggae",
    "Country",
    "Funk",
    "Folk music",
    "Middle Eastern music",
    "Jazz",
    "Disco",
    "Classical music",
    "Electronic music",
    "Music of Latin America",
    "Blues",
    "Music for children",
    "New-age music",
    "Vocal music",
    "Music of Africa",
    "Christian music",
    "Music of Asia",
    "Ska",
    "Traditional music",
    "Independent music",
  ];
  const [selectedGenre, setSelectedGenre] = useState(genres[10]);
  const [fileName, setFileName] = useState({});
  const [fileAvt, setFileAvt] = useState(null);

  const handleChange = (value) => setSelectedGenre(value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const handleUpdateMp3File = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const rs = await uploadImageFromLocalFiles({ file });
    setLoading(false);

    setFileName({
      fileName: rs.original_filename + "." + rs.format,
      mp3Url: rs.secure_url,
      playbackUrl: rs.playback_url,
    });
  };
  const handleUpdateAvt = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const rs = await uploadImageFromLocalFiles({ file });
    setLoading(false);

    setFileAvt(rs.url);
  };
  const onSubmitForm = async (data) => {
    const dataPost = {
      title: data.title,
      artist: data.artist,
      album: data.album,
      genre: selectedGenre,
      releaseYear: parseInt(data.releaseYear),
      duration: parseInt(data.duration),
      mp3Url: fileName.mp3Url,
      playbackUrl: fileName.playbackUrl,
      fileName: fileName.fileName,
      thumnailUrl: fileAvt,
    };
    console.log("🚀 ~ onSubmitForm ~ dataPost:", dataPost);
    axios.post("http://localhost:3000/tracks", dataPost).then(() => {
      getAllTracks();
      handleOpen();
    });

    Swal.fire({
      title: "Successful",
      text: `Add track successfully?`,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: action,
    });
  };
  const uploadImageFromLocalFiles = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload_audio"); // Set this in your Cloudinary dashboard

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvnxdtrzn/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data;

      // return uploadUrls;
    } catch (error) {
      console.error("Error uploading image::", error);
    }
  };
  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        {loading && <LoadingComponent />}
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {action === "add" ? "Add Track" : "Edit Track"}
          </Typography>

          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <div className="flex items-end px-4">
          <div className="relative flex items-end ">
            <img
              src={fileAvt ?? ImgDfTrack}
              alt="avt"
              className="w-[100px] border "
            />
            <input
              onChange={(e) => handleUpdateAvt(e)}
              type="file"
              name="attachment"
              accept="image/*"
              id="uploadImg"
              hidden
              className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
            />
            <label
              htmlFor="uploadImg"
              className="flex ml-3 rounded items-center justify-center px-2 flex-col cursor-pointer bg-gray-300 text-black  border m-0  border-[#ced4e1]  "
            >
              Browse Image
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <DialogBody className="space-y-4 pb-6">
            <TextInput
              name="title"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
              type="text"
              label="Title"
              placeHolder="eg. Track... "
            />
            <div>
              <TextInput
                name="artist"
                register={register("artist", {
                  required: "Artist is required!",
                })}
                error={errors.artist ? errors.artist.message : ""}
                type="text"
                label="Artist"
                placeHolder="eg. HieuThuHai "
              />
            </div>
            <div>
              <TextInput
                name="album"
                register={register("album")}
                type="text"
                label="Album (Optional)"
                placeHolder="eg. Ai cung phai bat dau tu dau do "
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Genre
              </Typography>
              <Select
                defaultValue={genres[9]}
                value={selectedGenre}
                onChange={handleChange}
                className="!w-full !border-[1.5px] py-1 !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                placeholder="1"
                readOnly
                labelProps={{
                  className: "hidden",
                }}
              >
                {genres.map((genre, index) => {
                  return (
                    <Option key={genre} value={genre} index={index + 1}>
                      {genre}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <TextInput
                  name="releaseYear"
                  type={"number"}
                  register={register("releaseYear")}
                  label="Release Year (Optional)"
                  placeHolder="eg. 2021 "
                />
              </div>
              <div className="w-full">
                <TextInput
                  name="duration"
                  register={register("duration")}
                  type="number"
                  label="Duration (Optional)"
                  placeHolder="eg. 300 (s) "
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Mp3 file
              </Typography>
              <div className="relative flex w-full">
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. White Shoes"
                  name="name"
                  className="pl-28 placeholder:opacity-100 focus:!border-t-gray-900"
                  required
                  readOnly
                  value={fileName.fileName}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />

                <input
                  onChange={(e) => handleUpdateMp3File(e)}
                  type="file"
                  name="attachment"
                  id="upload"
                  hidden
                  className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
                />

                <label
                  htmlFor="upload"
                  className="flex !absolute left-2 top-2 rounded items-center justify-center px-2 flex-col cursor-pointer bg-gray-300 text-black  border m-0  border-[#ced4e1]  "
                >
                  Select file
                </label>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="submit" className="ml-auto">
              {action === "add" ? "Add Track" : "Edit Track"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
