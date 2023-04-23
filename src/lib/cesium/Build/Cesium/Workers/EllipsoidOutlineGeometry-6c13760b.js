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
  './IndexDatatype-65271ba3'
], function (t, i, e, n, a, o, r, s, u, m) {
  'use strict';
  const f = new e.Cartesian3(1, 1, 1),
    l = Math.cos,
    d = Math.sin;
  function c(t) {
    t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT);
    const i = a.defaultValue(t.radii, f),
      o = a.defaultValue(t.innerRadii, i),
      r = a.defaultValue(t.minimumClock, 0),
      s = a.defaultValue(t.maximumClock, n.CesiumMath.TWO_PI),
      u = a.defaultValue(t.minimumCone, 0),
      m = a.defaultValue(t.maximumCone, n.CesiumMath.PI),
      l = Math.round(a.defaultValue(t.stackPartitions, 10)),
      d = Math.round(a.defaultValue(t.slicePartitions, 8)),
      c = Math.round(a.defaultValue(t.subdivisions, 128));
    (this._radii = e.Cartesian3.clone(i)),
      (this._innerRadii = e.Cartesian3.clone(o)),
      (this._minimumClock = r),
      (this._maximumClock = s),
      (this._minimumCone = u),
      (this._maximumCone = m),
      (this._stackPartitions = l),
      (this._slicePartitions = d),
      (this._subdivisions = c),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidOutlineGeometry');
  }
  (c.packedLength = 2 * e.Cartesian3.packedLength + 8),
    (c.pack = function (t, i, n) {
      return (
        (n = a.defaultValue(n, 0)),
        e.Cartesian3.pack(t._radii, i, n),
        (n += e.Cartesian3.packedLength),
        e.Cartesian3.pack(t._innerRadii, i, n),
        (n += e.Cartesian3.packedLength),
        (i[n++] = t._minimumClock),
        (i[n++] = t._maximumClock),
        (i[n++] = t._minimumCone),
        (i[n++] = t._maximumCone),
        (i[n++] = t._stackPartitions),
        (i[n++] = t._slicePartitions),
        (i[n++] = t._subdivisions),
        (i[n] = a.defaultValue(t._offsetAttribute, -1)),
        i
      );
    });
  const C = new e.Cartesian3(),
    _ = new e.Cartesian3(),
    p = {
      radii: C,
      innerRadii: _,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
      offsetAttribute: void 0
    };
  (c.unpack = function (t, i, n) {
    i = a.defaultValue(i, 0);
    const o = e.Cartesian3.unpack(t, i, C);
    i += e.Cartesian3.packedLength;
    const r = e.Cartesian3.unpack(t, i, _);
    i += e.Cartesian3.packedLength;
    const s = t[i++],
      u = t[i++],
      m = t[i++],
      f = t[i++],
      l = t[i++],
      d = t[i++],
      h = t[i++],
      y = t[i];
    return a.defined(n)
      ? ((n._radii = e.Cartesian3.clone(o, n._radii)),
        (n._innerRadii = e.Cartesian3.clone(r, n._innerRadii)),
        (n._minimumClock = s),
        (n._maximumClock = u),
        (n._minimumCone = m),
        (n._maximumCone = f),
        (n._stackPartitions = l),
        (n._slicePartitions = d),
        (n._subdivisions = h),
        (n._offsetAttribute = -1 === y ? void 0 : y),
        n)
      : ((p.minimumClock = s),
        (p.maximumClock = u),
        (p.minimumCone = m),
        (p.maximumCone = f),
        (p.stackPartitions = l),
        (p.slicePartitions = d),
        (p.subdivisions = h),
        (p.offsetAttribute = -1 === y ? void 0 : y),
        new c(p));
  }),
    (c.createGeometry = function (t) {
      const o = t._radii;
      if (o.x <= 0 || o.y <= 0 || o.z <= 0) return;
      const f = t._innerRadii;
      if (f.x <= 0 || f.y <= 0 || f.z <= 0) return;
      const c = t._minimumClock,
        C = t._maximumClock,
        _ = t._minimumCone,
        p = t._maximumCone,
        h = t._subdivisions,
        y = e.Ellipsoid.fromCartesian3(o);
      let b = t._slicePartitions + 1,
        k = t._stackPartitions + 1;
      (b = Math.round((b * Math.abs(C - c)) / n.CesiumMath.TWO_PI)),
        (k = Math.round((k * Math.abs(p - _)) / n.CesiumMath.PI)),
        b < 2 && (b = 2),
        k < 2 && (k = 2);
      let x = 0,
        A = 1;
      const P = f.x !== o.x || f.y !== o.y || f.z !== o.z;
      let v = !1,
        M = !1;
      P &&
        ((A = 2),
        _ > 0 && ((v = !0), (x += b)),
        p < Math.PI && ((M = !0), (x += b)));
      const w = h * A * (k + b),
        V = new Float64Array(3 * w),
        g = 2 * (w + x - (b + k) * A),
        E = m.IndexDatatype.createTypedArray(w, g);
      let G,
        O,
        D,
        I,
        T = 0;
      const z = new Array(k),
        L = new Array(k);
      for (G = 0; G < k; G++)
        (I = _ + (G * (p - _)) / (k - 1)), (z[G] = d(I)), (L[G] = l(I));
      const R = new Array(h),
        N = new Array(h);
      for (G = 0; G < h; G++)
        (D = c + (G * (C - c)) / (h - 1)), (R[G] = d(D)), (N[G] = l(D));
      for (G = 0; G < k; G++)
        for (O = 0; O < h; O++)
          (V[T++] = o.x * z[G] * N[O]),
            (V[T++] = o.y * z[G] * R[O]),
            (V[T++] = o.z * L[G]);
      if (P)
        for (G = 0; G < k; G++)
          for (O = 0; O < h; O++)
            (V[T++] = f.x * z[G] * N[O]),
              (V[T++] = f.y * z[G] * R[O]),
              (V[T++] = f.z * L[G]);
      for (z.length = h, L.length = h, G = 0; G < h; G++)
        (I = _ + (G * (p - _)) / (h - 1)), (z[G] = d(I)), (L[G] = l(I));
      for (R.length = b, N.length = b, G = 0; G < b; G++)
        (D = c + (G * (C - c)) / (b - 1)), (R[G] = d(D)), (N[G] = l(D));
      for (G = 0; G < h; G++)
        for (O = 0; O < b; O++)
          (V[T++] = o.x * z[G] * N[O]),
            (V[T++] = o.y * z[G] * R[O]),
            (V[T++] = o.z * L[G]);
      if (P)
        for (G = 0; G < h; G++)
          for (O = 0; O < b; O++)
            (V[T++] = f.x * z[G] * N[O]),
              (V[T++] = f.y * z[G] * R[O]),
              (V[T++] = f.z * L[G]);
      for (T = 0, G = 0; G < k * A; G++) {
        const t = G * h;
        for (O = 0; O < h - 1; O++) (E[T++] = t + O), (E[T++] = t + O + 1);
      }
      let B = k * h * A;
      for (G = 0; G < b; G++)
        for (O = 0; O < h - 1; O++)
          (E[T++] = B + G + O * b), (E[T++] = B + G + (O + 1) * b);
      if (P)
        for (B = k * h * A + b * h, G = 0; G < b; G++)
          for (O = 0; O < h - 1; O++)
            (E[T++] = B + G + O * b), (E[T++] = B + G + (O + 1) * b);
      if (P) {
        let t = k * h * A,
          i = t + h * b;
        if (v) for (G = 0; G < b; G++) (E[T++] = t + G), (E[T++] = i + G);
        if (M)
          for (t += h * b - b, i += h * b - b, G = 0; G < b; G++)
            (E[T++] = t + G), (E[T++] = i + G);
      }
      const S = new s.GeometryAttributes({
        position: new r.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: V
        })
      });
      if (a.defined(t._offsetAttribute)) {
        const i = V.length,
          e = t._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1,
          a = new Uint8Array(i / 3).fill(e);
        S.applyOffset = new r.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: a
        });
      }
      return new r.Geometry({
        attributes: S,
        indices: E,
        primitiveType: r.PrimitiveType.LINES,
        boundingSphere: i.BoundingSphere.fromEllipsoid(y),
        offsetAttribute: t._offsetAttribute
      });
    }),
    (t.EllipsoidOutlineGeometry = c);
});
