/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface RouteContentProps {
  children: ReactNode;
}

export const RouteContent = ({ children }: RouteContentProps) => {
  return (
    <main
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        margin-top: 65px;
        flex-wrap: wrap;
      `}
    >
      {children}
    </main>
  );
};
