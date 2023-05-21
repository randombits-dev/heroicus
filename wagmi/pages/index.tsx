import {Connected} from "../components/examples/Connected";
import {USDCBalance} from "../components/USDCBalance";
import {useEffect, useState} from "react";
import {GPURent} from "../components/GPURent";

export function Index() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <div>
      {hasMounted &&
        <Connected>
          <div>Hello World</div>
          <USDCBalance/>

          <hr/>

          <GPURent/>
        </Connected>}
    </div>
  )
}

export default Index
