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
  'exports',
  './ArcType-de5d8777',
  './arrayRemoveDuplicates-6f91355d',
  './Matrix2-73789715',
  './ComponentDatatype-e7fbe225',
  './defaultValue-97284df2',
  './EllipsoidRhumbLine-60f14314',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryPipeline-a847e31f',
  './IndexDatatype-65271ba3',
  './PolygonPipeline-00dc0c6e',
  './Transforms-d3d3b2a9'
], function (e, t, n, i, o, r, a, s, c, l, u, h, d) {
  'use strict';
  function p() {
    (this._array = []), (this._offset = 0), (this._length = 0);
  }
  Object.defineProperties(p.prototype, {
    length: {
      get: function () {
        return this._length;
      }
    }
  }),
    (p.prototype.enqueue = function (e) {
      this._array.push(e), this._length++;
    }),
    (p.prototype.dequeue = function () {
      if (0 === this._length) return;
      const e = this._array;
      let t = this._offset;
      const n = e[t];
      return (
        (e[t] = void 0),
        t++,
        t > 10 && 2 * t > e.length && ((this._array = e.slice(t)), (t = 0)),
        (this._offset = t),
        this._length--,
        n
      );
    }),
    (p.prototype.peek = function () {
      if (0 !== this._length) return this._array[this._offset];
    }),
    (p.prototype.contains = function (e) {
      return -1 !== this._array.indexOf(e);
    }),
    (p.prototype.clear = function () {
      this._array.length = this._offset = this._length = 0;
    }),
    (p.prototype.sort = function (e) {
      this._offset > 0 &&
        ((this._array = this._array.slice(this._offset)), (this._offset = 0)),
        this._array.sort(e);
    });
  const f = {
      computeHierarchyPackedLength: function (e, t) {
        let n = 0;
        const i = [e];
        for (; i.length > 0; ) {
          const e = i.pop();
          if (!r.defined(e)) continue;
          n += 2;
          const o = e.positions,
            a = e.holes;
          if (
            (r.defined(o) && o.length > 0 && (n += o.length * t.packedLength),
            r.defined(a))
          ) {
            const e = a.length;
            for (let t = 0; t < e; ++t) i.push(a[t]);
          }
        }
        return n;
      },
      packPolygonHierarchy: function (e, t, n, i) {
        const o = [e];
        for (; o.length > 0; ) {
          const e = o.pop();
          if (!r.defined(e)) continue;
          const a = e.positions,
            s = e.holes;
          if (
            ((t[n++] = r.defined(a) ? a.length : 0),
            (t[n++] = r.defined(s) ? s.length : 0),
            r.defined(a))
          ) {
            const e = a.length;
            for (let o = 0; o < e; ++o, n += i.packedLength) i.pack(a[o], t, n);
          }
          if (r.defined(s)) {
            const e = s.length;
            for (let t = 0; t < e; ++t) o.push(s[t]);
          }
        }
        return n;
      },
      unpackPolygonHierarchy: function (e, t, n) {
        const i = e[t++],
          o = e[t++],
          r = new Array(i),
          a = o > 0 ? new Array(o) : void 0;
        for (let o = 0; o < i; ++o, t += n.packedLength) r[o] = n.unpack(e, t);
        for (let i = 0; i < o; ++i)
          (a[i] = f.unpackPolygonHierarchy(e, t, n)),
            (t = a[i].startingIndex),
            delete a[i].startingIndex;
        return { positions: r, holes: a, startingIndex: t };
      }
    },
    y = new i.Cartesian2();
  function g(e, t, n, o) {
    return (
      i.Cartesian2.subtract(t, e, y),
      i.Cartesian2.multiplyByScalar(y, n / o, y),
      i.Cartesian2.add(e, y, y),
      [y.x, y.y]
    );
  }
  const m = new i.Cartesian3();
  function C(e, t, n, o) {
    return (
      i.Cartesian3.subtract(t, e, m),
      i.Cartesian3.multiplyByScalar(m, n / o, m),
      i.Cartesian3.add(e, m, m),
      [m.x, m.y, m.z]
    );
  }
  f.subdivideLineCount = function (e, t, n) {
    const r = i.Cartesian3.distance(e, t) / n,
      a = Math.max(0, Math.ceil(o.CesiumMath.log2(r)));
    return Math.pow(2, a);
  };
  const b = new i.Cartographic(),
    T = new i.Cartographic(),
    x = new i.Cartographic(),
    w = new i.Cartesian3(),
    v = new a.EllipsoidRhumbLine();
  (f.subdivideRhumbLineCount = function (e, t, n, i) {
    const r = e.cartesianToCartographic(t, b),
      s = e.cartesianToCartographic(n, T),
      c = new a.EllipsoidRhumbLine(r, s, e).surfaceDistance / i,
      l = Math.max(0, Math.ceil(o.CesiumMath.log2(c)));
    return Math.pow(2, l);
  }),
    (f.subdivideTexcoordLine = function (e, t, n, o, r, a) {
      const s = f.subdivideLineCount(n, o, r),
        c = i.Cartesian2.distance(e, t),
        l = c / s,
        u = a;
      u.length = 2 * s;
      let h = 0;
      for (let n = 0; n < s; n++) {
        const i = g(e, t, n * l, c);
        (u[h++] = i[0]), (u[h++] = i[1]);
      }
      return u;
    }),
    (f.subdivideLine = function (e, t, n, o) {
      const a = f.subdivideLineCount(e, t, n),
        s = i.Cartesian3.distance(e, t),
        c = s / a;
      r.defined(o) || (o = []);
      const l = o;
      l.length = 3 * a;
      let u = 0;
      for (let n = 0; n < a; n++) {
        const i = C(e, t, n * c, s);
        (l[u++] = i[0]), (l[u++] = i[1]), (l[u++] = i[2]);
      }
      return l;
    }),
    (f.subdivideTexcoordRhumbLine = function (e, t, n, r, a, s, c) {
      const l = n.cartesianToCartographic(r, b),
        u = n.cartesianToCartographic(a, T);
      v.setEndPoints(l, u);
      const h = v.surfaceDistance / s,
        d = Math.max(0, Math.ceil(o.CesiumMath.log2(h))),
        p = Math.pow(2, d),
        f = i.Cartesian2.distance(e, t),
        y = f / p,
        m = c;
      m.length = 2 * p;
      let C = 0;
      for (let n = 0; n < p; n++) {
        const i = g(e, t, n * y, f);
        (m[C++] = i[0]), (m[C++] = i[1]);
      }
      return m;
    }),
    (f.subdivideRhumbLine = function (e, t, n, i, s) {
      const c = e.cartesianToCartographic(t, b),
        l = e.cartesianToCartographic(n, T),
        u = new a.EllipsoidRhumbLine(c, l, e),
        h = u.surfaceDistance / i,
        d = Math.max(0, Math.ceil(o.CesiumMath.log2(h))),
        p = Math.pow(2, d),
        f = u.surfaceDistance / p;
      r.defined(s) || (s = []);
      const y = s;
      y.length = 3 * p;
      let g = 0;
      for (let t = 0; t < p; t++) {
        const n = u.interpolateUsingSurfaceDistance(t * f, x),
          i = e.cartographicToCartesian(n, w);
        (y[g++] = i.x), (y[g++] = i.y), (y[g++] = i.z);
      }
      return y;
    });
  const A = new i.Cartesian3(),
    L = new i.Cartesian3(),
    E = new i.Cartesian3(),
    I = new i.Cartesian3();
  (f.scaleToGeodeticHeightExtruded = function (e, t, n, o, a) {
    o = r.defaultValue(o, i.Ellipsoid.WGS84);
    const s = A;
    let c = L;
    const l = E;
    let u = I;
    if (
      r.defined(e) &&
      r.defined(e.attributes) &&
      r.defined(e.attributes.position)
    ) {
      const r = e.attributes.position.values,
        h = r.length / 2;
      for (let e = 0; e < h; e += 3)
        i.Cartesian3.fromArray(r, e, l),
          o.geodeticSurfaceNormal(l, s),
          (u = o.scaleToGeodeticSurface(l, u)),
          (c = i.Cartesian3.multiplyByScalar(s, n, c)),
          (c = i.Cartesian3.add(u, c, c)),
          (r[e + h] = c.x),
          (r[e + 1 + h] = c.y),
          (r[e + 2 + h] = c.z),
          a && (u = i.Cartesian3.clone(l, u)),
          (c = i.Cartesian3.multiplyByScalar(s, t, c)),
          (c = i.Cartesian3.add(u, c, c)),
          (r[e] = c.x),
          (r[e + 1] = c.y),
          (r[e + 2] = c.z);
    }
    return e;
  }),
    (f.polygonOutlinesFromHierarchy = function (e, t, o) {
      const a = [],
        s = new p();
      let c, l, u;
      for (s.enqueue(e); 0 !== s.length; ) {
        const e = s.dequeue();
        let h = e.positions;
        if (t)
          for (u = h.length, c = 0; c < u; c++)
            o.scaleToGeodeticSurface(h[c], h[c]);
        if (
          ((h = n.arrayRemoveDuplicates(h, i.Cartesian3.equalsEpsilon, !0)),
          h.length < 3)
        )
          continue;
        const d = e.holes ? e.holes.length : 0;
        for (c = 0; c < d; c++) {
          const h = e.holes[c];
          let d = h.positions;
          if (t)
            for (u = d.length, l = 0; l < u; ++l)
              o.scaleToGeodeticSurface(d[l], d[l]);
          if (
            ((d = n.arrayRemoveDuplicates(d, i.Cartesian3.equalsEpsilon, !0)),
            d.length < 3)
          )
            continue;
          a.push(d);
          let p = 0;
          for (r.defined(h.holes) && (p = h.holes.length), l = 0; l < p; l++)
            s.enqueue(h.holes[l]);
        }
        a.push(h);
      }
      return a;
    }),
    (f.polygonsFromHierarchy = function (e, t, o, a, s) {
      const c = [],
        l = [],
        u = new p();
      for (u.enqueue(e); 0 !== u.length; ) {
        const e = u.dequeue();
        let d = e.positions;
        const p = e.holes;
        let f, y;
        if (a)
          for (y = d.length, f = 0; f < y; f++)
            s.scaleToGeodeticSurface(d[f], d[f]);
        if (
          (t ||
            (d = n.arrayRemoveDuplicates(d, i.Cartesian3.equalsEpsilon, !0)),
          d.length < 3)
        )
          continue;
        let g = o(d);
        if (!r.defined(g)) continue;
        const m = [];
        let C = h.PolygonPipeline.computeWindingOrder2D(g);
        C === h.WindingOrder.CLOCKWISE &&
          (g.reverse(), (d = d.slice().reverse()));
        let b = d.slice();
        const T = r.defined(p) ? p.length : 0,
          x = [];
        let w;
        for (f = 0; f < T; f++) {
          const e = p[f];
          let c = e.positions;
          if (a)
            for (y = c.length, w = 0; w < y; ++w)
              s.scaleToGeodeticSurface(c[w], c[w]);
          if (
            (t ||
              (c = n.arrayRemoveDuplicates(c, i.Cartesian3.equalsEpsilon, !0)),
            c.length < 3)
          )
            continue;
          const l = o(c);
          if (!r.defined(l)) continue;
          (C = h.PolygonPipeline.computeWindingOrder2D(l)),
            C === h.WindingOrder.CLOCKWISE &&
              (l.reverse(), (c = c.slice().reverse())),
            x.push(c),
            m.push(b.length),
            (b = b.concat(c)),
            (g = g.concat(l));
          let d = 0;
          for (r.defined(e.holes) && (d = e.holes.length), w = 0; w < d; w++)
            u.enqueue(e.holes[w]);
        }
        c.push({ outerRing: d, holes: x }),
          l.push({ positions: b, positions2D: g, holes: m });
      }
      return { hierarchy: c, polygons: l };
    });
  const P = new i.Cartesian2(),
    D = new i.Cartesian3(),
    M = new d.Quaternion(),
    _ = new i.Matrix3();
  (f.computeBoundingRectangle = function (e, t, n, o, a) {
    const s = d.Quaternion.fromAxisAngle(e, o, M),
      c = i.Matrix3.fromQuaternion(s, _);
    let l = Number.POSITIVE_INFINITY,
      u = Number.NEGATIVE_INFINITY,
      h = Number.POSITIVE_INFINITY,
      p = Number.NEGATIVE_INFINITY;
    const f = n.length;
    for (let e = 0; e < f; ++e) {
      const o = i.Cartesian3.clone(n[e], D);
      i.Matrix3.multiplyByVector(c, o, o);
      const a = t(o, P);
      r.defined(a) &&
        ((l = Math.min(l, a.x)),
        (u = Math.max(u, a.x)),
        (h = Math.min(h, a.y)),
        (p = Math.max(p, a.y)));
    }
    return (a.x = l), (a.y = h), (a.width = u - l), (a.height = p - h), a;
  }),
    (f.createGeometryFromPositions = function (e, n, a, c, u, d, p) {
      let f = h.PolygonPipeline.triangulate(n.positions2D, n.holes);
      f.length < 3 && (f = [0, 1, 2]);
      const y = n.positions,
        g = r.defined(a),
        m = g ? a.positions : void 0;
      if (u) {
        const e = y.length,
          t = new Array(3 * e);
        let n = 0;
        for (let i = 0; i < e; i++) {
          const e = y[i];
          (t[n++] = e.x), (t[n++] = e.y), (t[n++] = e.z);
        }
        const r = {
          attributes: {
            position: new s.GeometryAttribute({
              componentDatatype: o.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: t
            })
          },
          indices: f,
          primitiveType: s.PrimitiveType.TRIANGLES
        };
        g &&
          (r.attributes.st = new s.GeometryAttribute({
            componentDatatype: o.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: i.Cartesian2.packArray(m)
          }));
        const a = new s.Geometry(r);
        return d.normal ? l.GeometryPipeline.computeNormal(a) : a;
      }
      return p === t.ArcType.GEODESIC
        ? h.PolygonPipeline.computeSubdivision(e, y, f, m, c)
        : p === t.ArcType.RHUMB
        ? h.PolygonPipeline.computeRhumbLineSubdivision(e, y, f, m, c)
        : void 0;
    });
  const G = [],
    S = [],
    R = new i.Cartesian3(),
    N = new i.Cartesian3();
  (f.computeWallGeometry = function (e, n, a, l, h, d) {
    let p,
      y,
      g,
      m,
      C,
      b,
      T,
      x,
      w,
      v = e.length,
      A = 0,
      L = 0;
    const E = r.defined(n),
      I = E ? n.positions : void 0;
    if (h)
      for (
        y = 3 * v * 2,
          p = new Array(2 * y),
          E && ((w = 2 * v * 2), (x = new Array(2 * w))),
          g = 0;
        g < v;
        g++
      )
        (m = e[g]),
          (C = e[(g + 1) % v]),
          (p[A] = p[A + y] = m.x),
          ++A,
          (p[A] = p[A + y] = m.y),
          ++A,
          (p[A] = p[A + y] = m.z),
          ++A,
          (p[A] = p[A + y] = C.x),
          ++A,
          (p[A] = p[A + y] = C.y),
          ++A,
          (p[A] = p[A + y] = C.z),
          ++A,
          E &&
            ((b = I[g]),
            (T = I[(g + 1) % v]),
            (x[L] = x[L + w] = b.x),
            ++L,
            (x[L] = x[L + w] = b.y),
            ++L,
            (x[L] = x[L + w] = T.x),
            ++L,
            (x[L] = x[L + w] = T.y),
            ++L);
    else {
      const n = o.CesiumMath.chordLength(l, a.maximumRadius);
      let i = 0;
      if (d === t.ArcType.GEODESIC)
        for (g = 0; g < v; g++)
          i += f.subdivideLineCount(e[g], e[(g + 1) % v], n);
      else if (d === t.ArcType.RHUMB)
        for (g = 0; g < v; g++)
          i += f.subdivideRhumbLineCount(a, e[g], e[(g + 1) % v], n);
      for (
        y = 3 * (i + v),
          p = new Array(2 * y),
          E && ((w = 2 * (i + v)), (x = new Array(2 * w))),
          g = 0;
        g < v;
        g++
      ) {
        let i, o;
        (m = e[g]),
          (C = e[(g + 1) % v]),
          E && ((b = I[g]), (T = I[(g + 1) % v])),
          d === t.ArcType.GEODESIC
            ? ((i = f.subdivideLine(m, C, n, S)),
              E && (o = f.subdivideTexcoordLine(b, T, m, C, n, G)))
            : d === t.ArcType.RHUMB &&
              ((i = f.subdivideRhumbLine(a, m, C, n, S)),
              E && (o = f.subdivideTexcoordRhumbLine(b, T, a, m, C, n, G)));
        const r = i.length;
        for (let e = 0; e < r; ++e, ++A) (p[A] = i[e]), (p[A + y] = i[e]);
        if (
          ((p[A] = C.x),
          (p[A + y] = C.x),
          ++A,
          (p[A] = C.y),
          (p[A + y] = C.y),
          ++A,
          (p[A] = C.z),
          (p[A + y] = C.z),
          ++A,
          E)
        ) {
          const e = o.length;
          for (let t = 0; t < e; ++t, ++L) (x[L] = o[t]), (x[L + w] = o[t]);
          (x[L] = T.x),
            (x[L + w] = T.x),
            ++L,
            (x[L] = T.y),
            (x[L + w] = T.y),
            ++L;
        }
      }
    }
    v = p.length;
    const P = u.IndexDatatype.createTypedArray(v / 3, v - 6 * e.length);
    let D = 0;
    for (v /= 6, g = 0; g < v; g++) {
      const e = g,
        t = e + 1,
        n = e + v,
        r = n + 1;
      (m = i.Cartesian3.fromArray(p, 3 * e, R)),
        (C = i.Cartesian3.fromArray(p, 3 * t, N)),
        i.Cartesian3.equalsEpsilon(
          m,
          C,
          o.CesiumMath.EPSILON10,
          o.CesiumMath.EPSILON10
        ) ||
          ((P[D++] = e),
          (P[D++] = n),
          (P[D++] = t),
          (P[D++] = t),
          (P[D++] = n),
          (P[D++] = r));
    }
    const M = {
      attributes: new c.GeometryAttributes({
        position: new s.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: p
        })
      }),
      indices: P,
      primitiveType: s.PrimitiveType.TRIANGLES
    };
    E &&
      (M.attributes.st = new s.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: x
      }));
    return new s.Geometry(M);
  }),
    (e.PolygonGeometryLibrary = f);
});
