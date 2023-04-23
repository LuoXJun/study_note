/* This file is automatically rebuilt by the Cesium build process. */
const e = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
var n, i, s, a, r, o, l, f;
!(function (t) {
  (t[(t.NONE = 0)] = 'NONE'),
    (t[(t.BASISLZ = 1)] = 'BASISLZ'),
    (t[(t.ZSTD = 2)] = 'ZSTD'),
    (t[(t.ZLIB = 3)] = 'ZLIB');
})(n || (n = {})),
  (function (t) {
    t[(t.BASICFORMAT = 0)] = 'BASICFORMAT';
  })(i || (i = {})),
  (function (t) {
    (t[(t.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
      (t[(t.ETC1S = 163)] = 'ETC1S'),
      (t[(t.UASTC = 166)] = 'UASTC');
  })(s || (s = {})),
  (function (t) {
    (t[(t.UNSPECIFIED = 0)] = 'UNSPECIFIED'), (t[(t.SRGB = 1)] = 'SRGB');
  })(a || (a = {})),
  (function (t) {
    (t[(t.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
      (t[(t.LINEAR = 1)] = 'LINEAR'),
      (t[(t.SRGB = 2)] = 'SRGB'),
      (t[(t.ITU = 3)] = 'ITU'),
      (t[(t.NTSC = 4)] = 'NTSC'),
      (t[(t.SLOG = 5)] = 'SLOG'),
      (t[(t.SLOG2 = 6)] = 'SLOG2');
  })(r || (r = {})),
  (function (t) {
    (t[(t.ALPHA_STRAIGHT = 0)] = 'ALPHA_STRAIGHT'),
      (t[(t.ALPHA_PREMULTIPLIED = 1)] = 'ALPHA_PREMULTIPLIED');
  })(o || (o = {})),
  (function (t) {
    (t[(t.RGB = 0)] = 'RGB'),
      (t[(t.RRR = 3)] = 'RRR'),
      (t[(t.GGG = 4)] = 'GGG'),
      (t[(t.AAA = 15)] = 'AAA');
  })(l || (l = {})),
  (function (t) {
    (t[(t.RGB = 0)] = 'RGB'),
      (t[(t.RGBA = 3)] = 'RGBA'),
      (t[(t.RRR = 4)] = 'RRR'),
      (t[(t.RRRG = 5)] = 'RRRG');
  })(f || (f = {}));
class U {
  constructor() {
    (this.vkFormat = 0),
      (this.typeSize = 1),
      (this.pixelWidth = 0),
      (this.pixelHeight = 0),
      (this.pixelDepth = 0),
      (this.layerCount = 0),
      (this.faceCount = 1),
      (this.supercompressionScheme = n.NONE),
      (this.levels = []),
      (this.dataFormatDescriptor = [
        {
          vendorId: 0,
          descriptorType: i.BASICFORMAT,
          versionNumber: 2,
          descriptorBlockSize: 40,
          colorModel: s.UNSPECIFIED,
          colorPrimaries: a.SRGB,
          transferFunction: a.SRGB,
          flags: o.ALPHA_STRAIGHT,
          texelBlockDimension: { x: 4, y: 4, z: 1, w: 1 },
          bytesPlane: [],
          samples: []
        }
      ]),
      (this.keyValue = {}),
      (this.globalData = null);
  }
}
class c {
  constructor(t, e, n, i) {
    (this._dataView = new DataView(t.buffer, t.byteOffset + e, n)),
      (this._littleEndian = i),
      (this._offset = 0);
  }
  _nextUint8() {
    const t = this._dataView.getUint8(this._offset);
    return (this._offset += 1), t;
  }
  _nextUint16() {
    const t = this._dataView.getUint16(this._offset, this._littleEndian);
    return (this._offset += 2), t;
  }
  _nextUint32() {
    const t = this._dataView.getUint32(this._offset, this._littleEndian);
    return (this._offset += 4), t;
  }
  _nextUint64() {
    const t =
      this._dataView.getUint32(this._offset, this._littleEndian) +
      2 ** 32 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return (this._offset += 8), t;
  }
  _skip(t) {
    return (this._offset += t), this;
  }
  _scan(t, e = 0) {
    const n = this._offset;
    let i = 0;
    for (; this._dataView.getUint8(this._offset) !== e && i < t; )
      i++, this._offset++;
    return (
      i < t && this._offset++,
      new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + n, i)
    );
  }
}
function _(t) {
  return 'undefined' != typeof TextDecoder
    ? new TextDecoder().decode(t)
    : Buffer.from(t).toString('utf8');
}
function p(t) {
  const n = new Uint8Array(t.buffer, t.byteOffset, e.length);
  if (
    n[0] !== e[0] ||
    n[1] !== e[1] ||
    n[2] !== e[2] ||
    n[3] !== e[3] ||
    n[4] !== e[4] ||
    n[5] !== e[5] ||
    n[6] !== e[6] ||
    n[7] !== e[7] ||
    n[8] !== e[8] ||
    n[9] !== e[9] ||
    n[10] !== e[10] ||
    n[11] !== e[11]
  )
    throw new Error('Missing KTX 2.0 identifier.');
  const i = new U(),
    s = 17 * Uint32Array.BYTES_PER_ELEMENT,
    a = new c(t, e.length, s, !0);
  (i.vkFormat = a._nextUint32()),
    (i.typeSize = a._nextUint32()),
    (i.pixelWidth = a._nextUint32()),
    (i.pixelHeight = a._nextUint32()),
    (i.pixelDepth = a._nextUint32()),
    (i.layerCount = a._nextUint32()),
    (i.faceCount = a._nextUint32());
  const r = a._nextUint32();
  i.supercompressionScheme = a._nextUint32();
  const o = a._nextUint32(),
    l = a._nextUint32(),
    f = a._nextUint32(),
    h = a._nextUint32(),
    g = a._nextUint64(),
    p = a._nextUint64(),
    x = new c(t, e.length + s, 3 * r * 8, !0);
  for (let e = 0; e < r; e++)
    i.levels.push({
      levelData: new Uint8Array(
        t.buffer,
        t.byteOffset + x._nextUint64(),
        x._nextUint64()
      ),
      uncompressedByteLength: x._nextUint64()
    });
  const u = new c(t, o, l, !0),
    y = {
      vendorId: u._skip(4)._nextUint16(),
      descriptorType: u._nextUint16(),
      versionNumber: u._nextUint16(),
      descriptorBlockSize: u._nextUint16(),
      colorModel: u._nextUint8(),
      colorPrimaries: u._nextUint8(),
      transferFunction: u._nextUint8(),
      flags: u._nextUint8(),
      texelBlockDimension: {
        x: u._nextUint8() + 1,
        y: u._nextUint8() + 1,
        z: u._nextUint8() + 1,
        w: u._nextUint8() + 1
      },
      bytesPlane: [
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8()
      ],
      samples: []
    },
    D = (y.descriptorBlockSize / 4 - 6) / 4;
  for (let t = 0; t < D; t++)
    y.samples[t] = {
      bitOffset: u._nextUint16(),
      bitLength: u._nextUint8(),
      channelID: u._nextUint8(),
      samplePosition: [
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8(),
        u._nextUint8()
      ],
      sampleLower: u._nextUint32(),
      sampleUpper: u._nextUint32()
    };
  (i.dataFormatDescriptor.length = 0), i.dataFormatDescriptor.push(y);
  const b = new c(t, f, h, !0);
  for (; b._offset < h; ) {
    const t = b._nextUint32(),
      e = b._scan(t),
      n = _(e),
      s = b._scan(t - e.byteLength);
    (i.keyValue[n] = n.match(/^ktx/i) ? _(s) : s),
      b._offset % 4 && b._skip(4 - (b._offset % 4));
  }
  if (p <= 0) return i;
  const d = new c(t, g, p, !0),
    B = d._nextUint16(),
    w = d._nextUint16(),
    A = d._nextUint32(),
    S = d._nextUint32(),
    m = d._nextUint32(),
    L = d._nextUint32(),
    I = [];
  for (let t = 0; t < r; t++)
    I.push({
      imageFlags: d._nextUint32(),
      rgbSliceByteOffset: d._nextUint32(),
      rgbSliceByteLength: d._nextUint32(),
      alphaSliceByteOffset: d._nextUint32(),
      alphaSliceByteLength: d._nextUint32()
    });
  const R = g + d._offset,
    E = R + A,
    T = E + S,
    O = T + m,
    P = new Uint8Array(t.buffer, t.byteOffset + R, A),
    C = new Uint8Array(t.buffer, t.byteOffset + E, S),
    F = new Uint8Array(t.buffer, t.byteOffset + T, m),
    G = new Uint8Array(t.buffer, t.byteOffset + O, L);
  return (
    (i.globalData = {
      endpointCount: B,
      selectorCount: w,
      imageDescs: I,
      endpointsData: P,
      selectorsData: C,
      tablesData: F,
      extendedData: G
    }),
    i
  );
}

export { p as default };
