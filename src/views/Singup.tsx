/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import { MouseEventHandler, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../api/gql/mutations/user/createUser";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

interface SingupProps {
  handleLoginClick: MouseEventHandler;
}
type UserData = {
  name?: string;
  email?: string;
  walletId?: string;
  password?: string;
};

export const Singup = ({ handleLoginClick }: SingupProps) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const handleCreateAccountClick = () => {
    if (
      !userData?.name ||
      !userData?.email ||
      !userData?.walletId ||
      !userData.password
    ) {
      setError("Please, complete all fields");
    } else {
      createUser({ variables: { ...userData } });
    }
  };
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (!data) return;
      const loginToken = data.createUser;
      localStorage.setItem("login", loginToken);
      setError(undefined);
      navigate("/tables");
    },
    onError: (error) => setError(error.message),
  });
  return (
    <Box
      css={css`
        max-width: 420px;
        width: 100%;
        border: 1px solid;
        padding: 30px;
        margin: 5vh auto 0;
        background: rgba(255, 255, 255, 0.4);
      `}
    >
      <Typography
        variant="h1"
        css={css`
          text-align: center;
          font-size: 40px;
          font-weight: 700;
          padding-bottom: 40px;
          color: rgba(0, 0, 0, 0.7);
        `}
      >
        Create account
      </Typography>
      <FormControl
        css={css`
          display: grid;
          gap: 25px;
        `}
      >
        <TextField
          id="name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          placeholder="Account name"
          type="text"
          required
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <TextField
          id="email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          placeholder="Email Adress"
          type="email"
          required
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <TextField
          id="wallet"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceWalletIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Wallet Adress"
          type="text"
          required
          onChange={(e) =>
            setUserData({ ...userData, walletId: e.target.value })
          }
        />
        <TextField
          id="password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          placeholder="Password"
          type="password"
          required
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        {error && (
          <Typography
            css={css`
              color: red;
              font-size: 11.5px;
              text-align: center;
            `}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          css={css`
            background-color: #8968fc;
            color: #fff;
          `}
          onClick={handleCreateAccountClick}
        >
          Create account
        </Button>
        <Typography
          css={css`
            font-style: italic;
            text-align: center;
            font-size: 12px;
            padding: 0 15px;
          `}
        >
          By selecting Create account, you agree with{" "}
          <Link
            css={css`
              text-decoration: none;
              color: #8968fc;
            `}
          >
            Terms
          </Link>{" "}
          and here read here read and acknowledge our{" "}
          <Link
            css={css`
              text-decoration: none;
              color: #8968fc;
            `}
          >
            Global Privacy Statement
          </Link>{" "}
        </Typography>
        <Typography>
          Have account?{" "}
          <Button
            href="#"
            css={css`
              text-decoration: none;
              line-height: 0.6;
              color: #8968fc;
            `}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Typography>
      </FormControl>
      {loading && <Loading />}
    </Box>
  );
};
