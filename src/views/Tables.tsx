/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Dialog,
  DialogTitle,
  Fab,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { Table } from "./Table";
import { useMutation, useQuery } from "@apollo/client";
import { POINTS_OF_SALE } from "../api/gql/queries/pointsOfSale/pointsOfSale";
import React from "react";
import { CREATE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/createPointOfSale";
import { DELETE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/deletePointOfSale";
import { UPDATE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/updatePointOfSale";
import { Loading } from "../components/Loading";
import { USER } from "../api/gql/queries/user";
import { useNavigate, useParams } from "react-router-dom";

type PointOfSale = {
  id: number;
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
};

export const Tables = () => {
  const [tables, setTables] = useState<PointOfSale[] | undefined>(undefined);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [newTableName, setNewTableName] = useState<string | undefined>(
    undefined
  );
  const [isEditDialogOpened, setIsEditDialogOpened] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<PointOfSale | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, loading } = useQuery(USER);
  const [createTable, { loading: createTableLoading }] = useMutation(
    CREATE_POINT_OF_SALE,
    {
      refetchQueries: [USER],
    }
  );
  const [removeTable, { loading: removeTableLoading }] = useMutation(
    DELETE_POINT_OF_SALE,
    {
      refetchQueries: [USER],
    }
  );
  const [updateTable, { loading: updateTableLoading }] = useMutation(
    UPDATE_POINT_OF_SALE,
    {
      refetchQueries: [USER],
    }
  );

  useEffect(() => {
    if (!data) return;
    const tables = data.me.pointsOfSale;
    setTables(tables);
  }, [data]);

  const { waiterToken } = useParams() as { waiterToken: string };
  useEffect(() => {
    if (waiterToken) {
      localStorage.setItem("waiterToken", waiterToken);
      navigate("/");
    }
  });
  useEffect(() => {
    const isLoading =
      loading || updateTableLoading || createTableLoading || removeTableLoading;
    setIsLoading(isLoading);
  }, [createTableLoading, loading, removeTableLoading, updateTableLoading]);

  const handleNewTable = () => {
    if (newTableName) {
      createTable({ variables: { name: newTableName } }).then((result) => {
        if (result) {
          setIsDialogOpened(false);
          setNewTableName(undefined);
        }
      });
    }
  };
  const handleNewTableName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTableName(event.target.value);
  };
  const handleTableDelete = (selectedTableId: number) => {
    if (tables) {
      removeTable({
        variables: { id: selectedTableId },
      });
    }
  };
  const handleTableNameEdit = () => {
    if (newTableName && selectedTable) {
      updateTable({
        variables: { id: selectedTable.id, name: newTableName },
      }).then((result) => {
        if (result) {
          setIsEditDialogOpened(false);
        }
      });
    }
  };
  const handleEditButtonClick = (table: PointOfSale) => {
    setSelectedTable(table);
    setIsEditDialogOpened(true);
  };
  const addNewTableDialog = (
    <Dialog
      open={isDialogOpened}
      onClose={() => setIsDialogOpened(false)}
      sx={{ pt: 0 }}
    >
      <div style={{ padding: "20px" }}>
        <DialogTitle>Add new table:</DialogTitle>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Table name"
              variant="outlined"
              onChange={handleNewTableName}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" onClick={handleNewTable}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );

  const editTableDialog = (
    <Dialog
      open={isEditDialogOpened}
      onClose={() => setIsEditDialogOpened(false)}
    >
      <div style={{ padding: "20px" }}>
        <DialogTitle>Edit table name:</DialogTitle>
        <TextField
          id="outlined-basic"
          label="Table name"
          variant="outlined"
          onChange={handleNewTableName}
          defaultValue={selectedTable?.name}
        />
        <Fab
          color="primary"
          aria-label="save"
          onClick={handleTableNameEdit}
          sx={{ marginLeft: "10px" }}
        >
          <SaveIcon />
        </Fab>
      </div>
    </Dialog>
  );

  const tableList = (
    <Box
      css={css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
        padding-top: 20px;
      `}
    >
      {tables &&
        tables.map((table) => (
          <Table
            key={table.id}
            tableName={table.name}
            handleEditButtonClick={() => handleEditButtonClick(table)}
            handleTableDelete={() => handleTableDelete(table.id)}
            tableId={table.id}
            tableStatus={table.status}
          />
        ))}
    </Box>
  );
  return (
    <>
      <Fab
        css={css`
          position: fixed;
          bottom: 20px;
          right: 20px;
        `}
        color="primary"
        aria-label="add"
        onClick={() => setIsDialogOpened(true)}
      >
        <AddIcon />
      </Fab>
      {tableList}
      {addNewTableDialog}
      {editTableDialog}
      {isLoading && <Loading />}
    </>
  );
};
