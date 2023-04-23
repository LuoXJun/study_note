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
  './Matrix2-73789715',
  './RuntimeError-4f8ec8a2',
  './defaultValue-97284df2',
  './ComponentDatatype-e7fbe225'
], function (t, i, e, a, n) {
  'use strict';
  function s(t, i, e) {
    if (0 === t) return i * e;
    const a = t * t,
      n = a * a,
      s = n * a,
      u = s * a,
      h = u * a,
      o = h * a,
      l = e;
    return (
      i *
      ((1 -
        a / 4 -
        (3 * n) / 64 -
        (5 * s) / 256 -
        (175 * u) / 16384 -
        (441 * h) / 65536 -
        (4851 * o) / 1048576) *
        l -
        ((3 * a) / 8 +
          (3 * n) / 32 +
          (45 * s) / 1024 +
          (105 * u) / 4096 +
          (2205 * h) / 131072 +
          (6237 * o) / 524288) *
          Math.sin(2 * l) +
        ((15 * n) / 256 +
          (45 * s) / 1024 +
          (525 * u) / 16384 +
          (1575 * h) / 65536 +
          (155925 * o) / 8388608) *
          Math.sin(4 * l) -
        ((35 * s) / 3072 +
          (175 * u) / 12288 +
          (3675 * h) / 262144 +
          (13475 * o) / 1048576) *
          Math.sin(6 * l) +
        ((315 * u) / 131072 + (2205 * h) / 524288 + (43659 * o) / 8388608) *
          Math.sin(8 * l) -
        ((693 * h) / 1310720 + (6237 * o) / 5242880) * Math.sin(10 * l) +
        ((1001 * o) / 8388608) * Math.sin(12 * l))
    );
  }
  function u(t, i) {
    if (0 === t)
      return Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i)));
    const e = t * Math.sin(i);
    return (
      Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i))) -
      (t / 2) * Math.log((1 + e) / (1 - e))
    );
  }
  const h = new i.Cartesian3(),
    o = new i.Cartesian3();
  function l(t, e, a, l) {
    i.Cartesian3.normalize(l.cartographicToCartesian(e, o), h),
      i.Cartesian3.normalize(l.cartographicToCartesian(a, o), o);
    const r = l.maximumRadius,
      d = l.minimumRadius,
      c = r * r,
      M = d * d;
    (t._ellipticitySquared = (c - M) / c),
      (t._ellipticity = Math.sqrt(t._ellipticitySquared)),
      (t._start = i.Cartographic.clone(e, t._start)),
      (t._start.height = 0),
      (t._end = i.Cartographic.clone(a, t._end)),
      (t._end.height = 0),
      (t._heading = (function (t, i, e, a, s) {
        const h = u(t._ellipticity, e),
          o = u(t._ellipticity, s);
        return Math.atan2(n.CesiumMath.negativePiToPi(a - i), o - h);
      })(t, e.longitude, e.latitude, a.longitude, a.latitude)),
      (t._distance = (function (t, i, e, a, u, h, o) {
        const l = t._heading,
          r = h - a;
        let d = 0;
        if (
          n.CesiumMath.equalsEpsilon(
            Math.abs(l),
            n.CesiumMath.PI_OVER_TWO,
            n.CesiumMath.EPSILON8
          )
        )
          if (i === e) d = i * Math.cos(u) * n.CesiumMath.negativePiToPi(r);
          else {
            const e = Math.sin(u);
            d =
              (i * Math.cos(u) * n.CesiumMath.negativePiToPi(r)) /
              Math.sqrt(1 - t._ellipticitySquared * e * e);
          }
        else {
          const e = s(t._ellipticity, i, u);
          d = (s(t._ellipticity, i, o) - e) / Math.cos(l);
        }
        return Math.abs(d);
      })(
        t,
        l.maximumRadius,
        l.minimumRadius,
        e.longitude,
        e.latitude,
        a.longitude,
        a.latitude
      ));
  }
  function r(t, e, h, o, l, r) {
    if (0 === h) return i.Cartographic.clone(t, r);
    const d = l * l;
    let c, M, m;
    if (
      Math.abs(n.CesiumMath.PI_OVER_TWO - Math.abs(e)) > n.CesiumMath.EPSILON8
    ) {
      M = (function (t, i, e) {
        const a = t / e;
        if (0 === i) return a;
        const n = a * a,
          s = n * a,
          u = s * a,
          h = i * i,
          o = h * h,
          l = o * h,
          r = l * h,
          d = r * h,
          c = d * h,
          M = Math.sin(2 * a),
          m = Math.cos(2 * a),
          g = Math.sin(4 * a),
          _ = Math.cos(4 * a),
          p = Math.sin(6 * a),
          f = Math.cos(6 * a),
          C = Math.sin(8 * a),
          P = Math.cos(8 * a),
          O = Math.sin(10 * a);
        return (
          a +
          (a * h) / 4 +
          (7 * a * o) / 64 +
          (15 * a * l) / 256 +
          (579 * a * r) / 16384 +
          (1515 * a * d) / 65536 +
          (16837 * a * c) / 1048576 +
          ((3 * a * o) / 16 +
            (45 * a * l) / 256 -
            (a * (32 * n - 561) * r) / 4096 -
            (a * (232 * n - 1677) * d) / 16384 +
            (a * (399985 - 90560 * n + 512 * u) * c) / 5242880) *
            m +
          ((21 * a * l) / 256 +
            (483 * a * r) / 4096 -
            (a * (224 * n - 1969) * d) / 16384 -
            (a * (33152 * n - 112599) * c) / 1048576) *
            _ +
          ((151 * a * r) / 4096 +
            (4681 * a * d) / 65536 +
            (1479 * a * c) / 16384 -
            (453 * s * c) / 32768) *
            f +
          ((1097 * a * d) / 65536 + (42783 * a * c) / 1048576) * P +
          ((8011 * a * c) / 1048576) * Math.cos(10 * a) +
          ((3 * h) / 8 +
            (3 * o) / 16 +
            (213 * l) / 2048 -
            (3 * n * l) / 64 +
            (255 * r) / 4096 -
            (33 * n * r) / 512 +
            (20861 * d) / 524288 -
            (33 * n * d) / 512 +
            (u * d) / 1024 +
            (28273 * c) / 1048576 -
            (471 * n * c) / 8192 +
            (9 * u * c) / 4096) *
            M +
          ((21 * o) / 256 +
            (21 * l) / 256 +
            (533 * r) / 8192 -
            (21 * n * r) / 512 +
            (197 * d) / 4096 -
            (315 * n * d) / 4096 +
            (584039 * c) / 16777216 -
            (12517 * n * c) / 131072 +
            (7 * u * c) / 2048) *
            g +
          ((151 * l) / 6144 +
            (151 * r) / 4096 +
            (5019 * d) / 131072 -
            (453 * n * d) / 16384 +
            (26965 * c) / 786432 -
            (8607 * n * c) / 131072) *
            p +
          ((1097 * r) / 131072 +
            (1097 * d) / 65536 +
            (225797 * c) / 10485760 -
            (1097 * n * c) / 65536) *
            C +
          ((8011 * d) / 2621440 + (8011 * c) / 1048576) * O +
          ((293393 * c) / 251658240) * Math.sin(12 * a)
        );
      })(s(l, o, t.latitude) + h * Math.cos(e), l, o);
      const i = u(l, t.latitude),
        a = u(l, M);
      (m = Math.tan(e) * (a - i)),
        (c = n.CesiumMath.negativePiToPi(t.longitude + m));
    } else {
      let i;
      if (((M = t.latitude), 0 === l)) i = o * Math.cos(t.latitude);
      else {
        const e = Math.sin(t.latitude);
        i = (o * Math.cos(t.latitude)) / Math.sqrt(1 - d * e * e);
      }
      (m = h / i),
        (c =
          e > 0
            ? n.CesiumMath.negativePiToPi(t.longitude + m)
            : n.CesiumMath.negativePiToPi(t.longitude - m));
    }
    return a.defined(r)
      ? ((r.longitude = c), (r.latitude = M), (r.height = 0), r)
      : new i.Cartographic(c, M, 0);
  }
  function d(t, e, n) {
    const s = a.defaultValue(n, i.Ellipsoid.WGS84);
    (this._ellipsoid = s),
      (this._start = new i.Cartographic()),
      (this._end = new i.Cartographic()),
      (this._heading = void 0),
      (this._distance = void 0),
      (this._ellipticity = void 0),
      (this._ellipticitySquared = void 0),
      a.defined(t) && a.defined(e) && l(this, t, e, s);
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      }
    },
    surfaceDistance: {
      get: function () {
        return this._distance;
      }
    },
    start: {
      get: function () {
        return this._start;
      }
    },
    end: {
      get: function () {
        return this._end;
      }
    },
    heading: {
      get: function () {
        return this._heading;
      }
    }
  }),
    (d.fromStartHeadingDistance = function (t, e, s, u, h) {
      const o = a.defaultValue(u, i.Ellipsoid.WGS84),
        l = o.maximumRadius,
        c = o.minimumRadius,
        M = l * l,
        m = c * c,
        g = Math.sqrt((M - m) / M),
        _ = r(t, (e = n.CesiumMath.negativePiToPi(e)), s, o.maximumRadius, g);
      return !a.defined(h) || (a.defined(u) && !u.equals(h.ellipsoid))
        ? new d(t, _, o)
        : (h.setEndPoints(t, _), h);
    }),
    (d.prototype.setEndPoints = function (t, i) {
      l(this, t, i, this._ellipsoid);
    }),
    (d.prototype.interpolateUsingFraction = function (t, i) {
      return this.interpolateUsingSurfaceDistance(t * this._distance, i);
    }),
    (d.prototype.interpolateUsingSurfaceDistance = function (t, i) {
      return r(
        this._start,
        this._heading,
        t,
        this._ellipsoid.maximumRadius,
        this._ellipticity,
        i
      );
    }),
    (d.prototype.findIntersectionWithLongitude = function (t, e) {
      const s = this._ellipticity,
        u = this._heading,
        h = Math.abs(u),
        o = this._start;
      if (
        ((t = n.CesiumMath.negativePiToPi(t)),
        n.CesiumMath.equalsEpsilon(
          Math.abs(t),
          Math.PI,
          n.CesiumMath.EPSILON14
        ) && (t = n.CesiumMath.sign(o.longitude) * Math.PI),
        a.defined(e) || (e = new i.Cartographic()),
        Math.abs(n.CesiumMath.PI_OVER_TWO - h) <= n.CesiumMath.EPSILON8)
      )
        return (e.longitude = t), (e.latitude = o.latitude), (e.height = 0), e;
      if (
        n.CesiumMath.equalsEpsilon(
          Math.abs(n.CesiumMath.PI_OVER_TWO - h),
          n.CesiumMath.PI_OVER_TWO,
          n.CesiumMath.EPSILON8
        )
      ) {
        if (n.CesiumMath.equalsEpsilon(t, o.longitude, n.CesiumMath.EPSILON12))
          return;
        return (
          (e.longitude = t),
          (e.latitude =
            n.CesiumMath.PI_OVER_TWO *
            n.CesiumMath.sign(n.CesiumMath.PI_OVER_TWO - u)),
          (e.height = 0),
          e
        );
      }
      const l = o.latitude,
        r = s * Math.sin(l),
        d =
          Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + l)) *
          Math.exp((t - o.longitude) / Math.tan(u)),
        c = (1 + r) / (1 - r);
      let M,
        m = o.latitude;
      do {
        M = m;
        const t = s * Math.sin(M),
          i = (1 + t) / (1 - t);
        m =
          2 * Math.atan(d * Math.pow(i / c, s / 2)) - n.CesiumMath.PI_OVER_TWO;
      } while (!n.CesiumMath.equalsEpsilon(m, M, n.CesiumMath.EPSILON12));
      return (e.longitude = t), (e.latitude = m), (e.height = 0), e;
    }),
    (d.prototype.findIntersectionWithLatitude = function (t, e) {
      const s = this._ellipticity,
        h = this._heading,
        o = this._start;
      if (
        n.CesiumMath.equalsEpsilon(
          Math.abs(h),
          n.CesiumMath.PI_OVER_TWO,
          n.CesiumMath.EPSILON8
        )
      )
        return;
      const l = u(s, o.latitude),
        r = u(s, t),
        d = Math.tan(h) * (r - l),
        c = n.CesiumMath.negativePiToPi(o.longitude + d);
      return a.defined(e)
        ? ((e.longitude = c), (e.latitude = t), (e.height = 0), e)
        : new i.Cartographic(c, t, 0);
    }),
    (t.EllipsoidRhumbLine = d);
});
