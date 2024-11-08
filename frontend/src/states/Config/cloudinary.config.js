// "use strict";
// import { v2 as cloudinary } from "cloudinary";
import { Cloudinary } from "@cloudinary/url-gen";

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   cloud_name: "dvnxdtrzn",
//   api_key: "965687927277757",
//   api_secret: "KO7zqakyewmOXu3zZuKVLyhWdsM",
// });

// // Log the configuration
// // console.log(cloudinary.config());

const cld = new Cloudinary({
  cloud: {
    cloudName: "dvnxdtrzn",
    apiKey: "965687927277757",
    apiSecret: "KO7zqakyewmOXu3zZuKVLyhWdsM",
  },
});
export default cld;
