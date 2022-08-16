/** @jsxImportSource @emotion/react */
import { Box, Fab, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TableBarIcon from "@mui/icons-material/TableBar";

interface TableProps {
  tableId: number;
  tableName: string;
  tableStatus: number;
  handleEditButtonClick: MouseEventHandler;
  handleTableDelete: MouseEventHandler;
}

export const Table = ({
  tableId,
  tableName,
  tableStatus,
  handleEditButtonClick,
  handleTableDelete,
}: TableProps) => {
  return (
    <Box>
      <Box
        css={css`
          padding: 30px;
          border: 2px solid var(--mui-palette-primary-main);
          border-radius: 50%;
          width: 200px;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        `}
      >
        <Link
          css={css`
            text-decoration: none;
          `}
          to={`/orders/${tableId}`}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: 20, color: "primary.light" }}
            css={css`
              white-space: break-spaces;
              text-align: center;
              display: flex;
              aling-items: center;
              justify-content: center;
              gap: 10px;
            `}
          >
            <TableBarIcon />
            <span
              css={css`
                line-height: 24px;
              `}
            >
              {tableName}
            </span>
          </Typography>
          <Typography>
            <Box
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
                padding: 5px 0;
              `}
            >
              {tableStatus === 1 ? (
                <>
                  <span
                    css={css`
                      color: green;
                    `}
                  >
                    FREE
                  </span>
                  <CheckIcon
                    css={css`
                      color: green;
                    `}
                  />
                </>
              ) : (
                <>
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    BUSY
                  </span>
                  <CloseIcon
                    css={css`
                      color: red;
                    `}
                  />
                </>
              )}
            </Box>
          </Typography>
        </Link>
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            onClick={handleEditButtonClick}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="delete"
            size="small"
            onClick={handleTableDelete}
          >
            <DeleteIcon />
          </Fab>
        </div>
      </Box>
    </Box>
  );
};
