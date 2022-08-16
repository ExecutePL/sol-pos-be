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
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import { MouseEventHandler } from "react";

interface LoginProps {
  handleSingupClick: MouseEventHandler;
}

export const Login = ({ handleSingupClick }: LoginProps) => {
  return (
    <Box
      css={css`
        max-width: 420px;
        width: 100%;
        border: 1px solid #fff;
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
        Login
      </Typography>
      <FormControl
        css={css`
          display: grid;
          gap: 25px;
        `}
      >
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
        <Link
          href="#"
          css={css`
            text-decoration: none;
            color: #8968fc;
          `}
        >
          Forgot password?
        </Link>
        <Button
          variant="contained"
          size="large"
          css={css`
            background-color: #8968fc;
            color: #fff;
          `}
        >
          Login
        </Button>
        <Typography>
          Not yet account?{" "}
          <Button
            href="#"
            css={css`
              text-decoration: none;
              line-height: 1;
              color: #8968fc;
            `}
            onClick={handleSingupClick}
          >
            Singup now!
          </Button>
        </Typography>
      </FormControl>
    </Box>
  );
};
