import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./details.module.scss";
import { formatDate } from "../utils/utils";
import Image from "../components/image/image";
import { Button, Icon } from "react-materialize";

const CodeDetails = ({ type }) => {
  const { id } = useParams();
  let [detail, setDetail] = useState();

  useEffect(() => {
    const path = `${id}/${id}`;
    const promise = import("../pageDetails/" + path);
    promise.then((d) => {
      setDetail(d.default);
    });
  }, []);

  return (
    detail && (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.heading}>
            <h1>{detail.company}</h1>
            <h6>{formatDate(detail.start, detail.end)}</h6>
          </div>
          <Image path={detail.image} parallax />
        </div>
        <div className={styles.content}>
          <div className={styles.stack}>
            {detail.stack}
          </div>
          {detail.content ? (
            detail.content
          ) : (
            <div className={styles.comingSoon}> COMING SOON</div>
          )}
          <Button
          node="button"
          small
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "rgba(114, 179, 116, 1)",
            cursor: "none",
            mixBlendMode: "difference",
          }}
          waves="light"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          BACK TO TOP
          <Icon right>arrow_upward</Icon>
        </Button>
        </div>
      </div>
    )
  );
};

export default CodeDetails;
