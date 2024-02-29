import { Card, CardBody, Placeholder } from "react-bootstrap";

export const ProductCardSkeleton = () => {
  return (
    <Card style={{ maxWidth: "15rem", height: "19rem", paddingTop: "1rem" }}>
      <div style={{ height: "6rem", backgroundColor: "grey" }}></div>
      <CardBody className="d-flex flex-column justify-content-between">
        <Placeholder animation="glow">
          <Placeholder style={{ width: "100px", height: "30px" }} />
        </Placeholder>
        <Placeholder animation="glow">
          <Placeholder xs={6} style={{ height: "40px" }} />
        </Placeholder>
        <Placeholder animation="glow">
          <Placeholder xs={12} style={{ height: "30px" }} />
        </Placeholder>
      </CardBody>
    </Card>
  );
};
