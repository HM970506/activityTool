import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { PHOTO, ReducersType } from "../../types";
import { useEffect, useState } from "react";
import PhotoMenu from "./photo";
import { Icon, PhotoContatiner, PhotoInnerBox } from "./style";
import { useSpring } from "react-spring";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  const photoButtonClick = () => {
    if (category !== PHOTO) dispatch(categoryActions.categoryChange(PHOTO));
    else dispatch(categoryActions.categoryChange(""));
  };

  useEffect(() => {
    if (category !== PHOTO) setIsOpen(0);
    else setIsOpen(1);
  }, [category]);

  const props = useSpring({
    from:
      category === PHOTO
        ? { backgroundColor: "white", fill: "#22E895" }
        : { backgroundColor: "#22E895", fill: "white" },
    to:
      category === PHOTO
        ? { backgroundColor: "#22E895", fill: "white" }
        : { backgroundColor: "white", fill: "#22E895" },
  });

  const outterBox = useSpring({
    from: isOpen ? { width: 72 } : { width: 268 },
    to: isOpen ? { width: 268 } : { width: 72 },
  });

  return (
    <>
      <PhotoContatiner style={outterBox}>
        <PhotoInnerBox onClick={photoButtonClick} style={props}>
          <Icon src={"/diary/photo/photo.png"} />
        </PhotoInnerBox>
        {category === PHOTO && <PhotoMenu />}
      </PhotoContatiner>
    </>
  );
}
