import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReducersType } from "./types";
import { photoEditorActions } from "../../store/common/photoEditorSlice";

const PhotoEditorContainer = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 15%;
  background-color: white;
  z-index: 1001;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5fr 1fr;
  justify-content: center;
  align-items: center;

  div {
    border: 1px solid black;
  }
`;

const PhotoEditorOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
`;

const PhotoEditorButtons = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 30%;
    height: 60%;
  }
`;

const PhotoEditorCutterContainer = styled.div``;

const PhotoEditorCutter = styled.div`
  height: 10% impotant!;
`;

export default function PhotoEditor() {
  const view = useSelector((state: ReducersType) => {
    return state.photoEditorReducer.view;
  });
  const dispatch = useDispatch();

  //이 안에 검은 배경 캔버스를 하나 만들고, 거기에 사진 편집 기능을 넣자
  //틀을 선택하면 틀 외는 검은 오버레이로 보이게 하고 틀을 자유롭게 조정 가능하게.
  //그리고 확인을 누르면 현재 캔버스에 있는 모든 것들을 하나의 그룹화하여 원래 캔버스로 보내기.
  //그룹화할때 오버레이 대신 겹친 영역만 보이게 하는 거 적용해서...
  const test = [0, 1, 2, 3];
  return (
    <>
      {view && (
        <PhotoEditorOverlay>
          <PhotoEditorContainer>
            <PhotoEditorCutterContainer>
              {test.map((value: any, key: number) => {
                return (
                  <PhotoEditorCutter key={`cutter_${key}`}>
                    {value}
                  </PhotoEditorCutter>
                );
              })}
            </PhotoEditorCutterContainer>
            <div>캔버스 들어갈 곳</div>
            <PhotoEditorButtons>
              <button>완성</button>
              <button>취소</button>
            </PhotoEditorButtons>
          </PhotoEditorContainer>
        </PhotoEditorOverlay>
      )}
    </>
  );
}
