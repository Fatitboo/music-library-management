// src/tracks/dto/create-track.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  Max,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  @IsOptional()
  releaseYear?: number;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsUrl()
  @IsOptional()
  mp3Url?: string;

  @IsOptional()
  playbackUrl?: string;

  @IsOptional()
  fileName?: string;

  @IsOptional()
  thumnailUrl?: string;
}
