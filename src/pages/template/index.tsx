import { useParams } from "react-router-dom";
import { ColorBox, ColorChip, Dialog, Template } from "./style";
import { extractColors } from "extract-colors";
import { useEffect, useState } from "react";

export default function TemplateActivity() {
  const { templateId } = useParams();
  const url = `./test${templateId}.PNG`;
  const [colors, setColors] = useState<any[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const [colorsVisible, setColorsVisible] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

  const getColor = async () => {
    const test1 = await extractColors(url);
    if (colors != test1) setColors(test1);
  };

  useEffect(() => {
    getColor();
  }, []);

  return (
    <>
      <Template url={url} backgroundcolor={backgroundColor} />

      <ColorBox>
        <button
          onClick={() => {
            setColorsVisible((x) => !x);
          }}
        >
          배경색
        </button>
        {colorsVisible &&
          colors.map((value, key) => (
            <ColorChip
              key={key}
              backgroundcolor={value.hex}
              onClick={() => {
                setBackgroundColor(value.hex);
              }}
            />
          ))}
      </ColorBox>
      <Dialog open={dialogOpen}>
        <label>
          <input type="radio" name="group1" value="apple" />큰 쪽에 맞추기
        </label>
        <label>
          <input type="radio" name="group1" value="apple" />
          작은 쪽에 맞추기
        </label>
        <button onClick={() => setDialogOpen(false)}>확인</button>
      </Dialog>
    </>
  );
}
