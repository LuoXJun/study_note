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
  './arrayRemoveDuplicates-6f91355d',
  './BoundingRectangle-2b0ebbdd',
  './Transforms-d3d3b2a9',
  './ComponentDatatype-e7fbe225',
  './PolylineVolumeGeometryLibrary-a4b92b4e',
  './RuntimeError-4f8ec8a2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryPipeline-a847e31f',
  './IndexDatatype-65271ba3',
  './PolygonPipeline-00dc0c6e',
  './VertexFormat-9886cb81',
  './_commonjsHelpers-3aae1032-65601a27',
  './combine-d11b1f00',
  './WebGLConstants-6da700a2',
  './EllipsoidTangentPlane-7ae496b2',
  './AxisAlignedBoundingBox-b1c095aa',
  './IntersectionTests-33ace2d6',
  './Plane-e916220d',
  './PolylinePipeline-ebd42f23',
  './EllipsoidGeodesic-ed8a0e40',
  './EllipsoidRhumbLine-60f14314',
  './AttributeCompression-5744d52e',
  './EncodedCartesian3-a9a8a281'
], function (
  e,
  t,
  n,
  o,
  i,
  a,
  r,
  l,
  s,
  p,
  c,
  d,
  u,
  m,
  y,
  g,
  h,
  f,
  b,
  P,
  _,
  E,
  k,
  v,
  V,
  L
) {
  'use strict';
  function x(n) {
    const o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT))
        .polylinePositions,
      i = n.shapePositions;
    (this._positions = o),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(
        e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84)
      )),
      (this._cornerType = e.defaultValue(n.cornerType, r.CornerType.ROUNDED)),
      (this._vertexFormat = m.VertexFormat.clone(
        e.defaultValue(n.vertexFormat, m.VertexFormat.DEFAULT)
      )),
      (this._granularity = e.defaultValue(
        n.granularity,
        a.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._workerName = 'createPolylineVolumeGeometry');
    let l = 1 + o.length * t.Cartesian3.packedLength;
    (l += 1 + i.length * t.Cartesian2.packedLength),
      (this.packedLength =
        l + t.Ellipsoid.packedLength + m.VertexFormat.packedLength + 2);
  }
  x.pack = function (n, o, i) {
    let a;
    i = e.defaultValue(i, 0);
    const r = n._positions;
    let l = r.length;
    for (o[i++] = l, a = 0; a < l; ++a, i += t.Cartesian3.packedLength)
      t.Cartesian3.pack(r[a], o, i);
    const s = n._shape;
    for (
      l = s.length, o[i++] = l, a = 0;
      a < l;
      ++a, i += t.Cartesian2.packedLength
    )
      t.Cartesian2.pack(s[a], o, i);
    return (
      t.Ellipsoid.pack(n._ellipsoid, o, i),
      (i += t.Ellipsoid.packedLength),
      m.VertexFormat.pack(n._vertexFormat, o, i),
      (i += m.VertexFormat.packedLength),
      (o[i++] = n._cornerType),
      (o[i] = n._granularity),
      o
    );
  };
  const C = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    F = new m.VertexFormat(),
    A = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: C,
      vertexFormat: F,
      cornerType: void 0,
      granularity: void 0
    };
  x.unpack = function (n, o, i) {
    let a;
    o = e.defaultValue(o, 0);
    let r = n[o++];
    const l = new Array(r);
    for (a = 0; a < r; ++a, o += t.Cartesian3.packedLength)
      l[a] = t.Cartesian3.unpack(n, o);
    r = n[o++];
    const s = new Array(r);
    for (a = 0; a < r; ++a, o += t.Cartesian2.packedLength)
      s[a] = t.Cartesian2.unpack(n, o);
    const p = t.Ellipsoid.unpack(n, o, C);
    o += t.Ellipsoid.packedLength;
    const c = m.VertexFormat.unpack(n, o, F);
    o += m.VertexFormat.packedLength;
    const d = n[o++],
      u = n[o];
    return e.defined(i)
      ? ((i._positions = l),
        (i._shape = s),
        (i._ellipsoid = t.Ellipsoid.clone(p, i._ellipsoid)),
        (i._vertexFormat = m.VertexFormat.clone(c, i._vertexFormat)),
        (i._cornerType = d),
        (i._granularity = u),
        i)
      : ((A.polylinePositions = l),
        (A.shapePositions = s),
        (A.cornerType = d),
        (A.granularity = u),
        new x(A));
  };
  const T = new o.BoundingRectangle();
  return (
    (x.createGeometry = function (e) {
      const l = e._positions,
        m = n.arrayRemoveDuplicates(l, t.Cartesian3.equalsEpsilon);
      let y = e._shape;
      if (
        ((y = r.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)),
        m.length < 2 || y.length < 3)
      )
        return;
      u.PolygonPipeline.computeWindingOrder2D(y) === u.WindingOrder.CLOCKWISE &&
        y.reverse();
      const g = o.BoundingRectangle.fromPoints(y, T);
      return (function (e, t, n, o) {
        const l = new p.GeometryAttributes();
        o.position &&
          (l.position = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: e
          }));
        const m = t.length,
          y = e.length / 3,
          g = (y - 2 * m) / (2 * m),
          h = u.PolygonPipeline.triangulate(t),
          f = (g - 1) * m * 6 + 2 * h.length,
          b = d.IndexDatatype.createTypedArray(y, f);
        let P, _, E, k, v, V;
        const L = 2 * m;
        let x = 0;
        for (P = 0; P < g - 1; P++) {
          for (_ = 0; _ < m - 1; _++)
            (E = 2 * _ + P * m * 2),
              (V = E + L),
              (k = E + 1),
              (v = k + L),
              (b[x++] = k),
              (b[x++] = E),
              (b[x++] = v),
              (b[x++] = v),
              (b[x++] = E),
              (b[x++] = V);
          (E = 2 * m - 2 + P * m * 2),
            (k = E + 1),
            (v = k + L),
            (V = E + L),
            (b[x++] = k),
            (b[x++] = E),
            (b[x++] = v),
            (b[x++] = v),
            (b[x++] = E),
            (b[x++] = V);
        }
        if (o.st || o.tangent || o.bitangent) {
          const e = new Float32Array(2 * y),
            o = 1 / (g - 1),
            i = 1 / n.height,
            r = n.height / 2;
          let p,
            c,
            d = 0;
          for (P = 0; P < g; P++) {
            for (
              p = P * o, c = i * (t[0].y + r), e[d++] = p, e[d++] = c, _ = 1;
              _ < m;
              _++
            )
              (c = i * (t[_].y + r)),
                (e[d++] = p),
                (e[d++] = c),
                (e[d++] = p),
                (e[d++] = c);
            (c = i * (t[0].y + r)), (e[d++] = p), (e[d++] = c);
          }
          for (_ = 0; _ < m; _++)
            (p = 0), (c = i * (t[_].y + r)), (e[d++] = p), (e[d++] = c);
          for (_ = 0; _ < m; _++)
            (p = (g - 1) * o),
              (c = i * (t[_].y + r)),
              (e[d++] = p),
              (e[d++] = c);
          l.st = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: new Float32Array(e)
          });
        }
        const C = y - 2 * m;
        for (P = 0; P < h.length; P += 3) {
          const e = h[P] + C,
            t = h[P + 1] + C,
            n = h[P + 2] + C;
          (b[x++] = e),
            (b[x++] = t),
            (b[x++] = n),
            (b[x++] = n + m),
            (b[x++] = t + m),
            (b[x++] = e + m);
        }
        let F = new s.Geometry({
          attributes: l,
          indices: b,
          boundingSphere: i.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.TRIANGLES
        });
        if (
          (o.normal && (F = c.GeometryPipeline.computeNormal(F)),
          o.tangent || o.bitangent)
        ) {
          try {
            F = c.GeometryPipeline.computeTangentAndBitangent(F);
          } catch (e) {
            r.oneTimeWarning(
              'polyline-volume-tangent-bitangent',
              'Unable to compute tangents and bitangents for polyline volume geometry'
            );
          }
          o.tangent || (F.attributes.tangent = void 0),
            o.bitangent || (F.attributes.bitangent = void 0),
            o.st || (F.attributes.st = void 0);
        }
        return F;
      })(
        r.PolylineVolumeGeometryLibrary.computePositions(m, y, g, e, !0),
        y,
        g,
        e._vertexFormat
      );
    }),
    function (n, o) {
      return (
        e.defined(o) && (n = x.unpack(n, o)),
        (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)),
        x.createGeometry(n)
      );
    }
  );
});
