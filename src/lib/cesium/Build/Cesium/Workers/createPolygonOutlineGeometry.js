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
  './Transforms-d3d3b2a9',
  './RuntimeError-4f8ec8a2',
  './ComponentDatatype-e7fbe225',
  './EllipsoidTangentPlane-7ae496b2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryInstance-4bfcfe78',
  './GeometryOffsetAttribute-59b14f45',
  './GeometryPipeline-a847e31f',
  './IndexDatatype-65271ba3',
  './PolygonGeometryLibrary-0f0c78d4',
  './PolygonPipeline-00dc0c6e',
  './_commonjsHelpers-3aae1032-65601a27',
  './combine-d11b1f00',
  './WebGLConstants-6da700a2',
  './AxisAlignedBoundingBox-b1c095aa',
  './IntersectionTests-33ace2d6',
  './Plane-e916220d',
  './AttributeCompression-5744d52e',
  './EncodedCartesian3-a9a8a281',
  './arrayRemoveDuplicates-6f91355d',
  './EllipsoidRhumbLine-60f14314'
], function (
  e,
  t,
  i,
  o,
  r,
  n,
  a,
  s,
  l,
  y,
  u,
  p,
  d,
  c,
  f,
  g,
  m,
  h,
  b,
  P,
  E,
  A,
  _,
  G,
  L
) {
  'use strict';
  const H = [],
    T = [];
  function v(e, t, o, r, u) {
    const p = a.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(
      t,
      H
    );
    let g, m;
    f.PolygonPipeline.computeWindingOrder2D(p) === f.WindingOrder.CLOCKWISE &&
      (p.reverse(), (t = t.slice().reverse()));
    let h = t.length,
      b = 0;
    if (r)
      for (g = new Float64Array(2 * h * 3), m = 0; m < h; m++) {
        const e = t[m],
          i = t[(m + 1) % h];
        (g[b++] = e.x),
          (g[b++] = e.y),
          (g[b++] = e.z),
          (g[b++] = i.x),
          (g[b++] = i.y),
          (g[b++] = i.z);
      }
    else {
      let r = 0;
      if (u === i.ArcType.GEODESIC)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideLineCount(
            t[m],
            t[(m + 1) % h],
            o
          );
      else if (u === i.ArcType.RHUMB)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(
            e,
            t[m],
            t[(m + 1) % h],
            o
          );
      for (g = new Float64Array(3 * r), m = 0; m < h; m++) {
        let r;
        u === i.ArcType.GEODESIC
          ? (r = c.PolygonGeometryLibrary.subdivideLine(
              t[m],
              t[(m + 1) % h],
              o,
              T
            ))
          : u === i.ArcType.RHUMB &&
            (r = c.PolygonGeometryLibrary.subdivideRhumbLine(
              e,
              t[m],
              t[(m + 1) % h],
              o,
              T
            ));
        const n = r.length;
        for (let e = 0; e < n; ++e) g[b++] = r[e];
      }
    }
    h = g.length / 3;
    const P = 2 * h,
      E = d.IndexDatatype.createTypedArray(h, P);
    for (b = 0, m = 0; m < h - 1; m++) (E[b++] = m), (E[b++] = m + 1);
    return (
      (E[b++] = h - 1),
      (E[b++] = 0),
      new y.GeometryInstance({
        geometry: new s.Geometry({
          attributes: new l.GeometryAttributes({
            position: new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: g
            })
          }),
          indices: E,
          primitiveType: s.PrimitiveType.LINES
        })
      })
    );
  }
  function C(e, t, o, r, u) {
    const p = a.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(
      t,
      H
    );
    let g, m;
    f.PolygonPipeline.computeWindingOrder2D(p) === f.WindingOrder.CLOCKWISE &&
      (p.reverse(), (t = t.slice().reverse()));
    let h = t.length;
    const b = new Array(h);
    let P = 0;
    if (r)
      for (g = new Float64Array(2 * h * 3 * 2), m = 0; m < h; ++m) {
        b[m] = P / 3;
        const e = t[m],
          i = t[(m + 1) % h];
        (g[P++] = e.x),
          (g[P++] = e.y),
          (g[P++] = e.z),
          (g[P++] = i.x),
          (g[P++] = i.y),
          (g[P++] = i.z);
      }
    else {
      let r = 0;
      if (u === i.ArcType.GEODESIC)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideLineCount(
            t[m],
            t[(m + 1) % h],
            o
          );
      else if (u === i.ArcType.RHUMB)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(
            e,
            t[m],
            t[(m + 1) % h],
            o
          );
      for (g = new Float64Array(3 * r * 2), m = 0; m < h; ++m) {
        let r;
        (b[m] = P / 3),
          u === i.ArcType.GEODESIC
            ? (r = c.PolygonGeometryLibrary.subdivideLine(
                t[m],
                t[(m + 1) % h],
                o,
                T
              ))
            : u === i.ArcType.RHUMB &&
              (r = c.PolygonGeometryLibrary.subdivideRhumbLine(
                e,
                t[m],
                t[(m + 1) % h],
                o,
                T
              ));
        const n = r.length;
        for (let e = 0; e < n; ++e) g[P++] = r[e];
      }
    }
    h = g.length / 6;
    const E = b.length,
      A = 2 * (2 * h + E),
      _ = d.IndexDatatype.createTypedArray(h + E, A);
    for (P = 0, m = 0; m < h; ++m)
      (_[P++] = m),
        (_[P++] = (m + 1) % h),
        (_[P++] = m + h),
        (_[P++] = ((m + 1) % h) + h);
    for (m = 0; m < E; m++) {
      const e = b[m];
      (_[P++] = e), (_[P++] = e + h);
    }
    return new y.GeometryInstance({
      geometry: new s.Geometry({
        attributes: new l.GeometryAttributes({
          position: new s.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: g
          })
        }),
        indices: _,
        primitiveType: s.PrimitiveType.LINES
      })
    });
  }
  function O(o) {
    const r = o.polygonHierarchy,
      a = e.defaultValue(o.ellipsoid, t.Ellipsoid.WGS84),
      s = e.defaultValue(o.granularity, n.CesiumMath.RADIANS_PER_DEGREE),
      l = e.defaultValue(o.perPositionHeight, !1),
      y = l && e.defined(o.extrudedHeight),
      u = e.defaultValue(o.arcType, i.ArcType.GEODESIC);
    let p = e.defaultValue(o.height, 0),
      d = e.defaultValue(o.extrudedHeight, p);
    if (!y) {
      const e = Math.max(p, d);
      (d = Math.min(p, d)), (p = e);
    }
    (this._ellipsoid = t.Ellipsoid.clone(a)),
      (this._granularity = s),
      (this._height = p),
      (this._extrudedHeight = d),
      (this._arcType = u),
      (this._polygonHierarchy = r),
      (this._perPositionHeight = l),
      (this._perPositionHeightExtrude = y),
      (this._offsetAttribute = o.offsetAttribute),
      (this._workerName = 'createPolygonOutlineGeometry'),
      (this.packedLength =
        c.PolygonGeometryLibrary.computeHierarchyPackedLength(r, t.Cartesian3) +
        t.Ellipsoid.packedLength +
        8);
  }
  O.pack = function (i, o, r) {
    return (
      (r = e.defaultValue(r, 0)),
      (r = c.PolygonGeometryLibrary.packPolygonHierarchy(
        i._polygonHierarchy,
        o,
        r,
        t.Cartesian3
      )),
      t.Ellipsoid.pack(i._ellipsoid, o, r),
      (r += t.Ellipsoid.packedLength),
      (o[r++] = i._height),
      (o[r++] = i._extrudedHeight),
      (o[r++] = i._granularity),
      (o[r++] = i._perPositionHeightExtrude ? 1 : 0),
      (o[r++] = i._perPositionHeight ? 1 : 0),
      (o[r++] = i._arcType),
      (o[r++] = e.defaultValue(i._offsetAttribute, -1)),
      (o[r] = i.packedLength),
      o
    );
  };
  const x = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    D = { polygonHierarchy: {} };
  return (
    (O.unpack = function (i, o, r) {
      o = e.defaultValue(o, 0);
      const n = c.PolygonGeometryLibrary.unpackPolygonHierarchy(
        i,
        o,
        t.Cartesian3
      );
      (o = n.startingIndex), delete n.startingIndex;
      const a = t.Ellipsoid.unpack(i, o, x);
      o += t.Ellipsoid.packedLength;
      const s = i[o++],
        l = i[o++],
        y = i[o++],
        u = 1 === i[o++],
        p = 1 === i[o++],
        d = i[o++],
        f = i[o++],
        g = i[o];
      return (
        e.defined(r) || (r = new O(D)),
        (r._polygonHierarchy = n),
        (r._ellipsoid = t.Ellipsoid.clone(a, r._ellipsoid)),
        (r._height = s),
        (r._extrudedHeight = l),
        (r._granularity = y),
        (r._perPositionHeight = p),
        (r._perPositionHeightExtrude = u),
        (r._arcType = d),
        (r._offsetAttribute = -1 === f ? void 0 : f),
        (r.packedLength = g),
        r
      );
    }),
    (O.fromPositions = function (t) {
      return new O({
        polygonHierarchy: {
          positions: (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT))
            .positions
        },
        height: t.height,
        extrudedHeight: t.extrudedHeight,
        ellipsoid: t.ellipsoid,
        granularity: t.granularity,
        perPositionHeight: t.perPositionHeight,
        arcType: t.arcType,
        offsetAttribute: t.offsetAttribute
      });
    }),
    (O.createGeometry = function (t) {
      const i = t._ellipsoid,
        r = t._granularity,
        a = t._polygonHierarchy,
        l = t._perPositionHeight,
        y = t._arcType,
        d = c.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(a, !l, i);
      if (0 === d.length) return;
      let g;
      const m = [],
        h = n.CesiumMath.chordLength(r, i.maximumRadius),
        b = t._height,
        P = t._extrudedHeight;
      let E, A;
      if (
        t._perPositionHeightExtrude ||
        !n.CesiumMath.equalsEpsilon(b, P, 0, n.CesiumMath.EPSILON2)
      )
        for (A = 0; A < d.length; A++) {
          if (
            ((g = C(i, d[A], h, l, y)),
            (g.geometry =
              c.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                g.geometry,
                b,
                P,
                i,
                l
              )),
            e.defined(t._offsetAttribute))
          ) {
            const e = g.geometry.attributes.position.values.length / 3;
            let i = new Uint8Array(e);
            t._offsetAttribute === u.GeometryOffsetAttribute.TOP
              ? (i = i.fill(1, 0, e / 2))
              : ((E =
                  t._offsetAttribute === u.GeometryOffsetAttribute.NONE
                    ? 0
                    : 1),
                (i = i.fill(E))),
              (g.geometry.attributes.applyOffset = new s.GeometryAttribute({
                componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: i
              }));
          }
          m.push(g);
        }
      else
        for (A = 0; A < d.length; A++) {
          if (
            ((g = v(i, d[A], h, l, y)),
            (g.geometry.attributes.position.values =
              f.PolygonPipeline.scaleToGeodeticHeight(
                g.geometry.attributes.position.values,
                b,
                i,
                !l
              )),
            e.defined(t._offsetAttribute))
          ) {
            const e = g.geometry.attributes.position.values.length;
            E = t._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1;
            const i = new Uint8Array(e / 3).fill(E);
            g.geometry.attributes.applyOffset = new s.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: i
            });
          }
          m.push(g);
        }
      const _ = p.GeometryPipeline.combineInstances(m)[0],
        G = o.BoundingSphere.fromVertices(_.attributes.position.values);
      return new s.Geometry({
        attributes: _.attributes,
        indices: _.indices,
        primitiveType: _.primitiveType,
        boundingSphere: G,
        offsetAttribute: t._offsetAttribute
      });
    }),
    function (i, o) {
      return (
        e.defined(o) && (i = O.unpack(i, o)),
        (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)),
        O.createGeometry(i)
      );
    }
  );
});
