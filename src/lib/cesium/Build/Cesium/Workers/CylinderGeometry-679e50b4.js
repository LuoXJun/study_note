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
  './CylinderGeometryLibrary-24ad1484',
  './defaultValue-97284df2',
  './RuntimeError-4f8ec8a2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryOffsetAttribute-59b14f45',
  './IndexDatatype-65271ba3',
  './VertexFormat-9886cb81'
], function (t, e, n, a, o, r, i, s, u, m, l, c) {
  'use strict';
  const d = new n.Cartesian2(),
    f = new n.Cartesian3(),
    p = new n.Cartesian3(),
    y = new n.Cartesian3(),
    b = new n.Cartesian3();
  function A(t) {
    const e = (t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)).length,
      n = t.topRadius,
      a = t.bottomRadius,
      o = r.defaultValue(t.vertexFormat, c.VertexFormat.DEFAULT),
      i = r.defaultValue(t.slices, 128);
    (this._length = e),
      (this._topRadius = n),
      (this._bottomRadius = a),
      (this._vertexFormat = c.VertexFormat.clone(o)),
      (this._slices = i),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderGeometry');
  }
  (A.packedLength = c.VertexFormat.packedLength + 5),
    (A.pack = function (t, e, n) {
      return (
        (n = r.defaultValue(n, 0)),
        c.VertexFormat.pack(t._vertexFormat, e, n),
        (n += c.VertexFormat.packedLength),
        (e[n++] = t._length),
        (e[n++] = t._topRadius),
        (e[n++] = t._bottomRadius),
        (e[n++] = t._slices),
        (e[n] = r.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  const x = new c.VertexFormat(),
    g = {
      vertexFormat: x,
      length: void 0,
      topRadius: void 0,
      bottomRadius: void 0,
      slices: void 0,
      offsetAttribute: void 0
    };
  let _;
  (A.unpack = function (t, e, n) {
    e = r.defaultValue(e, 0);
    const a = c.VertexFormat.unpack(t, e, x);
    e += c.VertexFormat.packedLength;
    const o = t[e++],
      i = t[e++],
      s = t[e++],
      u = t[e++],
      m = t[e];
    return r.defined(n)
      ? ((n._vertexFormat = c.VertexFormat.clone(a, n._vertexFormat)),
        (n._length = o),
        (n._topRadius = i),
        (n._bottomRadius = s),
        (n._slices = u),
        (n._offsetAttribute = -1 === m ? void 0 : m),
        n)
      : ((g.length = o),
        (g.topRadius = i),
        (g.bottomRadius = s),
        (g.slices = u),
        (g.offsetAttribute = -1 === m ? void 0 : m),
        new A(g));
  }),
    (A.createGeometry = function (t) {
      let i = t._length;
      const c = t._topRadius,
        A = t._bottomRadius,
        x = t._vertexFormat,
        g = t._slices;
      if (i <= 0 || c < 0 || A < 0 || (0 === c && 0 === A)) return;
      const _ = g + g,
        h = g + _,
        F = _ + _,
        v = o.CylinderGeometryLibrary.computePositions(i, c, A, g, !0),
        C = x.st ? new Float32Array(2 * F) : void 0,
        w = x.normal ? new Float32Array(3 * F) : void 0,
        G = x.tangent ? new Float32Array(3 * F) : void 0,
        R = x.bitangent ? new Float32Array(3 * F) : void 0;
      let V;
      const D = x.normal || x.tangent || x.bitangent;
      if (D) {
        const t = x.tangent || x.bitangent;
        let e = 0,
          o = 0,
          r = 0;
        const s = Math.atan2(A - c, i),
          u = f;
        u.z = Math.sin(s);
        const m = Math.cos(s);
        let l = y,
          d = p;
        for (V = 0; V < g; V++) {
          const i = (V / g) * a.CesiumMath.TWO_PI,
            s = m * Math.cos(i),
            c = m * Math.sin(i);
          D &&
            ((u.x = s),
            (u.y = c),
            t &&
              (l = n.Cartesian3.normalize(
                n.Cartesian3.cross(n.Cartesian3.UNIT_Z, u, l),
                l
              )),
            x.normal &&
              ((w[e++] = u.x),
              (w[e++] = u.y),
              (w[e++] = u.z),
              (w[e++] = u.x),
              (w[e++] = u.y),
              (w[e++] = u.z)),
            x.tangent &&
              ((G[o++] = l.x),
              (G[o++] = l.y),
              (G[o++] = l.z),
              (G[o++] = l.x),
              (G[o++] = l.y),
              (G[o++] = l.z)),
            x.bitangent &&
              ((d = n.Cartesian3.normalize(n.Cartesian3.cross(u, l, d), d)),
              (R[r++] = d.x),
              (R[r++] = d.y),
              (R[r++] = d.z),
              (R[r++] = d.x),
              (R[r++] = d.y),
              (R[r++] = d.z)));
        }
        for (V = 0; V < g; V++)
          x.normal && ((w[e++] = 0), (w[e++] = 0), (w[e++] = -1)),
            x.tangent && ((G[o++] = 1), (G[o++] = 0), (G[o++] = 0)),
            x.bitangent && ((R[r++] = 0), (R[r++] = -1), (R[r++] = 0));
        for (V = 0; V < g; V++)
          x.normal && ((w[e++] = 0), (w[e++] = 0), (w[e++] = 1)),
            x.tangent && ((G[o++] = 1), (G[o++] = 0), (G[o++] = 0)),
            x.bitangent && ((R[r++] = 0), (R[r++] = 1), (R[r++] = 0));
      }
      const T = 12 * g - 12,
        O = l.IndexDatatype.createTypedArray(F, T);
      let L = 0,
        P = 0;
      for (V = 0; V < g - 1; V++)
        (O[L++] = P),
          (O[L++] = P + 2),
          (O[L++] = P + 3),
          (O[L++] = P),
          (O[L++] = P + 3),
          (O[L++] = P + 1),
          (P += 2);
      for (
        O[L++] = _ - 2,
          O[L++] = 0,
          O[L++] = 1,
          O[L++] = _ - 2,
          O[L++] = 1,
          O[L++] = _ - 1,
          V = 1;
        V < g - 1;
        V++
      )
        (O[L++] = _ + V + 1), (O[L++] = _ + V), (O[L++] = _);
      for (V = 1; V < g - 1; V++)
        (O[L++] = h), (O[L++] = h + V), (O[L++] = h + V + 1);
      let E = 0;
      if (x.st) {
        const t = Math.max(c, A);
        for (V = 0; V < F; V++) {
          const e = n.Cartesian3.fromArray(v, 3 * V, b);
          (C[E++] = (e.x + t) / (2 * t)), (C[E++] = (e.y + t) / (2 * t));
        }
      }
      const M = new u.GeometryAttributes();
      x.position &&
        (M.position = new s.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: v
        })),
        x.normal &&
          (M.normal = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: w
          })),
        x.tangent &&
          (M.tangent = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: G
          })),
        x.bitangent &&
          (M.bitangent = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: R
          })),
        x.st &&
          (M.st = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: C
          })),
        (d.x = 0.5 * i),
        (d.y = Math.max(A, c));
      const k = new e.BoundingSphere(
        n.Cartesian3.ZERO,
        n.Cartesian2.magnitude(d)
      );
      if (r.defined(t._offsetAttribute)) {
        i = v.length;
        const e = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(i / 3).fill(e);
        M.applyOffset = new s.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: n
        });
      }
      return new s.Geometry({
        attributes: M,
        indices: O,
        primitiveType: s.PrimitiveType.TRIANGLES,
        boundingSphere: k,
        offsetAttribute: t._offsetAttribute
      });
    }),
    (A.getUnitCylinder = function () {
      return (
        r.defined(_) ||
          (_ = A.createGeometry(
            new A({
              topRadius: 1,
              bottomRadius: 1,
              length: 1,
              vertexFormat: c.VertexFormat.POSITION_ONLY
            })
          )),
        _
      );
    }),
    (t.CylinderGeometry = A);
});
