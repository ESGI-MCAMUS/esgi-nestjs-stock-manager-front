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

interface ProductCardProps {
  productId: number;
  title: string;
  description: string;
  price: number;
  orderAction: (quantity: number, productId: number) => void;
}

export const ProductCardComponent: React.FunctionComponent<
  ProductCardProps
> = ({ title, description, price, orderAction, productId }) => {
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
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Input
              type={"number"}
              min={1}
              max={99}
              onChange={(e) => setQuantity(Number(e.target.value))}
              fullWidth
              value={quantity}
              placeholder="Quantité"
              size="sm"
              aria-label="Quantité"
            />
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
