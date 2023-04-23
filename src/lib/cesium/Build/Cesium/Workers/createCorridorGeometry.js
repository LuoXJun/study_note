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
  './arrayRemoveDuplicates-6f91355d',
  './Transforms-d3d3b2a9',
  './Matrix2-73789715',
  './RuntimeError-4f8ec8a2',
  './ComponentDatatype-e7fbe225',
  './PolylineVolumeGeometryLibrary-a4b92b4e',
  './CorridorGeometryLibrary-ab3e6481',
  './defaultValue-97284df2',
  './GeometryAttribute-fd1d7e90',
  './GeometryAttributes-734a3446',
  './GeometryOffsetAttribute-59b14f45',
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
  './EllipsoidRhumbLine-60f14314'
], function (
  t,
  e,
  r,
  a,
  i,
  o,
  n,
  s,
  l,
  d,
  u,
  m,
  c,
  f,
  y,
  p,
  g,
  h,
  b,
  C,
  A,
  _,
  w,
  v
) {
  'use strict';
  const T = new r.Cartesian3(),
    G = new r.Cartesian3(),
    E = new r.Cartesian3(),
    V = new r.Cartesian3(),
    x = new r.Cartesian3(),
    L = new r.Cartesian3(),
    P = new r.Cartesian3(),
    F = new r.Cartesian3();
  function N(t, e) {
    for (let r = 0; r < t.length; r++)
      t[r] = e.scaleToGeodeticSurface(t[r], t[r]);
    return t;
  }
  function D(t, e, a, i, o, s) {
    const l = t.normals,
      d = t.tangents,
      u = t.bitangents,
      m = r.Cartesian3.normalize(r.Cartesian3.cross(a, e, P), P);
    s.normal && n.CorridorGeometryLibrary.addAttribute(l, e, i, o),
      s.tangent && n.CorridorGeometryLibrary.addAttribute(d, m, i, o),
      s.bitangent && n.CorridorGeometryLibrary.addAttribute(u, a, i, o);
  }
  function M(t, e, a) {
    const o = t.positions,
      u = t.corners,
      c = t.endPositions,
      f = t.lefts,
      y = t.normals,
      p = new d.GeometryAttributes();
    let g,
      h,
      b,
      C = 0,
      A = 0,
      _ = 0;
    for (h = 0; h < o.length; h += 2)
      (b = o[h].length - 3), (C += b), (_ += 2 * b), (A += o[h + 1].length - 3);
    for (C += 3, A += 3, h = 0; h < u.length; h++) {
      g = u[h];
      const t = u[h].leftPositions;
      s.defined(t)
        ? ((b = t.length), (C += b), (_ += b))
        : ((b = u[h].rightPositions.length), (A += b), (_ += b));
    }
    const w = s.defined(c);
    let v;
    w && ((v = c[0].length - 3), (C += v), (A += v), (v /= 3), (_ += 6 * v));
    const x = C + A,
      N = new Float64Array(x),
      M = {
        normals: e.normal ? new Float32Array(x) : void 0,
        tangents: e.tangent ? new Float32Array(x) : void 0,
        bitangents: e.bitangent ? new Float32Array(x) : void 0
      };
    let O,
      I,
      S,
      R,
      k,
      H,
      z = 0,
      B = x - 1,
      U = T,
      Y = G;
    const W = v / 2,
      q = m.IndexDatatype.createTypedArray(x / 3, _);
    let j = 0;
    if (w) {
      (H = E), (k = V);
      const t = c[0];
      for (
        U = r.Cartesian3.fromArray(y, 0, U),
          Y = r.Cartesian3.fromArray(f, 0, Y),
          h = 0;
        h < W;
        h++
      )
        (H = r.Cartesian3.fromArray(t, 3 * (W - 1 - h), H)),
          (k = r.Cartesian3.fromArray(t, 3 * (W + h), k)),
          n.CorridorGeometryLibrary.addAttribute(N, k, z),
          n.CorridorGeometryLibrary.addAttribute(N, H, void 0, B),
          D(M, U, Y, z, B, e),
          (I = z / 3),
          (R = I + 1),
          (O = (B - 2) / 3),
          (S = O - 1),
          (q[j++] = O),
          (q[j++] = I),
          (q[j++] = S),
          (q[j++] = S),
          (q[j++] = I),
          (q[j++] = R),
          (z += 3),
          (B -= 3);
    }
    let J,
      K,
      Q = 0,
      X = 0,
      Z = o[Q++],
      $ = o[Q++];
    for (
      N.set(Z, z),
        N.set($, B - $.length + 1),
        Y = r.Cartesian3.fromArray(f, X, Y),
        b = $.length - 3,
        h = 0;
      h < b;
      h += 3
    )
      (J = a.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z, h, P), P)),
        (K = a.geodeticSurfaceNormal(r.Cartesian3.fromArray($, b - h, F), F)),
        (U = r.Cartesian3.normalize(r.Cartesian3.add(J, K, U), U)),
        D(M, U, Y, z, B, e),
        (I = z / 3),
        (R = I + 1),
        (O = (B - 2) / 3),
        (S = O - 1),
        (q[j++] = O),
        (q[j++] = I),
        (q[j++] = S),
        (q[j++] = S),
        (q[j++] = I),
        (q[j++] = R),
        (z += 3),
        (B -= 3);
    for (
      J = a.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z, b, P), P),
        K = a.geodeticSurfaceNormal(r.Cartesian3.fromArray($, b, F), F),
        U = r.Cartesian3.normalize(r.Cartesian3.add(J, K, U), U),
        X += 3,
        h = 0;
      h < u.length;
      h++
    ) {
      let t;
      g = u[h];
      const i = g.leftPositions,
        l = g.rightPositions;
      let d,
        m,
        c = L,
        p = E,
        C = V;
      if (((U = r.Cartesian3.fromArray(y, X, U)), s.defined(i))) {
        for (
          D(M, U, Y, void 0, B, e), B -= 3, d = R, m = S, t = 0;
          t < i.length / 3;
          t++
        )
          (c = r.Cartesian3.fromArray(i, 3 * t, c)),
            (q[j++] = d),
            (q[j++] = m - t - 1),
            (q[j++] = m - t),
            n.CorridorGeometryLibrary.addAttribute(N, c, void 0, B),
            (p = r.Cartesian3.fromArray(N, 3 * (m - t - 1), p)),
            (C = r.Cartesian3.fromArray(N, 3 * d, C)),
            (Y = r.Cartesian3.normalize(r.Cartesian3.subtract(p, C, Y), Y)),
            D(M, U, Y, void 0, B, e),
            (B -= 3);
        (c = r.Cartesian3.fromArray(N, 3 * d, c)),
          (p = r.Cartesian3.subtract(
            r.Cartesian3.fromArray(N, 3 * m, p),
            c,
            p
          )),
          (C = r.Cartesian3.subtract(
            r.Cartesian3.fromArray(N, 3 * (m - t), C),
            c,
            C
          )),
          (Y = r.Cartesian3.normalize(r.Cartesian3.add(p, C, Y), Y)),
          D(M, U, Y, z, void 0, e),
          (z += 3);
      } else {
        for (
          D(M, U, Y, z, void 0, e), z += 3, d = S, m = R, t = 0;
          t < l.length / 3;
          t++
        )
          (c = r.Cartesian3.fromArray(l, 3 * t, c)),
            (q[j++] = d),
            (q[j++] = m + t),
            (q[j++] = m + t + 1),
            n.CorridorGeometryLibrary.addAttribute(N, c, z),
            (p = r.Cartesian3.fromArray(N, 3 * d, p)),
            (C = r.Cartesian3.fromArray(N, 3 * (m + t), C)),
            (Y = r.Cartesian3.normalize(r.Cartesian3.subtract(p, C, Y), Y)),
            D(M, U, Y, z, void 0, e),
            (z += 3);
        (c = r.Cartesian3.fromArray(N, 3 * d, c)),
          (p = r.Cartesian3.subtract(
            r.Cartesian3.fromArray(N, 3 * (m + t), p),
            c,
            p
          )),
          (C = r.Cartesian3.subtract(
            r.Cartesian3.fromArray(N, 3 * m, C),
            c,
            C
          )),
          (Y = r.Cartesian3.normalize(
            r.Cartesian3.negate(r.Cartesian3.add(C, p, Y), Y),
            Y
          )),
          D(M, U, Y, void 0, B, e),
          (B -= 3);
      }
      for (
        Z = o[Q++],
          $ = o[Q++],
          Z.splice(0, 3),
          $.splice($.length - 3, 3),
          N.set(Z, z),
          N.set($, B - $.length + 1),
          b = $.length - 3,
          X += 3,
          Y = r.Cartesian3.fromArray(f, X, Y),
          t = 0;
        t < $.length;
        t += 3
      )
        (J = a.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z, t, P), P)),
          (K = a.geodeticSurfaceNormal(r.Cartesian3.fromArray($, b - t, F), F)),
          (U = r.Cartesian3.normalize(r.Cartesian3.add(J, K, U), U)),
          D(M, U, Y, z, B, e),
          (R = z / 3),
          (I = R - 1),
          (S = (B - 2) / 3),
          (O = S + 1),
          (q[j++] = O),
          (q[j++] = I),
          (q[j++] = S),
          (q[j++] = S),
          (q[j++] = I),
          (q[j++] = R),
          (z += 3),
          (B -= 3);
      (z -= 3), (B += 3);
    }
    if (
      ((U = r.Cartesian3.fromArray(y, y.length - 3, U)), D(M, U, Y, z, B, e), w)
    ) {
      (z += 3), (B -= 3), (H = E), (k = V);
      const t = c[1];
      for (h = 0; h < W; h++)
        (H = r.Cartesian3.fromArray(t, 3 * (v - h - 1), H)),
          (k = r.Cartesian3.fromArray(t, 3 * h, k)),
          n.CorridorGeometryLibrary.addAttribute(N, H, void 0, B),
          n.CorridorGeometryLibrary.addAttribute(N, k, z),
          D(M, U, Y, z, B, e),
          (R = z / 3),
          (I = R - 1),
          (S = (B - 2) / 3),
          (O = S + 1),
          (q[j++] = O),
          (q[j++] = I),
          (q[j++] = S),
          (q[j++] = S),
          (q[j++] = I),
          (q[j++] = R),
          (z += 3),
          (B -= 3);
    }
    if (
      ((p.position = new l.GeometryAttribute({
        componentDatatype: i.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: N
      })),
      e.st)
    ) {
      const t = new Float32Array((x / 3) * 2);
      let e,
        r,
        a = 0;
      if (w) {
        (C /= 3), (A /= 3);
        const o = Math.PI / (v + 1);
        let n;
        (r = 1 / (C - v + 1)), (e = 1 / (A - v + 1));
        const s = v / 2;
        for (h = s + 1; h < v + 1; h++)
          (n = i.CesiumMath.PI_OVER_TWO + o * h),
            (t[a++] = e * (1 + Math.cos(n))),
            (t[a++] = 0.5 * (1 + Math.sin(n)));
        for (h = 1; h < A - v + 1; h++) (t[a++] = h * e), (t[a++] = 0);
        for (h = v; h > s; h--)
          (n = i.CesiumMath.PI_OVER_TWO - h * o),
            (t[a++] = 1 - e * (1 + Math.cos(n))),
            (t[a++] = 0.5 * (1 + Math.sin(n)));
        for (h = s; h > 0; h--)
          (n = i.CesiumMath.PI_OVER_TWO - o * h),
            (t[a++] = 1 - r * (1 + Math.cos(n))),
            (t[a++] = 0.5 * (1 + Math.sin(n)));
        for (h = C - v; h > 0; h--) (t[a++] = h * r), (t[a++] = 1);
        for (h = 1; h < s + 1; h++)
          (n = i.CesiumMath.PI_OVER_TWO + o * h),
            (t[a++] = r * (1 + Math.cos(n))),
            (t[a++] = 0.5 * (1 + Math.sin(n)));
      } else {
        for (
          C /= 3, A /= 3, r = 1 / (C - 1), e = 1 / (A - 1), h = 0;
          h < A;
          h++
        )
          (t[a++] = h * e), (t[a++] = 0);
        for (h = C; h > 0; h--) (t[a++] = (h - 1) * r), (t[a++] = 1);
      }
      p.st = new l.GeometryAttribute({
        componentDatatype: i.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: t
      });
    }
    return (
      e.normal &&
        (p.normal = new l.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: M.normals
        })),
      e.tangent &&
        (p.tangent = new l.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: M.tangents
        })),
      e.bitangent &&
        (p.bitangent = new l.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: M.bitangents
        })),
      { attributes: p, indices: q }
    );
  }
  function O(t, e, r) {
    (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]);
    for (let a = 3; a < t.length; a += 3) {
      const i = t[a],
        o = t[a + 1],
        n = t[a + 2];
      (r[e++] = i),
        (r[e++] = o),
        (r[e++] = n),
        (r[e++] = i),
        (r[e++] = o),
        (r[e++] = n);
    }
    return (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]), r;
  }
  function I(t, e) {
    const a = new f.VertexFormat({
        position: e.position,
        normal: e.normal || e.bitangent || t.shadowVolume,
        tangent: e.tangent,
        bitangent: e.normal || e.bitangent,
        st: e.st
      }),
      o = t.ellipsoid,
      d = M(n.CorridorGeometryLibrary.computePositions(t), a, o),
      y = t.height,
      p = t.extrudedHeight;
    let g = d.attributes;
    const h = d.indices;
    let b = g.position.values,
      C = b.length;
    const A = new Float64Array(6 * C);
    let _ = new Float64Array(C);
    _.set(b);
    let w,
      v = new Float64Array(4 * C);
    (b = c.PolygonPipeline.scaleToGeodeticHeight(b, y, o)),
      (v = O(b, 0, v)),
      (_ = c.PolygonPipeline.scaleToGeodeticHeight(_, p, o)),
      (v = O(_, 2 * C, v)),
      A.set(b),
      A.set(_, C),
      A.set(v, 2 * C),
      (g.position.values = A),
      (g = (function (t, e) {
        if (!(e.normal || e.tangent || e.bitangent || e.st)) return t;
        const a = t.position.values;
        let i, o;
        (e.normal || e.bitangent) &&
          ((i = t.normal.values), (o = t.bitangent.values));
        const s = t.position.values.length / 18,
          l = 3 * s,
          d = 2 * s,
          u = 2 * l;
        let m;
        if (e.normal || e.bitangent || e.tangent) {
          const s = e.normal ? new Float32Array(6 * l) : void 0,
            d = e.tangent ? new Float32Array(6 * l) : void 0,
            c = e.bitangent ? new Float32Array(6 * l) : void 0;
          let f = T,
            y = G,
            p = E,
            g = V,
            h = x,
            b = L,
            C = u;
          for (m = 0; m < l; m += 3) {
            const t = C + u;
            (f = r.Cartesian3.fromArray(a, m, f)),
              (y = r.Cartesian3.fromArray(a, m + l, y)),
              (p = r.Cartesian3.fromArray(a, (m + 3) % l, p)),
              (y = r.Cartesian3.subtract(y, f, y)),
              (p = r.Cartesian3.subtract(p, f, p)),
              (g = r.Cartesian3.normalize(r.Cartesian3.cross(y, p, g), g)),
              e.normal &&
                (n.CorridorGeometryLibrary.addAttribute(s, g, t),
                n.CorridorGeometryLibrary.addAttribute(s, g, t + 3),
                n.CorridorGeometryLibrary.addAttribute(s, g, C),
                n.CorridorGeometryLibrary.addAttribute(s, g, C + 3)),
              (e.tangent || e.bitangent) &&
                ((b = r.Cartesian3.fromArray(i, m, b)),
                e.bitangent &&
                  (n.CorridorGeometryLibrary.addAttribute(c, b, t),
                  n.CorridorGeometryLibrary.addAttribute(c, b, t + 3),
                  n.CorridorGeometryLibrary.addAttribute(c, b, C),
                  n.CorridorGeometryLibrary.addAttribute(c, b, C + 3)),
                e.tangent &&
                  ((h = r.Cartesian3.normalize(r.Cartesian3.cross(b, g, h), h)),
                  n.CorridorGeometryLibrary.addAttribute(d, h, t),
                  n.CorridorGeometryLibrary.addAttribute(d, h, t + 3),
                  n.CorridorGeometryLibrary.addAttribute(d, h, C),
                  n.CorridorGeometryLibrary.addAttribute(d, h, C + 3))),
              (C += 6);
          }
          if (e.normal) {
            for (s.set(i), m = 0; m < l; m += 3)
              (s[m + l] = -i[m]),
                (s[m + l + 1] = -i[m + 1]),
                (s[m + l + 2] = -i[m + 2]);
            t.normal.values = s;
          } else t.normal = void 0;
          if (
            (e.bitangent
              ? (c.set(o), c.set(o, l), (t.bitangent.values = c))
              : (t.bitangent = void 0),
            e.tangent)
          ) {
            const e = t.tangent.values;
            d.set(e), d.set(e, l), (t.tangent.values = d);
          }
        }
        if (e.st) {
          const e = t.st.values,
            r = new Float32Array(6 * d);
          r.set(e), r.set(e, d);
          let a = 2 * d;
          for (let t = 0; t < 2; t++) {
            for (r[a++] = e[0], r[a++] = e[1], m = 2; m < d; m += 2) {
              const t = e[m],
                i = e[m + 1];
              (r[a++] = t), (r[a++] = i), (r[a++] = t), (r[a++] = i);
            }
            (r[a++] = e[0]), (r[a++] = e[1]);
          }
          t.st.values = r;
        }
        return t;
      })(g, e));
    const P = C / 3;
    if (t.shadowVolume) {
      const t = g.normal.values;
      C = t.length;
      let r = new Float32Array(6 * C);
      for (w = 0; w < C; w++) t[w] = -t[w];
      r.set(t, C),
        (r = O(t, 4 * C, r)),
        (g.extrudeDirection = new l.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: r
        })),
        e.normal || (g.normal = void 0);
    }
    if (s.defined(t.offsetAttribute)) {
      let e = new Uint8Array(6 * P);
      if (t.offsetAttribute === u.GeometryOffsetAttribute.TOP)
        e = e.fill(1, 0, P).fill(1, 2 * P, 4 * P);
      else {
        const r = t.offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1;
        e = e.fill(r);
      }
      g.applyOffset = new l.GeometryAttribute({
        componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: e
      });
    }
    const F = h.length,
      N = P + P,
      D = m.IndexDatatype.createTypedArray(A.length / 3, 2 * F + 3 * N);
    D.set(h);
    let I,
      S,
      R,
      k,
      H = F;
    for (w = 0; w < F; w += 3) {
      const t = h[w],
        e = h[w + 1],
        r = h[w + 2];
      (D[H++] = r + P), (D[H++] = e + P), (D[H++] = t + P);
    }
    for (w = 0; w < N; w += 2)
      (I = w + N),
        (S = I + N),
        (R = I + 1),
        (k = S + 1),
        (D[H++] = I),
        (D[H++] = S),
        (D[H++] = R),
        (D[H++] = R),
        (D[H++] = S),
        (D[H++] = k);
    return { attributes: g, indices: D };
  }
  const S = new r.Cartesian3(),
    R = new r.Cartesian3(),
    k = new r.Cartographic();
  function H(t, e, a, i, o, n) {
    const s = r.Cartesian3.subtract(e, t, S);
    r.Cartesian3.normalize(s, s);
    const l = a.geodeticSurfaceNormal(t, R),
      d = r.Cartesian3.cross(s, l, S);
    r.Cartesian3.multiplyByScalar(d, i, d);
    let u = o.latitude,
      m = o.longitude,
      c = n.latitude,
      f = n.longitude;
    r.Cartesian3.add(t, d, R), a.cartesianToCartographic(R, k);
    let y = k.latitude,
      p = k.longitude;
    (u = Math.min(u, y)),
      (m = Math.min(m, p)),
      (c = Math.max(c, y)),
      (f = Math.max(f, p)),
      r.Cartesian3.subtract(t, d, R),
      a.cartesianToCartographic(R, k),
      (y = k.latitude),
      (p = k.longitude),
      (u = Math.min(u, y)),
      (m = Math.min(m, p)),
      (c = Math.max(c, y)),
      (f = Math.max(f, p)),
      (o.latitude = u),
      (o.longitude = m),
      (n.latitude = c),
      (n.longitude = f);
  }
  const z = new r.Cartesian3(),
    B = new r.Cartesian3(),
    U = new r.Cartographic(),
    Y = new r.Cartographic();
  function W(e, a, i, n, l) {
    e = N(e, a);
    const d = t.arrayRemoveDuplicates(e, r.Cartesian3.equalsEpsilon),
      u = d.length;
    if (u < 2 || i <= 0) return new r.Rectangle();
    const m = 0.5 * i;
    let c, f;
    if (
      ((U.latitude = Number.POSITIVE_INFINITY),
      (U.longitude = Number.POSITIVE_INFINITY),
      (Y.latitude = Number.NEGATIVE_INFINITY),
      (Y.longitude = Number.NEGATIVE_INFINITY),
      n === o.CornerType.ROUNDED)
    ) {
      const t = d[0];
      r.Cartesian3.subtract(t, d[1], z),
        r.Cartesian3.normalize(z, z),
        r.Cartesian3.multiplyByScalar(z, m, z),
        r.Cartesian3.add(t, z, B),
        a.cartesianToCartographic(B, k),
        (c = k.latitude),
        (f = k.longitude),
        (U.latitude = Math.min(U.latitude, c)),
        (U.longitude = Math.min(U.longitude, f)),
        (Y.latitude = Math.max(Y.latitude, c)),
        (Y.longitude = Math.max(Y.longitude, f));
    }
    for (let t = 0; t < u - 1; ++t) H(d[t], d[t + 1], a, m, U, Y);
    const y = d[u - 1];
    r.Cartesian3.subtract(y, d[u - 2], z),
      r.Cartesian3.normalize(z, z),
      r.Cartesian3.multiplyByScalar(z, m, z),
      r.Cartesian3.add(y, z, B),
      H(y, B, a, m, U, Y),
      n === o.CornerType.ROUNDED &&
        (a.cartesianToCartographic(B, k),
        (c = k.latitude),
        (f = k.longitude),
        (U.latitude = Math.min(U.latitude, c)),
        (U.longitude = Math.min(U.longitude, f)),
        (Y.latitude = Math.max(Y.latitude, c)),
        (Y.longitude = Math.max(Y.longitude, f)));
    const p = s.defined(l) ? l : new r.Rectangle();
    return (
      (p.north = Y.latitude),
      (p.south = U.latitude),
      (p.east = Y.longitude),
      (p.west = U.longitude),
      p
    );
  }
  function q(t) {
    const e = (t = s.defaultValue(t, s.defaultValue.EMPTY_OBJECT)).positions,
      a = t.width,
      n = s.defaultValue(t.height, 0),
      l = s.defaultValue(t.extrudedHeight, n);
    (this._positions = e),
      (this._ellipsoid = r.Ellipsoid.clone(
        s.defaultValue(t.ellipsoid, r.Ellipsoid.WGS84)
      )),
      (this._vertexFormat = f.VertexFormat.clone(
        s.defaultValue(t.vertexFormat, f.VertexFormat.DEFAULT)
      )),
      (this._width = a),
      (this._height = Math.max(n, l)),
      (this._extrudedHeight = Math.min(n, l)),
      (this._cornerType = s.defaultValue(t.cornerType, o.CornerType.ROUNDED)),
      (this._granularity = s.defaultValue(
        t.granularity,
        i.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._shadowVolume = s.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createCorridorGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this.packedLength =
        1 +
        e.length * r.Cartesian3.packedLength +
        r.Ellipsoid.packedLength +
        f.VertexFormat.packedLength +
        7);
  }
  q.pack = function (t, e, a) {
    a = s.defaultValue(a, 0);
    const i = t._positions,
      o = i.length;
    e[a++] = o;
    for (let t = 0; t < o; ++t, a += r.Cartesian3.packedLength)
      r.Cartesian3.pack(i[t], e, a);
    return (
      r.Ellipsoid.pack(t._ellipsoid, e, a),
      (a += r.Ellipsoid.packedLength),
      f.VertexFormat.pack(t._vertexFormat, e, a),
      (a += f.VertexFormat.packedLength),
      (e[a++] = t._width),
      (e[a++] = t._height),
      (e[a++] = t._extrudedHeight),
      (e[a++] = t._cornerType),
      (e[a++] = t._granularity),
      (e[a++] = t._shadowVolume ? 1 : 0),
      (e[a] = s.defaultValue(t._offsetAttribute, -1)),
      e
    );
  };
  const j = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    J = new f.VertexFormat(),
    K = {
      positions: void 0,
      ellipsoid: j,
      vertexFormat: J,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0
    };
  return (
    (q.unpack = function (t, e, a) {
      e = s.defaultValue(e, 0);
      const i = t[e++],
        o = new Array(i);
      for (let a = 0; a < i; ++a, e += r.Cartesian3.packedLength)
        o[a] = r.Cartesian3.unpack(t, e);
      const n = r.Ellipsoid.unpack(t, e, j);
      e += r.Ellipsoid.packedLength;
      const l = f.VertexFormat.unpack(t, e, J);
      e += f.VertexFormat.packedLength;
      const d = t[e++],
        u = t[e++],
        m = t[e++],
        c = t[e++],
        y = t[e++],
        p = 1 === t[e++],
        g = t[e];
      return s.defined(a)
        ? ((a._positions = o),
          (a._ellipsoid = r.Ellipsoid.clone(n, a._ellipsoid)),
          (a._vertexFormat = f.VertexFormat.clone(l, a._vertexFormat)),
          (a._width = d),
          (a._height = u),
          (a._extrudedHeight = m),
          (a._cornerType = c),
          (a._granularity = y),
          (a._shadowVolume = p),
          (a._offsetAttribute = -1 === g ? void 0 : g),
          a)
        : ((K.positions = o),
          (K.width = d),
          (K.height = u),
          (K.extrudedHeight = m),
          (K.cornerType = c),
          (K.granularity = y),
          (K.shadowVolume = p),
          (K.offsetAttribute = -1 === g ? void 0 : g),
          new q(K));
    }),
    (q.computeRectangle = function (t, e) {
      const a = (t = s.defaultValue(t, s.defaultValue.EMPTY_OBJECT)).positions,
        i = t.width;
      return W(
        a,
        s.defaultValue(t.ellipsoid, r.Ellipsoid.WGS84),
        i,
        s.defaultValue(t.cornerType, o.CornerType.ROUNDED),
        e
      );
    }),
    (q.createGeometry = function (a) {
      let o = a._positions;
      const d = a._width,
        m = a._ellipsoid;
      o = N(o, m);
      const f = t.arrayRemoveDuplicates(o, r.Cartesian3.equalsEpsilon);
      if (f.length < 2 || d <= 0) return;
      const y = a._height,
        p = a._extrudedHeight,
        g = !i.CesiumMath.equalsEpsilon(y, p, 0, i.CesiumMath.EPSILON2),
        h = a._vertexFormat,
        b = {
          ellipsoid: m,
          positions: f,
          width: d,
          cornerType: a._cornerType,
          granularity: a._granularity,
          saveAttributes: !0
        };
      let C;
      if (g)
        (b.height = y),
          (b.extrudedHeight = p),
          (b.shadowVolume = a._shadowVolume),
          (b.offsetAttribute = a._offsetAttribute),
          (C = I(b, h));
      else {
        if (
          ((C = M(n.CorridorGeometryLibrary.computePositions(b), h, m)),
          (C.attributes.position.values =
            c.PolygonPipeline.scaleToGeodeticHeight(
              C.attributes.position.values,
              y,
              m
            )),
          s.defined(a._offsetAttribute))
        ) {
          const t =
              a._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1,
            e = C.attributes.position.values.length,
            r = new Uint8Array(e / 3).fill(t);
          C.attributes.applyOffset = new l.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: r
          });
        }
      }
      const A = C.attributes,
        _ = e.BoundingSphere.fromVertices(A.position.values, void 0, 3);
      return (
        h.position || (C.attributes.position.values = void 0),
        new l.Geometry({
          attributes: A,
          indices: C.indices,
          primitiveType: l.PrimitiveType.TRIANGLES,
          boundingSphere: _,
          offsetAttribute: a._offsetAttribute
        })
      );
    }),
    (q.createShadowVolume = function (t, e, r) {
      const a = t._granularity,
        i = t._ellipsoid,
        o = e(a, i),
        n = r(a, i);
      return new q({
        positions: t._positions,
        width: t._width,
        cornerType: t._cornerType,
        ellipsoid: i,
        granularity: a,
        extrudedHeight: o,
        height: n,
        vertexFormat: f.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      });
    }),
    Object.defineProperties(q.prototype, {
      rectangle: {
        get: function () {
          return (
            s.defined(this._rectangle) ||
              (this._rectangle = W(
                this._positions,
                this._ellipsoid,
                this._width,
                this._cornerType
              )),
            this._rectangle
          );
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return [0, 0, 0, 1, 1, 0];
        }
      }
    }),
    function (t, e) {
      return (
        s.defined(e) && (t = q.unpack(t, e)),
        (t._ellipsoid = r.Ellipsoid.clone(t._ellipsoid)),
        q.createGeometry(t)
      );
    }
  );
});
