import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";

export default function DocVersionBannerWrapper(props) {
  const location = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!location.pathname.includes("latest")) {
      setShown(true);
    }
  }, [location.pathname]);

  return (
    <>
      {shown && (
        <div
          className="theme-doc-version-banner alert alert--warning margin-bottom--md"
          role="alert"
        >
          <div>You are viewing the documentation of an unreleased version of RisingWave.</div>
          <b>
            <a href={`/docs/latest/${location.pathname.split("/").at(-2)}`}>
              {" "}
              Switch to the latest public release →
            </a>
          </b>
        </div>
      )}
      {/* <DocVersionBanner {...props} /> */}
    </>
  );
}
