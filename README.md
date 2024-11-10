# Music Library Management API
<img src="https://dj.studio/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2Fresize%3Dfit%3Acrop%2Cheight%3A630%2Cwidth%3A1200%2Foutput%3Dformat%3Apng%2F0ZGbtT0gSZiOQdGst6Wn&w=1487&q=30">

The Music Library Management API allows users to manage their music library by creating, reading, updating, and deleting music tracks and playlists. It also includes search functionality, play tracks, and other advanced features.

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Setup & Installation](#setup--installation)
4. [Database](#database)
5. [Running the Application](#running-the-application)
6. [Demo](#demo)
6. [Conclusion](#conclusion)

---

## Features

- **Track Management**: CRUD operations for music tracks (title, artist, album, genre, release year, etc.).
- **Playlist Management**: CRUD operations for playlists, including adding/removing tracks.
- **Search API**: Find tracks and playlists by title, artist, album, or genre.
- **Fuzzy Search** (optional): Enhanced search with approximate matching.
- **Docker Support**: Easily set up and run with Docker and MongoDB.

---

## Technologies

- **Node.js**
- **NestJS**: Backend framework.
- **MongoDB 7.0**: Database.
- **Docker**: For containerized deployment.

---

## Setup & Installation

  **Clone the repository**

    ```
     git clone https://github.com/your-username/music-library-management.git
     cd music-library-management
    ```

---

## Database

We have to install docker to run this app. So, if you don't have Docker, Please install it.

1. **Start the Docker Containers**
   
Start up the MongoDB and API containers:

```
docker-compose up -d --build
```

2. **Copy the `music_library_dump.tar.gz` File into the MongoDB Container**

Use the `docker cp` command to copy the database dump file into the MongoDB container.

```
docker cp ./music_library_dump.tar.gz mongodb:/data/music_library_dump.tar.gz
```

3. **Restore the Database Inside the MongoDB Container**

Once the file is inside the container, you can restore it using the `mongorestore` command. Connect to the MongoDB container:

```
docker exec -it mongodb bash
```

Inside the MongoDB container, run the following command to restore the dump:

```
mongorestore --gzip --archive=/data/music_library_dump.tar.gz
```

This will restore the `music_library` database

## Running the Application

When we restore mongodump above there, the backend system api aslo run on port 3000. So we don't have to care about it. What we care is install and run frontend application. 

Install dependences:

```
cd frontend
npm install
```

Run application

```
npm run dev
```

Now the application will run on port [http://localhost:5173](http://localhost:5173/)

## Demo

**Some image of the application after running**

This is Home Page with Playlists list and Tracks list in the sidebar. We can search tracks and playlists here.

<img src="https://res.cloudinary.com/dvnxdtrzn/image/upload/v1731046214/shopDEV/%E1%BA%A2nh_m%C3%A0n_h%C3%ACnh_2024-11-08_l%C3%BAc_13.09.08_mnedri.png" >

This is Playlist Detail Page. We can interact CURD with Playlist. It's aslo update Tracks in Playlist.

<img src="https://res.cloudinary.com/dvnxdtrzn/image/upload/v1731046214/shopDEV/%E1%BA%A2nh_m%C3%A0n_h%C3%ACnh_2024-11-08_l%C3%BAc_13.09.20_fcrcmu.png">

These are some image about CURD Track and Playlist

<img src="https://res.cloudinary.com/dvnxdtrzn/image/upload/v1731046207/shopDEV/%E1%BA%A2nh_m%C3%A0n_h%C3%ACnh_2024-11-08_l%C3%BAc_13.09.41_qsxevg.png">

<img src="https://res.cloudinary.com/dvnxdtrzn/image/upload/v1731046206/shopDEV/%E1%BA%A2nh_m%C3%A0n_h%C3%ACnh_2024-11-08_l%C3%BAc_13.09.28_jei6as.png">


## Conclusion

With this setup, your **Music Library Management API** project is ready to run with a pre-loaded dataset in MongoDB. This setup guide enables you to quickly restore and test the database on any machine, making it easier to develop, test, and deploy with reliable data. Using Docker simplifies the deployment and environment consistency, ensuring that the API and MongoDB work seamlessly across different setups. Enjoy managing your music library efficiently!

### Contact:
- [Nguyen Van Phat](https://www.linkedin.com/in/fatitboo/)
- ngxvanphat@gmail.com


