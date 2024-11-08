import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track } from './schemas/track.schema';
import { Playlist } from 'src/playlists/schemas/playlist.schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
  ) {}

  async createTrack(createTrackDto): Promise<Track> {
    return new this.trackModel(createTrackDto).save();
  }

  async getTracks(): Promise<Track[]> {
    return this.trackModel.find().exec();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.trackModel.findById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID "${id}" not found`);
    }
    return track;
  }

  async updateTrack(id: string, updateTrackDto): Promise<Track> {
    const track = await this.trackModel.findByIdAndUpdate(id, updateTrackDto, {
      new: true,
    });
    if (!track) {
      throw new NotFoundException(`Track with ID "${id}" not found`);
    }
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const isTrackInPlaylist = await this.playlistModel.exists({ tracks: id });
    if (isTrackInPlaylist) {
      throw new BadRequestException(
        `Track with ID "${id}" is in a playlist and cannot be deleted.`,
      );
    }

    //  Delete the track if it's not in any playlist
    const result = await this.trackModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Track with ID "${id}" not found`);
    }
  }
}
