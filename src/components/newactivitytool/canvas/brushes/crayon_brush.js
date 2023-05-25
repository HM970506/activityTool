export default function CrayonMaker(fabric) {
  fabric.CrayonBrush = fabric.util.createClass(fabric.BaseBrush, {
    color: "#000000",
    opacity: 0.6,
    width: 30,

    _baseWidth: 20,
    _inkAmount: 10,
    _latestStrokeLength: 0,
    _point: null,
    _sep: 5,
    _size: 0,

    initialize: function (canvas, opt) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this._point = new fabric.Point(0, 0);
    },

    changeColor: function (color) {
      this.color = color;
    },

    changeOpacity: function (value) {
      this.opacity = value;
    },

    onMouseDown: function (p) {
      const pointer = {
        x: this.canvas.vptCoords ? p.x - this.canvas.vptCoords.tl.x : p.x,
        y: this.canvas.vptCoords ? p.y - this.canvas.vptCoords.tl.y : p.y,
      };
      // console.log("보정전:", p, "보정후:", pointer);
      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.contextTop.globalAlpha = this.opacity;
      this._size = this.width / 2 + this._baseWidth;

      this.set(pointer);
    },

    onMouseMove: function (p) {
      const pointer = {
        x: this.canvas.vptCoords ? p.x - this.canvas.vptCoords.tl.x : p.x,
        y: this.canvas.vptCoords ? p.y - this.canvas.vptCoords.tl.y : p.y,
      };
      if (this._latest) this._latest.setFromPoint(this._point);
      else this._latest = new fabric.Point(pointer.x, pointer.y);

      fabric.Point.prototype.setFromPoint.call(this._point, pointer);

      this._latestStrokeLength = this._point
        .subtract(this._latest)
        .distanceFrom({ x: 0, y: 0 });

      this.draw(this.canvas.contextTop);
    },

    onMouseUp: function () {
      const c = fabric.util.copyCanvasElement(this.canvas.upperCanvasEl);
      const img = new fabric.Image(c);
      console.log(img);
      this.canvas.contextTopDirty = true;

      const pointer = {
        x: this.canvas.vptCoords ? img.x - this.canvas.vptCoords.tl.x : img.x,
        y: this.canvas.vptCoords ? img.y - this.canvas.vptCoords.tl.y : img.y,
      };

      img.x = 0;
      img.y = 0;
      this.canvas.add(img);

      this.canvas.renderAll();
      this.canvas.contextTop.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },

    set: function (p) {
      if (this._latest) this._latest.setFromPoint(this._point);
      else this._latest = new fabric.Point(p.x, p.y);

      fabric.Point.prototype.setFromPoint.call(this._point, p);
    },

    update: function (p) {
      this.set(p);
      this._latestStrokeLength = this._point
        .subtract(this._latest)
        .distanceFrom({ x: 0, y: 0 });
    },

    draw: function (ctx) {
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
    },
  });
}
