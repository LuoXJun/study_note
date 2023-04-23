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
  './ComponentDatatype-e7fbe225',
  './defaultValue-97284df2',
  './EllipseGeometryLibrary-0adcaeed',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryInstance-4bfcfe78',
  './GeometryOffsetAttribute-59b14f45',
  './GeometryPipeline-a847e31f',
  './IndexDatatype-65271ba3',
  './VertexFormat-9886cb81'
], function (t, e, i, r, n, o, a, s, l, u, m, c, p, y) {
  'use strict';
  const d = new i.Cartesian3(),
    f = new i.Cartesian3(),
    A = new i.Cartesian3(),
    x = new i.Cartesian3(),
    h = new i.Cartesian2(),
    g = new i.Matrix3(),
    _ = new i.Matrix3(),
    b = new e.Quaternion(),
    C = new i.Cartesian3(),
    w = new i.Cartesian3(),
    E = new i.Cartesian3(),
    M = new i.Cartographic(),
    I = new i.Cartesian3(),
    T = new i.Cartesian2(),
    G = new i.Cartesian2();
  function N(t, r, u) {
    const c = r.vertexFormat,
      p = r.center,
      y = r.semiMajorAxis,
      x = r.semiMinorAxis,
      N = r.ellipsoid,
      P = r.stRotation,
      v = u ? (t.length / 3) * 2 : t.length / 3,
      V = r.shadowVolume,
      F = c.st ? new Float32Array(2 * v) : void 0,
      D = c.normal ? new Float32Array(3 * v) : void 0,
      O = c.tangent ? new Float32Array(3 * v) : void 0,
      S = c.bitangent ? new Float32Array(3 * v) : void 0,
      L = V ? new Float32Array(3 * v) : void 0;
    let R = 0,
      j = C,
      z = w,
      k = E;
    const B = new e.GeographicProjection(N),
      Y = B.project(N.cartesianToCartographic(p, M), I),
      H = N.scaleToGeodeticSurface(p, d);
    N.geodeticSurfaceNormal(H, H);
    let U = g,
      Q = _;
    if (0 !== P) {
      let t = e.Quaternion.fromAxisAngle(H, P, b);
      (U = i.Matrix3.fromQuaternion(t, U)),
        (t = e.Quaternion.fromAxisAngle(H, -P, b)),
        (Q = i.Matrix3.fromQuaternion(t, Q));
    } else
      (U = i.Matrix3.clone(i.Matrix3.IDENTITY, U)),
        (Q = i.Matrix3.clone(i.Matrix3.IDENTITY, Q));
    const W = i.Cartesian2.fromElements(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        T
      ),
      J = i.Cartesian2.fromElements(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        G
      );
    let q = t.length;
    const Z = u ? q : 0,
      K = (Z / 3) * 2;
    for (let e = 0; e < q; e += 3) {
      const r = e + 1,
        n = e + 2,
        o = i.Cartesian3.fromArray(t, e, d);
      if (c.st) {
        const t = i.Matrix3.multiplyByVector(U, o, f),
          e = B.project(N.cartesianToCartographic(t, M), A);
        i.Cartesian3.subtract(e, Y, e),
          (h.x = (e.x + y) / (2 * y)),
          (h.y = (e.y + x) / (2 * x)),
          (W.x = Math.min(h.x, W.x)),
          (W.y = Math.min(h.y, W.y)),
          (J.x = Math.max(h.x, J.x)),
          (J.y = Math.max(h.y, J.y)),
          u && ((F[R + K] = h.x), (F[R + 1 + K] = h.y)),
          (F[R++] = h.x),
          (F[R++] = h.y);
      }
      (c.normal || c.tangent || c.bitangent || V) &&
        ((j = N.geodeticSurfaceNormal(o, j)),
        V && ((L[e + Z] = -j.x), (L[r + Z] = -j.y), (L[n + Z] = -j.z)),
        (c.normal || c.tangent || c.bitangent) &&
          ((c.tangent || c.bitangent) &&
            ((z = i.Cartesian3.normalize(
              i.Cartesian3.cross(i.Cartesian3.UNIT_Z, j, z),
              z
            )),
            i.Matrix3.multiplyByVector(Q, z, z)),
          c.normal &&
            ((D[e] = j.x),
            (D[r] = j.y),
            (D[n] = j.z),
            u && ((D[e + Z] = -j.x), (D[r + Z] = -j.y), (D[n + Z] = -j.z))),
          c.tangent &&
            ((O[e] = z.x),
            (O[r] = z.y),
            (O[n] = z.z),
            u && ((O[e + Z] = -z.x), (O[r + Z] = -z.y), (O[n + Z] = -z.z))),
          c.bitangent &&
            ((k = i.Cartesian3.normalize(i.Cartesian3.cross(j, z, k), k)),
            (S[e] = k.x),
            (S[r] = k.y),
            (S[n] = k.z),
            u && ((S[e + Z] = k.x), (S[r + Z] = k.y), (S[n + Z] = k.z)))));
    }
    if (c.st) {
      q = F.length;
      for (let t = 0; t < q; t += 2)
        (F[t] = (F[t] - W.x) / (J.x - W.x)),
          (F[t + 1] = (F[t + 1] - W.y) / (J.y - W.y));
    }
    const X = new l.GeometryAttributes();
    if (c.position) {
      const e = a.EllipseGeometryLibrary.raisePositionsToHeight(t, r, u);
      X.position = new s.GeometryAttribute({
        componentDatatype: n.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: e
      });
    }
    if (
      (c.st &&
        (X.st = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: F
        })),
      c.normal &&
        (X.normal = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: D
        })),
      c.tangent &&
        (X.tangent = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: O
        })),
      c.bitangent &&
        (X.bitangent = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: S
        })),
      V &&
        (X.extrudeDirection = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: L
        })),
      u && o.defined(r.offsetAttribute))
    ) {
      let t = new Uint8Array(v);
      if (r.offsetAttribute === m.GeometryOffsetAttribute.TOP)
        t = t.fill(1, 0, v / 2);
      else {
        const e = r.offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1;
        t = t.fill(e);
      }
      X.applyOffset = new s.GeometryAttribute({
        componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: t
      });
    }
    return X;
  }
  function P(t) {
    const e = new Array(t * (t + 1) * 12 - 6);
    let i,
      r,
      n,
      o,
      a,
      s = 0;
    for (i = 0, n = 1, o = 0; o < 3; o++)
      (e[s++] = n++), (e[s++] = i), (e[s++] = n);
    for (o = 2; o < t + 1; ++o) {
      for (
        n = o * (o + 1) - 1,
          i = (o - 1) * o - 1,
          e[s++] = n++,
          e[s++] = i,
          e[s++] = n,
          r = 2 * o,
          a = 0;
        a < r - 1;
        ++a
      )
        (e[s++] = n),
          (e[s++] = i++),
          (e[s++] = i),
          (e[s++] = n++),
          (e[s++] = i),
          (e[s++] = n);
      (e[s++] = n++), (e[s++] = i), (e[s++] = n);
    }
    for (r = 2 * t, ++n, ++i, o = 0; o < r - 1; ++o)
      (e[s++] = n),
        (e[s++] = i++),
        (e[s++] = i),
        (e[s++] = n++),
        (e[s++] = i),
        (e[s++] = n);
    for (
      e[s++] = n,
        e[s++] = i++,
        e[s++] = i,
        e[s++] = n++,
        e[s++] = i++,
        e[s++] = i,
        ++i,
        o = t - 1;
      o > 1;
      --o
    ) {
      for (
        e[s++] = i++, e[s++] = i, e[s++] = n, r = 2 * o, a = 0;
        a < r - 1;
        ++a
      )
        (e[s++] = n),
          (e[s++] = i++),
          (e[s++] = i),
          (e[s++] = n++),
          (e[s++] = i),
          (e[s++] = n);
      (e[s++] = i++), (e[s++] = i++), (e[s++] = n++);
    }
    for (o = 0; o < 3; o++) (e[s++] = i++), (e[s++] = i), (e[s++] = n);
    return e;
  }
  let v = new i.Cartesian3();
  const V = new e.BoundingSphere(),
    F = new e.BoundingSphere();
  function D(t) {
    const r = t.center,
      y = t.ellipsoid,
      _ = t.semiMajorAxis;
    let v = i.Cartesian3.multiplyByScalar(
      y.geodeticSurfaceNormal(r, d),
      t.height,
      d
    );
    (V.center = i.Cartesian3.add(r, v, V.center)),
      (V.radius = _),
      (v = i.Cartesian3.multiplyByScalar(
        y.geodeticSurfaceNormal(r, v),
        t.extrudedHeight,
        v
      )),
      (F.center = i.Cartesian3.add(r, v, F.center)),
      (F.radius = _);
    const D = a.EllipseGeometryLibrary.computeEllipsePositions(t, !0, !0),
      O = D.positions,
      S = D.numPts,
      L = D.outerPositions,
      R = e.BoundingSphere.union(V, F),
      j = N(O, t, !0);
    let z = P(S);
    const k = z.length;
    z.length = 2 * k;
    const B = O.length / 3;
    for (let t = 0; t < k; t += 3)
      (z[t + k] = z[t + 2] + B),
        (z[t + 1 + k] = z[t + 1] + B),
        (z[t + 2 + k] = z[t] + B);
    const Y = p.IndexDatatype.createTypedArray((2 * B) / 3, z),
      H = new s.Geometry({
        attributes: j,
        indices: Y,
        primitiveType: s.PrimitiveType.TRIANGLES
      }),
      U = (function (t, r) {
        const a = r.vertexFormat,
          u = r.center,
          c = r.semiMajorAxis,
          p = r.semiMinorAxis,
          y = r.ellipsoid,
          _ = r.height,
          N = r.extrudedHeight,
          P = r.stRotation,
          v = (t.length / 3) * 2,
          V = new Float64Array(3 * v),
          F = a.st ? new Float32Array(2 * v) : void 0,
          D = a.normal ? new Float32Array(3 * v) : void 0,
          O = a.tangent ? new Float32Array(3 * v) : void 0,
          S = a.bitangent ? new Float32Array(3 * v) : void 0,
          L = r.shadowVolume,
          R = L ? new Float32Array(3 * v) : void 0;
        let j = 0,
          z = C,
          k = w,
          B = E;
        const Y = new e.GeographicProjection(y),
          H = Y.project(y.cartesianToCartographic(u, M), I),
          U = y.scaleToGeodeticSurface(u, d);
        y.geodeticSurfaceNormal(U, U);
        const Q = e.Quaternion.fromAxisAngle(U, P, b),
          W = i.Matrix3.fromQuaternion(Q, g),
          J = i.Cartesian2.fromElements(
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            T
          ),
          q = i.Cartesian2.fromElements(
            Number.NEGATIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
            G
          );
        let Z = t.length;
        const K = (Z / 3) * 2;
        for (let e = 0; e < Z; e += 3) {
          const r = e + 1,
            n = e + 2;
          let o,
            s = i.Cartesian3.fromArray(t, e, d);
          if (a.st) {
            const t = i.Matrix3.multiplyByVector(W, s, f),
              e = Y.project(y.cartesianToCartographic(t, M), A);
            i.Cartesian3.subtract(e, H, e),
              (h.x = (e.x + c) / (2 * c)),
              (h.y = (e.y + p) / (2 * p)),
              (J.x = Math.min(h.x, J.x)),
              (J.y = Math.min(h.y, J.y)),
              (q.x = Math.max(h.x, q.x)),
              (q.y = Math.max(h.y, q.y)),
              (F[j + K] = h.x),
              (F[j + 1 + K] = h.y),
              (F[j++] = h.x),
              (F[j++] = h.y);
          }
          (s = y.scaleToGeodeticSurface(s, s)),
            (o = i.Cartesian3.clone(s, f)),
            (z = y.geodeticSurfaceNormal(s, z)),
            L && ((R[e + Z] = -z.x), (R[r + Z] = -z.y), (R[n + Z] = -z.z));
          let l = i.Cartesian3.multiplyByScalar(z, _, x);
          if (
            ((s = i.Cartesian3.add(s, l, s)),
            (l = i.Cartesian3.multiplyByScalar(z, N, l)),
            (o = i.Cartesian3.add(o, l, o)),
            a.position &&
              ((V[e + Z] = o.x),
              (V[r + Z] = o.y),
              (V[n + Z] = o.z),
              (V[e] = s.x),
              (V[r] = s.y),
              (V[n] = s.z)),
            a.normal || a.tangent || a.bitangent)
          ) {
            B = i.Cartesian3.clone(z, B);
            const l = i.Cartesian3.fromArray(t, (e + 3) % Z, x);
            i.Cartesian3.subtract(l, s, l);
            const u = i.Cartesian3.subtract(o, s, A);
            (z = i.Cartesian3.normalize(i.Cartesian3.cross(u, l, z), z)),
              a.normal &&
                ((D[e] = z.x),
                (D[r] = z.y),
                (D[n] = z.z),
                (D[e + Z] = z.x),
                (D[r + Z] = z.y),
                (D[n + Z] = z.z)),
              a.tangent &&
                ((k = i.Cartesian3.normalize(i.Cartesian3.cross(B, z, k), k)),
                (O[e] = k.x),
                (O[r] = k.y),
                (O[n] = k.z),
                (O[e + Z] = k.x),
                (O[e + 1 + Z] = k.y),
                (O[e + 2 + Z] = k.z)),
              a.bitangent &&
                ((S[e] = B.x),
                (S[r] = B.y),
                (S[n] = B.z),
                (S[e + Z] = B.x),
                (S[r + Z] = B.y),
                (S[n + Z] = B.z));
          }
        }
        if (a.st) {
          Z = F.length;
          for (let t = 0; t < Z; t += 2)
            (F[t] = (F[t] - J.x) / (q.x - J.x)),
              (F[t + 1] = (F[t + 1] - J.y) / (q.y - J.y));
        }
        const X = new l.GeometryAttributes();
        if (
          (a.position &&
            (X.position = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: V
            })),
          a.st &&
            (X.st = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: F
            })),
          a.normal &&
            (X.normal = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: D
            })),
          a.tangent &&
            (X.tangent = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: O
            })),
          a.bitangent &&
            (X.bitangent = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: S
            })),
          L &&
            (X.extrudeDirection = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: R
            })),
          o.defined(r.offsetAttribute))
        ) {
          let t = new Uint8Array(v);
          if (r.offsetAttribute === m.GeometryOffsetAttribute.TOP)
            t = t.fill(1, 0, v / 2);
          else {
            const e =
              r.offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1;
            t = t.fill(e);
          }
          X.applyOffset = new s.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: t
          });
        }
        return X;
      })(L, t);
    z = (function (t) {
      const e = t.length / 3,
        i = p.IndexDatatype.createTypedArray(e, 6 * e);
      let r = 0;
      for (let t = 0; t < e; t++) {
        const n = t,
          o = t + e,
          a = (n + 1) % e,
          s = a + e;
        (i[r++] = n),
          (i[r++] = o),
          (i[r++] = a),
          (i[r++] = a),
          (i[r++] = o),
          (i[r++] = s);
      }
      return i;
    })(L);
    const Q = p.IndexDatatype.createTypedArray((2 * L.length) / 3, z),
      W = new s.Geometry({
        attributes: U,
        indices: Q,
        primitiveType: s.PrimitiveType.TRIANGLES
      }),
      J = c.GeometryPipeline.combineInstances([
        new u.GeometryInstance({ geometry: H }),
        new u.GeometryInstance({ geometry: W })
      ]);
    return {
      boundingSphere: R,
      attributes: J[0].attributes,
      indices: J[0].indices
    };
  }
  function O(t, e, r, o, s, l, u) {
    const m = a.EllipseGeometryLibrary.computeEllipsePositions(
        {
          center: t,
          semiMajorAxis: e,
          semiMinorAxis: r,
          rotation: o,
          granularity: s
        },
        !1,
        !0
      ).outerPositions,
      c = m.length / 3,
      p = new Array(c);
    for (let t = 0; t < c; ++t) p[t] = i.Cartesian3.fromArray(m, 3 * t);
    const y = i.Rectangle.fromCartesianArray(p, l, u);
    return (
      y.width > n.CesiumMath.PI &&
        ((y.north =
          y.north > 0
            ? n.CesiumMath.PI_OVER_TWO - n.CesiumMath.EPSILON7
            : y.north),
        (y.south =
          y.south < 0
            ? n.CesiumMath.EPSILON7 - n.CesiumMath.PI_OVER_TWO
            : y.south),
        (y.east = n.CesiumMath.PI),
        (y.west = -n.CesiumMath.PI)),
      y
    );
  }
  function S(t) {
    const e = (t = o.defaultValue(t, o.defaultValue.EMPTY_OBJECT)).center,
      r = o.defaultValue(t.ellipsoid, i.Ellipsoid.WGS84),
      a = t.semiMajorAxis,
      s = t.semiMinorAxis,
      l = o.defaultValue(t.granularity, n.CesiumMath.RADIANS_PER_DEGREE),
      u = o.defaultValue(t.vertexFormat, y.VertexFormat.DEFAULT),
      m = o.defaultValue(t.height, 0),
      c = o.defaultValue(t.extrudedHeight, m);
    (this._center = i.Cartesian3.clone(e)),
      (this._semiMajorAxis = a),
      (this._semiMinorAxis = s),
      (this._ellipsoid = i.Ellipsoid.clone(r)),
      (this._rotation = o.defaultValue(t.rotation, 0)),
      (this._stRotation = o.defaultValue(t.stRotation, 0)),
      (this._height = Math.max(c, m)),
      (this._granularity = l),
      (this._vertexFormat = y.VertexFormat.clone(u)),
      (this._extrudedHeight = Math.min(c, m)),
      (this._shadowVolume = o.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createEllipseGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (S.packedLength =
    i.Cartesian3.packedLength +
    i.Ellipsoid.packedLength +
    y.VertexFormat.packedLength +
    9),
    (S.pack = function (t, e, r) {
      return (
        (r = o.defaultValue(r, 0)),
        i.Cartesian3.pack(t._center, e, r),
        (r += i.Cartesian3.packedLength),
        i.Ellipsoid.pack(t._ellipsoid, e, r),
        (r += i.Ellipsoid.packedLength),
        y.VertexFormat.pack(t._vertexFormat, e, r),
        (r += y.VertexFormat.packedLength),
        (e[r++] = t._semiMajorAxis),
        (e[r++] = t._semiMinorAxis),
        (e[r++] = t._rotation),
        (e[r++] = t._stRotation),
        (e[r++] = t._height),
        (e[r++] = t._granularity),
        (e[r++] = t._extrudedHeight),
        (e[r++] = t._shadowVolume ? 1 : 0),
        (e[r] = o.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  const L = new i.Cartesian3(),
    R = new i.Ellipsoid(),
    j = new y.VertexFormat(),
    z = {
      center: L,
      ellipsoid: R,
      vertexFormat: j,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      stRotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0
    };
  (S.unpack = function (t, e, r) {
    e = o.defaultValue(e, 0);
    const n = i.Cartesian3.unpack(t, e, L);
    e += i.Cartesian3.packedLength;
    const a = i.Ellipsoid.unpack(t, e, R);
    e += i.Ellipsoid.packedLength;
    const s = y.VertexFormat.unpack(t, e, j);
    e += y.VertexFormat.packedLength;
    const l = t[e++],
      u = t[e++],
      m = t[e++],
      c = t[e++],
      p = t[e++],
      d = t[e++],
      f = t[e++],
      A = 1 === t[e++],
      x = t[e];
    return o.defined(r)
      ? ((r._center = i.Cartesian3.clone(n, r._center)),
        (r._ellipsoid = i.Ellipsoid.clone(a, r._ellipsoid)),
        (r._vertexFormat = y.VertexFormat.clone(s, r._vertexFormat)),
        (r._semiMajorAxis = l),
        (r._semiMinorAxis = u),
        (r._rotation = m),
        (r._stRotation = c),
        (r._height = p),
        (r._granularity = d),
        (r._extrudedHeight = f),
        (r._shadowVolume = A),
        (r._offsetAttribute = -1 === x ? void 0 : x),
        r)
      : ((z.height = p),
        (z.extrudedHeight = f),
        (z.granularity = d),
        (z.stRotation = c),
        (z.rotation = m),
        (z.semiMajorAxis = l),
        (z.semiMinorAxis = u),
        (z.shadowVolume = A),
        (z.offsetAttribute = -1 === x ? void 0 : x),
        new S(z));
  }),
    (S.computeRectangle = function (t, e) {
      const r = (t = o.defaultValue(t, o.defaultValue.EMPTY_OBJECT)).center,
        a = o.defaultValue(t.ellipsoid, i.Ellipsoid.WGS84),
        s = t.semiMajorAxis,
        l = t.semiMinorAxis,
        u = o.defaultValue(t.granularity, n.CesiumMath.RADIANS_PER_DEGREE);
      return O(r, s, l, o.defaultValue(t.rotation, 0), u, a, e);
    }),
    (S.createGeometry = function (t) {
      if (t._semiMajorAxis <= 0 || t._semiMinorAxis <= 0) return;
      const r = t._height,
        l = t._extrudedHeight,
        u = !n.CesiumMath.equalsEpsilon(r, l, 0, n.CesiumMath.EPSILON2);
      t._center = t._ellipsoid.scaleToGeodeticSurface(t._center, t._center);
      const c = {
        center: t._center,
        semiMajorAxis: t._semiMajorAxis,
        semiMinorAxis: t._semiMinorAxis,
        ellipsoid: t._ellipsoid,
        rotation: t._rotation,
        height: r,
        granularity: t._granularity,
        vertexFormat: t._vertexFormat,
        stRotation: t._stRotation
      };
      let y;
      if (u)
        (c.extrudedHeight = l),
          (c.shadowVolume = t._shadowVolume),
          (c.offsetAttribute = t._offsetAttribute),
          (y = D(c));
      else if (
        ((y = (function (t) {
          const r = t.center;
          (v = i.Cartesian3.multiplyByScalar(
            t.ellipsoid.geodeticSurfaceNormal(r, v),
            t.height,
            v
          )),
            (v = i.Cartesian3.add(r, v, v));
          const n = new e.BoundingSphere(v, t.semiMajorAxis),
            o = a.EllipseGeometryLibrary.computeEllipsePositions(t, !0, !1),
            s = o.positions,
            l = o.numPts,
            u = N(s, t, !1);
          let m = P(l);
          return (
            (m = p.IndexDatatype.createTypedArray(s.length / 3, m)),
            { boundingSphere: n, attributes: u, indices: m }
          );
        })(c)),
        o.defined(t._offsetAttribute))
      ) {
        const e = y.attributes.position.values.length,
          i = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1,
          r = new Uint8Array(e / 3).fill(i);
        y.attributes.applyOffset = new s.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: r
        });
      }
      return new s.Geometry({
        attributes: y.attributes,
        indices: y.indices,
        primitiveType: s.PrimitiveType.TRIANGLES,
        boundingSphere: y.boundingSphere,
        offsetAttribute: t._offsetAttribute
      });
    }),
    (S.createShadowVolume = function (t, e, i) {
      const r = t._granularity,
        n = t._ellipsoid,
        o = e(r, n),
        a = i(r, n);
      return new S({
        center: t._center,
        semiMajorAxis: t._semiMajorAxis,
        semiMinorAxis: t._semiMinorAxis,
        ellipsoid: n,
        rotation: t._rotation,
        stRotation: t._stRotation,
        granularity: r,
        extrudedHeight: o,
        height: a,
        vertexFormat: y.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      });
    }),
    Object.defineProperties(S.prototype, {
      rectangle: {
        get: function () {
          return (
            o.defined(this._rectangle) ||
              (this._rectangle = O(
                this._center,
                this._semiMajorAxis,
                this._semiMinorAxis,
                this._rotation,
                this._granularity,
                this._ellipsoid
              )),
            this._rectangle
          );
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            o.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                const e = -t._stRotation;
                if (0 === e) return [0, 0, 0, 1, 1, 0];
                const r = a.EllipseGeometryLibrary.computeEllipsePositions(
                    {
                      center: t._center,
                      semiMajorAxis: t._semiMajorAxis,
                      semiMinorAxis: t._semiMinorAxis,
                      rotation: t._rotation,
                      granularity: t._granularity
                    },
                    !1,
                    !0
                  ).outerPositions,
                  n = r.length / 3,
                  o = new Array(n);
                for (let t = 0; t < n; ++t)
                  o[t] = i.Cartesian3.fromArray(r, 3 * t);
                const l = t._ellipsoid,
                  u = t.rectangle;
                return s.Geometry._textureCoordinateRotationPoints(o, e, l, u);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        }
      }
    }),
    (t.EllipseGeometry = S);
});
