import { Spacer, Table } from "@nextui-org/react";
import React, * as react from "react";
import Barcode from "react-barcode";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { applicationState } from "../store/application/selector";
import { setLoading, useGetOrdersQuery } from "../store/application/slice";

interface OrdersProps {}

export const OrdersPage: React.FunctionComponent<OrdersProps> = ({}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(applicationState);
  const {
    data: orders,
    isFetching: ordersFetching,
    isError: ordersError,
    isSuccess: ordersSuccess,
    refetch: refetchOrders,
  } = useGetOrdersQuery(user!.id);

  React.useEffect(() => {
    refetchOrders();
  }, []);

  React.useEffect(() => {
    if (ordersFetching) {
      dispatch(setLoading(true));
    } else if (ordersError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération des commandes"
      );
    } else if (ordersSuccess) {
      dispatch(setLoading(false));
    }
  }, [ordersFetching, ordersError, ordersSuccess]);

  return (
    <div
      style={{
        marginTop: "15vh",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10vw",
        paddingRight: "10vw",
      }}
    >
      <h1>Mes commandes</h1>
      <Spacer y={2} />
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>NOTE</Table.Column>
          <Table.Column>NOM PRODUIT</Table.Column>
          <Table.Column>PRIX PRODUIT</Table.Column>
          <Table.Column>EAN13 PRODUIT</Table.Column>
        </Table.Header>
        <Table.Body>
          {orders!.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.id}</Table.Cell>
              <Table.Cell>{order.note}</Table.Cell>
              <Table.Cell>{order.products[0].name}</Table.Cell>
              <Table.Cell>{order.products[0].price}€</Table.Cell>
              <Table.Cell>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Barcode value={order.products[0].ean13} height={20} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
