import { Button, Card, Grid, Input, Link, Spacer } from "@nextui-org/react";
import * as react from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { applicationState } from "../store/application/selector";
import { useRegisterMutation } from "../store/application/slice";
import { handleMutationResponse } from "../utils/api/handleReponses";

interface RegisterPageProps {}

export const RegisterPage: React.FunctionComponent<
  RegisterPageProps
> = ({}) => {
  const nav = useNavigate();
  const { user, token } = useSelector(applicationState);
  const dispatch = useDispatch();

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [register, registerResult] = useRegisterMutation();

  const handleRegister = () => {
    // Password regexp
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // email regexp
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      toast.warn("Veuillez remplir tous les champs");
    } else if (password !== passwordConfirmation) {
      toast.warn("Les mots de passe ne correspondent pas");
    } else if (!passwordRegexp.test(password)) {
      toast.warn(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre"
      );
    } else if (!emailRegexp.test(email)) {
      toast.warn("L'adresse email n'est pas valide");
    } else {
      register({
        firstname,
        lastname,
        email,
        password,
      });
    }
  };

  React.useEffect(() => {
    handleMutationResponse({
      response: registerResult,
      dispatch,
      successAction: () => {
        toast.success("Vous êtes inscrit !");
        nav("/login");
      },
      errorAction: () => {
        toast.error("Une erreur s'est produite, veuillez réessayer...");
      },
    });
  }, [registerResult]);

  React.useEffect(() => {
    if (token && user) {
      nav("/");
    }
  }, [user, token]);
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
          }}
        >
          <h1>Inscription</h1>
          <Spacer />
          <Grid.Container gap={2}>
            <Grid xs={12} md={6}>
              <Input
                placeholder="Prénom"
                fullWidth
                label="Prénom"
                type={"text"}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                placeholder="Nom"
                fullWidth
                label="Nom"
                type={"text"}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                placeholder="Email"
                fullWidth
                label="Email"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input.Password
                placeholder="Mot de passe"
                fullWidth
                label="Mot de passe"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input.Password
                placeholder="Confirmation du mot de passe"
                fullWidth
                label="Confirmation de mot de passe"
                type={"password"}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Grid>
          </Grid.Container>
          <Spacer />
          <Button onPress={() => handleRegister()}>S'inscrire</Button>
          <Link
            as={"p"}
            css={{
              cursor: "pointer",
            }}
            onClick={() => nav("/login")}
          >
            Vous avez un compte ? Connectez-vous
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
