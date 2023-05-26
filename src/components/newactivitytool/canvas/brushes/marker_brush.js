export default function HighlighterMaker(fabric) {
  fabric.MarkerBrush = fabric.util.createClass(fabric.BaseBrush, {
    color: "#000000",
    opacity: 1,
    width: 30,

    _baseWidth: 10,
    _lastPoint: null,
    _lineWidth: 3,
    _point: null,
    _size: 0,

    initialize: function (canvas, opt) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this._point = new fabric.Point();

      this.canvas.contextTop.lineJoin = "round";
      this.canvas.contextTop.lineCap = "round";
    },

    changeColor: function (color) {
      this.color = color;
    },

    changeOpacity: function (value) {
      this.opacity = value;
    },

    _render: function (pointer) {
      var ctx, lineWidthDiff, i;
      var len = this._size / this._lineWidth / 2;

      // this.canvas.contextTop = this.canvas.getContext("2d");
      ctx = this.canvas.contextTop;

      ctx.beginPath();

      for (i = 0; i < len; i++) {
        lineWidthDiff = (this._lineWidth - 1) * i;

        ctx.globalAlpha = 0.8 * this.opacity;
        ctx.moveTo(
          this._lastPoint.x + lineWidthDiff,
          this._lastPoint.y + lineWidthDiff
        );
        ctx.lineTo(pointer.x + lineWidthDiff, pointer.y + lineWidthDiff);
        ctx.stroke();
      }

      this._lastPoint = new fabric.Point(pointer.x, pointer.y);
    },

    onMouseDown: function (p) {
      const pointer = fabric.util.getPosition(this.canvas.vptCoords, p);

      this._lastPoint = pointer;
      this.canvas.contextTop.strokeStyle = this.color;
      this.canvas.contextTop.lineWidth = this._lineWidth;
      this._size = this.width + this._baseWidth;
    },

    onMouseMove: function (p) {
      const pointer = fabric.util.getPosition(this.canvas.vptCoords, p);
      if (this.canvas._isCurrentlyDrawing) this._render(pointer);
    },

    onMouseUp: function () {
      var ctx = this.canvas.contextTop;
      ctx.globalAlpha = this.opacity;

      var c = fabric.util.copyCanvasElement(this.canvas.upperCanvasEl);
      var img = new fabric.Image(c);
      this.canvas.contextTopDirty = true;

      img.left = this.canvas.vptCoords.tl.x;
      img.top = this.canvas.vptCoords.tl.y;

      //this.canvas.add(img);

      this.canvas.renderAll();

      this.canvas.contextTop.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },
  });
}
