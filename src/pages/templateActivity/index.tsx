import { useParams } from "react-router-dom";
import { ColorBox, ColorChip, Template } from "./style";
import { extractColors } from "extract-colors";
import { useEffect, useState } from "react";

export default function TemplateActivity() {
  const { templateId } = useParams();
  const url = `./test${templateId}.PNG`;
  const [colors, setColors] = useState<any[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>("white");

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
        {colors.map((value, key) => (
          <ColorChip
            key={key}
            backgroundcolor={value.hex}
            onClick={() => {
              setBackgroundColor(value.hex);
            }}
          />
        ))}
      </ColorBox>
    </>
  );
}
