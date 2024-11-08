// src/playlists/dto/create-playlist.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  albumCover?: string;

  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  tracks: string[];
}
