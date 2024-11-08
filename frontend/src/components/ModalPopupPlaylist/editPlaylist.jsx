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
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TextInput from "../TextInput/TextInput";
import { useForm } from "react-hook-form";
import cld from "../../states/Config/cloudinary.config";
// import cloudinary from "../../states/Config/cloudinary.config";
import axios from "axios";
import Swal from "sweetalert2";
import { ImgDfPl, ImgDfTrack } from "../../assets";
import LoadingComponent from "../Loading/Loading";
export function EditPlaylistDialog({
  handleOpen,
  open,
  selectedPlaylist,
  getAllPlaylists,
}) {
  const [fileAvt, setFileAvt] = useState(selectedPlaylist?.albumCover);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);

  const handleUpdateAvt = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const rs = await uploadImageFromLocalFiles({ file });
    setLoading(false);
    console.log("🚀 ~ handleUpdateAvt ~ rs:", rs);

    setFileAvt(rs.url);
  };
  const onSubmitForm = async (data) => {
    const dataPost = {
      title: data.title,
      description: data.description,
      albumCover: fileAvt,
    };
    console.log("🚀 ~ onSubmitForm ~ dataPost:", dataPost);
    await axios.put(
      "http://localhost:3000/playlists/" + selectedPlaylist?._id,
      dataPost
    );
    handleOpen();

    Swal.fire({
      title: "Successful",
      text: `Add playlist successfully?`,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await getAllPlaylists();
      }
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
            Edit Playlist
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
              src={fileAvt.includes("http") ? fileAvt : ImgDfPl}
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
              value={selectedPlaylist?.title}
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
                value={selectedPlaylist?.description}
                name="description"
                register={register("description")}
                type="text"
                label="Title"
                placeHolder="eg. This is a white shoes with a comfortable sole."
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="submit" className="ml-auto">
              Edit Playlist
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
