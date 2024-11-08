// src/schemas/track.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'Tracks',
})
export class Track extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop()
  album: string;

  @Prop()
  genre: string;

  @Prop()
  releaseYear: number;

  @Prop()
  duration: number;

  @Prop()
  mp3Url: string;

  @Prop()
  fileName: string;

  @Prop()
  playbackUrl: string;

  @Prop()
  thumnailUrl: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track).index({
  title: 'text',
  artist: 'text',
  album: 'text',
  genre: 'text',
});
