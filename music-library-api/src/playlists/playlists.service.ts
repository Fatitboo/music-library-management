// src/playlist/playlist.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './schemas/playlist.schema';
import { Track } from 'src/tracks/schemas/track.schema';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
  ) {}

  async createPlaylist(createPlaylistDto: any): Promise<Playlist> {
    return await new this.playlistModel(createPlaylistDto).save();
  }
  async deletePlaylist(id: string) {
    return await this.playlistModel.deleteOne({ _id: id });
  }
  async updatePlaylist(id: string, updatePlaylistDto): Promise<Playlist> {
    const playlist = await this.playlistModel.findByIdAndUpdate(
      id,
      {
        title: updatePlaylistDto.title,
        description: updatePlaylistDto.description,
        albumCover: updatePlaylistDto.albumCover,
      },
      {
        new: true,
      },
    );
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID "${id}" not found`);
    }
    return playlist;
  }

  async addTrackToPlaylist(
    playlistId: string,
    trackId: string,
  ): Promise<Playlist> {
    return await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $addToSet: { tracks: trackId } },
      { new: true },
    );
  }

  async removeTrackFromPlaylist(
    playlistId: string,
    trackId: string,
  ): Promise<Playlist> {
    return await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $pull: { tracks: trackId } },
      { new: true },
    );
  }

  async getPlaylists(): Promise<Playlist[]> {
    return this.playlistModel.find().exec();
  }
  async getTracksNotInPlaylist(playlistId: string): Promise<Track[]> {
    // Fetch the playlist to get the track IDs
    const playlist = await this.playlistModel.findById(playlistId).exec();
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    // Query for tracks not in the playlist's track list
    const excludedTrackIds = playlist.tracks;
    const tracksNotInPlaylist = await this.trackModel
      .find({
        _id: { $nin: excludedTrackIds }, // Exclude these track IDs
      })
      .exec();

    return tracksNotInPlaylist;
  }
  async getPlaylistById(id: string) {
    const playlist = await this.playlistModel
      .findById(id)
      .populate({ path: 'tracks', model: 'Track' })
      .exec();
    if (!playlist) throw new NotFoundException('Playlist not found');
    return playlist;
  }
}
