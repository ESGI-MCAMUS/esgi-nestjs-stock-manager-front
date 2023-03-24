import {
  Button,
  Card,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductCardComponent } from "../components/ui/organisms/ProductCard.component";
import { applicationState } from "../store/application/selector";
import { setLoading } from "../store/application/slice";
import { Product } from "../store/models/product.model";
import { useCreateOrderMutation } from "../store/order/slice";
import { useGetAllProductsQuery } from "../store/product/slice";
import { handleMutationResponse } from "../utils/api/handleReponses";
import { arrayUtils } from "../utils/array.utils";

interface HomePageProps {}

export const HomePage: React.FunctionComponent<HomePageProps> = ({}) => {
  const { user, token } = useSelector(applicationState);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const {
    data: products,
    isError: productError,
    isFetching: productFetching,
    isSuccess: productSuccess,
  } = useGetAllProductsQuery();

  React.useEffect(() => {
    if (productFetching) {
      dispatch(setLoading(true));
    }
    if (productSuccess) {
      dispatch(setLoading(false));
    }

    if (productError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération des produits"
      );
    }
  }, [productFetching, productSuccess, productError]);

  const [search, setSearch] = react.useState("");
  const [searchedProducts, setSearchedProducts] = react.useState<Product[]>([]);

  const handleSearch = () => {
    if (search.length > 0) {
      const searched = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedProducts(searched!);
    } else {
      setSearchedProducts([]);
      setSearch("");
    }
  };

  const [orderProducts, orderProductResponse] = useCreateOrderMutation();

  const handleOrder = (quantity: number, productId: number) => {
    orderProducts({
      products: arrayUtils.repeat(productId, quantity),
      note: "Pas de note...",
      orderedBy: user!.id,
    });
  };

  React.useEffect(() => {
    handleMutationResponse({
      response: orderProductResponse,
      dispatch,
      successAction: () => {
        toast.success("Commande effectuée avec succès");
      },
      errorAction: () => {
        toast.error("Une erreur est survenue lors de la commande");
      },
    });
  }, [orderProductResponse]);

  if (!token || !user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Card
          css={{
            width: "80vw",
          }}
        >
          <Card.Body>
            <Text h1 as={"h3"}>
              Vous n'êtes pas connecté 😔
            </Text>
            <Text>
              Vous n'êtes pas encore connecté, pour continuer à utiliser le site
              veuillez vous connecter ou créer un compte
            </Text>
            <Spacer />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                auto
                shadow
                onPress={() => {
                  nav("/login");
                }}
              >
                Se connecter
              </Button>
              <Spacer x={0.5} />
              <Button auto flat onPress={() => nav("/register")}>
                S'inscrire
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  } else
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          paddingTop: "15vh",
          paddingLeft: "10vw",
          paddingRight: "10vw",
        }}
      >
        <Input
          clearable
          fullWidth
          contentRightStyling={false}
          placeholder="Chercher un produit..."
          aria-label="Chercher un produit..."
          onClearClick={() => {
            setSearch("");
            setSearchedProducts([]);
          }}
          contentRight={
            <Button auto onPress={() => handleSearch()}>
              Rechercher
            </Button>
          }
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Grid.Container gap={2} style={{ marginTop: "2vh" }}>
          {searchedProducts.length > 0
            ? searchedProducts.map((product) => (
                <ProductCardComponent
                  productId={product.id}
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  orderAction={handleOrder}
                />
              ))
            : products?.map((product) => (
                <ProductCardComponent
                  productId={product.id}
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  orderAction={handleOrder}
                />
              ))}
        </Grid.Container>
      </div>
    );
};
