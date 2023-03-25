import { Navbar, Button, Link, Text } from "@nextui-org/react";
import * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { applicationState } from "../../../store/application/selector";
import { disconnect } from "../../../store/application/slice";
import { UserRoles } from "../../../store/models/application.model";

interface NavbarComponentProps {}

export const NavbarComponent: React.FunctionComponent<
  NavbarComponentProps
> = ({}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector(applicationState);

  if (!token || !user) return null;
  return (
    <Navbar
      isBordered
      variant={"floating"}
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          ESGI Stock Manager
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link
          onClick={() => nav("/")}
          isActive={location.pathname === "/"}
        >
          Accueil
        </Navbar.Link>
        {user?.role === UserRoles.SUPPLIER && (
          <Navbar.Link
            onClick={() => nav("/supplier")}
            isActive={location.pathname === "/supplier"}
          >
            Paramètres fournisseurs
          </Navbar.Link>
        )}
        {user?.role === UserRoles.ADMIN && (
          <Navbar.Link
            onClick={() => nav("/admin")}
            isActive={location.pathname === "/admin"}
          >
            Admin
          </Navbar.Link>
        )}
        <Navbar.Link
          onClick={() => nav("/orders")}
          isActive={location.pathname === "/orders"}
        >
          Mes commandes
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            onClick={() => {
              dispatch(disconnect());
              nav("/login");
            }}
          >
            Se déconnecter
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
