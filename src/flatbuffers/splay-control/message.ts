// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { Header } from '../splay-control/header.js';


export class Message {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Message {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

header(obj?:Header):Header|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new Header()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

body():string|null
body(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
body(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startMessage(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addHeader(builder:flatbuffers.Builder, headerOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, headerOffset, 0);
}

static addBody(builder:flatbuffers.Builder, bodyOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, bodyOffset, 0);
}

static endMessage(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createMessage(builder:flatbuffers.Builder, headerOffset:flatbuffers.Offset, bodyOffset:flatbuffers.Offset):flatbuffers.Offset {
  Message.startMessage(builder);
  Message.addHeader(builder, headerOffset);
  Message.addBody(builder, bodyOffset);
  return Message.endMessage(builder);
}
}
