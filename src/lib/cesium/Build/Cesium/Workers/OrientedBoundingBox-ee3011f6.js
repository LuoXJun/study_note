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
  './Transforms-d3d3b2a9',
  './Matrix2-73789715',
  './RuntimeError-4f8ec8a2',
  './defaultValue-97284df2',
  './EllipsoidTangentPlane-7ae496b2',
  './ComponentDatatype-e7fbe225',
  './Plane-e916220d'
], function (a, t, e, n, r, i, s, o) {
  'use strict';
  function C(a, t) {
    (this.center = e.Cartesian3.clone(r.defaultValue(a, e.Cartesian3.ZERO))),
      (this.halfAxes = e.Matrix3.clone(r.defaultValue(t, e.Matrix3.ZERO)));
  }
  (C.packedLength = e.Cartesian3.packedLength + e.Matrix3.packedLength),
    (C.pack = function (a, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e.Cartesian3.pack(a.center, t, n),
        e.Matrix3.pack(a.halfAxes, t, n + e.Cartesian3.packedLength),
        t
      );
    }),
    (C.unpack = function (a, t, n) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(n) || (n = new C()),
        e.Cartesian3.unpack(a, t, n.center),
        e.Matrix3.unpack(a, t + e.Cartesian3.packedLength, n.halfAxes),
        n
      );
    });
  const c = new e.Cartesian3(),
    u = new e.Cartesian3(),
    l = new e.Cartesian3(),
    d = new e.Cartesian3(),
    h = new e.Cartesian3(),
    x = new e.Cartesian3(),
    m = new e.Matrix3(),
    f = { unitary: new e.Matrix3(), diagonal: new e.Matrix3() };
  C.fromPoints = function (a, t) {
    if ((r.defined(t) || (t = new C()), !r.defined(a) || 0 === a.length))
      return (t.halfAxes = e.Matrix3.ZERO), (t.center = e.Cartesian3.ZERO), t;
    let n;
    const i = a.length,
      s = e.Cartesian3.clone(a[0], c);
    for (n = 1; n < i; n++) e.Cartesian3.add(s, a[n], s);
    const o = 1 / i;
    e.Cartesian3.multiplyByScalar(s, o, s);
    let M,
      p = 0,
      w = 0,
      g = 0,
      y = 0,
      b = 0,
      N = 0;
    for (n = 0; n < i; n++)
      (M = e.Cartesian3.subtract(a[n], s, u)),
        (p += M.x * M.x),
        (w += M.x * M.y),
        (g += M.x * M.z),
        (y += M.y * M.y),
        (b += M.y * M.z),
        (N += M.z * M.z);
    (p *= o), (w *= o), (g *= o), (y *= o), (b *= o), (N *= o);
    const T = m;
    (T[0] = p),
      (T[1] = w),
      (T[2] = g),
      (T[3] = w),
      (T[4] = y),
      (T[5] = b),
      (T[6] = g),
      (T[7] = b),
      (T[8] = N);
    const O = e.Matrix3.computeEigenDecomposition(T, f),
      A = e.Matrix3.clone(O.unitary, t.halfAxes);
    let P = e.Matrix3.getColumn(A, 0, d),
      I = e.Matrix3.getColumn(A, 1, h),
      R = e.Matrix3.getColumn(A, 2, x),
      E = -Number.MAX_VALUE,
      S = -Number.MAX_VALUE,
      U = -Number.MAX_VALUE,
      L = Number.MAX_VALUE,
      z = Number.MAX_VALUE,
      B = Number.MAX_VALUE;
    for (n = 0; n < i; n++)
      (M = a[n]),
        (E = Math.max(e.Cartesian3.dot(P, M), E)),
        (S = Math.max(e.Cartesian3.dot(I, M), S)),
        (U = Math.max(e.Cartesian3.dot(R, M), U)),
        (L = Math.min(e.Cartesian3.dot(P, M), L)),
        (z = Math.min(e.Cartesian3.dot(I, M), z)),
        (B = Math.min(e.Cartesian3.dot(R, M), B));
    (P = e.Cartesian3.multiplyByScalar(P, 0.5 * (L + E), P)),
      (I = e.Cartesian3.multiplyByScalar(I, 0.5 * (z + S), I)),
      (R = e.Cartesian3.multiplyByScalar(R, 0.5 * (B + U), R));
    const V = e.Cartesian3.add(P, I, t.center);
    e.Cartesian3.add(V, R, V);
    const _ = l;
    return (
      (_.x = E - L),
      (_.y = S - z),
      (_.z = U - B),
      e.Cartesian3.multiplyByScalar(_, 0.5, _),
      e.Matrix3.multiplyByScale(t.halfAxes, _, t.halfAxes),
      t
    );
  };
  const M = new e.Cartesian3(),
    p = new e.Cartesian3();
  function w(a, t, n, i, s, o, c, u, l, d, h) {
    r.defined(h) || (h = new C());
    const x = h.halfAxes;
    e.Matrix3.setColumn(x, 0, t, x),
      e.Matrix3.setColumn(x, 1, n, x),
      e.Matrix3.setColumn(x, 2, i, x);
    let m = M;
    (m.x = (s + o) / 2), (m.y = (c + u) / 2), (m.z = (l + d) / 2);
    const f = p;
    (f.x = (o - s) / 2), (f.y = (u - c) / 2), (f.z = (d - l) / 2);
    const w = h.center;
    return (
      (m = e.Matrix3.multiplyByVector(x, m, m)),
      e.Cartesian3.add(a, m, w),
      e.Matrix3.multiplyByScale(x, f, x),
      h
    );
  }
  const g = new e.Cartographic(),
    y = new e.Cartesian3(),
    b = new e.Cartographic(),
    N = new e.Cartographic(),
    T = new e.Cartographic(),
    O = new e.Cartographic(),
    A = new e.Cartographic(),
    P = new e.Cartesian3(),
    I = new e.Cartesian3(),
    R = new e.Cartesian3(),
    E = new e.Cartesian3(),
    S = new e.Cartesian3(),
    U = new e.Cartesian2(),
    L = new e.Cartesian2(),
    z = new e.Cartesian2(),
    B = new e.Cartesian2(),
    V = new e.Cartesian2(),
    _ = new e.Cartesian3(),
    k = new e.Cartesian3(),
    W = new e.Cartesian3(),
    D = new e.Cartesian3(),
    X = new e.Cartesian2(),
    q = new e.Cartesian3(),
    j = new e.Cartesian3(),
    Z = new e.Cartesian3(),
    v = new o.Plane(e.Cartesian3.UNIT_X, 0);
  (C.fromRectangle = function (a, t, n, C, c) {
    let u, l, d, h, x, m, f;
    if (
      ((t = r.defaultValue(t, 0)),
      (n = r.defaultValue(n, 0)),
      (C = r.defaultValue(C, e.Ellipsoid.WGS84)),
      a.width <= s.CesiumMath.PI)
    ) {
      const r = e.Rectangle.center(a, g),
        s = C.cartographicToCartesian(r, y),
        M = new i.EllipsoidTangentPlane(s, C);
      f = M.plane;
      const p = r.longitude,
        _ = a.south < 0 && a.north > 0 ? 0 : r.latitude,
        k = e.Cartographic.fromRadians(p, a.north, n, b),
        W = e.Cartographic.fromRadians(a.west, a.north, n, N),
        D = e.Cartographic.fromRadians(a.west, _, n, T),
        X = e.Cartographic.fromRadians(a.west, a.south, n, O),
        q = e.Cartographic.fromRadians(p, a.south, n, A),
        j = C.cartographicToCartesian(k, P);
      let Z = C.cartographicToCartesian(W, I);
      const v = C.cartographicToCartesian(D, R);
      let Y = C.cartographicToCartesian(X, E);
      const G = C.cartographicToCartesian(q, S),
        F = M.projectPointToNearestOnPlane(j, U),
        H = M.projectPointToNearestOnPlane(Z, L),
        J = M.projectPointToNearestOnPlane(v, z),
        K = M.projectPointToNearestOnPlane(Y, B),
        Q = M.projectPointToNearestOnPlane(G, V);
      return (
        (u = Math.min(H.x, J.x, K.x)),
        (l = -u),
        (h = Math.max(H.y, F.y)),
        (d = Math.min(K.y, Q.y)),
        (W.height = X.height = t),
        (Z = C.cartographicToCartesian(W, I)),
        (Y = C.cartographicToCartesian(X, E)),
        (x = Math.min(
          o.Plane.getPointDistance(f, Z),
          o.Plane.getPointDistance(f, Y)
        )),
        (m = n),
        w(M.origin, M.xAxis, M.yAxis, M.zAxis, u, l, d, h, x, m, c)
      );
    }
    const M = a.south > 0,
      p = a.north < 0,
      Y = M ? a.south : p ? a.north : 0,
      G = e.Rectangle.center(a, g).longitude,
      F = e.Cartesian3.fromRadians(G, Y, n, C, _);
    F.z = 0;
    const H =
        Math.abs(F.x) < s.CesiumMath.EPSILON10 &&
        Math.abs(F.y) < s.CesiumMath.EPSILON10
          ? e.Cartesian3.UNIT_X
          : e.Cartesian3.normalize(F, k),
      J = e.Cartesian3.UNIT_Z,
      K = e.Cartesian3.cross(H, J, W);
    f = o.Plane.fromPointNormal(F, H, v);
    const Q = e.Cartesian3.fromRadians(
      G + s.CesiumMath.PI_OVER_TWO,
      Y,
      n,
      C,
      D
    );
    (l = e.Cartesian3.dot(o.Plane.projectPointOntoPlane(f, Q, X), K)),
      (u = -l),
      (h = e.Cartesian3.fromRadians(0, a.north, p ? t : n, C, q).z),
      (d = e.Cartesian3.fromRadians(0, a.south, M ? t : n, C, j).z);
    const $ = e.Cartesian3.fromRadians(a.east, Y, n, C, Z);
    return (
      (x = o.Plane.getPointDistance(f, $)),
      (m = 0),
      w(F, K, J, H, u, l, d, h, x, m, c)
    );
  }),
    (C.fromTransformation = function (a, t) {
      return (
        r.defined(t) || (t = new C()),
        (t.center = e.Matrix4.getTranslation(a, t.center)),
        (t.halfAxes = e.Matrix4.getMatrix3(a, t.halfAxes)),
        (t.halfAxes = e.Matrix3.multiplyByScalar(t.halfAxes, 0.5, t.halfAxes)),
        t
      );
    }),
    (C.clone = function (a, t) {
      if (r.defined(a))
        return r.defined(t)
          ? (e.Cartesian3.clone(a.center, t.center),
            e.Matrix3.clone(a.halfAxes, t.halfAxes),
            t)
          : new C(a.center, a.halfAxes);
    }),
    (C.intersectPlane = function (a, n) {
      const r = a.center,
        i = n.normal,
        s = a.halfAxes,
        o = i.x,
        C = i.y,
        c = i.z,
        u =
          Math.abs(
            o * s[e.Matrix3.COLUMN0ROW0] +
              C * s[e.Matrix3.COLUMN0ROW1] +
              c * s[e.Matrix3.COLUMN0ROW2]
          ) +
          Math.abs(
            o * s[e.Matrix3.COLUMN1ROW0] +
              C * s[e.Matrix3.COLUMN1ROW1] +
              c * s[e.Matrix3.COLUMN1ROW2]
          ) +
          Math.abs(
            o * s[e.Matrix3.COLUMN2ROW0] +
              C * s[e.Matrix3.COLUMN2ROW1] +
              c * s[e.Matrix3.COLUMN2ROW2]
          ),
        l = e.Cartesian3.dot(i, r) + n.distance;
      return l <= -u
        ? t.Intersect.OUTSIDE
        : l >= u
        ? t.Intersect.INSIDE
        : t.Intersect.INTERSECTING;
    });
  const Y = new e.Cartesian3(),
    G = new e.Cartesian3(),
    F = new e.Cartesian3(),
    H = new e.Cartesian3(),
    J = new e.Cartesian3(),
    K = new e.Cartesian3();
  C.distanceSquaredTo = function (a, t) {
    const n = e.Cartesian3.subtract(t, a.center, M),
      r = a.halfAxes;
    let i = e.Matrix3.getColumn(r, 0, Y),
      o = e.Matrix3.getColumn(r, 1, G),
      C = e.Matrix3.getColumn(r, 2, F);
    const c = e.Cartesian3.magnitude(i),
      u = e.Cartesian3.magnitude(o),
      l = e.Cartesian3.magnitude(C);
    let d = !0,
      h = !0,
      x = !0;
    c > 0 ? e.Cartesian3.divideByScalar(i, c, i) : (d = !1),
      u > 0 ? e.Cartesian3.divideByScalar(o, u, o) : (h = !1),
      l > 0 ? e.Cartesian3.divideByScalar(C, l, C) : (x = !1);
    const m = !d + !h + !x;
    let f, p, w;
    if (1 === m) {
      let a = i;
      (f = o),
        (p = C),
        h ? x || ((a = C), (p = i)) : ((a = o), (f = i)),
        (w = e.Cartesian3.cross(f, p, J)),
        a === i ? (i = w) : a === o ? (o = w) : a === C && (C = w);
    } else if (2 === m) {
      (f = i), h ? (f = o) : x && (f = C);
      let a = e.Cartesian3.UNIT_Y;
      a.equalsEpsilon(f, s.CesiumMath.EPSILON3) && (a = e.Cartesian3.UNIT_X),
        (p = e.Cartesian3.cross(f, a, H)),
        e.Cartesian3.normalize(p, p),
        (w = e.Cartesian3.cross(f, p, J)),
        e.Cartesian3.normalize(w, w),
        f === i
          ? ((o = p), (C = w))
          : f === o
          ? ((C = p), (i = w))
          : f === C && ((i = p), (o = w));
    } else
      3 === m &&
        ((i = e.Cartesian3.UNIT_X),
        (o = e.Cartesian3.UNIT_Y),
        (C = e.Cartesian3.UNIT_Z));
    const g = K;
    (g.x = e.Cartesian3.dot(n, i)),
      (g.y = e.Cartesian3.dot(n, o)),
      (g.z = e.Cartesian3.dot(n, C));
    let y,
      b = 0;
    return (
      g.x < -c
        ? ((y = g.x + c), (b += y * y))
        : g.x > c && ((y = g.x - c), (b += y * y)),
      g.y < -u
        ? ((y = g.y + u), (b += y * y))
        : g.y > u && ((y = g.y - u), (b += y * y)),
      g.z < -l
        ? ((y = g.z + l), (b += y * y))
        : g.z > l && ((y = g.z - l), (b += y * y)),
      b
    );
  };
  const Q = new e.Cartesian3(),
    $ = new e.Cartesian3();
  C.computePlaneDistances = function (a, n, i, s) {
    r.defined(s) || (s = new t.Interval());
    let o = Number.POSITIVE_INFINITY,
      C = Number.NEGATIVE_INFINITY;
    const c = a.center,
      u = a.halfAxes,
      l = e.Matrix3.getColumn(u, 0, Y),
      d = e.Matrix3.getColumn(u, 1, G),
      h = e.Matrix3.getColumn(u, 2, F),
      x = e.Cartesian3.add(l, d, Q);
    e.Cartesian3.add(x, h, x), e.Cartesian3.add(x, c, x);
    const m = e.Cartesian3.subtract(x, n, $);
    let f = e.Cartesian3.dot(i, m);
    return (
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.add(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.add(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.add(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      e.Cartesian3.subtract(c, l, x),
      e.Cartesian3.subtract(x, d, x),
      e.Cartesian3.subtract(x, h, x),
      e.Cartesian3.subtract(x, n, m),
      (f = e.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (C = Math.max(f, C)),
      (s.start = o),
      (s.stop = C),
      s
    );
  };
  const aa = new e.Cartesian3(),
    ta = new e.Cartesian3(),
    ea = new e.Cartesian3();
  C.computeCorners = function (a, t) {
    r.defined(t) ||
      (t = [
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3(),
        new e.Cartesian3()
      ]);
    const n = a.center,
      i = a.halfAxes,
      s = e.Matrix3.getColumn(i, 0, aa),
      o = e.Matrix3.getColumn(i, 1, ta),
      C = e.Matrix3.getColumn(i, 2, ea);
    return (
      e.Cartesian3.clone(n, t[0]),
      e.Cartesian3.subtract(t[0], s, t[0]),
      e.Cartesian3.subtract(t[0], o, t[0]),
      e.Cartesian3.subtract(t[0], C, t[0]),
      e.Cartesian3.clone(n, t[1]),
      e.Cartesian3.subtract(t[1], s, t[1]),
      e.Cartesian3.subtract(t[1], o, t[1]),
      e.Cartesian3.add(t[1], C, t[1]),
      e.Cartesian3.clone(n, t[2]),
      e.Cartesian3.subtract(t[2], s, t[2]),
      e.Cartesian3.add(t[2], o, t[2]),
      e.Cartesian3.subtract(t[2], C, t[2]),
      e.Cartesian3.clone(n, t[3]),
      e.Cartesian3.subtract(t[3], s, t[3]),
      e.Cartesian3.add(t[3], o, t[3]),
      e.Cartesian3.add(t[3], C, t[3]),
      e.Cartesian3.clone(n, t[4]),
      e.Cartesian3.add(t[4], s, t[4]),
      e.Cartesian3.subtract(t[4], o, t[4]),
      e.Cartesian3.subtract(t[4], C, t[4]),
      e.Cartesian3.clone(n, t[5]),
      e.Cartesian3.add(t[5], s, t[5]),
      e.Cartesian3.subtract(t[5], o, t[5]),
      e.Cartesian3.add(t[5], C, t[5]),
      e.Cartesian3.clone(n, t[6]),
      e.Cartesian3.add(t[6], s, t[6]),
      e.Cartesian3.add(t[6], o, t[6]),
      e.Cartesian3.subtract(t[6], C, t[6]),
      e.Cartesian3.clone(n, t[7]),
      e.Cartesian3.add(t[7], s, t[7]),
      e.Cartesian3.add(t[7], o, t[7]),
      e.Cartesian3.add(t[7], C, t[7]),
      t
    );
  };
  const na = new e.Matrix3();
  C.computeTransformation = function (a, t) {
    r.defined(t) || (t = new e.Matrix4());
    const n = a.center,
      i = e.Matrix3.multiplyByUniformScale(a.halfAxes, 2, na);
    return e.Matrix4.fromRotationTranslation(i, n, t);
  };
  const ra = new t.BoundingSphere();
  (C.isOccluded = function (a, e) {
    const n = t.BoundingSphere.fromOrientedBoundingBox(a, ra);
    return !e.isBoundingSphereVisible(n);
  }),
    (C.prototype.intersectPlane = function (a) {
      return C.intersectPlane(this, a);
    }),
    (C.prototype.distanceSquaredTo = function (a) {
      return C.distanceSquaredTo(this, a);
    }),
    (C.prototype.computePlaneDistances = function (a, t, e) {
      return C.computePlaneDistances(this, a, t, e);
    }),
    (C.prototype.computeCorners = function (a) {
      return C.computeCorners(this, a);
    }),
    (C.prototype.computeTransformation = function (a) {
      return C.computeTransformation(this, a);
    }),
    (C.prototype.isOccluded = function (a) {
      return C.isOccluded(this, a);
    }),
    (C.equals = function (a, t) {
      return (
        a === t ||
        (r.defined(a) &&
          r.defined(t) &&
          e.Cartesian3.equals(a.center, t.center) &&
          e.Matrix3.equals(a.halfAxes, t.halfAxes))
      );
    }),
    (C.prototype.clone = function (a) {
      return C.clone(this, a);
    }),
    (C.prototype.equals = function (a) {
      return C.equals(this, a);
    }),
    (a.OrientedBoundingBox = C);
});
