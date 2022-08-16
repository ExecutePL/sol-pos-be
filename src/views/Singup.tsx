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
import { MouseEventHandler } from "react";

interface SingupProps {
  handleLoginClick: MouseEventHandler;
}

export const Singup = ({ handleLoginClick }: SingupProps) => {
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
        />
        <Button
          variant="contained"
          size="large"
          css={css`
            background-color: #8968fc;
            color: #fff;
          `}
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
    </Box>
  );
};
