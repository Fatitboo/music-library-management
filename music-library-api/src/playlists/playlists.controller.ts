// src/playlist/playlist.controller.ts
import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { Response } from 'express';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    const rs = await this.playlistService.createPlaylist(createPlaylistDto);
    return {
      data: rs,
    };
  }

  @Put(':id')
  async updatePlaylist(
    @Param('id') id: string,
    @Body() updatePlaylistDto: any,
  ) {
    const rs = await this.playlistService.updatePlaylist(id, updatePlaylistDto);
    return {
      data: rs,
    };
  }
  @Delete(':id')
  async deletePlaylist(@Param('id') id: string) {
    const rs = await this.playlistService.deletePlaylist(id);
    return {
      data: rs,
    };
  }
  @Get(':id')
  async getPlaylistById(@Param('id') id: string) {
    const rs = await this.playlistService.getPlaylistById(id);
    return {
      data: rs,
    };
  }
  @Get(':id/tracks-not-add')
  async getTracksNotAdd(@Param('id') id: string) {
    const rs = await this.playlistService.getTracksNotInPlaylist(id);
    return {
      data: rs,
    };
  }
  @Post(':id/tracks/:trackId')
  async addOrRemoveTrackToPlaylist(
    @Param('id') playlistId: string,
    @Param('trackId') trackId: string,
    @Body() body: any,
  ) {
    const rs =
      body.action === 'add'
        ? await this.playlistService.addTrackToPlaylist(playlistId, trackId)
        : await this.playlistService.removeTrackFromPlaylist(
            playlistId,
            trackId,
          );
    return {
      data: rs,
    };
  }
  @Get()
  async getPlaylists() {
    const rs = await this.playlistService.getPlaylists();
    return {
      data: rs,
    };
  }

  @Get(':id/stream')
  async streamPlaylist(@Param('id') id: string, @Res() res: Response) {
    const playlist = await this.playlistService.getPlaylistById(id);

    // Set the content type and disposition to serve as an M3U file
    res.setHeader('Content-Type', 'audio/x-mpegurl');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${playlist.title}.m3u"`,
    );

    const m3uContent = playlist.tracks
      .map(
        (track) =>
          `#EXTINF:${track.duration},${track.artist} - ${track.title}\n${track.mp3Url}`,
      )
      .join('\n');

    res.send(m3uContent);
  }
}
