import React from "react";
import { useRouter } from "next/router";
export default function myaccount() {
  const router = useRouter();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);
  return <div>My Account</div>;
}
