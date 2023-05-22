import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { RECORD, ReducersType } from "../../types";
import { Icon2, RecordContatiner } from "./style";
import { useEffect, useState } from "react";
import Record from "./record";
import { useSpring } from "react-spring";
import { ButtonInner, Icon } from "../../style";

export default function RecordButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const [state, setState] = useState<string>("");
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (category !== RECORD) setIsOpen(0);
    else setIsOpen(1);
  }, [category]);

  const recordButtonClick = () => {
    if (category !== RECORD) dispatch(categoryActions.categoryChange(RECORD));
    else dispatch(categoryActions.categoryChange(""));
  };

  const props = useSpring({
    from:
      category === RECORD
        ? { backgroundColor: "white", fill: "#2895AB" }
        : { backgroundColor: "#22E895", fill: "white" },
    to:
      category === RECORD
        ? { backgroundColor: "#22E895", fill: "white" }
        : { backgroundColor: "white", fill: "#2895AB" },
  });

  const outterBox = useSpring({
    from: isOpen ? { width: 72 } : { width: 268 },
    to: isOpen ? { width: 268 } : { width: 72 },
  });

  return (
    <RecordContatiner style={outterBox}>
      <ButtonInner style={props} onClick={recordButtonClick}>
        {state === "start" || state == "goon" ? (
          <Icon2 src={"/diary/recorder/voiceon.png"} />
        ) : (
          <Icon src={"/diary/recorder/voiceoff.png"} />
        )}
      </ButtonInner>
      {isOpen == 1 ? <Record state={state} setState={setState} /> : null}
    </RecordContatiner>
  );
}
