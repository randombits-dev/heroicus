import {useEffect, useState} from "react";
import {AvailableRentals} from "../components/AvailableRentals";
import MyRentals from "../components/rentals/MyRentals";

export function Index() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return <div>
      <MyRentals/>
      <AvailableRentals/>
    </div>;
  }
}

export default Index
