/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: false })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
