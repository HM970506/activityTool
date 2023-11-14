import { useSelector } from "react-redux";
import { ReducersType } from "../../../types";
import { FilterComponent, PhotoOption2 } from "./style";
import { fabric } from "fabric-with-erasing";
import React from "react";

const FILTER_NAME = [
  "Ordinary",
  "GrayScale",
  "Sepia",
  "Brownie",
  "Vintage",
  "Kodachrome",
  "Technicolor",
  "Polaroid",
];

const FILTER_MAP = new Map([
  ["GrayScale", new fabric.Image.filters.Grayscale()],
  ["Sepia", new fabric.Image.filters.Sepia()],
  ["Brownie", new fabric.Image.filters.Brownie()],
  ["Vintage", new fabric.Image.filters.Vintage()],
  ["Kodachrome", new fabric.Image.filters.Kodachrome()],
  ["Technicolor", new fabric.Image.filters.Technicolor()],
  ["Polaroid", new fabric.Image.filters.Polaroid()],
]);

export default function Filters() {
  const photoCanvas = useSelector(
    (state: ReducersType) => state.photoEditorReducer.photoCanvas
  );

  const img = photoCanvas.getObjects()[0].clipPath
    ? photoCanvas.getObjects()[0]._objects[0]
    : photoCanvas.getObjects()[0];

  const filtering = (filterName: string) => {
    if (img.filters.length > 0) img.filters.pop();
    if (filterName === "Ordinary") {
      img.applyFilters();
      photoCanvas.renderAll();
      return;
    }
    img.filters.push(FILTER_MAP.get(filterName));
    img.applyFilters();
    photoCanvas.renderAll();
  };

  return (
    <PhotoOption2 onClick={(e) => e.stopPropagation()}>
      {FILTER_NAME.map((value: string, key: number) => {
        return (
          <FilterComponent
            key={"filter" + key}
            onClick={() => {
              filtering(value);
            }}
          >
            <img src={`/filter/${value}.PNG`} />
            <p>{value}</p>
          </FilterComponent>
        );
      })}
    </PhotoOption2>
  );
}
