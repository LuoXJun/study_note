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
  './Matrix2-73789715',
  './defaultValue-97284df2',
  './RuntimeError-4f8ec8a2',
  './EllipsoidGeodesic-ed8a0e40',
  './EllipsoidRhumbLine-60f14314',
  './IntersectionTests-33ace2d6',
  './ComponentDatatype-e7fbe225',
  './Plane-e916220d'
], function (e, t, a, n, i, r, o, s, c) {
  'use strict';
  const l = {
      numberOfPoints: function (e, a, n) {
        const i = t.Cartesian3.distance(e, a);
        return Math.ceil(i / n);
      },
      numberOfPointsRhumbLine: function (e, t, a) {
        const n =
          Math.pow(e.longitude - t.longitude, 2) +
          Math.pow(e.latitude - t.latitude, 2);
        return Math.max(1, Math.ceil(Math.sqrt(n / (a * a))));
      }
    },
    u = new t.Cartographic();
  l.extractHeights = function (e, t) {
    const a = e.length,
      n = new Array(a);
    for (let i = 0; i < a; i++) {
      const a = e[i];
      n[i] = t.cartesianToCartographic(a, u).height;
    }
    return n;
  };
  const h = new t.Matrix4(),
    f = new t.Cartesian3(),
    g = new t.Cartesian3(),
    C = new c.Plane(t.Cartesian3.UNIT_X, 0),
    p = new t.Cartesian3(),
    d = new c.Plane(t.Cartesian3.UNIT_X, 0),
    m = new t.Cartesian3(),
    w = new t.Cartesian3(),
    P = [];
  function T(e, t, a) {
    const n = P;
    let i;
    if (((n.length = e), t === a)) {
      for (i = 0; i < e; i++) n[i] = t;
      return n;
    }
    const r = (a - t) / e;
    for (i = 0; i < e; i++) {
      const e = t + i * r;
      n[i] = e;
    }
    return n;
  }
  const y = new t.Cartographic(),
    A = new t.Cartographic(),
    E = new t.Cartesian3(),
    R = new t.Cartesian3(),
    b = new t.Cartesian3(),
    M = new i.EllipsoidGeodesic();
  let S = new r.EllipsoidRhumbLine();
  function D(e, a, n, i, r, o, s, c) {
    const u = i.scaleToGeodeticSurface(e, R),
      h = i.scaleToGeodeticSurface(a, b),
      f = l.numberOfPoints(e, a, n),
      g = i.cartesianToCartographic(u, y),
      C = i.cartesianToCartographic(h, A),
      p = T(f, r, o);
    M.setEndPoints(g, C);
    const d = M.surfaceDistance / f;
    let m = c;
    g.height = r;
    let w = i.cartographicToCartesian(g, E);
    t.Cartesian3.pack(w, s, m), (m += 3);
    for (let e = 1; e < f; e++) {
      const a = M.interpolateUsingSurfaceDistance(e * d, A);
      (a.height = p[e]),
        (w = i.cartographicToCartesian(a, E)),
        t.Cartesian3.pack(w, s, m),
        (m += 3);
    }
    return m;
  }
  function x(e, a, n, i, o, s, c, u) {
    const h = i.cartesianToCartographic(e, y),
      f = i.cartesianToCartographic(a, A),
      g = l.numberOfPointsRhumbLine(h, f, n);
    (h.height = 0), (f.height = 0);
    const C = T(g, o, s);
    S.ellipsoid.equals(i) || (S = new r.EllipsoidRhumbLine(void 0, void 0, i)),
      S.setEndPoints(h, f);
    const p = S.surfaceDistance / g;
    let d = u;
    h.height = o;
    let m = i.cartographicToCartesian(h, E);
    t.Cartesian3.pack(m, c, d), (d += 3);
    for (let e = 1; e < g; e++) {
      const a = S.interpolateUsingSurfaceDistance(e * p, A);
      (a.height = C[e]),
        (m = i.cartographicToCartesian(a, E)),
        t.Cartesian3.pack(m, c, d),
        (d += 3);
    }
    return d;
  }
  (l.wrapLongitude = function (e, n) {
    const i = [],
      r = [];
    if (a.defined(e) && e.length > 0) {
      n = a.defaultValue(n, t.Matrix4.IDENTITY);
      const s = t.Matrix4.inverseTransformation(n, h),
        l = t.Matrix4.multiplyByPoint(s, t.Cartesian3.ZERO, f),
        u = t.Cartesian3.normalize(
          t.Matrix4.multiplyByPointAsVector(s, t.Cartesian3.UNIT_Y, g),
          g
        ),
        P = c.Plane.fromPointNormal(l, u, C),
        T = t.Cartesian3.normalize(
          t.Matrix4.multiplyByPointAsVector(s, t.Cartesian3.UNIT_X, p),
          p
        ),
        y = c.Plane.fromPointNormal(l, T, d);
      let A = 1;
      i.push(t.Cartesian3.clone(e[0]));
      let E = i[0];
      const R = e.length;
      for (let n = 1; n < R; ++n) {
        const s = e[n];
        if (
          c.Plane.getPointDistance(y, E) < 0 ||
          c.Plane.getPointDistance(y, s) < 0
        ) {
          const e = o.IntersectionTests.lineSegmentPlane(E, s, P, m);
          if (a.defined(e)) {
            const a = t.Cartesian3.multiplyByScalar(u, 5e-9, w);
            c.Plane.getPointDistance(P, E) < 0 && t.Cartesian3.negate(a, a),
              i.push(t.Cartesian3.add(e, a, new t.Cartesian3())),
              r.push(A + 1),
              t.Cartesian3.negate(a, a),
              i.push(t.Cartesian3.add(e, a, new t.Cartesian3())),
              (A = 1);
          }
        }
        i.push(t.Cartesian3.clone(e[n])), A++, (E = s);
      }
      r.push(A);
    }
    return { positions: i, lengths: r };
  }),
    (l.generateArc = function (e) {
      a.defined(e) || (e = {});
      const n = e.positions,
        i = n.length,
        r = a.defaultValue(e.ellipsoid, t.Ellipsoid.WGS84);
      let o = a.defaultValue(e.height, 0);
      const c = Array.isArray(o);
      if (i < 1) return [];
      if (1 === i) {
        const e = r.scaleToGeodeticSurface(n[0], R);
        if (((o = c ? o[0] : o), 0 !== o)) {
          const a = r.geodeticSurfaceNormal(e, E);
          t.Cartesian3.multiplyByScalar(a, o, a), t.Cartesian3.add(e, a, e);
        }
        return [e.x, e.y, e.z];
      }
      let u = e.minDistance;
      if (!a.defined(u)) {
        const t = a.defaultValue(
          e.granularity,
          s.CesiumMath.RADIANS_PER_DEGREE
        );
        u = s.CesiumMath.chordLength(t, r.maximumRadius);
      }
      let h,
        f = 0;
      for (h = 0; h < i - 1; h++) f += l.numberOfPoints(n[h], n[h + 1], u);
      const g = 3 * (f + 1),
        C = new Array(g);
      let p = 0;
      for (h = 0; h < i - 1; h++) {
        p = D(n[h], n[h + 1], u, r, c ? o[h] : o, c ? o[h + 1] : o, C, p);
      }
      P.length = 0;
      const d = n[i - 1],
        m = r.cartesianToCartographic(d, y);
      m.height = c ? o[i - 1] : o;
      const w = r.cartographicToCartesian(m, E);
      return t.Cartesian3.pack(w, C, g - 3), C;
    });
  const N = new t.Cartographic(),
    G = new t.Cartographic();
  (l.generateRhumbArc = function (e) {
    a.defined(e) || (e = {});
    const n = e.positions,
      i = n.length,
      r = a.defaultValue(e.ellipsoid, t.Ellipsoid.WGS84);
    let o = a.defaultValue(e.height, 0);
    const c = Array.isArray(o);
    if (i < 1) return [];
    if (1 === i) {
      const e = r.scaleToGeodeticSurface(n[0], R);
      if (((o = c ? o[0] : o), 0 !== o)) {
        const a = r.geodeticSurfaceNormal(e, E);
        t.Cartesian3.multiplyByScalar(a, o, a), t.Cartesian3.add(e, a, e);
      }
      return [e.x, e.y, e.z];
    }
    const u = a.defaultValue(e.granularity, s.CesiumMath.RADIANS_PER_DEGREE);
    let h,
      f,
      g = 0,
      C = r.cartesianToCartographic(n[0], N);
    for (h = 0; h < i - 1; h++)
      (f = r.cartesianToCartographic(n[h + 1], G)),
        (g += l.numberOfPointsRhumbLine(C, f, u)),
        (C = t.Cartographic.clone(f, N));
    const p = 3 * (g + 1),
      d = new Array(p);
    let m = 0;
    for (h = 0; h < i - 1; h++) {
      m = x(n[h], n[h + 1], u, r, c ? o[h] : o, c ? o[h + 1] : o, d, m);
    }
    P.length = 0;
    const w = n[i - 1],
      T = r.cartesianToCartographic(w, y);
    T.height = c ? o[i - 1] : o;
    const A = r.cartographicToCartesian(T, E);
    return t.Cartesian3.pack(A, d, p - 3), d;
  }),
    (l.generateCartesianArc = function (e) {
      const a = l.generateArc(e),
        n = a.length / 3,
        i = new Array(n);
      for (let e = 0; e < n; e++) i[e] = t.Cartesian3.unpack(a, 3 * e);
      return i;
    }),
    (l.generateCartesianRhumbArc = function (e) {
      const a = l.generateRhumbArc(e),
        n = a.length / 3,
        i = new Array(n);
      for (let e = 0; e < n; e++) i[e] = t.Cartesian3.unpack(a, 3 * e);
      return i;
    }),
    (e.PolylinePipeline = l);
});
