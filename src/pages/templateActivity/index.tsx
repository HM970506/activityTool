import { useParams } from "react-router-dom";
import { Background, Template } from "./style";
import { ColorExtractor } from "react-color-extractor";

export default function TemplateActivity() {
  const { templateId } = useParams();

  return (
    <ColorExtractor getColors={this.getColors}>
      <Template image={templateId!} />
    </ColorExtractor>
  );
}
