import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { ImageType, ReducersType } from "../../types";
import { categoryActions } from "../../../../store/common/categorySlice";
import { DecoOptionContainer, Thumbnail, ThumbnailBox } from "./sizebox";

export default function Template() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const [templates, setTemplates] = useState<string[]>([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("decoration_template");

  useEffect(() => {
    if (Array.isArray(data)) setTemplates(data);
  }, [data]);

  const templating = (url: string) => {
    fabric.Image.fromURL(url, (img: ImageType) => {
      if (img.width !== undefined && img.height !== undefined) {
        const canvasRatio =
          Math.round((canvas.width / canvas.height) * 100) / 100;
        const imgRatio = Math.round((img.width / img.height) * 100) / 100;

        console.log(canvasRatio, imgRatio);

        const scale =
          canvasRatio <= imgRatio
            ? canvas.width / img.width
            : canvas.height / img.height;
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: scale,
          scaleY: scale,
          erasable: false,
          top: canvas.getCenter().top,
          left: canvas.getCenter().left,
          originX: "center",
          originY: "center",
        });
        img.crossOrigin = "Anonymous";

        canvas.renderAll();
      }
    });
  };

  return (
    <DecoOptionContainer>
      {data ? (
        templates.map((value: string, key: number) => {
          return (
            <ThumbnailBox
              key={`template_${key}`}
              onClick={() => {
                templating(value);
                dispatch(categoryActions.templateChange(key));
              }}
            >
              <Thumbnail src={value} />
              <p>제목</p>
            </ThumbnailBox>
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </DecoOptionContainer>
  );
}
