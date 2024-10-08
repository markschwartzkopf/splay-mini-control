// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class Header {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Header {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsHeader(bb:flatbuffers.ByteBuffer, obj?:Header):Header {
  return (obj || new Header()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsHeader(bb:flatbuffers.ByteBuffer, obj?:Header):Header {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Header()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

token():string|null
token(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
token(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startHeader(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addToken(builder:flatbuffers.Builder, tokenOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, tokenOffset, 0);
}

static endHeader(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createHeader(builder:flatbuffers.Builder, tokenOffset:flatbuffers.Offset):flatbuffers.Offset {
  Header.startHeader(builder);
  Header.addToken(builder, tokenOffset);
  return Header.endHeader(builder);
}
}
