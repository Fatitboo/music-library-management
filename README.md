# Music Library Management API

The Music Library Management API allows users to manage their music library by creating, reading, updating, and deleting music tracks and playlists. It also includes search functionality, streaming of playlists, and other advanced features.

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Setup & Installation](#setup--installation)
4. [Configuration](#configuration)
5. [API Documentation](#api-documentation)
6. [Running the Application](#running-the-application)
7. [Database](#database)
8. [Folder Structure](#folder-structure)

---

## Features

- **Track Management**: CRUD operations for music tracks (title, artist, album, genre, release year, etc.).
- **Playlist Management**: CRUD operations for playlists, including adding/removing tracks.
- **Search API**: Find tracks and playlists by title, artist, album, or genre.
- **MP3 Streaming**: Stream playlist MP3 files in `.m3u` format.
- **Fuzzy Search** (optional): Enhanced search with approximate matching.
- **Swagger UI Documentation** for easy API exploration.
- **Docker Support**: Easily set up and run with Docker and MongoDB.

---

## Technologies

- **Node.js**
- **NestJS**: Backend framework.
- **MongoDB 7.0**: Database.
- **Docker**: For containerized deployment.
- **Swagger**: API documentation.

---

## Setup & Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/music-library-management.git
    cd music-library-management
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and specify the following variables:

    ```dotenv
    MONGODB_URI=mongodb://localhost:27017/music-library
    PORT=3000
    ```

4. **Install MongoDB** (or use Docker as described below).

    - Install and start MongoDB on your machine, or run MongoDB in a container using Docker.

---

## Configuration

### Docker Setup (optional)

To run the application and MongoDB in Docker containers, use the provided `docker-compose.yml` file.

```yaml
version: '3'
services:
  mongo:
    image: mongo:7.0
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  app:
    build: .
    container_name: music_library_app
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/music-library
    depends_on:
      - mongo

volumes:
  mongo-data:

# API Documentation

The following API documentation provides details on endpoints for the Music Library Management API.

### Base URL
> http://localhost:3000/api


## Endpoints

### Tracks

#### 1. Create a New Track

- **Endpoint**: `POST /tracks`
- **Description**: Creates a new music track.
- **Body Parameters**:
    - `title` (string) - The title of the track.
    - `artist` (string) - The artist of the track.
    - `album` (string) - The album name.
    - `genre` (string) - The genre of the track.
    - `releaseYear` (number) - The release year.
    - `duration` (number) - Duration of the track in seconds.
    - `file` (file) - The MP3 file of the track.
- **Response**:
    - `201 Created` with the created track details.

#### 2. Get All Tracks

- **Endpoint**: `GET /tracks`
- **Description**: Retrieves all music tracks.
- **Response**:
    - `200 OK` with a list of all tracks.

#### 3. Get a Track by ID

- **Endpoint**: `GET /tracks/:id`
- **Description**: Retrieves a specific track by its ID.
- **Path Parameters**:
    - `id` (string) - The ID of the track.
- **Response**:
    - `200 OK` with track details or `404 Not Found` if the track doesn’t exist.

#### 4. Update a Track

- **Endpoint**: `PUT /tracks/:id`
- **Description**: Updates details of a specific track.
- **Path Parameters**:
    - `id` (string) - The ID of the track.
- **Body Parameters**: Any combination of track fields (e.g., `title`, `artist`, etc.).
- **Response**:
    - `200 OK` with updated track details or `404 Not Found` if the track doesn’t exist.

#### 5. Delete a Track

- **Endpoint**: `DELETE /tracks/:id`
- **Description**: Deletes a specific track by ID.
- **Path Parameters**:
    - `id` (string) - The ID of the track.
- **Response**:
    - `204 No Content` on success or `404 Not Found` if the track doesn’t exist.

---

### Playlists

#### 1. Create a New Playlist

- **Endpoint**: `POST /playlists`
- **Description**: Creates a new playlist.
- **Body Parameters**:
    - `title` (string) - The title of the playlist.
    - `album_cover` (file) - Cover image for the playlist.
    - `tracks` (array of track IDs) - List of tracks in the playlist.
- **Response**:
    - `201 Created` with the created playlist details.

#### 2. Get All Playlists

- **Endpoint**: `GET /playlists`
- **Description**: Retrieves all playlists.
- **Response**:
    - `200 OK` with a list of all playlists.

#### 3. Get a Playlist by ID

- **Endpoint**: `GET /playlists/:id`
- **Description**: Retrieves a specific playlist by its ID.
- **Path Parameters**:
    - `id` (string) - The ID of the playlist.
- **Response**:
    - `200 OK` with playlist details or `404 Not Found` if the playlist doesn’t exist.

#### 4. Update a Playlist

- **Endpoint**: `PUT /playlists/:id`
- **Description**: Updates a specific playlist.
- **Path Parameters**:
    - `id` (string) - The ID of the playlist.
- **Body Parameters**: Any combination of playlist fields (e.g., `title`, `tracks`, etc.).
- **Response**:
    - `200 OK` with updated playlist details or `404 Not Found` if the playlist doesn’t exist.

#### 5. Delete a Playlist

- **Endpoint**: `DELETE /playlists/:id`
- **Description**: Deletes a specific playlist by ID.
- **Path Parameters**:
    - `id` (string) - The ID of the playlist.
- **Response**:
    - `204 No Content` on success or `404 Not Found` if the playlist doesn’t exist.

---

### Search

#### Search Tracks and Playlists

- **Endpoint**: `GET /search`
- **Description**: Searches for tracks or playlists by title, artist, album, or genre.
- **Query Parameters**:
    - `query` (string) - The search query.
- **Response**:
    - `200 OK` with a list of matching tracks and playlists.

---

### Streaming

#### Stream Playlist in M3U Format

- **Endpoint**: `GET /playlists/:id/stream`
- **Description**: Streams the playlist as an `.m3u` file, compatible with media players like VLC.
- **Path Parameters**:
    - `id` (string) - The ID of the playlist.
- **Response**:
    - `200 OK` with `.m3u` formatted content or `404 Not Found` if the playlist doesn’t exist.

---

### Error Handling

Common HTTP responses for error handling include:
- `400 Bad Request`: Invalid data or parameters.
- `404 Not Found`: The requested resource doesn’t exist.
- `500 Internal Server Error`: Server-related issues.

---

### Example Requests

#### Create Track Example

```json
POST /tracks
{
  "title": "Track Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "genre": "Genre",
  "releaseYear": 2022,
  "duration": 240,
  "file": "track.mp3"
}
```
