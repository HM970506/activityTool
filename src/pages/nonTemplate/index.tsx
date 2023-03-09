import { useParams } from "react-router-dom";
import { Background, ColorBox, ColorChip, Dialog } from "./style";
import { extractColors } from "extract-colors";
import { useEffect, useState } from "react";

export default function NonTemplate() {
  const { templateId } = useParams();
  const url = `./test${templateId}.PNG`;
  const [colors, setColors] = useState<any[]>([]);

  const getColor = async () => {
    const test1 = await extractColors(url);
    if (colors != test1) setColors(test1);
  };

  useEffect(() => {
    getColor();
  }, []);

  return (
    <>
      {templateId == "3" ? (
        <Background url={url} />
      ) : (
        <iframe width="100%" height="1000" src="https://velog.io/" />
      )}
    </>
  );
}
