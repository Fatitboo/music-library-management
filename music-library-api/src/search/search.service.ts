import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from 'src/playlists/schemas/playlist.schema';
import { Track } from 'src/tracks/schemas/track.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
  ) {}

  async search(query: string) {
    const trackResults = await this.trackModel
      .find({
        $or: [
          { title: new RegExp(query, 'i') },
          { artist: new RegExp(query, 'i') },
          { album: new RegExp(query, 'i') },
          { genre: new RegExp(query, 'i') },
        ],
      })
      .exec();

    const playlistResults = await this.playlistModel
      .find({
        title: new RegExp(query, 'i'),
      })
      .populate({ path: 'tracks', model: 'Track' })
      .exec();

    return { tracks: trackResults, playlists: playlistResults };
  }

  async searchV2(query: string) {
    const trackResults = await this.trackModel
      .find({ $text: { $search: query } })
      .exec();
    const playlistResults = await this.playlistModel
      .find({ title: new RegExp(query, 'i') })
      .populate({ path: 'tracks', model: 'Track' })
      .exec();
    return { tracks: trackResults, playlists: playlistResults };
  }
}
