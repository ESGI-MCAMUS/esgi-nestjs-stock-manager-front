import {
  Grid,
  Card,
  Row,
  Button,
  Text,
  Input,
  Spacer,
} from "@nextui-org/react";
import * as react from "react";
import Barcode from "react-barcode";

interface ProductCardProps {
  productId: number;
  title: string;
  description: string;
  price: number;
  ean13: string;
  orderAction: (quantity: number, productId: number) => void;
}

export const ProductCardComponent: React.FunctionComponent<
  ProductCardProps
> = ({ title, description, price, orderAction, productId, ean13 }) => {
  const [quantity, setQuantity] = react.useState(1);
  return (
    <Grid xs={12} md={4}>
      <Card>
        <Card.Header>
          <Text b>{title}</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>{description}</Text>
          <Spacer y={1} />
          <Input
            disabled
            labelRight="€"
            aria-label="price"
            value={`${price}`}
          />
          <Spacer y={1} />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Barcode value={ean13} />
          </div>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button
              size="sm"
              auto
              onPress={() => orderAction(quantity, productId)}
            >
              Commander
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
