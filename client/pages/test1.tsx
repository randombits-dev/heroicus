import {useEffect, useState} from "react";
import {useServerList} from "../hooks/useServerList";
import {useRouter} from "next/router";

export function Admin() {
  const [hasMounted, setHasMounted] = useState(false);
  const serverList = useServerList();
  const {push} = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return <div>
      {
        serverList.map(s => (<div key={s.id}>{s.id}</div>))
      }
      <button onClick={() => push('/test2')}>Test 2</button>
    </div>;
  }
}

export default Admin
