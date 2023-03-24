import { Card, Loading } from "@nextui-org/react";
import * as react from "react";

interface StoreLoaderProps {}

export const StoreLoaderComponent: React.FunctionComponent<
  StoreLoaderProps
> = ({}) => {
  return (
    <Card
      css={{
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Body>
        <Loading />
      </Card.Body>
    </Card>
  );
};
