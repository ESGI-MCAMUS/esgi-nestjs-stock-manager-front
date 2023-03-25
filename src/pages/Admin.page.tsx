import {
  Button,
  Checkbox,
  Input,
  Modal,
  Row,
  Spacer,
  Table,
  Text,
} from "@nextui-org/react";
import * as react from "react";
import React from "react";
import {
  FiPlusCircle,
  FiTrash2,
  FiEdit,
  FiMail,
  FiPhone,
  FiNavigation,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { applicationState } from "../store/application/selector";
import { setLoading, useGetAllUsersQuery } from "../store/application/slice";
import { User } from "../store/models/application.model";
import { Supplier } from "../store/models/suppliers.model";
import {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetAllSuppliersQuery,
} from "../store/supplier/slice";
import { handleMutationResponse } from "../utils/api/handleReponses";

interface AdminProps {}

export const AdminPage: React.FunctionComponent<AdminProps> = ({}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector(applicationState);

  const [suppliersList, setSuppliersList] = React.useState<Supplier[]>([]);

  const {
    data: suppliers,
    isFetching: suppliersFetching,
    isError: suppliersError,
    isSuccess: suppliersSuccess,
    refetch: suppliersRefetch,
  } = useGetAllSuppliersQuery();

  React.useEffect(() => {
    if (suppliersFetching) {
      dispatch(setLoading(true));
    } else if (suppliersError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération des fournisseurs"
      );
    } else if (suppliersSuccess) {
      dispatch(setLoading(false));
      setSuppliersList(suppliers!);
      console.log(suppliers);
    }
  }, [suppliersFetching, suppliersError, suppliersSuccess, suppliers]);

  const [usersFetched, setUsersFetched] = React.useState<User[]>([]);

  const {
    data: users,
    isFetching: usersFetching,
    isError: usersError,
    isSuccess: usersSuccess,
    refetch: usersRefetch,
  } = useGetAllUsersQuery();

  React.useEffect(() => {
    if (usersFetching) {
      dispatch(setLoading(true));
    } else if (usersError) {
      dispatch(setLoading(false));
      toast.error(
        "Une erreur est survenue lors de la récupération des utilisateurs"
      );
    } else if (usersSuccess) {
      dispatch(setLoading(false));
      setUsersFetched(users!);
      console.log(users);
    }
  }, [usersFetching, usersError, usersSuccess, users]);

  const [deleteSupplier, deleteSupplierResult] = useDeleteSupplierMutation();

  React.useEffect(() => {
    handleMutationResponse({
      response: deleteSupplierResult,
      dispatch,
      successAction: () => {
        toast.success("Fournisseur supprimé avec succès");
        suppliersRefetch();
      },
      errorAction: () => {
        toast.error("Une erreur est survenue lors de la suppression");
      },
    });
  }, [deleteSupplierResult]);

  const [createSupplier, createSupplierResult] = useCreateSupplierMutation();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");

  const handleAddSupplier = () => {
    if (!name || !address || !phone || !email) {
      toast.warn("Veuillez remplir tous les champs");
    } else {
      createSupplier({
        name,
        phone,
        address,
        email,
        userId: Number(userId),
      });
    }
  };

  React.useEffect(() => {
    if (user?.role !== "ADMIN") {
      toast.error("Vous n'avez pas accès à cette page");
      nav("/");
    }
    suppliersRefetch();
  }, []);

  React.useEffect(() => {
    handleMutationResponse({
      response: createSupplierResult,
      dispatch,
      successAction: () => {
        toast.success("Fournisseur créé avec succès");
        suppliersRefetch();
        setModalVisible(false);
      },
      errorAction: () => {
        toast.error("Une erreur est survenue lors de la création");
      },
    });
  }, [createSupplierResult]);

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
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Créer un{" "}
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            placeholder="Sélectionner un utilisateur"
            onChange={(e) => setUserId(e.target.value)}
          >
            {usersFetched.map((user) => (
              <option value={user.id} key={user.id}>
                {user.firstname} {user.lastname} ({user.email})
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setModalVisible(false)}
          >
            Annuler
          </Button>
          <Button
            auto
            onPress={() => handleAddSupplier()}
            icon={<FiPlusCircle size={20} />}
          >
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Administration</h1>
      <Spacer y={1} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text as={"h3"}>Gestion des fournisseurs</Text>
        <Spacer x={1} />
        <Button
          auto
          icon={<FiPlusCircle size={20} />}
          onPress={() => setModalVisible(true)}
        />
      </div>
      <Spacer y={1} />
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>NOM</Table.Column>
          <Table.Column>ADRESSE</Table.Column>
          <Table.Column>TÉLÉPHONE</Table.Column>
          <Table.Column>EMAIL</Table.Column>
          <Table.Column>ACTIONS</Table.Column>
        </Table.Header>
        <Table.Body>
          {suppliersList.map((supplier) => (
            <Table.Row key={supplier.id}>
              <Table.Cell>{supplier.id}</Table.Cell>
              <Table.Cell>{supplier.name}</Table.Cell>
              <Table.Cell>{supplier.address}</Table.Cell>
              <Table.Cell>{supplier.phone}</Table.Cell>
              <Table.Cell>{supplier.email}</Table.Cell>
              <Table.Cell>
                <Button
                  auto
                  color={"error"}
                  onPress={() => deleteSupplier(supplier.id)}
                  icon={<FiTrash2 size={20} />}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
