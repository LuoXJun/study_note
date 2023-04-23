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
  './BoundingRectangle-2b0ebbdd',
  './Transforms-d3d3b2a9',
  './RuntimeError-4f8ec8a2',
  './ComponentDatatype-e7fbe225',
  './EllipsoidGeodesic-ed8a0e40',
  './EllipsoidTangentPlane-7ae496b2',
  './GeometryAttribute-fd1d7e90',
  './GeometryInstance-4bfcfe78',
  './GeometryOffsetAttribute-59b14f45',
  './GeometryPipeline-a847e31f',
  './IndexDatatype-65271ba3',
  './PolygonGeometryLibrary-0f0c78d4',
  './PolygonPipeline-00dc0c6e',
  './VertexFormat-9886cb81',
  './_commonjsHelpers-3aae1032-65601a27',
  './combine-d11b1f00',
  './WebGLConstants-6da700a2',
  './AxisAlignedBoundingBox-b1c095aa',
  './IntersectionTests-33ace2d6',
  './Plane-e916220d',
  './AttributeCompression-5744d52e',
  './EncodedCartesian3-a9a8a281',
  './arrayRemoveDuplicates-6f91355d',
  './EllipsoidRhumbLine-60f14314',
  './GeometryAttributes-734a3446'
], function (
  e,
  t,
  o,
  r,
  i,
  n,
  a,
  s,
  l,
  u,
  c,
  d,
  p,
  y,
  m,
  g,
  h,
  f,
  b,
  _,
  P,
  C,
  x,
  w,
  T,
  I,
  A,
  v
) {
  'use strict';
  const E = new t.Cartographic(),
    G = new t.Cartographic();
  function O(e, t, o, r) {
    const i = r.cartesianToCartographic(e, E).height,
      n = r.cartesianToCartographic(t, G);
    (n.height = i), r.cartographicToCartesian(n, t);
    const a = r.cartesianToCartographic(o, G);
    (a.height = i - 100), r.cartographicToCartesian(a, o);
  }
  const L = new r.BoundingRectangle(),
    V = new t.Cartesian3(),
    H = new t.Cartesian3(),
    D = new t.Cartesian3(),
    N = new t.Cartesian3(),
    F = new t.Cartesian3(),
    R = new t.Cartesian3();
  let M = new t.Cartesian3(),
    S = new t.Cartesian3(),
    B = new t.Cartesian3();
  const k = new t.Cartesian2(),
    z = new t.Cartesian2(),
    W = new t.Cartesian3(),
    Y = new i.Quaternion(),
    U = new t.Matrix3(),
    j = new t.Matrix3();
  function Q(o) {
    const r = o.vertexFormat,
      n = o.geometry,
      s = o.shadowVolume,
      l = n.attributes.position.values,
      c = e.defined(n.attributes.st) ? n.attributes.st.values : void 0;
    let p = l.length;
    const y = o.wall,
      m = o.top || y,
      g = o.bottom || y;
    if (r.st || r.normal || r.tangent || r.bitangent || s) {
      const d = o.boundingRectangle,
        h = o.tangentPlane,
        f = o.ellipsoid,
        b = o.stRotation,
        _ = o.perPositionHeight,
        P = k;
      (P.x = d.x), (P.y = d.y);
      const C = r.st ? new Float32Array((p / 3) * 2) : void 0;
      let x;
      r.normal &&
        (x = _ && m && !y ? n.attributes.normal.values : new Float32Array(p));
      const w = r.tangent ? new Float32Array(p) : void 0,
        T = r.bitangent ? new Float32Array(p) : void 0,
        I = s ? new Float32Array(p) : void 0;
      let A = 0,
        v = 0,
        E = H,
        G = D,
        L = N,
        Q = !0,
        q = U,
        K = j;
      if (0 !== b) {
        let e = i.Quaternion.fromAxisAngle(h._plane.normal, b, Y);
        (q = t.Matrix3.fromQuaternion(e, q)),
          (e = i.Quaternion.fromAxisAngle(h._plane.normal, -b, Y)),
          (K = t.Matrix3.fromQuaternion(e, K));
      } else
        (q = t.Matrix3.clone(t.Matrix3.IDENTITY, q)),
          (K = t.Matrix3.clone(t.Matrix3.IDENTITY, K));
      let Z = 0,
        J = 0;
      m && g && ((Z = p / 2), (J = p / 3), (p /= 2));
      for (let i = 0; i < p; i += 3) {
        const n = t.Cartesian3.fromArray(l, i, W);
        if (r.st && !e.defined(c)) {
          let e = t.Matrix3.multiplyByVector(q, n, V);
          e = f.scaleToGeodeticSurface(e, e);
          const o = h.projectPointOntoPlane(e, z);
          t.Cartesian2.subtract(o, P, o);
          const r = a.CesiumMath.clamp(o.x / d.width, 0, 1),
            i = a.CesiumMath.clamp(o.y / d.height, 0, 1);
          g && ((C[A + J] = r), (C[A + 1 + J] = i)),
            m && ((C[A] = r), (C[A + 1] = i)),
            (A += 2);
        }
        if (r.normal || r.tangent || r.bitangent || s) {
          const e = v + 1,
            u = v + 2;
          if (y) {
            if (i + 3 < p) {
              const e = t.Cartesian3.fromArray(l, i + 3, F);
              if (Q) {
                const o = t.Cartesian3.fromArray(l, i + p, R);
                _ && O(n, e, o, f),
                  t.Cartesian3.subtract(e, n, e),
                  t.Cartesian3.subtract(o, n, o),
                  (E = t.Cartesian3.normalize(t.Cartesian3.cross(o, e, E), E)),
                  (Q = !1);
              }
              t.Cartesian3.equalsEpsilon(e, n, a.CesiumMath.EPSILON10) &&
                (Q = !0);
            }
            (r.tangent || r.bitangent) &&
              ((L = f.geodeticSurfaceNormal(n, L)),
              r.tangent &&
                (G = t.Cartesian3.normalize(t.Cartesian3.cross(L, E, G), G)));
          } else
            (E = f.geodeticSurfaceNormal(n, E)),
              (r.tangent || r.bitangent) &&
                (_ &&
                  ((M = t.Cartesian3.fromArray(x, v, M)),
                  (S = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, M, S)),
                  (S = t.Cartesian3.normalize(
                    t.Matrix3.multiplyByVector(K, S, S),
                    S
                  )),
                  r.bitangent &&
                    (B = t.Cartesian3.normalize(
                      t.Cartesian3.cross(M, S, B),
                      B
                    ))),
                (G = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, E, G)),
                (G = t.Cartesian3.normalize(
                  t.Matrix3.multiplyByVector(K, G, G),
                  G
                )),
                r.bitangent &&
                  (L = t.Cartesian3.normalize(t.Cartesian3.cross(E, G, L), L)));
          r.normal &&
            (o.wall
              ? ((x[v + Z] = E.x), (x[e + Z] = E.y), (x[u + Z] = E.z))
              : g && ((x[v + Z] = -E.x), (x[e + Z] = -E.y), (x[u + Z] = -E.z)),
            ((m && !_) || y) && ((x[v] = E.x), (x[e] = E.y), (x[u] = E.z))),
            s &&
              (y && (E = f.geodeticSurfaceNormal(n, E)),
              (I[v + Z] = -E.x),
              (I[e + Z] = -E.y),
              (I[u + Z] = -E.z)),
            r.tangent &&
              (o.wall
                ? ((w[v + Z] = G.x), (w[e + Z] = G.y), (w[u + Z] = G.z))
                : g &&
                  ((w[v + Z] = -G.x), (w[e + Z] = -G.y), (w[u + Z] = -G.z)),
              m &&
                (_
                  ? ((w[v] = S.x), (w[e] = S.y), (w[u] = S.z))
                  : ((w[v] = G.x), (w[e] = G.y), (w[u] = G.z)))),
            r.bitangent &&
              (g && ((T[v + Z] = L.x), (T[e + Z] = L.y), (T[u + Z] = L.z)),
              m &&
                (_
                  ? ((T[v] = B.x), (T[e] = B.y), (T[u] = B.z))
                  : ((T[v] = L.x), (T[e] = L.y), (T[u] = L.z)))),
            (v += 3);
        }
      }
      r.st &&
        !e.defined(c) &&
        (n.attributes.st = new u.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: C
        })),
        r.normal &&
          (n.attributes.normal = new u.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: x
          })),
        r.tangent &&
          (n.attributes.tangent = new u.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: w
          })),
        r.bitangent &&
          (n.attributes.bitangent = new u.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: T
          })),
        s &&
          (n.attributes.extrudeDirection = new u.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: I
          }));
    }
    if (o.extrude && e.defined(o.offsetAttribute)) {
      const e = l.length / 3;
      let t = new Uint8Array(e);
      if (o.offsetAttribute === d.GeometryOffsetAttribute.TOP)
        (m && g) || y ? (t = t.fill(1, 0, e / 2)) : m && (t = t.fill(1));
      else {
        const e = o.offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1;
        t = t.fill(e);
      }
      n.attributes.applyOffset = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: t
      });
    }
    return n;
  }
  const q = new t.Cartographic(),
    K = new t.Cartographic(),
    Z = { westOverIDL: 0, eastOverIDL: 0 };
  let J = new s.EllipsoidGeodesic();
  function X(r, i, n, l, u) {
    if (
      ((u = e.defaultValue(u, new t.Rectangle())),
      !e.defined(r) || r.length < 3)
    )
      return (u.west = 0), (u.north = 0), (u.south = 0), (u.east = 0), u;
    if (n === o.ArcType.RHUMB) return t.Rectangle.fromCartesianArray(r, i, u);
    J.ellipsoid.equals(i) || (J = new s.EllipsoidGeodesic(void 0, void 0, i)),
      (u.west = Number.POSITIVE_INFINITY),
      (u.east = Number.NEGATIVE_INFINITY),
      (u.south = Number.POSITIVE_INFINITY),
      (u.north = Number.NEGATIVE_INFINITY),
      (Z.westOverIDL = Number.POSITIVE_INFINITY),
      (Z.eastOverIDL = Number.NEGATIVE_INFINITY);
    const c = 1 / a.CesiumMath.chordLength(l, i.maximumRadius),
      d = r.length;
    let p,
      y = i.cartesianToCartographic(r[0], K),
      m = q;
    for (let e = 1; e < d; e++)
      (p = m),
        (m = y),
        (y = i.cartesianToCartographic(r[e], p)),
        J.setEndPoints(m, y),
        ee(J, c, u, Z);
    return (
      (p = m),
      (m = y),
      (y = i.cartesianToCartographic(r[0], p)),
      J.setEndPoints(m, y),
      ee(J, c, u, Z),
      u.east - u.west > Z.eastOverIDL - Z.westOverIDL &&
        ((u.west = Z.westOverIDL),
        (u.east = Z.eastOverIDL),
        u.east > a.CesiumMath.PI && (u.east = u.east - a.CesiumMath.TWO_PI),
        u.west > a.CesiumMath.PI && (u.west = u.west - a.CesiumMath.TWO_PI)),
      u
    );
  }
  const $ = new t.Cartographic();
  function ee(e, t, o, r) {
    const i = e.surfaceDistance,
      n = Math.ceil(i * t),
      s = n > 0 ? i / (n - 1) : Number.POSITIVE_INFINITY;
    let l = 0;
    for (let t = 0; t < n; t++) {
      const t = e.interpolateUsingSurfaceDistance(l, $);
      l += s;
      const i = t.longitude,
        n = t.latitude;
      (o.west = Math.min(o.west, i)),
        (o.east = Math.max(o.east, i)),
        (o.south = Math.min(o.south, n)),
        (o.north = Math.max(o.north, n));
      const u = i >= 0 ? i : i + a.CesiumMath.TWO_PI;
      (r.westOverIDL = Math.min(r.westOverIDL, u)),
        (r.eastOverIDL = Math.max(r.eastOverIDL, u));
    }
  }
  const te = [];
  function oe(t, o, r, i, n, a, s, u, d, p) {
    const h = { walls: [] };
    let f;
    if (s || u) {
      const n = m.PolygonGeometryLibrary.createGeometryFromPositions(
          t,
          o,
          r,
          i,
          a,
          d,
          p
        ),
        l = n.attributes.position.values,
        g = n.indices;
      let b, _;
      if (s && u) {
        const t = l.concat(l);
        (b = t.length / 3),
          (_ = y.IndexDatatype.createTypedArray(b, 2 * g.length)),
          _.set(g);
        const o = g.length,
          i = b / 2;
        for (f = 0; f < o; f += 3) {
          const e = _[f] + i,
            t = _[f + 1] + i,
            r = _[f + 2] + i;
          (_[f + o] = r), (_[f + 1 + o] = t), (_[f + 2 + o] = e);
        }
        if (((n.attributes.position.values = t), a && d.normal)) {
          const e = n.attributes.normal.values;
          (n.attributes.normal.values = new Float32Array(t.length)),
            n.attributes.normal.values.set(e);
        }
        if (d.st && e.defined(r)) {
          const e = n.attributes.st.values;
          (n.attributes.st.values = new Float32Array(2 * b)),
            (n.attributes.st.values = e.concat(e));
        }
        n.indices = _;
      } else if (u) {
        for (
          b = l.length / 3,
            _ = y.IndexDatatype.createTypedArray(b, g.length),
            f = 0;
          f < g.length;
          f += 3
        )
          (_[f] = g[f + 2]), (_[f + 1] = g[f + 1]), (_[f + 2] = g[f]);
        n.indices = _;
      }
      h.topAndBottom = new c.GeometryInstance({ geometry: n });
    }
    let b = n.outerRing,
      _ = l.EllipsoidTangentPlane.fromPoints(b, t),
      P = _.projectPointsOntoPlane(b, te),
      C = g.PolygonPipeline.computeWindingOrder2D(P);
    C === g.WindingOrder.CLOCKWISE && (b = b.slice().reverse());
    let x = m.PolygonGeometryLibrary.computeWallGeometry(b, r, t, i, a, p);
    h.walls.push(new c.GeometryInstance({ geometry: x }));
    const w = n.holes;
    for (f = 0; f < w.length; f++) {
      let e = w[f];
      (_ = l.EllipsoidTangentPlane.fromPoints(e, t)),
        (P = _.projectPointsOntoPlane(e, te)),
        (C = g.PolygonPipeline.computeWindingOrder2D(P)),
        C === g.WindingOrder.COUNTER_CLOCKWISE && (e = e.slice().reverse()),
        (x = m.PolygonGeometryLibrary.computeWallGeometry(e, r, t, i, a, p)),
        h.walls.push(new c.GeometryInstance({ geometry: x }));
    }
    return h;
  }
  function re(r) {
    const i = r.polygonHierarchy,
      n = e.defaultValue(r.vertexFormat, h.VertexFormat.DEFAULT),
      s = e.defaultValue(r.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(r.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
      u = e.defaultValue(r.stRotation, 0),
      c = r.textureCoordinates,
      d = e.defaultValue(r.perPositionHeight, !1),
      p = d && e.defined(r.extrudedHeight);
    let y = e.defaultValue(r.height, 0),
      g = e.defaultValue(r.extrudedHeight, y);
    if (!p) {
      const e = Math.max(y, g);
      (g = Math.min(y, g)), (y = e);
    }
    (this._vertexFormat = h.VertexFormat.clone(n)),
      (this._ellipsoid = t.Ellipsoid.clone(s)),
      (this._granularity = l),
      (this._stRotation = u),
      (this._height = y),
      (this._extrudedHeight = g),
      (this._closeTop = e.defaultValue(r.closeTop, !0)),
      (this._closeBottom = e.defaultValue(r.closeBottom, !0)),
      (this._polygonHierarchy = i),
      (this._perPositionHeight = d),
      (this._perPositionHeightExtrude = p),
      (this._shadowVolume = e.defaultValue(r.shadowVolume, !1)),
      (this._workerName = 'createPolygonGeometry'),
      (this._offsetAttribute = r.offsetAttribute),
      (this._arcType = e.defaultValue(r.arcType, o.ArcType.GEODESIC)),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0),
      (this._textureCoordinates = c),
      (this.packedLength =
        m.PolygonGeometryLibrary.computeHierarchyPackedLength(i, t.Cartesian3) +
        t.Ellipsoid.packedLength +
        h.VertexFormat.packedLength +
        (c
          ? m.PolygonGeometryLibrary.computeHierarchyPackedLength(
              c,
              t.Cartesian2
            )
          : 1) +
        12);
  }
  (re.fromPositions = function (t) {
    return new re({
      polygonHierarchy: {
        positions: (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT))
          .positions
      },
      height: t.height,
      extrudedHeight: t.extrudedHeight,
      vertexFormat: t.vertexFormat,
      stRotation: t.stRotation,
      ellipsoid: t.ellipsoid,
      granularity: t.granularity,
      perPositionHeight: t.perPositionHeight,
      closeTop: t.closeTop,
      closeBottom: t.closeBottom,
      offsetAttribute: t.offsetAttribute,
      arcType: t.arcType,
      textureCoordinates: t.textureCoordinates
    });
  }),
    (re.pack = function (o, r, i) {
      return (
        (i = e.defaultValue(i, 0)),
        (i = m.PolygonGeometryLibrary.packPolygonHierarchy(
          o._polygonHierarchy,
          r,
          i,
          t.Cartesian3
        )),
        t.Ellipsoid.pack(o._ellipsoid, r, i),
        (i += t.Ellipsoid.packedLength),
        h.VertexFormat.pack(o._vertexFormat, r, i),
        (i += h.VertexFormat.packedLength),
        (r[i++] = o._height),
        (r[i++] = o._extrudedHeight),
        (r[i++] = o._granularity),
        (r[i++] = o._stRotation),
        (r[i++] = o._perPositionHeightExtrude ? 1 : 0),
        (r[i++] = o._perPositionHeight ? 1 : 0),
        (r[i++] = o._closeTop ? 1 : 0),
        (r[i++] = o._closeBottom ? 1 : 0),
        (r[i++] = o._shadowVolume ? 1 : 0),
        (r[i++] = e.defaultValue(o._offsetAttribute, -1)),
        (r[i++] = o._arcType),
        e.defined(o._textureCoordinates)
          ? (i = m.PolygonGeometryLibrary.packPolygonHierarchy(
              o._textureCoordinates,
              r,
              i,
              t.Cartesian2
            ))
          : (r[i++] = -1),
        (r[i++] = o.packedLength),
        r
      );
    });
  const ie = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    ne = new h.VertexFormat(),
    ae = { polygonHierarchy: {} };
  return (
    (re.unpack = function (o, r, i) {
      r = e.defaultValue(r, 0);
      const n = m.PolygonGeometryLibrary.unpackPolygonHierarchy(
        o,
        r,
        t.Cartesian3
      );
      (r = n.startingIndex), delete n.startingIndex;
      const a = t.Ellipsoid.unpack(o, r, ie);
      r += t.Ellipsoid.packedLength;
      const s = h.VertexFormat.unpack(o, r, ne);
      r += h.VertexFormat.packedLength;
      const l = o[r++],
        u = o[r++],
        c = o[r++],
        d = o[r++],
        p = 1 === o[r++],
        y = 1 === o[r++],
        g = 1 === o[r++],
        f = 1 === o[r++],
        b = 1 === o[r++],
        _ = o[r++],
        P = o[r++],
        C =
          -1 === o[r]
            ? void 0
            : m.PolygonGeometryLibrary.unpackPolygonHierarchy(
                o,
                r,
                t.Cartesian2
              );
      e.defined(C) ? ((r = C.startingIndex), delete C.startingIndex) : r++;
      const x = o[r++];
      return (
        e.defined(i) || (i = new re(ae)),
        (i._polygonHierarchy = n),
        (i._ellipsoid = t.Ellipsoid.clone(a, i._ellipsoid)),
        (i._vertexFormat = h.VertexFormat.clone(s, i._vertexFormat)),
        (i._height = l),
        (i._extrudedHeight = u),
        (i._granularity = c),
        (i._stRotation = d),
        (i._perPositionHeightExtrude = p),
        (i._perPositionHeight = y),
        (i._closeTop = g),
        (i._closeBottom = f),
        (i._shadowVolume = b),
        (i._offsetAttribute = -1 === _ ? void 0 : _),
        (i._arcType = P),
        (i._textureCoordinates = C),
        (i.packedLength = x),
        i
      );
    }),
    (re.computeRectangle = function (r, i) {
      const n = e.defaultValue(r.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
        s = e.defaultValue(r.arcType, o.ArcType.GEODESIC),
        l = r.polygonHierarchy,
        u = e.defaultValue(r.ellipsoid, t.Ellipsoid.WGS84);
      return X(l.positions, u, s, n, i);
    }),
    (re.createGeometry = function (t) {
      const o = t._vertexFormat,
        r = t._ellipsoid,
        n = t._granularity,
        s = t._stRotation,
        h = t._polygonHierarchy,
        f = t._perPositionHeight,
        b = t._closeTop,
        _ = t._closeBottom,
        P = t._arcType,
        C = t._textureCoordinates,
        x = e.defined(C);
      let w = h.positions;
      if (w.length < 3) return;
      const T = l.EllipsoidTangentPlane.fromPoints(w, r),
        I = m.PolygonGeometryLibrary.polygonsFromHierarchy(
          h,
          x,
          T.projectPointsOntoPlane.bind(T),
          !f,
          r
        ),
        A = I.hierarchy,
        v = I.polygons,
        E = x
          ? m.PolygonGeometryLibrary.polygonsFromHierarchy(
              C,
              !0,
              function (e) {
                return e;
              },
              !1
            ).polygons
          : void 0;
      if (0 === A.length) return;
      w = A[0].outerRing;
      const G = m.PolygonGeometryLibrary.computeBoundingRectangle(
          T.plane.normal,
          T.projectPointOntoPlane.bind(T),
          w,
          s,
          L
        ),
        O = [],
        V = t._height,
        H = t._extrudedHeight,
        D = {
          perPositionHeight: f,
          vertexFormat: o,
          geometry: void 0,
          tangentPlane: T,
          boundingRectangle: G,
          ellipsoid: r,
          stRotation: s,
          textureCoordinates: void 0,
          bottom: !1,
          top: !0,
          wall: !1,
          extrude: !1,
          arcType: P
        };
      let N;
      if (
        t._perPositionHeightExtrude ||
        !a.CesiumMath.equalsEpsilon(V, H, 0, a.CesiumMath.EPSILON2)
      )
        for (
          D.extrude = !0,
            D.top = b,
            D.bottom = _,
            D.shadowVolume = t._shadowVolume,
            D.offsetAttribute = t._offsetAttribute,
            N = 0;
          N < v.length;
          N++
        ) {
          const e = oe(r, v[N], x ? E[N] : void 0, n, A[N], f, b, _, o, P);
          let t;
          b && _
            ? ((t = e.topAndBottom),
              (D.geometry =
                m.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                  t.geometry,
                  V,
                  H,
                  r,
                  f
                )))
            : b
            ? ((t = e.topAndBottom),
              (t.geometry.attributes.position.values =
                g.PolygonPipeline.scaleToGeodeticHeight(
                  t.geometry.attributes.position.values,
                  V,
                  r,
                  !f
                )),
              (D.geometry = t.geometry))
            : _ &&
              ((t = e.topAndBottom),
              (t.geometry.attributes.position.values =
                g.PolygonPipeline.scaleToGeodeticHeight(
                  t.geometry.attributes.position.values,
                  H,
                  r,
                  !0
                )),
              (D.geometry = t.geometry)),
            (b || _) && ((D.wall = !1), (t.geometry = Q(D)), O.push(t));
          const i = e.walls;
          D.wall = !0;
          for (let e = 0; e < i.length; e++) {
            const t = i[e];
            (D.geometry =
              m.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                t.geometry,
                V,
                H,
                r,
                f
              )),
              (t.geometry = Q(D)),
              O.push(t);
          }
        }
      else
        for (N = 0; N < v.length; N++) {
          const i = new c.GeometryInstance({
            geometry: m.PolygonGeometryLibrary.createGeometryFromPositions(
              r,
              v[N],
              x ? E[N] : void 0,
              n,
              f,
              o,
              P
            )
          });
          if (
            ((i.geometry.attributes.position.values =
              g.PolygonPipeline.scaleToGeodeticHeight(
                i.geometry.attributes.position.values,
                V,
                r,
                !f
              )),
            (D.geometry = i.geometry),
            (i.geometry = Q(D)),
            e.defined(t._offsetAttribute))
          ) {
            const e = i.geometry.attributes.position.values.length,
              o = t._offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1,
              r = new Uint8Array(e / 3).fill(o);
            i.geometry.attributes.applyOffset = new u.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: r
            });
          }
          O.push(i);
        }
      const F = p.GeometryPipeline.combineInstances(O)[0];
      (F.attributes.position.values = new Float64Array(
        F.attributes.position.values
      )),
        (F.indices = y.IndexDatatype.createTypedArray(
          F.attributes.position.values.length / 3,
          F.indices
        ));
      const R = F.attributes,
        M = i.BoundingSphere.fromVertices(R.position.values);
      return (
        o.position || delete R.position,
        new u.Geometry({
          attributes: R,
          indices: F.indices,
          primitiveType: F.primitiveType,
          boundingSphere: M,
          offsetAttribute: t._offsetAttribute
        })
      );
    }),
    (re.createShadowVolume = function (e, t, o) {
      const r = e._granularity,
        i = e._ellipsoid,
        n = t(r, i),
        a = o(r, i);
      return new re({
        polygonHierarchy: e._polygonHierarchy,
        ellipsoid: i,
        stRotation: e._stRotation,
        granularity: r,
        perPositionHeight: !1,
        extrudedHeight: n,
        height: a,
        vertexFormat: h.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
        arcType: e._arcType
      });
    }),
    Object.defineProperties(re.prototype, {
      rectangle: {
        get: function () {
          if (!e.defined(this._rectangle)) {
            const e = this._polygonHierarchy.positions;
            this._rectangle = X(
              e,
              this._ellipsoid,
              this._arcType,
              this._granularity
            );
          }
          return this._rectangle;
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            e.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                const t = -e._stRotation;
                if (0 === t) return [0, 0, 0, 1, 1, 0];
                const o = e._ellipsoid,
                  r = e._polygonHierarchy.positions,
                  i = e.rectangle;
                return u.Geometry._textureCoordinateRotationPoints(r, t, o, i);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        }
      }
    }),
    function (o, r) {
      return (
        e.defined(r) && (o = re.unpack(o, r)),
        (o._ellipsoid = t.Ellipsoid.clone(o._ellipsoid)),
        re.createGeometry(o)
      );
    }
  );
});
