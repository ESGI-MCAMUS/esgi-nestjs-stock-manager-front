import { Button, Input, Modal, Spacer, Table, Text } from "@nextui-org/react";
import React, * as react from "react";
import Barcode from "react-barcode";
import {
  FiAlignLeft,
  FiBox,
  FiDatabase,
  FiDollarSign,
  FiEdit,
  FiMail,
  FiNavigation,
  FiPhone,
  FiPlusCircle,
  FiTrash,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { applicationState } from "../store/application/selector";
import { setLoading, useGetSupplierQuery } from "../store/application/slice";
import { Product } from "../store/models/product.model";
import { Supplier } from "../store/models/suppliers.model";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../store/product/slice";
import {
  useGetSuppliersProductsQuery,
  useUpdateSupplierMutation,
} from "../store/supplier/slice";
import { handleMutationResponse } from "../utils/api/handleReponses";

interface SupplierProps {}

export const SupplierPage: React.FunctionComponent<SupplierProps> = ({}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(applicationState);
  const nav = useNavigate();

  const {
    data: suppliers,
    isFetching: suppliersFetching,
    isError: suppliersError,
    isSuccess: suppliersSuccess,
    refetch: suppliersRefetch,
  } = useGetSupplierQuery(user!.id);

  const [supplierFetched, setSupplierFetched] = React.useState<
    Supplier | undefined
  >();
  React.useEffect(() => {
    if (suppliersFetching) {
      dispatch(setLoading(true));
    } else if (suppliersError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération du fournisseur"
      );
    } else if (suppliersSuccess) {
      dispatch(setLoading(false));
      setSupplierFetched(suppliers!);
      setName(suppliers?.name);
      setAddress(suppliers?.address);
      setPhone(suppliers?.phone);
      setEmail(suppliers?.email);
    }
  }, [suppliersFetching, suppliersError, suppliersSuccess, suppliers]);

  const [modalEditVisible, setModalEditVisible] = React.useState(false);

  const [name, setName] = React.useState(supplierFetched?.name);
  const [address, setAddress] = React.useState(supplierFetched?.address);
  const [phone, setPhone] = React.useState(supplierFetched?.phone);
  const [email, setEmail] = React.useState(supplierFetched?.email);

  const [updateSupplier, updateSupplierResponse] = useUpdateSupplierMutation();

  const handleEditSupplier = () => {
    if (name && address && phone && email) {
      updateSupplier({
        id: supplierFetched?.id,
        name,
        address,
        phone,
        email,
      });
    } else {
      toast.warn("Veuillez remplir tous les champs");
    }
  };

  React.useEffect(() => {
    handleMutationResponse({
      response: updateSupplierResponse,
      dispatch,
      successAction: () => {
        toast.success("Fournisseur modifié avec succès");
        suppliersRefetch();
        setModalEditVisible(false);
      },
      errorAction: () => {
        toast.error("Une erreur est survenue lors de la modification");
      },
    });
  }, [updateSupplierResponse]);

  const {
    data: suppliersProducts,
    isFetching: suppliersProductsFetching,
    isError: suppliersProductsError,
    isSuccess: suppliersProductsSuccess,
    refetch: suppliersProductsRefetch,
  } = useGetSuppliersProductsQuery(supplierFetched?.id ?? -1);

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (suppliersProductsFetching) {
      dispatch(setLoading(true));
    } else if (suppliersProductsError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération des produits du fournisseur"
      );
    } else if (suppliersProductsSuccess) {
      dispatch(setLoading(false));
      setProducts(suppliersProducts!);
    }
  }, [
    suppliersProductsFetching,
    suppliersProductsError,
    suppliersProductsSuccess,
  ]);

  const [modalCreateVisible, setModalCreateVisible] = React.useState(false);

  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productPrice, setProductPrice] = React.useState(0);
  const [ean13, setEan13] = React.useState("");

  const [createProduct, createProductResponse] = useCreateProductMutation();

  const handleCreateProduct = () => {
    if (productName && productDescription && productPrice && ean13) {
      createProduct({
        name: productName,
        description: productDescription,
        price: productPrice,
        ean13,
        supplierId: supplierFetched!.id,
      });
    } else {
      toast.warn("Veuillez remplir tous les champs");
    }
  };

  React.useEffect(() => {
    handleMutationResponse({
      response: createProductResponse,
      dispatch,
      successAction: () => {
        toast.success("Produit créé avec succès");
        suppliersProductsRefetch();
        setModalCreateVisible(false);
      },
      errorAction: () => {
        toast.error("Une erreur est survenue lors de la création du produit");
      },
    });
  }, [createProductResponse]);

  const [deleteProduct, deleteProductResponse] = useDeleteProductMutation();

  React.useEffect(() => {
    handleMutationResponse({
      response: deleteProductResponse,
      dispatch,
      successAction: () => {
        toast.success("Produit supprimé avec succès");
        suppliersProductsRefetch();
      },
      errorAction: () => {
        toast.error(
          "Une erreur est survenue lors de la suppression du produit"
        );
      },
    });
  }, [deleteProductResponse]);

  React.useEffect(() => {
    if (user?.role !== "SUPPLIER") {
      toast.warn("Vous n'avez pas accès à cette page");
      nav("/");
    }
    suppliersRefetch();
    suppliersProductsRefetch();
  }, []);
  return (
    <div
      style={{
        paddingTop: "15vh",
        paddingBottom: "15vh",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10vw",
        paddingRight: "10vw",
      }}
    >
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Modifier un{" "}
            <Text b size={18}>
              fournisseur
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nom du fournisseur"
            label="Nom du fournisseur"
            contentLeft={<FiEdit size={20} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type={"address"}
            placeholder="Adresse du fournisseur"
            label="Adresse du fournisseur"
            contentLeft={<FiNavigation size={20} />}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type={"phone"}
            placeholder="Téléphone du fournisseur"
            label="Téléphone du fournisseur"
            contentLeft={<FiPhone size={20} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email du fournisseur"
            label="Email du fournisseur"
            contentLeft={<FiMail size={20} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setModalEditVisible(false)}
          >
            Annuler
          </Button>
          <Button
            auto
            onPress={() => handleEditSupplier()}
            icon={<FiEdit size={20} />}
          >
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalCreateVisible}
        onClose={() => setModalCreateVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Créer un{" "}
            <Text b size={18}>
              produit
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nom du produit"
            label="Nom du produit"
            contentLeft={<FiBox size={20} />}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Description du produit"
            label="Description du produit"
            contentLeft={<FiAlignLeft size={20} />}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Prix du produit"
            label="Prix du produit"
            contentLeft={<FiDollarSign size={20} />}
            type={"number"}
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="EAN13 du produit"
            label="EAN13 du produit"
            contentLeft={<FiDatabase size={20} />}
            type={"number"}
            value={ean13}
            onChange={(e) => setEan13(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setModalCreateVisible(false)}
          >
            Annuler
          </Button>
          <Button
            auto
            onPress={() => handleCreateProduct()}
            icon={<FiPlusCircle size={20} />}
          >
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h2>Information du fournisseur </h2>
        <Spacer x={1} />
        <Button
          auto
          icon={<FiEdit size={20} />}
          onPress={() => setModalEditVisible(true)}
        />
      </div>
      <Table>
        <Table.Header>
          <Table.Column>NOM</Table.Column>
          <Table.Column>ADRESSE</Table.Column>
          <Table.Column>TÉLÉPHONE</Table.Column>
          <Table.Column>EMAIL</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{supplierFetched?.name}</Table.Cell>
            <Table.Cell>{supplierFetched?.address}</Table.Cell>
            <Table.Cell>{supplierFetched?.phone}</Table.Cell>
            <Table.Cell>{supplierFetched?.email}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Spacer y={2} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h2>Gestion des produits </h2>
        <Spacer x={1} />
        <Button
          auto
          icon={<FiPlusCircle size={20} />}
          onPress={() => setModalCreateVisible(true)}
        />
      </div>
      <Table>
        <Table.Header>
          <Table.Column>NOM</Table.Column>
          <Table.Column>DESCRIPTION</Table.Column>
          <Table.Column>PRIX</Table.Column>
          <Table.Column>EAN13</Table.Column>
          <Table.Column>ACTION</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.price}€</Table.Cell>
              <Table.Cell>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Barcode value={product.ean13} height={20} />
                </div>
              </Table.Cell>
              <Table.Cell>
                <Button
                  auto
                  icon={<FiTrash size={20} />}
                  color="error"
                  onPress={() => deleteProduct(product.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
