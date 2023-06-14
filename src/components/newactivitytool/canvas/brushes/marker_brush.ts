import { BrushOption, canvasType } from "../../types";
import { Point } from "fabric/fabric-impl";
import { fabric } from "fabric-with-erasing";

export default function HighlighterMaker() {
  fabric.MarkerBrush = fabric.util.createClass(fabric.BaseBrush, {
    color: "#000000",
    opacity: 1,
    width: 30,

    _baseWidth: 10,
    _lastPoint: null,
    _lineWidth: 3,
    _point: null,
    _size: 0,

    initialize: function (canvas: canvasType, opt: BrushOption) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this._point = new fabric.Point();

      this.canvas.contextTop.lineJoin = "round";
      this.canvas.contextTop.lineCap = "round";
    },

    changeColor: function (color: string) {
      this.color = color;
    },

    changeOpacity: function (value: number) {
      this.opacity = value;
    },

    _render: function (pointer: Point) {
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

    onMouseDown: function (p: Point) {
      const pointer = fabric.util.getPosition(this.canvas.viewportTransform, p);

      this._lastPoint = pointer;
      this.canvas.contextTop.strokeStyle = this.color;
      this.canvas.contextTop.lineWidth = this._lineWidth;
      this._size = this.width + this._baseWidth;
    },

    onMouseMove: function (p: Point) {
      const pointer = fabric.util.getPosition(this.canvas.viewportTransform, p);
      if (this.canvas._isCurrentlyDrawing) this._render(pointer);
    },

    onMouseUp: function () {
      this.canvas.contextTop.globalAlpha = this.opacity;
      this.canvas.contextTop.globalAlpha = 1;
      this.convertToImg();
    },
  });
}
