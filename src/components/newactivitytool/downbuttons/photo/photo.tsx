import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryButton, Icon, Uploader } from "../../style";
import { DEFAULT_X, ImageType, ReducersType } from "../../types";
import { photoEditorActions } from "../../../../store/common/photoEditorSlice";
import { imageCheck } from "./photoChecker";
import { fabric } from "fabric-with-erasing";
import { Transform } from "fabric/fabric-impl";
import editIcon from "./editButton.png";
const renderIcon = (
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number
) => {
  const size = 48;
  ctx.save();
  ctx.translate(left, top);
  const img = new Image();
  img.src = editIcon;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

export default function PhotoMenu() {
  const [photo, setPhoto] = useState<string>("");
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const editObject = (e: MouseEvent, transform: Transform) => {
    const target = transform.target;
    const canvas = target.canvas;

    if (canvas !== undefined) {
      canvas.remove(target);
      canvas.renderAll();
    }
    dispatch(photoEditorActions.setIsEditing(true));
    dispatch(photoEditorActions.setPhoto(target));
  };

  useEffect(() => {
    const test = async () => {
      if (canvas && photo !== "") {
        if (await imageCheck(photo)) {
          new fabric.Image.fromURL(photo, (img: ImageType) => {
            img.hoverCursor = "auto";
            img.erasable = false;
            img.selectable = true;
            img.crossOrigin = "Anonymous";

            img.objectType = "photo";
            if (img.controls) {
              img.controls.editControl = new fabric.Control({
                x: 0.5,
                y: -0.5,
                cursorStyle: "pointer",
                mouseUpHandler: editObject,
                render: renderIcon,
                cornerSize: 30,
              });
            }

            if (img.width !== undefined) {
              const scale = DEFAULT_X / img.width;
              img.scaleX = scale;
              img.scaleY = scale;
            }

            canvas.add(img);
            canvas.setActiveObject(img);
          });
          setPhoto("");
        } else {
          alert("적합한 이미지가 아닙니다");
        }
      }
    };

    test();
  }, [photo, canvas]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async (e: ProgressEvent<FileReader>) => {
        if (e.target !== null && typeof e.target.result === "string")
          setPhoto(e.target.result);
      };

      e.target.value = "";
    }
  };

  const photoUpload = () => {
    if (inputRef.current !== null) inputRef.current?.click();
  };
  const isEditing = useSelector((state: ReducersType) => {
    return state.photoEditorReducer.isEditing;
  });

  useEffect(() => {
    canvas.isDrawingMode = false;
  }, [isEditing]);

  return (
    <>
      <Uploader
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onUploadImage}
      />
      <CategoryButton onClick={photoUpload}>
        <Icon src={"/diary/photo/gallery.png"} />
        <span>앨범</span>
      </CategoryButton>
      <CategoryButton>
        <Icon src={"/diary/photo/camera.png"} />
        <span>사진 찍기</span>
      </CategoryButton>
    </>
  );
}
