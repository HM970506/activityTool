import { fabric } from "fabric-with-erasing";
import { LoadingContainer, SelectableObjectButton, Thumbnail } from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../../firestore/getData";
import Loading from "react-loading";
import { useEffect, useState } from "react";

export default function Template() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const { template } = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );
  const [templates, setTemplates] = useState<any[]>([]);
  const { data, isLoading } = useQuery(
    `decoration_template`,
    async () => {
      return await getStorageDataAll(`bottomTools/decorations/template`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (!isLoading && data != undefined) setTemplates(data);
  }, [isLoading]);

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
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        templates.map((value: string, key: number) => {
          return (
            <SelectableObjectButton
              select={template.index == key ? 1 : 0}
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
      )}
    </>
  );
}
