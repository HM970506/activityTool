import { BrushOption, canvasType } from "../../types";
import { Point } from "fabric/fabric-impl";
import { fabric } from "fabric-with-erasing";

export default function CrayonMaker() {
  fabric.CrayonBrush = fabric.util.createClass(fabric.BaseBrush, {
    color: "#000000",
    opacity: 0.1,
    width: 30,

    _baseWidth: 20,
    _inkAmount: 10,
    _latestStrokeLength: 0,
    _point: null,
    _sep: 5,
    _size: 0,
    _latest: null,
    _drawn: false,

    initialize: function (canvas: canvasType, opt: BrushOption) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this._point = new fabric.Point(0, 0);
    },

    changeColor: function (color: string) {
      this.color = color;
    },

    onMouseDown: function (p: Point) {
      const pointer = this.canvas.viewportTransform
        ? fabric.util.getPosition(this.canvas.viewportTransform, p)
        : p;

      this.canvas.clearContext(this.canvas.contextTop);
      this._size = this.width / 2 + this._baseWidth;
      this._drawn = false;
      this.set(pointer);
    },

    onMouseMove: function (p: Point) {
      const pointer = this.canvas.viewportTransform
        ? fabric.util.getPosition(this.canvas.viewportTransform, p)
        : p;

      this.update(pointer);
      this.draw(this.canvas.contextTop);
    },

    onMouseUp: function () {
      if (this._drawn) this.convertToImg();

      this._latest = null;
      this._latestStrokeLength = 0;
      this.canvas.contextTop.globalAlpha = 1;
    },

    set: function (p: Point) {
      if (this._latest) this._latest.setFromPoint(this._point);
      else this._latest = new fabric.Point(p.x, p.y);

      fabric.Point.prototype.setFromPoint.call(this._point, p);
    },

    update: function (p: Point) {
      this.set(p);
      this._latestStrokeLength = this._point
        .subtract(this._latest)
        .distanceFrom({ x: 0, y: 0 });
    },

    draw: function (ctx: CanvasRenderingContext2D) {
      var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;

      v = this._point.subtract(this._latest);
      s = Math.ceil(this._size / 2);
      stepNum = Math.floor(v.distanceFrom({ x: 0, y: 0 }) / s) + 1;
      v.normalize(s);

      dotSize =
        this._sep *
        fabric.util.clamp(
          (this._inkAmount / this._latestStrokeLength) * 3,
          1,
          0.5
        );
      dotNum = Math.ceil(this._size * this._sep);

      range = this._size / 2;

      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      for (i = 0; i < dotNum; i++) {
        for (j = 0; j < stepNum; j++) {
          p = this._latest.add(v.multiply(j));
          r = fabric.util.getRandom(range);
          c = fabric.util.getRandom(Math.PI * 2);
          w = fabric.util.getRandom(dotSize, dotSize / 2);
          h = fabric.util.getRandom(dotSize, dotSize / 2);
          x = p.x + r * Math.sin(c) - w / 2;
          y = p.y + r * Math.cos(c) - h / 2;
          ctx.rect(x, y, w, h);
        }
      }
      ctx.fill();
      ctx.restore();
      this._drawn = true;
    },
  });
}
