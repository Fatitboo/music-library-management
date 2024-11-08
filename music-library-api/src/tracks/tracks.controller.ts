import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    const rs = await this.tracksService.createTrack(createTrackDto);
    return {
      data: rs,
    };
  }

  @Get()
  async getTracks() {
    const rs = await this.tracksService.getTracks();
    return {
      data: rs,
    };
  }

  @Get(':id')
  async getTrack(@Param('id') id: string) {
    const rs = await this.tracksService.getTrackById(id);
    return {
      data: rs,
    };
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updateTrackDto) {
    const rs = await this.tracksService.updateTrack(id, updateTrackDto);
    return {
      data: rs,
    };
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    const rs = await this.tracksService.deleteTrack(id);
    return {
      data: rs,
    };
  }
}
