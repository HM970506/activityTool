import { ChangeEvent, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { Button, Uploader } from "../style";

export default function PhotoButton() {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const addNodes = (img: any) => {
    dispatch(
      nodeActions.addNodes({
        type: "PHOTO",
        shapeProps: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 100,
          height: 100,
          fillPatternImage: img,
        },
      })
    );
  };

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = reader.result;
        //해당 이미지를 서버에 저장하는 로직
        //저장된 이미지 링크를 가져오는 로직
        const sampleImg = new Image();
      };
    }
  }, []);

  const photoUpload = () => {
    if (inputRef.current !== null) inputRef.current?.click();
  };

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("PHOTO"));
        //이거 왜 2번 실행되지..?
        photoUpload();
      }}
    >
      <Uploader
        ref={inputRef}
        type="file"
        accept="imgae/*"
        onChange={onUploadImage}
      />
      사진
    </Button>
  );
}
