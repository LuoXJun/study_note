/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define([
  './defaultValue-97284df2',
  './Matrix2-73789715',
  './ArcType-de5d8777',
  './arrayRemoveDuplicates-6f91355d',
  './Transforms-d3d3b2a9',
  './Color-c7fd1307',
  './ComponentDatatype-e7fbe225',
  './RuntimeError-4f8ec8a2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './IndexDatatype-65271ba3',
  './PolylinePipeline-ebd42f23',
  './VertexFormat-9886cb81',
  './_commonjsHelpers-3aae1032-65601a27',
  './combine-d11b1f00',
  './WebGLConstants-6da700a2',
  './EllipsoidGeodesic-ed8a0e40',
  './EllipsoidRhumbLine-60f14314',
  './IntersectionTests-33ace2d6',
  './Plane-e916220d'
], function (e, t, o, n, r, a, i, l, s, c, p, d, u, y, m, f, h, C, g, _) {
  'use strict';
  const A = [];
  function E(e, t, o, n, r) {
    const i = A;
    let l;
    i.length = r;
    const s = o.red,
      c = o.green,
      p = o.blue,
      d = o.alpha,
      u = n.red,
      y = n.green,
      m = n.blue,
      f = n.alpha;
    if (a.Color.equals(o, n)) {
      for (l = 0; l < r; l++) i[l] = a.Color.clone(o);
      return i;
    }
    const h = (u - s) / r,
      C = (y - c) / r,
      g = (m - p) / r,
      _ = (f - d) / r;
    for (l = 0; l < r; l++)
      i[l] = new a.Color(s + l * h, c + l * C, p + l * g, d + l * _);
    return i;
  }
  function P(n) {
    const r = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).positions,
      l = n.colors,
      s = e.defaultValue(n.width, 1),
      c = e.defaultValue(n.colorsPerVertex, !1);
    (this._positions = r),
      (this._colors = l),
      (this._width = s),
      (this._colorsPerVertex = c),
      (this._vertexFormat = u.VertexFormat.clone(
        e.defaultValue(n.vertexFormat, u.VertexFormat.DEFAULT)
      )),
      (this._arcType = e.defaultValue(n.arcType, o.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(
        n.granularity,
        i.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._ellipsoid = t.Ellipsoid.clone(
        e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84)
      )),
      (this._workerName = 'createPolylineGeometry');
    let p = 1 + r.length * t.Cartesian3.packedLength;
    (p += e.defined(l) ? 1 + l.length * a.Color.packedLength : 1),
      (this.packedLength =
        p + t.Ellipsoid.packedLength + u.VertexFormat.packedLength + 4);
  }
  P.pack = function (o, n, r) {
    let i;
    r = e.defaultValue(r, 0);
    const l = o._positions;
    let s = l.length;
    for (n[r++] = s, i = 0; i < s; ++i, r += t.Cartesian3.packedLength)
      t.Cartesian3.pack(l[i], n, r);
    const c = o._colors;
    for (
      s = e.defined(c) ? c.length : 0, n[r++] = s, i = 0;
      i < s;
      ++i, r += a.Color.packedLength
    )
      a.Color.pack(c[i], n, r);
    return (
      t.Ellipsoid.pack(o._ellipsoid, n, r),
      (r += t.Ellipsoid.packedLength),
      u.VertexFormat.pack(o._vertexFormat, n, r),
      (r += u.VertexFormat.packedLength),
      (n[r++] = o._width),
      (n[r++] = o._colorsPerVertex ? 1 : 0),
      (n[r++] = o._arcType),
      (n[r] = o._granularity),
      n
    );
  };
  const b = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    w = new u.VertexFormat(),
    x = {
      positions: void 0,
      colors: void 0,
      ellipsoid: b,
      vertexFormat: w,
      width: void 0,
      colorsPerVertex: void 0,
      arcType: void 0,
      granularity: void 0
    };
  P.unpack = function (o, n, r) {
    let i;
    n = e.defaultValue(n, 0);
    let l = o[n++];
    const s = new Array(l);
    for (i = 0; i < l; ++i, n += t.Cartesian3.packedLength)
      s[i] = t.Cartesian3.unpack(o, n);
    l = o[n++];
    const c = l > 0 ? new Array(l) : void 0;
    for (i = 0; i < l; ++i, n += a.Color.packedLength)
      c[i] = a.Color.unpack(o, n);
    const p = t.Ellipsoid.unpack(o, n, b);
    n += t.Ellipsoid.packedLength;
    const d = u.VertexFormat.unpack(o, n, w);
    n += u.VertexFormat.packedLength;
    const y = o[n++],
      m = 1 === o[n++],
      f = o[n++],
      h = o[n];
    return e.defined(r)
      ? ((r._positions = s),
        (r._colors = c),
        (r._ellipsoid = t.Ellipsoid.clone(p, r._ellipsoid)),
        (r._vertexFormat = u.VertexFormat.clone(d, r._vertexFormat)),
        (r._width = y),
        (r._colorsPerVertex = m),
        (r._arcType = f),
        (r._granularity = h),
        r)
      : ((x.positions = s),
        (x.colors = c),
        (x.width = y),
        (x.colorsPerVertex = m),
        (x.arcType = f),
        (x.granularity = h),
        new P(x));
  };
  const T = new t.Cartesian3(),
    D = new t.Cartesian3(),
    k = new t.Cartesian3(),
    V = new t.Cartesian3();
  return (
    (P.createGeometry = function (l) {
      const u = l._width,
        y = l._vertexFormat;
      let m = l._colors;
      const f = l._colorsPerVertex,
        h = l._arcType,
        C = l._granularity,
        g = l._ellipsoid;
      let _, P, b;
      const w = [];
      let x = n.arrayRemoveDuplicates(
        l._positions,
        t.Cartesian3.equalsEpsilon,
        !1,
        w
      );
      if (e.defined(m) && w.length > 0) {
        let e = 0,
          t = w[0];
        m = m.filter(function (o, n) {
          let r = !1;
          return (
            (r = f ? n === t || (0 === n && 1 === t) : n + 1 === t),
            !r || (e++, (t = w[e]), !1)
          );
        });
      }
      let v = x.length;
      if (v < 2 || u <= 0) return;
      if (h === o.ArcType.GEODESIC || h === o.ArcType.RHUMB) {
        let t, n;
        h === o.ArcType.GEODESIC
          ? ((t = i.CesiumMath.chordLength(C, g.maximumRadius)),
            (n = d.PolylinePipeline.numberOfPoints))
          : ((t = C), (n = d.PolylinePipeline.numberOfPointsRhumbLine));
        const r = d.PolylinePipeline.extractHeights(x, g);
        if (e.defined(m)) {
          let e = 1;
          for (_ = 0; _ < v - 1; ++_) e += n(x[_], x[_ + 1], t);
          const o = new Array(e);
          let r = 0;
          for (_ = 0; _ < v - 1; ++_) {
            const i = x[_],
              l = x[_ + 1],
              s = m[_],
              c = n(i, l, t);
            if (f && _ < e) {
              const e = E(0, 0, s, m[_ + 1], c),
                t = e.length;
              for (P = 0; P < t; ++P) o[r++] = e[P];
            } else for (P = 0; P < c; ++P) o[r++] = a.Color.clone(s);
          }
          (o[r] = a.Color.clone(m[m.length - 1])), (m = o), (A.length = 0);
        }
        x =
          h === o.ArcType.GEODESIC
            ? d.PolylinePipeline.generateCartesianArc({
                positions: x,
                minDistance: t,
                ellipsoid: g,
                height: r
              })
            : d.PolylinePipeline.generateCartesianRhumbArc({
                positions: x,
                granularity: t,
                ellipsoid: g,
                height: r
              });
      }
      v = x.length;
      const L = 4 * v - 4,
        F = new Float64Array(3 * L),
        G = new Float64Array(3 * L),
        O = new Float64Array(3 * L),
        R = new Float32Array(2 * L),
        I = y.st ? new Float32Array(2 * L) : void 0,
        S = e.defined(m) ? new Uint8Array(4 * L) : void 0;
      let B,
        U = 0,
        N = 0,
        M = 0,
        H = 0;
      for (P = 0; P < v; ++P) {
        let o, n;
        0 === P
          ? ((B = T),
            t.Cartesian3.subtract(x[0], x[1], B),
            t.Cartesian3.add(x[0], B, B))
          : (B = x[P - 1]),
          t.Cartesian3.clone(B, k),
          t.Cartesian3.clone(x[P], D),
          P === v - 1
            ? ((B = T),
              t.Cartesian3.subtract(x[v - 1], x[v - 2], B),
              t.Cartesian3.add(x[v - 1], B, B))
            : (B = x[P + 1]),
          t.Cartesian3.clone(B, V),
          e.defined(S) &&
            ((o = 0 === P || f ? m[P] : m[P - 1]), P !== v - 1 && (n = m[P]));
        const r = P === v - 1 ? 2 : 4;
        for (b = 0 === P ? 2 : 0; b < r; ++b) {
          t.Cartesian3.pack(D, F, U),
            t.Cartesian3.pack(k, G, U),
            t.Cartesian3.pack(V, O, U),
            (U += 3);
          const r = b - 2 < 0 ? -1 : 1;
          if (
            ((R[N++] = (b % 2) * 2 - 1),
            (R[N++] = r * u),
            y.st && ((I[M++] = P / (v - 1)), (I[M++] = Math.max(R[N - 2], 0))),
            e.defined(S))
          ) {
            const e = b < 2 ? o : n;
            (S[H++] = a.Color.floatToByte(e.red)),
              (S[H++] = a.Color.floatToByte(e.green)),
              (S[H++] = a.Color.floatToByte(e.blue)),
              (S[H++] = a.Color.floatToByte(e.alpha));
          }
        }
      }
      const W = new c.GeometryAttributes();
      (W.position = new s.GeometryAttribute({
        componentDatatype: i.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: F
      })),
        (W.prevPosition = new s.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: G
        })),
        (W.nextPosition = new s.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: O
        })),
        (W.expandAndWidth = new s.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: R
        })),
        y.st &&
          (W.st = new s.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: I
          })),
        e.defined(S) &&
          (W.color = new s.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: S,
            normalize: !0
          }));
      const Y = p.IndexDatatype.createTypedArray(L, 6 * v - 6);
      let q = 0,
        j = 0;
      const z = v - 1;
      for (P = 0; P < z; ++P)
        (Y[j++] = q),
          (Y[j++] = q + 2),
          (Y[j++] = q + 1),
          (Y[j++] = q + 1),
          (Y[j++] = q + 2),
          (Y[j++] = q + 3),
          (q += 4);
      return new s.Geometry({
        attributes: W,
        indices: Y,
        primitiveType: s.PrimitiveType.TRIANGLES,
        boundingSphere: r.BoundingSphere.fromPoints(x),
        geometryType: s.GeometryType.POLYLINES
      });
    }),
    function (o, n) {
      return (
        e.defined(n) && (o = P.unpack(o, n)),
        (o._ellipsoid = t.Ellipsoid.clone(o._ellipsoid)),
        P.createGeometry(o)
      );
    }
  );
});
