import {useRouter} from "next/router";
import FullTemplateCard from "../../components/FullTemplateCard";
import WalletLayout from "../../components/layout/WalletLayout";
import dynamic from "next/dynamic";


export function Template() {
  const router = useRouter();
  const templateId = router.query.template as string;
  return <WalletLayout><FullTemplateCard templateId={templateId}/></WalletLayout>;
}

export default dynamic(() => Promise.resolve(Template), {
  ssr: false,
});
