import { useParams } from "react-router-dom";

export default function TemplateActivity() {
  const { templateId } = useParams();

  return <div>{templateId}</div>;
}
