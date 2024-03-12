import NotFound from "../../assets/PageNotFound.webp";
import { Card } from "react-bootstrap";

export const PageNotFound = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle, rgba(192,196,204,1) 0%, rgba(255,255,255,1) 30%, rgba(192,196,204,1) 100%)",
        textAlign: "center",
      }}
    >
      <Card.Img
        src={NotFound}
        alt="pageNotFound"
        style={{
          maxWidth: "800px",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
