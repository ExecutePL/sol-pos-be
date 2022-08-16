/** @jsxImportSource @emotion/react */
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";

export const Loading = () => {
  return (
    <div
      css={css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <CircularProgress />
    </div>
  );
};
