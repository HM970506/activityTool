import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { Background, Canvas, LoadButton, MainButton, NewButton } from "./style";
import { nodeActions } from "../../store/common/nodeSlice";
import { BRUSH, cursorMove, DRAWTOOLS, PEN } from "./types";
import Node from "./nodeMakers";
import BottomTools from "./bottomTools";
import SideButtons from "./sideButtons";
import { selectActions } from "../../store/common/selectSlice";

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);

  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [nodeStore, setNodeStore] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const nodeStoreRef = useRef(null);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes); //노드 관리
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리
  const dispatch = useDispatch();
  const firstSize = { width: window.innerWidth, height: window.innerHeight };

  const onResize = (e: any) => {
    setScale({
      scaleX: e.target.innerWidth / firstSize.width,
      scaleY: e.target.innerHeight / firstSize.height,
    });
  };

  //할일
  //1.버튼 메모이제이션
  //2.캔버스 동적 리사이징 작업
  //width나 height를 조정하는 게 아닌, scaleX로 조정한다!
  //처음에 윈도우에 resize감지 함수를 넣어서 리사이징 감지하기.
  //.......왜 이렇게 작지?
  //-> 윈도우가 아니라 템플릿에 리사이즈를하려면..음....

  //메모리 누수 방지를 위해 새로운 리사이즈가 생기기 전 기존 리스너를 제거해주자.
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  //---------------------------------------------

  useEffect(() => {
    setNodeStore(nodes);
  }, [nodes]);

  //버튼 관련 부분 시작------------------------------------

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  const mainClick = () => {
    if (!activitytools) setSubButtonVisible((x) => !x);
    else {
      setSubButtonVisible(false);
      setActivitytools(false);
    }
  };

  const activitytoolsStart = () => {
    setSubButtonVisible(false);
    setActivitytools(true);
  };
  const activitytoolsEnd = () => {
    setActivitytools(false);
  };

  //버튼 관련 부분 끝-------------------------------------

  //그림 관련 부분 시작------------------------------------

  const handleMouseDown = (e: cursorMove) => {
    if (draws.tool !== "") {
      setIsDrawing(true);
      const pos = e.target.getStage()?.getPointerPosition();

      dispatch(
        nodeActions.addNodes({
          type: draws.tool,
          shapeProps: {
            stroke: draws.color,
            strokeWidth: draws.size,
            points: [pos?.x, pos?.y],
          },
        })
      );
    }
  };

  const handleMouseMove = (e: cursorMove) => {
    if (isDrawing) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      const index = nodes.length - 1;
      dispatch(
        nodeActions.modifyNodes({
          index: index,
          modifyProps: {
            points: [...nodes[index].shapeProps.points, point?.x, point?.y],
          },
        })
      );
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) setIsDrawing(false);
  };

  const mouseDown = (e: cursorMove) => {
    if (draws.tool !== "") handleMouseDown(e);
    else if (e.target == nodeStoreRef.current)
      dispatch(selectActions.selectChange(null));
  };

  //그림 관련 부분 끝------------------------------------------

  return (
    <>
      <Background ref={newActivityTool}>
        <Canvas>
          <BottomTools />
          <SideButtons activitytoolsEnd={activitytoolsEnd} />
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale.scaleX}
            onMouseDown={mouseDown}
            onTouchStart={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={nodeStoreRef}
          >
            <Layer>
              {Array.isArray(nodeStore) &&
                nodeStore.map((value: any, key: number) => {
                  return (
                    <Node
                      key={key}
                      index={key}
                      type={value.type}
                      shapeProps={value.shapeProps}
                    />
                  );
                })}
            </Layer>
          </Stage>
        </Canvas>
      </Background>

      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>활동툴</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton>불러오기</LoadButton>
              <NewButton onClick={activitytoolsStart}>새로하기</NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
