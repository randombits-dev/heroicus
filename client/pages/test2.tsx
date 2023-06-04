import {useEffect, useState} from "react";
import {useServerList} from "../hooks/useServerList";

export function Admin() {
  const [hasMounted, setHasMounted] = useState(false);
  const serverList = useServerList();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return <div>
      {
        serverList.map(s => (<div key={s.id}>{s.id}</div>))
      }
    </div>;
  }
}

export default Admin
