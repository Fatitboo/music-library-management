import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Track } from 'src/tracks/schemas/track.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'Playlists',
})
export class Playlist extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  albumCover: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist).index({
  title: 'text',
});
