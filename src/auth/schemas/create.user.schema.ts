import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: String;
  @Prop({ required: true })
  email: String;
  @Prop({ required: true })
  password: String;
}

export const UserScema = SchemaFactory.createForClass(User);
