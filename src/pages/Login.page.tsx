import { Button, Card, Input, Link, Spacer } from "@nextui-org/react";
import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setToken,
  setUser,
  useLoginMutation,
} from "../store/application/slice";
import { toast } from "react-toastify";
import { handleMutationResponse } from "../utils/api/handleReponses";
import { applicationState } from "../store/application/selector";

interface LoginPageProps {}

export const LoginPage: React.FunctionComponent<LoginPageProps> = ({}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector(applicationState);

  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");

  const [login, loginResult] = useLoginMutation();

  const handleLogin = () => {
    login({ email, password });
  };

  React.useEffect(() => {
    if (token && user) {
      nav("/");
    }
  }, [user, token]);

  React.useEffect(() => {
    handleMutationResponse({
      response: loginResult,
      dispatch,
      successAction: () => {
        const { access_token, dataValues } = loginResult.data!;
        dispatch(setToken(access_token));
        dispatch(setUser(dataValues));
        toast.success("Vous êtes connecté !");
        nav("/");
      },
      errorAction: () => {
        toast.error("Veuillez vérifier vos identifiants et réessayer...");
      },
    });
  }, [loginResult]);

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
        <Card.Body
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "10vw",
            paddingRight: "10vw",
          }}
        >
          <h1>Connexion</h1>
          <Spacer />
          <Input
            placeholder="Email"
            fullWidth
            label="Email"
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer />
          <Input.Password
            placeholder="Mot de passe"
            fullWidth
            label="Mot de passe"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer />
          <Button onPress={() => handleLogin()}>Se connecter</Button>
          <Link
            as={"p"}
            css={{
              cursor: "pointer",
            }}
            onClick={() => nav("/register")}
          >
            Pas encore de compte ?
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
