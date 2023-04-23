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
  './Transforms-d3d3b2a9',
  './BoxGeometry-acd0c697',
  './Matrix2-73789715',
  './Color-c7fd1307',
  './CylinderGeometry-679e50b4',
  './defaultValue-97284df2',
  './EllipsoidGeometry-539fb9e2',
  './IndexDatatype-65271ba3',
  './createTaskProcessorWorker',
  './RuntimeError-4f8ec8a2',
  './ComponentDatatype-e7fbe225',
  './WebGLConstants-6da700a2',
  './_commonjsHelpers-3aae1032-65601a27',
  './combine-d11b1f00',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryOffsetAttribute-59b14f45',
  './VertexFormat-9886cb81',
  './CylinderGeometryLibrary-24ad1484'
], function (e, t, n, r, a, i, o, s, d, c, l, f, u, h, b, p, y, x, g) {
  'use strict';
  function m(e) {
    (this.offset = e.offset),
      (this.count = e.count),
      (this.color = e.color),
      (this.batchIds = e.batchIds);
  }
  const C = new n.Cartesian3(),
    I = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    k = n.Matrix4.packedLength + 2,
    M = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    B = n.Cartesian3.packedLength + 1,
    w = {
      modelMatrix: new n.Matrix4(),
      boundingVolume: new e.BoundingSphere()
    };
  function A(e, t) {
    let r = t * I;
    const a = n.Cartesian3.unpack(e, r, C);
    r += n.Cartesian3.packedLength;
    const i = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(i, a, i);
    const o = w.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, o.center),
      (o.radius = Math.sqrt(3)),
      w
    );
  }
  function O(e, t) {
    let r = t * k;
    const a = e[r++],
      i = e[r++],
      o = n.Cartesian3.fromElements(a, a, i, C),
      s = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(s, o, s);
    const d = w.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, d.center),
      (d.radius = Math.sqrt(2)),
      w
    );
  }
  function L(e, t) {
    let r = t * M;
    const a = n.Cartesian3.unpack(e, r, C);
    r += n.Cartesian3.packedLength;
    const i = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(i, a, i);
    const o = w.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = 1), w;
  }
  function v(e, t) {
    let r = t * B;
    const a = e[r++],
      i = n.Cartesian3.unpack(e, r, C),
      o = n.Matrix4.fromTranslation(i, w.modelMatrix);
    n.Matrix4.multiplyByUniformScale(o, a, o);
    const s = w.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, s.center), (s.radius = 1), w;
  }
  const E = new n.Cartesian3();
  function U(t, a, o, s, d) {
    if (!i.defined(a)) return;
    const c = o.length,
      l = s.attributes.position.values,
      f = s.indices,
      u = t.positions,
      h = t.vertexBatchIds,
      b = t.indices,
      p = t.batchIds,
      y = t.batchTableColors,
      x = t.batchedIndices,
      g = t.indexOffsets,
      C = t.indexCounts,
      I = t.boundingVolumes,
      k = t.modelMatrix,
      M = t.center;
    let B = t.positionOffset,
      w = t.batchIdIndex,
      A = t.indexOffset;
    const O = t.batchedIndicesOffset;
    for (let t = 0; t < c; ++t) {
      const i = d(a, t),
        s = i.modelMatrix;
      n.Matrix4.multiply(k, s, s);
      const c = o[t],
        L = l.length;
      for (let e = 0; e < L; e += 3) {
        const t = n.Cartesian3.unpack(l, e, E);
        n.Matrix4.multiplyByPoint(s, t, t),
          n.Cartesian3.subtract(t, M, t),
          n.Cartesian3.pack(t, u, 3 * B + e),
          (h[w++] = c);
      }
      const v = f.length;
      for (let e = 0; e < v; ++e) b[A + e] = f[e] + B;
      const U = t + O;
      (x[U] = new m({
        offset: A,
        count: v,
        color: r.Color.fromRgba(y[c]),
        batchIds: [c]
      })),
        (p[U] = c),
        (g[U] = A),
        (C[U] = v),
        (I[U] = e.BoundingSphere.transform(i.boundingVolume, s)),
        (B += L / 3),
        (A += v);
    }
    (t.positionOffset = B),
      (t.batchIdIndex = w),
      (t.indexOffset = A),
      (t.batchedIndicesOffset += c);
  }
  const G = new n.Cartesian3(),
    S = new n.Matrix4();
  function V(t, n, a) {
    const i = a.length,
      o =
        2 +
        i * e.BoundingSphere.packedLength +
        1 +
        (function (e) {
          const t = e.length;
          let n = 0;
          for (let a = 0; a < t; ++a)
            n += r.Color.packedLength + 3 + e[a].batchIds.length;
          return n;
        })(n),
      s = new Float64Array(o);
    let d = 0;
    (s[d++] = t), (s[d++] = i);
    for (let t = 0; t < i; ++t)
      e.BoundingSphere.pack(a[t], s, d), (d += e.BoundingSphere.packedLength);
    const c = n.length;
    s[d++] = c;
    for (let e = 0; e < c; ++e) {
      const t = n[e];
      r.Color.pack(t.color, s, d),
        (d += r.Color.packedLength),
        (s[d++] = t.offset),
        (s[d++] = t.count);
      const a = t.batchIds,
        i = a.length;
      s[d++] = i;
      for (let e = 0; e < i; ++e) s[d++] = a[e];
    }
    return s;
  }
  return d(function (e, r) {
    const d = i.defined(e.boxes) ? new Float32Array(e.boxes) : void 0,
      c = i.defined(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
      l = i.defined(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
      f = i.defined(e.cylinderBatchIds)
        ? new Uint16Array(e.cylinderBatchIds)
        : void 0,
      u = i.defined(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
      h = i.defined(e.ellipsoidBatchIds)
        ? new Uint16Array(e.ellipsoidBatchIds)
        : void 0,
      b = i.defined(e.spheres) ? new Float32Array(e.spheres) : void 0,
      p = i.defined(e.sphereBatchIds)
        ? new Uint16Array(e.sphereBatchIds)
        : void 0,
      y = i.defined(d) ? c.length : 0,
      x = i.defined(l) ? f.length : 0,
      g = i.defined(u) ? h.length : 0,
      m = i.defined(b) ? p.length : 0,
      C = t.BoxGeometry.getUnitBox(),
      I = a.CylinderGeometry.getUnitCylinder(),
      k = o.EllipsoidGeometry.getUnitEllipsoid(),
      M = C.attributes.position.values,
      B = I.attributes.position.values,
      w = k.attributes.position.values;
    let E = M.length * y;
    (E += B.length * x), (E += w.length * (g + m));
    const T = C.indices,
      F = I.indices,
      R = k.indices;
    let Z = T.length * y;
    (Z += F.length * x), (Z += R.length * (g + m));
    const D = new Float32Array(E),
      P = new Uint16Array(E / 3),
      _ = s.IndexDatatype.createTypedArray(E / 3, Z),
      q = y + x + g + m,
      W = new Uint16Array(q),
      j = new Array(q),
      H = new Uint32Array(q),
      N = new Uint32Array(q),
      Y = new Array(q);
    !(function (e) {
      const t = new Float64Array(e);
      let r = 0;
      n.Cartesian3.unpack(t, r, G),
        (r += n.Cartesian3.packedLength),
        n.Matrix4.unpack(t, r, S);
    })(e.packedBuffer);
    const z = {
      batchTableColors: new Uint32Array(e.batchTableColors),
      positions: D,
      vertexBatchIds: P,
      indices: _,
      batchIds: W,
      batchedIndices: j,
      indexOffsets: H,
      indexCounts: N,
      boundingVolumes: Y,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: S,
      center: G
    };
    U(z, d, c, C, A), U(z, l, f, I, O), U(z, u, h, k, L), U(z, b, p, k, v);
    const J = V(_.BYTES_PER_ELEMENT, j, Y);
    return (
      r.push(D.buffer, P.buffer, _.buffer),
      r.push(W.buffer, H.buffer, N.buffer),
      r.push(J.buffer),
      {
        positions: D.buffer,
        vertexBatchIds: P.buffer,
        indices: _.buffer,
        indexOffsets: H.buffer,
        indexCounts: N.buffer,
        batchIds: W.buffer,
        packedBuffer: J.buffer
      }
    );
  });
});
