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
  './ComponentDatatype-e7fbe225',
  './defaultValue-97284df2',
  './RuntimeError-4f8ec8a2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryOffsetAttribute-59b14f45',
  './IndexDatatype-65271ba3',
  './VertexFormat-9886cb81'
], function (t, e, a, n, i, r, o, s, m, u, l) {
  'use strict';
  const c = new a.Cartesian3(),
    f = new a.Cartesian3(),
    d = new a.Cartesian3(),
    C = new a.Cartesian3(),
    p = new a.Cartesian3(),
    y = new a.Cartesian3(1, 1, 1),
    _ = Math.cos,
    h = Math.sin;
  function x(t) {
    t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT);
    const e = i.defaultValue(t.radii, y),
      r = i.defaultValue(t.innerRadii, e),
      o = i.defaultValue(t.minimumClock, 0),
      s = i.defaultValue(t.maximumClock, n.CesiumMath.TWO_PI),
      m = i.defaultValue(t.minimumCone, 0),
      u = i.defaultValue(t.maximumCone, n.CesiumMath.PI),
      c = Math.round(i.defaultValue(t.stackPartitions, 64)),
      f = Math.round(i.defaultValue(t.slicePartitions, 64)),
      d = i.defaultValue(t.vertexFormat, l.VertexFormat.DEFAULT);
    (this._radii = a.Cartesian3.clone(e)),
      (this._innerRadii = a.Cartesian3.clone(r)),
      (this._minimumClock = o),
      (this._maximumClock = s),
      (this._minimumCone = m),
      (this._maximumCone = u),
      (this._stackPartitions = c),
      (this._slicePartitions = f),
      (this._vertexFormat = l.VertexFormat.clone(d)),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidGeometry');
  }
  (x.packedLength =
    2 * a.Cartesian3.packedLength + l.VertexFormat.packedLength + 7),
    (x.pack = function (t, e, n) {
      return (
        (n = i.defaultValue(n, 0)),
        a.Cartesian3.pack(t._radii, e, n),
        (n += a.Cartesian3.packedLength),
        a.Cartesian3.pack(t._innerRadii, e, n),
        (n += a.Cartesian3.packedLength),
        l.VertexFormat.pack(t._vertexFormat, e, n),
        (n += l.VertexFormat.packedLength),
        (e[n++] = t._minimumClock),
        (e[n++] = t._maximumClock),
        (e[n++] = t._minimumCone),
        (e[n++] = t._maximumCone),
        (e[n++] = t._stackPartitions),
        (e[n++] = t._slicePartitions),
        (e[n] = i.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  const A = new a.Cartesian3(),
    b = new a.Cartesian3(),
    k = new l.VertexFormat(),
    w = {
      radii: A,
      innerRadii: b,
      vertexFormat: k,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0
    };
  let P;
  (x.unpack = function (t, e, n) {
    e = i.defaultValue(e, 0);
    const r = a.Cartesian3.unpack(t, e, A);
    e += a.Cartesian3.packedLength;
    const o = a.Cartesian3.unpack(t, e, b);
    e += a.Cartesian3.packedLength;
    const s = l.VertexFormat.unpack(t, e, k);
    e += l.VertexFormat.packedLength;
    const m = t[e++],
      u = t[e++],
      c = t[e++],
      f = t[e++],
      d = t[e++],
      C = t[e++],
      p = t[e];
    return i.defined(n)
      ? ((n._radii = a.Cartesian3.clone(r, n._radii)),
        (n._innerRadii = a.Cartesian3.clone(o, n._innerRadii)),
        (n._vertexFormat = l.VertexFormat.clone(s, n._vertexFormat)),
        (n._minimumClock = m),
        (n._maximumClock = u),
        (n._minimumCone = c),
        (n._maximumCone = f),
        (n._stackPartitions = d),
        (n._slicePartitions = C),
        (n._offsetAttribute = -1 === p ? void 0 : p),
        n)
      : ((w.minimumClock = m),
        (w.maximumClock = u),
        (w.minimumCone = c),
        (w.maximumCone = f),
        (w.stackPartitions = d),
        (w.slicePartitions = C),
        (w.offsetAttribute = -1 === p ? void 0 : p),
        new x(w));
  }),
    (x.createGeometry = function (t) {
      const r = t._radii;
      if (r.x <= 0 || r.y <= 0 || r.z <= 0) return;
      const l = t._innerRadii;
      if (l.x <= 0 || l.y <= 0 || l.z <= 0) return;
      const y = t._minimumClock,
        x = t._maximumClock,
        A = t._minimumCone,
        b = t._maximumCone,
        k = t._vertexFormat;
      let w,
        P,
        g = t._slicePartitions + 1,
        v = t._stackPartitions + 1;
      (g = Math.round((g * Math.abs(x - y)) / n.CesiumMath.TWO_PI)),
        (v = Math.round((v * Math.abs(b - A)) / n.CesiumMath.PI)),
        g < 2 && (g = 2),
        v < 2 && (v = 2);
      let F = 0;
      const V = [A],
        M = [y];
      for (w = 0; w < v; w++) V.push(A + (w * (b - A)) / (v - 1));
      for (V.push(b), P = 0; P < g; P++) M.push(y + (P * (x - y)) / (g - 1));
      M.push(x);
      const T = V.length,
        D = M.length;
      let G = 0,
        L = 1;
      const O = l.x !== r.x || l.y !== r.y || l.z !== r.z;
      let I = !1,
        E = !1,
        z = !1;
      O &&
        ((L = 2),
        A > 0 && ((I = !0), (G += g - 1)),
        b < Math.PI && ((E = !0), (G += g - 1)),
        (x - y) % n.CesiumMath.TWO_PI
          ? ((z = !0), (G += 2 * (v - 1) + 1))
          : (G += 1));
      const N = D * T * L,
        R = new Float64Array(3 * N),
        U = new Array(N).fill(!1),
        S = new Array(N).fill(!1),
        B = g * v * L,
        W = 6 * (B + G + 1 - (g + v) * L),
        Y = u.IndexDatatype.createTypedArray(B, W),
        J = k.normal ? new Float32Array(3 * N) : void 0,
        X = k.tangent ? new Float32Array(3 * N) : void 0,
        Z = k.bitangent ? new Float32Array(3 * N) : void 0,
        j = k.st ? new Float32Array(2 * N) : void 0,
        q = new Array(T),
        H = new Array(T);
      for (w = 0; w < T; w++) (q[w] = h(V[w])), (H[w] = _(V[w]));
      const K = new Array(D),
        Q = new Array(D);
      for (P = 0; P < D; P++) (Q[P] = _(M[P])), (K[P] = h(M[P]));
      for (w = 0; w < T; w++)
        for (P = 0; P < D; P++)
          (R[F++] = r.x * q[w] * Q[P]),
            (R[F++] = r.y * q[w] * K[P]),
            (R[F++] = r.z * H[w]);
      let $,
        tt,
        et,
        at,
        nt = N / 2;
      if (O)
        for (w = 0; w < T; w++)
          for (P = 0; P < D; P++)
            (R[F++] = l.x * q[w] * Q[P]),
              (R[F++] = l.y * q[w] * K[P]),
              (R[F++] = l.z * H[w]),
              (U[nt] = !0),
              w > 0 && w !== T - 1 && 0 !== P && P !== D - 1 && (S[nt] = !0),
              nt++;
      for (F = 0, w = 1; w < T - 2; w++)
        for ($ = w * D, tt = (w + 1) * D, P = 1; P < D - 2; P++)
          (Y[F++] = tt + P),
            (Y[F++] = tt + P + 1),
            (Y[F++] = $ + P + 1),
            (Y[F++] = tt + P),
            (Y[F++] = $ + P + 1),
            (Y[F++] = $ + P);
      if (O) {
        const t = T * D;
        for (w = 1; w < T - 2; w++)
          for ($ = t + w * D, tt = t + (w + 1) * D, P = 1; P < D - 2; P++)
            (Y[F++] = tt + P),
              (Y[F++] = $ + P),
              (Y[F++] = $ + P + 1),
              (Y[F++] = tt + P),
              (Y[F++] = $ + P + 1),
              (Y[F++] = tt + P + 1);
      }
      if (O) {
        if (I)
          for (at = T * D, w = 1; w < D - 2; w++)
            (Y[F++] = w),
              (Y[F++] = w + 1),
              (Y[F++] = at + w + 1),
              (Y[F++] = w),
              (Y[F++] = at + w + 1),
              (Y[F++] = at + w);
        if (E)
          for (et = T * D - D, at = T * D * L - D, w = 1; w < D - 2; w++)
            (Y[F++] = et + w + 1),
              (Y[F++] = et + w),
              (Y[F++] = at + w),
              (Y[F++] = et + w + 1),
              (Y[F++] = at + w),
              (Y[F++] = at + w + 1);
      }
      if (z) {
        for (w = 1; w < T - 2; w++)
          (at = D * T + D * w),
            (et = D * w),
            (Y[F++] = at),
            (Y[F++] = et + D),
            (Y[F++] = et),
            (Y[F++] = at),
            (Y[F++] = at + D),
            (Y[F++] = et + D);
        for (w = 1; w < T - 2; w++)
          (at = D * T + D * (w + 1) - 1),
            (et = D * (w + 1) - 1),
            (Y[F++] = et + D),
            (Y[F++] = at),
            (Y[F++] = et),
            (Y[F++] = et + D),
            (Y[F++] = at + D),
            (Y[F++] = at);
      }
      const it = new s.GeometryAttributes();
      k.position &&
        (it.position = new o.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: R
        }));
      let rt = 0,
        ot = 0,
        st = 0,
        mt = 0;
      const ut = N / 2;
      let lt;
      const ct = a.Ellipsoid.fromCartesian3(r),
        ft = a.Ellipsoid.fromCartesian3(l);
      if (k.st || k.normal || k.tangent || k.bitangent) {
        for (w = 0; w < N; w++) {
          lt = U[w] ? ft : ct;
          const t = a.Cartesian3.fromArray(R, 3 * w, c),
            e = lt.geodeticSurfaceNormal(t, f);
          if ((S[w] && a.Cartesian3.negate(e, e), k.st)) {
            const t = a.Cartesian2.negate(e, p);
            (j[rt++] = Math.atan2(t.y, t.x) / n.CesiumMath.TWO_PI + 0.5),
              (j[rt++] = Math.asin(e.z) / Math.PI + 0.5);
          }
          if (
            (k.normal && ((J[ot++] = e.x), (J[ot++] = e.y), (J[ot++] = e.z)),
            k.tangent || k.bitangent)
          ) {
            const t = d;
            let n,
              i = 0;
            if (
              (U[w] && (i = ut),
              (n =
                !I && w >= i && w < i + 2 * D
                  ? a.Cartesian3.UNIT_X
                  : a.Cartesian3.UNIT_Z),
              a.Cartesian3.cross(n, e, t),
              a.Cartesian3.normalize(t, t),
              k.tangent && ((X[st++] = t.x), (X[st++] = t.y), (X[st++] = t.z)),
              k.bitangent)
            ) {
              const n = a.Cartesian3.cross(e, t, C);
              a.Cartesian3.normalize(n, n),
                (Z[mt++] = n.x),
                (Z[mt++] = n.y),
                (Z[mt++] = n.z);
            }
          }
        }
        k.st &&
          (it.st = new o.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: j
          })),
          k.normal &&
            (it.normal = new o.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: J
            })),
          k.tangent &&
            (it.tangent = new o.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: X
            })),
          k.bitangent &&
            (it.bitangent = new o.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: Z
            }));
      }
      if (i.defined(t._offsetAttribute)) {
        const e = R.length,
          a = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1,
          i = new Uint8Array(e / 3).fill(a);
        it.applyOffset = new o.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: i
        });
      }
      return new o.Geometry({
        attributes: it,
        indices: Y,
        primitiveType: o.PrimitiveType.TRIANGLES,
        boundingSphere: e.BoundingSphere.fromEllipsoid(ct),
        offsetAttribute: t._offsetAttribute
      });
    }),
    (x.getUnitEllipsoid = function () {
      return (
        i.defined(P) ||
          (P = x.createGeometry(
            new x({
              radii: new a.Cartesian3(1, 1, 1),
              vertexFormat: l.VertexFormat.POSITION_ONLY
            })
          )),
        P
      );
    }),
    (t.EllipsoidGeometry = x);
});
