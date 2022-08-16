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
import React from "react";
import { CREATE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/createPointOfSale";
import { DELETE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/deletePointOfSale";
import { UPDATE_POINT_OF_SALE } from "../api/gql/mutations/pointsOfSale/updatePointOfSale";
import { Loading } from "../components/Loading";
import { USER } from "../api/gql/queries/user";
import { useNavigate, useParams } from "react-router-dom";
import { LOGIN_USER_BY_WORKER } from "../api/gql/mutations/user/loginUserByWorker";
import { Keypair } from "@solana/web3.js";

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
    const [isEditDialogOpened, setIsEditDialogOpened] =
        useState<boolean>(false);
    const [selectedTable, setSelectedTable] = useState<
        PointOfSale | undefined
    >();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWaiterLogin, setIsWaiterLogin] = useState<boolean>(false);

    const navigate = useNavigate();
    const { data, loading, refetch } = useQuery(USER);
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

    const [loginUserByWorker, { loading: loginUserByWorkerLoading }] =
        useMutation(LOGIN_USER_BY_WORKER);

    useEffect(() => {
        if (waiterToken) {
            loginUserByWorker({
                variables: { remember_token: waiterToken },
                onCompleted: (data) => {
                    const loginToken = data.loginUserByWorker;
                    localStorage.setItem("login", loginToken);
                    localStorage.setItem("isWaiter", "true");
                    setIsWaiterLogin(true);
                    refetch();
                },
                onError: () => {
                    localStorage.removeItem("login");
                    localStorage.removeItem("isWaiter");
                    navigate("/");
                },
            });
        }
    }, []);

    useEffect(() => {
        const isWaiterLogin = Boolean(localStorage.getItem("isWaiter"));
        setIsWaiterLogin(isWaiterLogin);
    }, []);

    useEffect(() => {
        const isLoading =
            loading ||
            updateTableLoading ||
            createTableLoading ||
            removeTableLoading ||
            loginUserByWorkerLoading;
        setIsLoading(isLoading);
    }, [
        createTableLoading,
        loading,
        removeTableLoading,
        updateTableLoading,
        loginUserByWorkerLoading,
    ]);

    const handleNewTable = () => {
        const reference = Keypair.generate().publicKey;
        const encodeReference = reference.toBase58();
        if (newTableName) {
            createTable({
                variables: {
                    name: newTableName,
                    publicKey: encodeReference,
                },
            }).then((result) => {
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
        <Dialog open={isDialogOpened} onClose={() => setIsDialogOpened(false)}>
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <DialogTitle>Add new table:</DialogTitle>

                <TextField
                    id="outlined-basic"
                    label="Table name"
                    variant="outlined"
                    onChange={handleNewTableName}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleNewTable}
                >
                    Add
                </Button>
            </div>
        </Dialog>
    );

    const editTableDialog = (
        <Dialog
            open={isEditDialogOpened}
            onClose={() => setIsEditDialogOpened(false)}
        >
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <DialogTitle>Edit table name:</DialogTitle>
                <TextField
                    id="outlined-basic"
                    label="Table name"
                    variant="outlined"
                    onChange={handleNewTableName}
                    defaultValue={selectedTable?.name}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleTableNameEdit}
                >
                    Save
                </Button>
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
                        handleEditButtonClick={() =>
                            handleEditButtonClick(table)
                        }
                        handleTableDelete={() => handleTableDelete(table.id)}
                        tableId={table.id}
                        tableStatus={table.status}
                        isWaiterLogin={isWaiterLogin}
                    />
                ))}
        </Box>
    );
    return (
        <>
            {!isWaiterLogin && (
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
            )}
            {tableList}
            {addNewTableDialog}
            {editTableDialog}
            {isLoading && <Loading />}
        </>
    );
};
