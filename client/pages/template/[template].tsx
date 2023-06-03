import {useRouter} from "next/router";
import FullTemplateCard from "../../components/FullTemplateCard";

export function Template() {
  const router = useRouter();
  const templateId = router.query.template as string;
  return <FullTemplateCard templateId={templateId}/>;
}

export default Template;
