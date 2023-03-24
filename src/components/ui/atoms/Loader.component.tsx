import { Card, Loading } from "@nextui-org/react";
import * as react from "react";

interface LoaderProps {
  isLoading: boolean;
}

export const LoaderComponent: React.FunctionComponent<LoaderProps> = ({
  isLoading,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 25,
        width: "100vw",
        display: isLoading ? "flex" : "none",
        zIndex: 1000,
      }}
    >
      <Loading
        css={{
          width: "100vw",
        }}
      />
    </div>
  );
};
