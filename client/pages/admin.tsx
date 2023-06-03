import {useEffect, useState} from "react";
import AdminHome from "../components/admin/AdminHome";

export function Admin() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return <div>
      <AdminHome/>
    </div>;
  }
}

export default Admin
