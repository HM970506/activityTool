import { fabric } from "fabric-with-erasing";
import {
  SelectableObjectButton,
  Thumbnail,
} from "../../styles/bottomToolstyle";
import { categoryActions } from "../../../../store/common/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { ReducersType } from "../../types";

export default function Template() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const [templates, setTemplates] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { template } = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory
  );

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("decoration_template");

  useEffect(() => {
    if (Array.isArray(data)) setTemplates(data);
  }, [data]);

  const templating = (url: string) => {
    fabric.Image.fromURL(url, (img: any) => {
      const scale = canvas.width / img.width;

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scale,
        scaleY: scale,
        erasable: false,
      });

      canvas.setHeight(img.height * scale);
      canvas.renderAll();
    });
  };

  return (
    <>
      {data ? (
        templates.map((value: string, key: number) => {
          return (
            <SelectableObjectButton
              select={template.index === key ? 1 : 0}
              key={`template_${key}`}
              onClick={() => {
                templating(value);
                dispatch(categoryActions.templateChange(key));
              }}
            >
              <Thumbnail src={value} />
            </SelectableObjectButton>
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
