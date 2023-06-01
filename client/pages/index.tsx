import {Connected} from "../components/examples/Connected";
import {useEffect, useState} from "react";
import {GPURent} from "../components/GPURent";
import MyRentals from "../components/MyRentals";

export function Index() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <div>
      {hasMounted &&
        <Connected>
          <MyRentals/>
          <GPURent/>

        </Connected>}
    </div>
  )
}

export default Index
