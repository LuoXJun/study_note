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
  './AttributeCompression-5744d52e',
  './Matrix2-73789715',
  './RuntimeError-4f8ec8a2',
  './defaultValue-97284df2',
  './ComponentDatatype-e7fbe225',
  './Transforms-d3d3b2a9',
  './EncodedCartesian3-a9a8a281',
  './GeometryAttribute-fd1d7e90',
  './IndexDatatype-65271ba3',
  './IntersectionTests-33ace2d6',
  './Plane-e916220d'
], function (e, t, n, i, r, a, s, o, u, c, l, p) {
  'use strict';
  const d = new n.Cartesian3(),
    f = new n.Cartesian3(),
    y = new n.Cartesian3();
  const m = {
    calculateACMR: function (e) {
      const t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).indices;
      let n = e.maximumIndex;
      const i = r.defaultValue(e.cacheSize, 24),
        a = t.length;
      if (!r.defined(n)) {
        n = 0;
        let e = 0,
          i = t[e];
        for (; e < a; ) i > n && (n = i), ++e, (i = t[e]);
      }
      const s = [];
      for (let e = 0; e < n + 1; e++) s[e] = 0;
      let o = i + 1;
      for (let e = 0; e < a; ++e) o - s[t[e]] > i && ((s[t[e]] = o), ++o);
      return (o - i + 1) / (a / 3);
    }
  };
  m.tipsify = function (e) {
    const t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).indices,
      n = e.maximumIndex,
      i = r.defaultValue(e.cacheSize, 24);
    let a;
    function s(e, t, n, i, r, s, o) {
      let u,
        c = -1,
        l = -1,
        p = 0;
      for (; p < n.length; ) {
        const e = n[p];
        i[e].numLiveTriangles &&
          ((u = 0),
          r - i[e].timeStamp + 2 * i[e].numLiveTriangles <= t &&
            (u = r - i[e].timeStamp),
          (u > l || -1 === l) && ((l = u), (c = e))),
          ++p;
      }
      return -1 === c
        ? (function (e, t, n, i) {
            for (; t.length >= 1; ) {
              const n = t[t.length - 1];
              if ((t.splice(t.length - 1, 1), e[n].numLiveTriangles > 0))
                return n;
            }
            for (; a < i; ) {
              if (e[a].numLiveTriangles > 0) return ++a, a - 1;
              ++a;
            }
            return -1;
          })(i, s, 0, o)
        : c;
    }
    const o = t.length;
    let u = 0,
      c = 0,
      l = t[c];
    const p = o;
    if (r.defined(n)) u = n + 1;
    else {
      for (; c < p; ) l > u && (u = l), ++c, (l = t[c]);
      if (-1 === u) return 0;
      ++u;
    }
    const d = [];
    let f;
    for (f = 0; f < u; f++)
      d[f] = { numLiveTriangles: 0, timeStamp: 0, vertexTriangles: [] };
    c = 0;
    let y = 0;
    for (; c < p; )
      d[t[c]].vertexTriangles.push(y),
        ++d[t[c]].numLiveTriangles,
        d[t[c + 1]].vertexTriangles.push(y),
        ++d[t[c + 1]].numLiveTriangles,
        d[t[c + 2]].vertexTriangles.push(y),
        ++d[t[c + 2]].numLiveTriangles,
        ++y,
        (c += 3);
    let m = 0,
      C = i + 1;
    a = 1;
    let h = [];
    const v = [];
    let b,
      g,
      A = 0;
    const T = [],
      x = o / 3,
      P = [];
    for (f = 0; f < x; f++) P[f] = !1;
    let w, S;
    for (; -1 !== m; ) {
      (h = []), (g = d[m]), (S = g.vertexTriangles.length);
      for (let e = 0; e < S; ++e)
        if (((y = g.vertexTriangles[e]), !P[y])) {
          (P[y] = !0), (c = y + y + y);
          for (let e = 0; e < 3; ++e)
            (w = t[c]),
              h.push(w),
              v.push(w),
              (T[A] = w),
              ++A,
              (b = d[w]),
              --b.numLiveTriangles,
              C - b.timeStamp > i && ((b.timeStamp = C), ++C),
              ++c;
        }
      m = s(0, i, h, d, C, v, u);
    }
    return T;
  };
  const C = {};
  function h(e, t, n, i, r) {
    (e[t++] = n),
      (e[t++] = i),
      (e[t++] = i),
      (e[t++] = r),
      (e[t++] = r),
      (e[t] = n);
  }
  function v(e) {
    const t = {};
    for (const n in e)
      if (e.hasOwnProperty(n) && r.defined(e[n]) && r.defined(e[n].values)) {
        const i = e[n];
        t[n] = new u.GeometryAttribute({
          componentDatatype: i.componentDatatype,
          componentsPerAttribute: i.componentsPerAttribute,
          normalize: i.normalize,
          values: []
        });
      }
    return t;
  }
  function b(e, t, n) {
    for (const i in t)
      if (t.hasOwnProperty(i) && r.defined(t[i]) && r.defined(t[i].values)) {
        const r = t[i];
        for (let t = 0; t < r.componentsPerAttribute; ++t)
          e[i].values.push(r.values[n * r.componentsPerAttribute + t]);
      }
  }
  (C.toWireframe = function (e) {
    const t = e.indices;
    if (r.defined(t)) {
      switch (e.primitiveType) {
        case u.PrimitiveType.TRIANGLES:
          e.indices = (function (e) {
            const t = e.length,
              n = (t / 3) * 6,
              i = c.IndexDatatype.createTypedArray(t, n);
            let r = 0;
            for (let n = 0; n < t; n += 3, r += 6)
              h(i, r, e[n], e[n + 1], e[n + 2]);
            return i;
          })(t);
          break;
        case u.PrimitiveType.TRIANGLE_STRIP:
          e.indices = (function (e) {
            const t = e.length;
            if (t >= 3) {
              const n = 6 * (t - 2),
                i = c.IndexDatatype.createTypedArray(t, n);
              h(i, 0, e[0], e[1], e[2]);
              let r = 6;
              for (let n = 3; n < t; ++n, r += 6)
                h(i, r, e[n - 1], e[n], e[n - 2]);
              return i;
            }
            return new Uint16Array();
          })(t);
          break;
        case u.PrimitiveType.TRIANGLE_FAN:
          e.indices = (function (e) {
            if (e.length > 0) {
              const t = e.length - 1,
                n = 6 * (t - 1),
                i = c.IndexDatatype.createTypedArray(t, n),
                r = e[0];
              let a = 0;
              for (let n = 1; n < t; ++n, a += 6) h(i, a, r, e[n], e[n + 1]);
              return i;
            }
            return new Uint16Array();
          })(t);
      }
      e.primitiveType = u.PrimitiveType.LINES;
    }
    return e;
  }),
    (C.createLineSegmentsForVectors = function (e, t, n) {
      (t = r.defaultValue(t, 'normal')), (n = r.defaultValue(n, 1e4));
      const i = e.attributes.position.values,
        o = e.attributes[t].values,
        c = i.length,
        l = new Float64Array(2 * c);
      let p,
        d = 0;
      for (let e = 0; e < c; e += 3)
        (l[d++] = i[e]),
          (l[d++] = i[e + 1]),
          (l[d++] = i[e + 2]),
          (l[d++] = i[e] + o[e] * n),
          (l[d++] = i[e + 1] + o[e + 1] * n),
          (l[d++] = i[e + 2] + o[e + 2] * n);
      const f = e.boundingSphere;
      return (
        r.defined(f) && (p = new s.BoundingSphere(f.center, f.radius + n)),
        new u.Geometry({
          attributes: {
            position: new u.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: l
            })
          },
          primitiveType: u.PrimitiveType.LINES,
          boundingSphere: p
        })
      );
    }),
    (C.createAttributeLocations = function (e) {
      const t = [
          'position',
          'positionHigh',
          'positionLow',
          'position3DHigh',
          'position3DLow',
          'position2DHigh',
          'position2DLow',
          'pickColor',
          'normal',
          'st',
          'tangent',
          'bitangent',
          'extrudeDirection',
          'compressedAttributes'
        ],
        n = e.attributes,
        i = {};
      let a,
        s = 0;
      const o = t.length;
      for (a = 0; a < o; ++a) {
        const e = t[a];
        r.defined(n[e]) && (i[e] = s++);
      }
      for (const e in n)
        n.hasOwnProperty(e) && !r.defined(i[e]) && (i[e] = s++);
      return i;
    }),
    (C.reorderForPreVertexCache = function (e) {
      const t = u.Geometry.computeNumberOfVertices(e),
        n = e.indices;
      if (r.defined(n)) {
        const i = new Int32Array(t);
        for (let e = 0; e < t; e++) i[e] = -1;
        const s = n,
          o = s.length,
          u = c.IndexDatatype.createTypedArray(t, o);
        let l,
          p = 0,
          d = 0,
          f = 0;
        for (; p < o; )
          (l = i[s[p]]),
            -1 !== l ? (u[d] = l) : ((l = s[p]), (i[l] = f), (u[d] = f), ++f),
            ++p,
            ++d;
        e.indices = u;
        const y = e.attributes;
        for (const e in y)
          if (
            y.hasOwnProperty(e) &&
            r.defined(y[e]) &&
            r.defined(y[e].values)
          ) {
            const n = y[e],
              r = n.values;
            let s = 0;
            const o = n.componentsPerAttribute,
              u = a.ComponentDatatype.createTypedArray(
                n.componentDatatype,
                f * o
              );
            for (; s < t; ) {
              const e = i[s];
              if (-1 !== e)
                for (let t = 0; t < o; t++) u[o * e + t] = r[o * s + t];
              ++s;
            }
            n.values = u;
          }
      }
      return e;
    }),
    (C.reorderForPostVertexCache = function (e, t) {
      const n = e.indices;
      if (e.primitiveType === u.PrimitiveType.TRIANGLES && r.defined(n)) {
        const i = n.length;
        let r = 0;
        for (let e = 0; e < i; e++) n[e] > r && (r = n[e]);
        e.indices = m.tipsify({ indices: n, maximumIndex: r, cacheSize: t });
      }
      return e;
    }),
    (C.fitToUnsignedShortIndices = function (e) {
      const t = [],
        n = u.Geometry.computeNumberOfVertices(e);
      if (r.defined(e.indices) && n >= a.CesiumMath.SIXTY_FOUR_KILOBYTES) {
        let n = [],
          i = [],
          s = 0,
          o = v(e.attributes);
        const c = e.indices,
          l = c.length;
        let p;
        e.primitiveType === u.PrimitiveType.TRIANGLES
          ? (p = 3)
          : e.primitiveType === u.PrimitiveType.LINES
          ? (p = 2)
          : e.primitiveType === u.PrimitiveType.POINTS && (p = 1);
        for (let d = 0; d < l; d += p) {
          for (let t = 0; t < p; ++t) {
            const a = c[d + t];
            let u = n[a];
            r.defined(u) || ((u = s++), (n[a] = u), b(o, e.attributes, a)),
              i.push(u);
          }
          s + p >= a.CesiumMath.SIXTY_FOUR_KILOBYTES &&
            (t.push(
              new u.Geometry({
                attributes: o,
                indices: i,
                primitiveType: e.primitiveType,
                boundingSphere: e.boundingSphere,
                boundingSphereCV: e.boundingSphereCV
              })
            ),
            (n = []),
            (i = []),
            (s = 0),
            (o = v(e.attributes)));
        }
        0 !== i.length &&
          t.push(
            new u.Geometry({
              attributes: o,
              indices: i,
              primitiveType: e.primitiveType,
              boundingSphere: e.boundingSphere,
              boundingSphereCV: e.boundingSphereCV
            })
          );
      } else t.push(e);
      return t;
    });
  const g = new n.Cartesian3(),
    A = new n.Cartographic();
  C.projectTo2D = function (e, t, i, o, c) {
    const l = e.attributes[t],
      p = (c = r.defined(c) ? c : new s.GeographicProjection()).ellipsoid,
      d = l.values,
      f = new Float64Array(d.length);
    let y = 0;
    for (let e = 0; e < d.length; e += 3) {
      const t = n.Cartesian3.fromArray(d, e, g),
        i = p.cartesianToCartographic(t, A),
        r = c.project(i, g);
      (f[y++] = r.x), (f[y++] = r.y), (f[y++] = r.z);
    }
    return (
      (e.attributes[i] = l),
      (e.attributes[o] = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: f
      })),
      delete e.attributes[t],
      e
    );
  };
  const T = { high: 0, low: 0 };
  C.encodeAttribute = function (e, t, n, i) {
    const r = e.attributes[t],
      s = r.values,
      c = s.length,
      l = new Float32Array(c),
      p = new Float32Array(c);
    for (let e = 0; e < c; ++e)
      o.EncodedCartesian3.encode(s[e], T), (l[e] = T.high), (p[e] = T.low);
    const d = r.componentsPerAttribute;
    return (
      (e.attributes[n] = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: d,
        values: l
      })),
      (e.attributes[i] = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: d,
        values: p
      })),
      delete e.attributes[t],
      e
    );
  };
  let x = new n.Cartesian3();
  function P(e, t) {
    if (r.defined(t)) {
      const i = t.values,
        r = i.length;
      for (let t = 0; t < r; t += 3)
        n.Cartesian3.unpack(i, t, x),
          n.Matrix4.multiplyByPoint(e, x, x),
          n.Cartesian3.pack(x, i, t);
    }
  }
  function w(e, t) {
    if (r.defined(t)) {
      const i = t.values,
        r = i.length;
      for (let t = 0; t < r; t += 3)
        n.Cartesian3.unpack(i, t, x),
          n.Matrix3.multiplyByVector(e, x, x),
          (x = n.Cartesian3.normalize(x, x)),
          n.Cartesian3.pack(x, i, t);
    }
  }
  const S = new n.Matrix4(),
    I = new n.Matrix3();
  C.transformToWorldCoordinates = function (e) {
    const t = e.modelMatrix;
    if (n.Matrix4.equals(t, n.Matrix4.IDENTITY)) return e;
    const i = e.geometry.attributes;
    P(t, i.position),
      P(t, i.prevPosition),
      P(t, i.nextPosition),
      (r.defined(i.normal) || r.defined(i.tangent) || r.defined(i.bitangent)) &&
        (n.Matrix4.inverse(t, S),
        n.Matrix4.transpose(S, S),
        n.Matrix4.getMatrix3(S, I),
        w(I, i.normal),
        w(I, i.tangent),
        w(I, i.bitangent));
    const a = e.geometry.boundingSphere;
    return (
      r.defined(a) &&
        (e.geometry.boundingSphere = s.BoundingSphere.transform(a, t, a)),
      (e.modelMatrix = n.Matrix4.clone(n.Matrix4.IDENTITY)),
      e
    );
  };
  const O = new n.Cartesian3();
  function E(e, t) {
    const i = e.length;
    let o, l, p, d;
    e[0].modelMatrix;
    const f = r.defined(e[0][t].indices),
      y = e[0][t].primitiveType,
      m = (function (e, t) {
        const n = e.length,
          i = {},
          s = e[0][t].attributes;
        let o;
        for (o in s)
          if (
            s.hasOwnProperty(o) &&
            r.defined(s[o]) &&
            r.defined(s[o].values)
          ) {
            const c = s[o];
            let l = c.values.length,
              p = !0;
            for (let i = 1; i < n; ++i) {
              const n = e[i][t].attributes[o];
              if (
                !r.defined(n) ||
                c.componentDatatype !== n.componentDatatype ||
                c.componentsPerAttribute !== n.componentsPerAttribute ||
                c.normalize !== n.normalize
              ) {
                p = !1;
                break;
              }
              l += n.values.length;
            }
            p &&
              (i[o] = new u.GeometryAttribute({
                componentDatatype: c.componentDatatype,
                componentsPerAttribute: c.componentsPerAttribute,
                normalize: c.normalize,
                values: a.ComponentDatatype.createTypedArray(
                  c.componentDatatype,
                  l
                )
              }));
          }
        return i;
      })(e, t);
    let C, h, v, b;
    for (o in m)
      if (m.hasOwnProperty(o))
        for (C = m[o].values, d = 0, l = 0; l < i; ++l)
          for (
            h = e[l][t].attributes[o].values, v = h.length, p = 0;
            p < v;
            ++p
          )
            C[d++] = h[p];
    if (f) {
      let n = 0;
      for (l = 0; l < i; ++l) n += e[l][t].indices.length;
      const r = u.Geometry.computeNumberOfVertices(
          new u.Geometry({
            attributes: m,
            primitiveType: u.PrimitiveType.POINTS
          })
        ),
        a = c.IndexDatatype.createTypedArray(r, n);
      let s = 0,
        o = 0;
      for (l = 0; l < i; ++l) {
        const n = e[l][t].indices,
          i = n.length;
        for (d = 0; d < i; ++d) a[s++] = o + n[d];
        o += u.Geometry.computeNumberOfVertices(e[l][t]);
      }
      b = a;
    }
    let g,
      A = new n.Cartesian3(),
      T = 0;
    for (l = 0; l < i; ++l) {
      if (((g = e[l][t].boundingSphere), !r.defined(g))) {
        A = void 0;
        break;
      }
      n.Cartesian3.add(g.center, A, A);
    }
    if (r.defined(A))
      for (n.Cartesian3.divideByScalar(A, i, A), l = 0; l < i; ++l) {
        g = e[l][t].boundingSphere;
        const i =
          n.Cartesian3.magnitude(n.Cartesian3.subtract(g.center, A, O)) +
          g.radius;
        i > T && (T = i);
      }
    return new u.Geometry({
      attributes: m,
      indices: b,
      primitiveType: y,
      boundingSphere: r.defined(A) ? new s.BoundingSphere(A, T) : void 0
    });
  }
  C.combineInstances = function (e) {
    const t = [],
      n = [],
      i = e.length;
    for (let a = 0; a < i; ++a) {
      const i = e[a];
      r.defined(i.geometry)
        ? t.push(i)
        : r.defined(i.westHemisphereGeometry) &&
          r.defined(i.eastHemisphereGeometry) &&
          n.push(i);
    }
    const a = [];
    return (
      t.length > 0 && a.push(E(t, 'geometry')),
      n.length > 0 &&
        (a.push(E(n, 'westHemisphereGeometry')),
        a.push(E(n, 'eastHemisphereGeometry'))),
      a
    );
  };
  const N = new n.Cartesian3(),
    L = new n.Cartesian3(),
    z = new n.Cartesian3(),
    D = new n.Cartesian3();
  C.computeNormal = function (e) {
    const t = e.indices,
      i = e.attributes,
      r = i.position.values,
      s = i.position.values.length / 3,
      o = t.length,
      c = new Array(s),
      l = new Array(o / 3),
      p = new Array(o);
    let d;
    for (d = 0; d < s; d++)
      c[d] = { indexOffset: 0, count: 0, currentCount: 0 };
    let f = 0;
    for (d = 0; d < o; d += 3) {
      const e = t[d],
        i = t[d + 1],
        a = t[d + 2],
        s = 3 * e,
        o = 3 * i,
        u = 3 * a;
      (L.x = r[s]),
        (L.y = r[s + 1]),
        (L.z = r[s + 2]),
        (z.x = r[o]),
        (z.y = r[o + 1]),
        (z.z = r[o + 2]),
        (D.x = r[u]),
        (D.y = r[u + 1]),
        (D.z = r[u + 2]),
        c[e].count++,
        c[i].count++,
        c[a].count++,
        n.Cartesian3.subtract(z, L, z),
        n.Cartesian3.subtract(D, L, D),
        (l[f] = n.Cartesian3.cross(z, D, new n.Cartesian3())),
        f++;
    }
    let y,
      m = 0;
    for (d = 0; d < s; d++) (c[d].indexOffset += m), (m += c[d].count);
    for (f = 0, d = 0; d < o; d += 3) {
      y = c[t[d]];
      let e = y.indexOffset + y.currentCount;
      (p[e] = f),
        y.currentCount++,
        (y = c[t[d + 1]]),
        (e = y.indexOffset + y.currentCount),
        (p[e] = f),
        y.currentCount++,
        (y = c[t[d + 2]]),
        (e = y.indexOffset + y.currentCount),
        (p[e] = f),
        y.currentCount++,
        f++;
    }
    const C = new Float32Array(3 * s);
    for (d = 0; d < s; d++) {
      const e = 3 * d;
      if (((y = c[d]), n.Cartesian3.clone(n.Cartesian3.ZERO, N), y.count > 0)) {
        for (f = 0; f < y.count; f++)
          n.Cartesian3.add(N, l[p[y.indexOffset + f]], N);
        n.Cartesian3.equalsEpsilon(
          n.Cartesian3.ZERO,
          N,
          a.CesiumMath.EPSILON10
        ) && n.Cartesian3.clone(l[p[y.indexOffset]], N);
      }
      n.Cartesian3.equalsEpsilon(
        n.Cartesian3.ZERO,
        N,
        a.CesiumMath.EPSILON10
      ) && (N.z = 1),
        n.Cartesian3.normalize(N, N),
        (C[e] = N.x),
        (C[e + 1] = N.y),
        (C[e + 2] = N.z);
    }
    return (
      (e.attributes.normal = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: C
      })),
      e
    );
  };
  const M = new n.Cartesian3(),
    G = new n.Cartesian3(),
    R = new n.Cartesian3();
  C.computeTangentAndBitangent = function (e) {
    e.attributes;
    const t = e.indices,
      i = e.attributes.position.values,
      r = e.attributes.normal.values,
      s = e.attributes.st.values,
      o = e.attributes.position.values.length / 3,
      c = t.length,
      l = new Array(3 * o);
    let p, d, f, y;
    for (p = 0; p < l.length; p++) l[p] = 0;
    for (p = 0; p < c; p += 3) {
      const e = t[p],
        n = t[p + 1],
        r = t[p + 2];
      (d = 3 * e), (f = 3 * n), (y = 3 * r);
      const a = 2 * e,
        o = 2 * n,
        u = 2 * r,
        c = i[d],
        m = i[d + 1],
        C = i[d + 2],
        h = s[a],
        v = s[a + 1],
        b = s[o + 1] - v,
        g = s[u + 1] - v,
        A = 1 / ((s[o] - h) * g - (s[u] - h) * b),
        T = (g * (i[f] - c) - b * (i[y] - c)) * A,
        x = (g * (i[f + 1] - m) - b * (i[y + 1] - m)) * A,
        P = (g * (i[f + 2] - C) - b * (i[y + 2] - C)) * A;
      (l[d] += T),
        (l[d + 1] += x),
        (l[d + 2] += P),
        (l[f] += T),
        (l[f + 1] += x),
        (l[f + 2] += P),
        (l[y] += T),
        (l[y + 1] += x),
        (l[y + 2] += P);
    }
    const m = new Float32Array(3 * o),
      C = new Float32Array(3 * o);
    for (p = 0; p < o; p++) {
      (d = 3 * p), (f = d + 1), (y = d + 2);
      const e = n.Cartesian3.fromArray(r, d, M),
        t = n.Cartesian3.fromArray(l, d, R),
        i = n.Cartesian3.dot(e, t);
      n.Cartesian3.multiplyByScalar(e, i, G),
        n.Cartesian3.normalize(n.Cartesian3.subtract(t, G, t), t),
        (m[d] = t.x),
        (m[f] = t.y),
        (m[y] = t.z),
        n.Cartesian3.normalize(n.Cartesian3.cross(e, t, t), t),
        (C[d] = t.x),
        (C[f] = t.y),
        (C[y] = t.z);
    }
    return (
      (e.attributes.tangent = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: m
      })),
      (e.attributes.bitangent = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: C
      })),
      e
    );
  };
  const V = new n.Cartesian2(),
    F = new n.Cartesian3(),
    B = new n.Cartesian3(),
    _ = new n.Cartesian3();
  let k = new n.Cartesian2();
  function q(e) {
    switch (e.primitiveType) {
      case u.PrimitiveType.TRIANGLE_FAN:
        return (function (e) {
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, 3 * (t - 2));
          (n[0] = 1), (n[1] = 0), (n[2] = 2);
          let i = 3;
          for (let e = 3; e < t; ++e)
            (n[i++] = e - 1), (n[i++] = 0), (n[i++] = e);
          return (
            (e.indices = n), (e.primitiveType = u.PrimitiveType.TRIANGLES), e
          );
        })(e);
      case u.PrimitiveType.TRIANGLE_STRIP:
        return (function (e) {
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, 3 * (t - 2));
          (n[0] = 0),
            (n[1] = 1),
            (n[2] = 2),
            t > 3 && ((n[3] = 0), (n[4] = 2), (n[5] = 3));
          let i = 6;
          for (let e = 3; e < t - 1; e += 2)
            (n[i++] = e),
              (n[i++] = e - 1),
              (n[i++] = e + 1),
              e + 2 < t && ((n[i++] = e), (n[i++] = e + 1), (n[i++] = e + 2));
          return (
            (e.indices = n), (e.primitiveType = u.PrimitiveType.TRIANGLES), e
          );
        })(e);
      case u.PrimitiveType.TRIANGLES:
        return (function (e) {
          if (r.defined(e.indices)) return e;
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, t);
          for (let e = 0; e < t; ++e) n[e] = e;
          return (e.indices = n), e;
        })(e);
      case u.PrimitiveType.LINE_STRIP:
        return (function (e) {
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, 2 * (t - 1));
          (n[0] = 0), (n[1] = 1);
          let i = 2;
          for (let e = 2; e < t; ++e) (n[i++] = e - 1), (n[i++] = e);
          return (e.indices = n), (e.primitiveType = u.PrimitiveType.LINES), e;
        })(e);
      case u.PrimitiveType.LINE_LOOP:
        return (function (e) {
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, 2 * t);
          (n[0] = 0), (n[1] = 1);
          let i = 2;
          for (let e = 2; e < t; ++e) (n[i++] = e - 1), (n[i++] = e);
          return (
            (n[i++] = t - 1),
            (n[i] = 0),
            (e.indices = n),
            (e.primitiveType = u.PrimitiveType.LINES),
            e
          );
        })(e);
      case u.PrimitiveType.LINES:
        return (function (e) {
          if (r.defined(e.indices)) return e;
          const t = u.Geometry.computeNumberOfVertices(e),
            n = c.IndexDatatype.createTypedArray(t, t);
          for (let e = 0; e < t; ++e) n[e] = e;
          return (e.indices = n), e;
        })(e);
    }
    return e;
  }
  function U(e, t) {
    Math.abs(e.y) < a.CesiumMath.EPSILON6 &&
      (e.y = t ? -a.CesiumMath.EPSILON6 : a.CesiumMath.EPSILON6);
  }
  C.compressVertices = function (e) {
    const i = e.attributes.extrudeDirection;
    let s, o;
    if (r.defined(i)) {
      const r = i.values;
      o = r.length / 3;
      const c = new Float32Array(2 * o);
      let l = 0;
      for (s = 0; s < o; ++s)
        n.Cartesian3.fromArray(r, 3 * s, F),
          n.Cartesian3.equals(F, n.Cartesian3.ZERO)
            ? (l += 2)
            : ((k = t.AttributeCompression.octEncodeInRange(F, 65535, k)),
              (c[l++] = k.x),
              (c[l++] = k.y));
      return (
        (e.attributes.compressedAttributes = new u.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: c
        })),
        delete e.attributes.extrudeDirection,
        e
      );
    }
    const c = e.attributes.normal,
      l = e.attributes.st,
      p = r.defined(c),
      d = r.defined(l);
    if (!p && !d) return e;
    const f = e.attributes.tangent,
      y = e.attributes.bitangent,
      m = r.defined(f),
      C = r.defined(y);
    let h, v, b, g;
    p && (h = c.values),
      d && (v = l.values),
      m && (b = f.values),
      C && (g = y.values);
    o = (p ? h.length : v.length) / (p ? 3 : 2);
    let A = o,
      T = d && p ? 2 : 1;
    (T += m || C ? 1 : 0), (A *= T);
    const x = new Float32Array(A);
    let P = 0;
    for (s = 0; s < o; ++s) {
      d &&
        (n.Cartesian2.fromArray(v, 2 * s, V),
        (x[P++] = t.AttributeCompression.compressTextureCoordinates(V)));
      const e = 3 * s;
      p && r.defined(b) && r.defined(g)
        ? (n.Cartesian3.fromArray(h, e, F),
          n.Cartesian3.fromArray(b, e, B),
          n.Cartesian3.fromArray(g, e, _),
          t.AttributeCompression.octPack(F, B, _, V),
          (x[P++] = V.x),
          (x[P++] = V.y))
        : (p &&
            (n.Cartesian3.fromArray(h, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))),
          m &&
            (n.Cartesian3.fromArray(b, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))),
          C &&
            (n.Cartesian3.fromArray(g, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))));
    }
    return (
      (e.attributes.compressedAttributes = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: T,
        values: x
      })),
      p && delete e.attributes.normal,
      d && delete e.attributes.st,
      C && delete e.attributes.bitangent,
      m && delete e.attributes.tangent,
      e
    );
  };
  const Y = new n.Cartesian3();
  function Z(e, t, i, r) {
    n.Cartesian3.add(
      e,
      n.Cartesian3.multiplyByScalar(
        n.Cartesian3.subtract(t, e, Y),
        e.y / (e.y - t.y),
        Y
      ),
      i
    ),
      n.Cartesian3.clone(i, r),
      U(i, !0),
      U(r, !1);
  }
  const H = new n.Cartesian3(),
    W = new n.Cartesian3(),
    X = new n.Cartesian3(),
    j = new n.Cartesian3(),
    J = { positions: new Array(7), indices: new Array(9) };
  function K(e, t, n) {
    if (e.x >= 0 || t.x >= 0 || n.x >= 0) return;
    !(function (e, t, n) {
      if (0 !== e.y && 0 !== t.y && 0 !== n.y)
        return U(e, e.y < 0), U(t, t.y < 0), void U(n, n.y < 0);
      const i = Math.abs(e.y),
        r = Math.abs(t.y),
        s = Math.abs(n.y);
      let o;
      o =
        i > r
          ? i > s
            ? a.CesiumMath.sign(e.y)
            : a.CesiumMath.sign(n.y)
          : r > s
          ? a.CesiumMath.sign(t.y)
          : a.CesiumMath.sign(n.y);
      const u = o < 0;
      U(e, u), U(t, u), U(n, u);
    })(e, t, n);
    const i = e.y < 0,
      r = t.y < 0,
      s = n.y < 0;
    let o = 0;
    (o += i ? 1 : 0), (o += r ? 1 : 0), (o += s ? 1 : 0);
    const u = J.indices;
    1 === o
      ? ((u[1] = 3),
        (u[2] = 4),
        (u[5] = 6),
        (u[7] = 6),
        (u[8] = 5),
        i
          ? (Z(e, t, H, X),
            Z(e, n, W, j),
            (u[0] = 0),
            (u[3] = 1),
            (u[4] = 2),
            (u[6] = 1))
          : r
          ? (Z(t, n, H, X),
            Z(t, e, W, j),
            (u[0] = 1),
            (u[3] = 2),
            (u[4] = 0),
            (u[6] = 2))
          : s &&
            (Z(n, e, H, X),
            Z(n, t, W, j),
            (u[0] = 2),
            (u[3] = 0),
            (u[4] = 1),
            (u[6] = 0)))
      : 2 === o &&
        ((u[2] = 4),
        (u[4] = 4),
        (u[5] = 3),
        (u[7] = 5),
        (u[8] = 6),
        i
          ? r
            ? s ||
              (Z(n, e, H, X),
              Z(n, t, W, j),
              (u[0] = 0),
              (u[1] = 1),
              (u[3] = 0),
              (u[6] = 2))
            : (Z(t, n, H, X),
              Z(t, e, W, j),
              (u[0] = 2),
              (u[1] = 0),
              (u[3] = 2),
              (u[6] = 1))
          : (Z(e, t, H, X),
            Z(e, n, W, j),
            (u[0] = 1),
            (u[1] = 2),
            (u[3] = 1),
            (u[6] = 0)));
    const c = J.positions;
    return (
      (c[0] = e),
      (c[1] = t),
      (c[2] = n),
      (c.length = 3),
      (1 !== o && 2 !== o) ||
        ((c[3] = H), (c[4] = W), (c[5] = X), (c[6] = j), (c.length = 7)),
      J
    );
  }
  function Q(e, t) {
    const n = e.attributes;
    if (0 === n.position.values.length) return;
    for (const e in n)
      if (n.hasOwnProperty(e) && r.defined(n[e]) && r.defined(n[e].values)) {
        const t = n[e];
        t.values = a.ComponentDatatype.createTypedArray(
          t.componentDatatype,
          t.values
        );
      }
    const i = u.Geometry.computeNumberOfVertices(e);
    return (
      (e.indices = c.IndexDatatype.createTypedArray(i, e.indices)),
      t &&
        (e.boundingSphere = s.BoundingSphere.fromVertices(n.position.values)),
      e
    );
  }
  function $(e) {
    const t = e.attributes,
      n = {};
    for (const e in t)
      if (t.hasOwnProperty(e) && r.defined(t[e]) && r.defined(t[e].values)) {
        const i = t[e];
        n[e] = new u.GeometryAttribute({
          componentDatatype: i.componentDatatype,
          componentsPerAttribute: i.componentsPerAttribute,
          normalize: i.normalize,
          values: []
        });
      }
    return new u.Geometry({
      attributes: n,
      indices: [],
      primitiveType: e.primitiveType
    });
  }
  function ee(e, t, n) {
    const i = r.defined(e.geometry.boundingSphere);
    (t = Q(t, i)),
      (n = Q(n, i)),
      r.defined(n) && !r.defined(t)
        ? (e.geometry = n)
        : !r.defined(n) && r.defined(t)
        ? (e.geometry = t)
        : ((e.westHemisphereGeometry = t),
          (e.eastHemisphereGeometry = n),
          (e.geometry = void 0));
  }
  function te(e, t) {
    const n = new e(),
      i = new e(),
      r = new e();
    return function (a, s, o, u, c, l, p, d) {
      const f = e.fromArray(c, a * t, n),
        y = e.fromArray(c, s * t, i),
        m = e.fromArray(c, o * t, r);
      e.multiplyByScalar(f, u.x, f),
        e.multiplyByScalar(y, u.y, y),
        e.multiplyByScalar(m, u.z, m);
      const C = e.add(f, y, f);
      e.add(C, m, C), d && e.normalize(C, C), e.pack(C, l, p * t);
    };
  }
  const ne = te(n.Cartesian4, 4),
    ie = te(n.Cartesian3, 3),
    re = te(n.Cartesian2, 2),
    ae = new n.Cartesian3(),
    se = new n.Cartesian3(),
    oe = new n.Cartesian3(),
    ue = new n.Cartesian3();
  function ce(e, t, i, s, o, u, c, l, p, m, C, h, v, b, g, A) {
    if (
      !(
        r.defined(u) ||
        r.defined(c) ||
        r.defined(l) ||
        r.defined(p) ||
        r.defined(m) ||
        0 !== b
      )
    )
      return;
    const T = (function (e, t, i, s, o) {
      let u, c, l, p, m, C, h, v;
      if ((r.defined(o) || (o = new n.Cartesian3()), r.defined(t.z))) {
        if (n.Cartesian3.equalsEpsilon(e, t, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_X, o);
        if (n.Cartesian3.equalsEpsilon(e, i, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Y, o);
        if (n.Cartesian3.equalsEpsilon(e, s, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Z, o);
        (u = n.Cartesian3.subtract(i, t, d)),
          (c = n.Cartesian3.subtract(s, t, f)),
          (l = n.Cartesian3.subtract(e, t, y)),
          (p = n.Cartesian3.dot(u, u)),
          (m = n.Cartesian3.dot(u, c)),
          (C = n.Cartesian3.dot(u, l)),
          (h = n.Cartesian3.dot(c, c)),
          (v = n.Cartesian3.dot(c, l));
      } else {
        if (n.Cartesian2.equalsEpsilon(e, t, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_X, o);
        if (n.Cartesian2.equalsEpsilon(e, i, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Y, o);
        if (n.Cartesian2.equalsEpsilon(e, s, a.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Z, o);
        (u = n.Cartesian2.subtract(i, t, d)),
          (c = n.Cartesian2.subtract(s, t, f)),
          (l = n.Cartesian2.subtract(e, t, y)),
          (p = n.Cartesian2.dot(u, u)),
          (m = n.Cartesian2.dot(u, c)),
          (C = n.Cartesian2.dot(u, l)),
          (h = n.Cartesian2.dot(c, c)),
          (v = n.Cartesian2.dot(c, l));
      }
      (o.y = h * C - m * v), (o.z = p * v - m * C);
      const b = p * h - m * m;
      if (0 !== b) return (o.y /= b), (o.z /= b), (o.x = 1 - o.y - o.z), o;
    })(
      s,
      n.Cartesian3.fromArray(o, 3 * e, ae),
      n.Cartesian3.fromArray(o, 3 * t, se),
      n.Cartesian3.fromArray(o, 3 * i, oe),
      ue
    );
    if (r.defined(T)) {
      if (
        (r.defined(u) && ie(e, t, i, T, u, h.normal.values, A, !0),
        r.defined(m))
      ) {
        const r = n.Cartesian3.fromArray(m, 3 * e, ae),
          a = n.Cartesian3.fromArray(m, 3 * t, se),
          s = n.Cartesian3.fromArray(m, 3 * i, oe);
        let o;
        n.Cartesian3.multiplyByScalar(r, T.x, r),
          n.Cartesian3.multiplyByScalar(a, T.y, a),
          n.Cartesian3.multiplyByScalar(s, T.z, s),
          n.Cartesian3.equals(r, n.Cartesian3.ZERO) &&
          n.Cartesian3.equals(a, n.Cartesian3.ZERO) &&
          n.Cartesian3.equals(s, n.Cartesian3.ZERO)
            ? ((o = ae), (o.x = 0), (o.y = 0), (o.z = 0))
            : ((o = n.Cartesian3.add(r, a, r)),
              n.Cartesian3.add(o, s, o),
              n.Cartesian3.normalize(o, o)),
          n.Cartesian3.pack(o, h.extrudeDirection.values, 3 * A);
      }
      if (
        (r.defined(C) &&
          (function (e, t, n, i, r, s, o) {
            const u = r[e] * i.x,
              c = r[t] * i.y,
              l = r[n] * i.z;
            s[o] = u + c + l > a.CesiumMath.EPSILON6 ? 1 : 0;
          })(e, t, i, T, C, h.applyOffset.values, A),
        r.defined(c) && ie(e, t, i, T, c, h.tangent.values, A, !0),
        r.defined(l) && ie(e, t, i, T, l, h.bitangent.values, A, !0),
        r.defined(p) && re(e, t, i, T, p, h.st.values, A),
        b > 0)
      )
        for (let n = 0; n < b; n++) {
          const r = v[n];
          le(e, t, i, T, A, g[r], h[r]);
        }
    }
  }
  function le(e, t, n, i, r, a, s) {
    const o = a.componentsPerAttribute,
      u = a.values,
      c = s.values;
    switch (o) {
      case 4:
        ne(e, t, n, i, u, c, r, !1);
        break;
      case 3:
        ie(e, t, n, i, u, c, r, !1);
        break;
      case 2:
        re(e, t, n, i, u, c, r, !1);
        break;
      default:
        c[r] = u[e] * i.x + u[t] * i.y + u[n] * i.z;
    }
  }
  function pe(e, t, n, i, r, a) {
    const s = e.position.values.length / 3;
    if (-1 !== r) {
      const o = i[r],
        u = n[o];
      return -1 === u
        ? ((n[o] = s), e.position.values.push(a.x, a.y, a.z), t.push(s), s)
        : (t.push(u), u);
    }
    return e.position.values.push(a.x, a.y, a.z), t.push(s), s;
  }
  const de = {
    position: !0,
    normal: !0,
    bitangent: !0,
    tangent: !0,
    st: !0,
    extrudeDirection: !0,
    applyOffset: !0
  };
  function fe(e) {
    const t = e.geometry,
      i = t.attributes,
      a = i.position.values,
      s = r.defined(i.normal) ? i.normal.values : void 0,
      o = r.defined(i.bitangent) ? i.bitangent.values : void 0,
      u = r.defined(i.tangent) ? i.tangent.values : void 0,
      c = r.defined(i.st) ? i.st.values : void 0,
      l = r.defined(i.extrudeDirection) ? i.extrudeDirection.values : void 0,
      p = r.defined(i.applyOffset) ? i.applyOffset.values : void 0,
      d = t.indices,
      f = [];
    for (const e in i)
      i.hasOwnProperty(e) && !de[e] && r.defined(i[e]) && f.push(e);
    const y = f.length,
      m = $(t),
      C = $(t);
    let h, v, b, g, A;
    const T = [];
    T.length = a.length / 3;
    const x = [];
    for (x.length = a.length / 3, A = 0; A < T.length; ++A)
      (T[A] = -1), (x[A] = -1);
    const P = d.length;
    for (A = 0; A < P; A += 3) {
      const e = d[A],
        t = d[A + 1],
        P = d[A + 2];
      let w = n.Cartesian3.fromArray(a, 3 * e),
        S = n.Cartesian3.fromArray(a, 3 * t),
        I = n.Cartesian3.fromArray(a, 3 * P);
      const O = K(w, S, I);
      if (r.defined(O) && O.positions.length > 3) {
        const n = O.positions,
          r = O.indices,
          w = r.length;
        for (let S = 0; S < w; ++S) {
          const w = r[S],
            I = n[w];
          I.y < 0
            ? ((h = C.attributes), (v = C.indices), (b = T))
            : ((h = m.attributes), (v = m.indices), (b = x)),
            (g = pe(h, v, b, d, w < 3 ? A + w : -1, I)),
            ce(e, t, P, I, a, s, u, o, c, l, p, h, f, y, i, g);
        }
      } else
        r.defined(O) &&
          ((w = O.positions[0]), (S = O.positions[1]), (I = O.positions[2])),
          w.y < 0
            ? ((h = C.attributes), (v = C.indices), (b = T))
            : ((h = m.attributes), (v = m.indices), (b = x)),
          (g = pe(h, v, b, d, A, w)),
          ce(e, t, P, w, a, s, u, o, c, l, p, h, f, y, i, g),
          (g = pe(h, v, b, d, A + 1, S)),
          ce(e, t, P, S, a, s, u, o, c, l, p, h, f, y, i, g),
          (g = pe(h, v, b, d, A + 2, I)),
          ce(e, t, P, I, a, s, u, o, c, l, p, h, f, y, i, g);
    }
    ee(e, C, m);
  }
  const ye = p.Plane.fromPointNormal(n.Cartesian3.ZERO, n.Cartesian3.UNIT_Y),
    me = new n.Cartesian3(),
    Ce = new n.Cartesian3();
  function he(e, t, i, s, o, u, c) {
    if (!r.defined(c)) return;
    const l = n.Cartesian3.fromArray(s, 3 * e, ae);
    n.Cartesian3.equalsEpsilon(l, i, a.CesiumMath.EPSILON10)
      ? (u.applyOffset.values[o] = c[e])
      : (u.applyOffset.values[o] = c[t]);
  }
  function ve(e) {
    const t = e.geometry,
      i = t.attributes,
      s = i.position.values,
      o = r.defined(i.applyOffset) ? i.applyOffset.values : void 0,
      u = t.indices,
      c = $(t),
      p = $(t);
    let d;
    const f = u.length,
      y = [];
    y.length = s.length / 3;
    const m = [];
    for (m.length = s.length / 3, d = 0; d < y.length; ++d)
      (y[d] = -1), (m[d] = -1);
    for (d = 0; d < f; d += 2) {
      const e = u[d],
        t = u[d + 1],
        i = n.Cartesian3.fromArray(s, 3 * e, ae),
        f = n.Cartesian3.fromArray(s, 3 * t, se);
      let C;
      Math.abs(i.y) < a.CesiumMath.EPSILON6 &&
        (i.y < 0
          ? (i.y = -a.CesiumMath.EPSILON6)
          : (i.y = a.CesiumMath.EPSILON6)),
        Math.abs(f.y) < a.CesiumMath.EPSILON6 &&
          (f.y < 0
            ? (f.y = -a.CesiumMath.EPSILON6)
            : (f.y = a.CesiumMath.EPSILON6));
      let h = c.attributes,
        v = c.indices,
        b = m,
        g = p.attributes,
        A = p.indices,
        T = y;
      const x = l.IntersectionTests.lineSegmentPlane(i, f, ye, oe);
      if (r.defined(x)) {
        const r = n.Cartesian3.multiplyByScalar(
          n.Cartesian3.UNIT_Y,
          5 * a.CesiumMath.EPSILON9,
          me
        );
        i.y < 0 &&
          (n.Cartesian3.negate(r, r),
          (h = p.attributes),
          (v = p.indices),
          (b = y),
          (g = c.attributes),
          (A = c.indices),
          (T = m));
        const l = n.Cartesian3.add(x, r, Ce);
        (C = pe(h, v, b, u, d, i)),
          he(e, t, i, s, C, h, o),
          (C = pe(h, v, b, u, -1, l)),
          he(e, t, l, s, C, h, o),
          n.Cartesian3.negate(r, r),
          n.Cartesian3.add(x, r, l),
          (C = pe(g, A, T, u, -1, l)),
          he(e, t, l, s, C, g, o),
          (C = pe(g, A, T, u, d + 1, f)),
          he(e, t, f, s, C, g, o);
      } else {
        let n, r, a;
        i.y < 0
          ? ((n = p.attributes), (r = p.indices), (a = y))
          : ((n = c.attributes), (r = c.indices), (a = m)),
          (C = pe(n, r, a, u, d, i)),
          he(e, t, i, s, C, n, o),
          (C = pe(n, r, a, u, d + 1, f)),
          he(e, t, f, s, C, n, o);
      }
    }
    ee(e, p, c);
  }
  const be = new n.Cartesian2(),
    ge = new n.Cartesian2(),
    Ae = new n.Cartesian3(),
    Te = new n.Cartesian3(),
    xe = new n.Cartesian3(),
    Pe = new n.Cartesian3(),
    we = new n.Cartesian3(),
    Se = new n.Cartesian3(),
    Ie = new n.Cartesian4();
  function Oe(e) {
    const t = e.attributes,
      i = t.position.values,
      r = t.prevPosition.values,
      a = t.nextPosition.values,
      s = i.length;
    for (let e = 0; e < s; e += 3) {
      const t = n.Cartesian3.unpack(i, e, Ae);
      if (t.x > 0) continue;
      const o = n.Cartesian3.unpack(r, e, Te);
      ((t.y < 0 && o.y > 0) || (t.y > 0 && o.y < 0)) &&
        (e - 3 > 0
          ? ((r[e] = i[e - 3]), (r[e + 1] = i[e - 2]), (r[e + 2] = i[e - 1]))
          : n.Cartesian3.pack(t, r, e));
      const u = n.Cartesian3.unpack(a, e, xe);
      ((t.y < 0 && u.y > 0) || (t.y > 0 && u.y < 0)) &&
        (e + 3 < s
          ? ((a[e] = i[e + 3]), (a[e + 1] = i[e + 4]), (a[e + 2] = i[e + 5]))
          : n.Cartesian3.pack(t, a, e));
    }
  }
  const Ee = 5 * a.CesiumMath.EPSILON9,
    Ne = a.CesiumMath.EPSILON6;
  (C.splitLongitude = function (e) {
    const t = e.geometry,
      i = t.boundingSphere;
    if (r.defined(i)) {
      if (
        i.center.x - i.radius > 0 ||
        s.BoundingSphere.intersectPlane(i, p.Plane.ORIGIN_ZX_PLANE) !==
          s.Intersect.INTERSECTING
      )
        return e;
    }
    if (t.geometryType !== u.GeometryType.NONE)
      switch (t.geometryType) {
        case u.GeometryType.POLYLINES:
          !(function (e) {
            const t = e.geometry,
              i = t.attributes,
              s = i.position.values,
              o = i.prevPosition.values,
              u = i.nextPosition.values,
              c = i.expandAndWidth.values,
              p = r.defined(i.st) ? i.st.values : void 0,
              d = r.defined(i.color) ? i.color.values : void 0,
              f = $(t),
              y = $(t);
            let m,
              C,
              h,
              v = !1;
            const b = s.length / 3;
            for (m = 0; m < b; m += 4) {
              const e = m,
                t = m + 2,
                i = n.Cartesian3.fromArray(s, 3 * e, Ae),
                b = n.Cartesian3.fromArray(s, 3 * t, Te);
              if (Math.abs(i.y) < Ne)
                for (
                  i.y = Ne * (b.y < 0 ? -1 : 1),
                    s[3 * m + 1] = i.y,
                    s[3 * (m + 1) + 1] = i.y,
                    C = 3 * e;
                  C < 3 * e + 12;
                  C += 3
                )
                  (o[C] = s[3 * m]),
                    (o[C + 1] = s[3 * m + 1]),
                    (o[C + 2] = s[3 * m + 2]);
              if (Math.abs(b.y) < Ne)
                for (
                  b.y = Ne * (i.y < 0 ? -1 : 1),
                    s[3 * (m + 2) + 1] = b.y,
                    s[3 * (m + 3) + 1] = b.y,
                    C = 3 * e;
                  C < 3 * e + 12;
                  C += 3
                )
                  (u[C] = s[3 * (m + 2)]),
                    (u[C + 1] = s[3 * (m + 2) + 1]),
                    (u[C + 2] = s[3 * (m + 2) + 2]);
              let g = f.attributes,
                A = f.indices,
                T = y.attributes,
                x = y.indices;
              const P = l.IntersectionTests.lineSegmentPlane(i, b, ye, Pe);
              if (r.defined(P)) {
                v = !0;
                const s = n.Cartesian3.multiplyByScalar(
                  n.Cartesian3.UNIT_Y,
                  Ee,
                  we
                );
                i.y < 0 &&
                  (n.Cartesian3.negate(s, s),
                  (g = y.attributes),
                  (A = y.indices),
                  (T = f.attributes),
                  (x = f.indices));
                const l = n.Cartesian3.add(P, s, Se);
                g.position.values.push(i.x, i.y, i.z, i.x, i.y, i.z),
                  g.position.values.push(l.x, l.y, l.z),
                  g.position.values.push(l.x, l.y, l.z),
                  g.prevPosition.values.push(
                    o[3 * e],
                    o[3 * e + 1],
                    o[3 * e + 2]
                  ),
                  g.prevPosition.values.push(
                    o[3 * e + 3],
                    o[3 * e + 4],
                    o[3 * e + 5]
                  ),
                  g.prevPosition.values.push(i.x, i.y, i.z, i.x, i.y, i.z),
                  g.nextPosition.values.push(l.x, l.y, l.z),
                  g.nextPosition.values.push(l.x, l.y, l.z),
                  g.nextPosition.values.push(l.x, l.y, l.z),
                  g.nextPosition.values.push(l.x, l.y, l.z),
                  n.Cartesian3.negate(s, s),
                  n.Cartesian3.add(P, s, l),
                  T.position.values.push(l.x, l.y, l.z),
                  T.position.values.push(l.x, l.y, l.z),
                  T.position.values.push(b.x, b.y, b.z, b.x, b.y, b.z),
                  T.prevPosition.values.push(l.x, l.y, l.z),
                  T.prevPosition.values.push(l.x, l.y, l.z),
                  T.prevPosition.values.push(l.x, l.y, l.z),
                  T.prevPosition.values.push(l.x, l.y, l.z),
                  T.nextPosition.values.push(b.x, b.y, b.z, b.x, b.y, b.z),
                  T.nextPosition.values.push(
                    u[3 * t],
                    u[3 * t + 1],
                    u[3 * t + 2]
                  ),
                  T.nextPosition.values.push(
                    u[3 * t + 3],
                    u[3 * t + 4],
                    u[3 * t + 5]
                  );
                const w = n.Cartesian2.fromArray(c, 2 * e, be),
                  S = Math.abs(w.y);
                g.expandAndWidth.values.push(-1, S, 1, S),
                  g.expandAndWidth.values.push(-1, -S, 1, -S),
                  T.expandAndWidth.values.push(-1, S, 1, S),
                  T.expandAndWidth.values.push(-1, -S, 1, -S);
                let I = n.Cartesian3.magnitudeSquared(
                  n.Cartesian3.subtract(P, i, xe)
                );
                if (
                  ((I /= n.Cartesian3.magnitudeSquared(
                    n.Cartesian3.subtract(b, i, xe)
                  )),
                  r.defined(d))
                ) {
                  const i = n.Cartesian4.fromArray(d, 4 * e, Ie),
                    r = n.Cartesian4.fromArray(d, 4 * t, Ie),
                    s = a.CesiumMath.lerp(i.x, r.x, I),
                    o = a.CesiumMath.lerp(i.y, r.y, I),
                    u = a.CesiumMath.lerp(i.z, r.z, I),
                    c = a.CesiumMath.lerp(i.w, r.w, I);
                  for (C = 4 * e; C < 4 * e + 8; ++C) g.color.values.push(d[C]);
                  for (
                    g.color.values.push(s, o, u, c),
                      g.color.values.push(s, o, u, c),
                      T.color.values.push(s, o, u, c),
                      T.color.values.push(s, o, u, c),
                      C = 4 * t;
                    C < 4 * t + 8;
                    ++C
                  )
                    T.color.values.push(d[C]);
                }
                if (r.defined(p)) {
                  const i = n.Cartesian2.fromArray(p, 2 * e, be),
                    r = n.Cartesian2.fromArray(p, 2 * (m + 3), ge),
                    s = a.CesiumMath.lerp(i.x, r.x, I);
                  for (C = 2 * e; C < 2 * e + 4; ++C) g.st.values.push(p[C]);
                  for (
                    g.st.values.push(s, i.y),
                      g.st.values.push(s, r.y),
                      T.st.values.push(s, i.y),
                      T.st.values.push(s, r.y),
                      C = 2 * t;
                    C < 2 * t + 4;
                    ++C
                  )
                    T.st.values.push(p[C]);
                }
                (h = g.position.values.length / 3 - 4),
                  A.push(h, h + 2, h + 1),
                  A.push(h + 1, h + 2, h + 3),
                  (h = T.position.values.length / 3 - 4),
                  x.push(h, h + 2, h + 1),
                  x.push(h + 1, h + 2, h + 3);
              } else {
                let e, t;
                for (
                  i.y < 0
                    ? ((e = y.attributes), (t = y.indices))
                    : ((e = f.attributes), (t = f.indices)),
                    e.position.values.push(i.x, i.y, i.z),
                    e.position.values.push(i.x, i.y, i.z),
                    e.position.values.push(b.x, b.y, b.z),
                    e.position.values.push(b.x, b.y, b.z),
                    C = 3 * m;
                  C < 3 * m + 12;
                  ++C
                )
                  e.prevPosition.values.push(o[C]),
                    e.nextPosition.values.push(u[C]);
                for (C = 2 * m; C < 2 * m + 8; ++C)
                  e.expandAndWidth.values.push(c[C]),
                    r.defined(p) && e.st.values.push(p[C]);
                if (r.defined(d))
                  for (C = 4 * m; C < 4 * m + 16; ++C)
                    e.color.values.push(d[C]);
                (h = e.position.values.length / 3 - 4),
                  t.push(h, h + 2, h + 1),
                  t.push(h + 1, h + 2, h + 3);
              }
            }
            v && (Oe(y), Oe(f)), ee(e, y, f);
          })(e);
          break;
        case u.GeometryType.TRIANGLES:
          fe(e);
          break;
        case u.GeometryType.LINES:
          ve(e);
      }
    else
      q(t),
        t.primitiveType === u.PrimitiveType.TRIANGLES
          ? fe(e)
          : t.primitiveType === u.PrimitiveType.LINES && ve(e);
    return e;
  }),
    (e.GeometryPipeline = C);
});
