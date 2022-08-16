import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Switch, TextField } from "@mui/material";
import { PRODUCTS } from "../api/gql/queries/products/products";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DELETE_PRODUCT } from "../api/gql/mutations/products/deleteProduct";
import { CREATE_PRODUCT } from "../api/gql/mutations/products/createProduct";
import { UPDATE_PRODUCT } from "../api/gql/mutations/products/updateProducts";
import SaveIcon from "@mui/icons-material/Save";
import { Loading } from "./Loading";
import { USER } from "../api/gql/queries/user";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  active: boolean;
}

export const ProductsList = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [isInEditMode, setIsInEditMode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productUpdate, setProductUpdate] = useState<{
    name: string;
    description: string;
    price: string;
    active: boolean;
  }>({
    name: "",
    description: "",
    price: "",
    active: true,
  });
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    price: string;
    active: boolean;
  }>({
    name: "",
    description: "",
    price: "",
    active: true,
  });

  const createData = (
    id: number,
    name: string,
    description: string,
    price: string,
    active: boolean
  ) => ({
    id,
    name,
    description,
    price,
    active,
  });

  const { loading } = useQuery(USER, {
    onCompleted: (data) => {
      const rows = data.me.products.map(
        ({ id, name, description, price, active }: Product) =>
          createData(id, name, description, price, active)
      );
      setRows(rows);
    },
  });

  const [deleteProduct, { loading: deleteProductLoading }] =
    useMutation(DELETE_PRODUCT);
  const handleDeleteProduct = (rowId: number) => {
    deleteProduct({
      variables: { id: rowId },
      onCompleted: (data) => {
        const rows = data.deleteProduct.user.products.map(
          ({ id, name, description, price, active }: Product) =>
            createData(id, name, description, price, active)
        );
        setRows(rows);
      },
    });
  };

  const [createProduct, { loading: createProductLoading }] =
    useMutation(CREATE_PRODUCT);
  const handleCreateProduct = () => {
    const { name, description, price, active } = newProduct;
    createProduct({
      variables: { name, description, price, active },
      onCompleted: (data) => {
        const rows = data.createProduct.user.products.map(
          ({ id, name, description, price, active }: Product) =>
            createData(id, name, description, price, active)
        );
        setRows(rows);
      },
    });
  };

  const [updateProduct, { loading: updateProductLoading }] =
    useMutation(UPDATE_PRODUCT);
  const handleUpdateProduct = (
    rowId: number,
    name: string,
    description: string,
    price: string,
    active: boolean
  ) => {
    if (!isInEditMode) {
      setIsInEditMode(rowId);
      setProductUpdate({ name, description, price, active });
    } else if (isInEditMode === rowId) {
      const { name, description, price, active } = productUpdate;
      updateProduct({
        variables: { id: rowId, name, description, price, active },
        onCompleted: (data) => {
          console.log(data);

          const rows = data.updateProduct.user.products.map(
            ({ id, name, description, price, active }: Product) =>
              createData(id, name, description, price, active)
          );
          setRows(rows);
        },
      });
      setIsInEditMode(null);
    } else {
      setIsInEditMode(rowId);
      setProductUpdate({ name, description, price, active });
    }
  };

  useEffect(() => {
    const isLoading =
      loading ||
      deleteProductLoading ||
      updateProductLoading ||
      createProductLoading;
    setIsLoading(isLoading);
  }, [
    createProductLoading,
    deleteProductLoading,
    loading,
    updateProductLoading,
  ]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Menu</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Active</TableCell>
            </TableRow>
          </TableHead>
          {rows && (
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ display: "flex", flexDirection: "column" }}
                    component="th"
                    scope="row"
                  >
                    {isInEditMode === row.id ? (
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="standard"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          setProductUpdate({
                            ...productUpdate,
                            name: event.target.value,
                          })
                        }
                        value={productUpdate.name}
                      />
                    ) : (
                      <p>{row.name}</p>
                    )}
                    {isInEditMode === row.id ? (
                      <TextField
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          setProductUpdate({
                            ...productUpdate,
                            description: event.target.value,
                          })
                        }
                        value={productUpdate.description}
                      />
                    ) : (
                      <p>{row.description}</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {isInEditMode === row.id ? (
                      <TextField
                        id="standard-basic"
                        label="Price"
                        variant="standard"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          setProductUpdate({
                            ...productUpdate,
                            price: event.target.value,
                          })
                        }
                        value={productUpdate.price}
                      />
                    ) : (
                      <p>{row.price}</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {isInEditMode === row.id ? (
                      <Switch
                        checked={productUpdate.active}
                        onChange={() =>
                          setProductUpdate({
                            ...productUpdate,
                            active: !productUpdate.active,
                          })
                        }
                      />
                    ) : (
                      <Switch checked={row.active} />
                    )}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        onClick={() =>
                          handleUpdateProduct(
                            row.id,
                            row.name,
                            row.description,
                            row.price,
                            row.active
                          )
                        }
                      >
                        {isInEditMode === row.id ? <SaveIcon /> : <EditIcon />}
                      </Button>
                      <Button onClick={() => handleDeleteProduct(row.id)}>
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  sx={{ display: "flex", flexDirection: "column" }}
                  component="th"
                  scope="row"
                >
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({ ...newProduct, name: event.target.value })
                    }
                    value={newProduct.name}
                  />
                  <TextField
                    id="standard-basic"
                    label="Description"
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({
                        ...newProduct,
                        description: event.target.value,
                      })
                    }
                    value={newProduct.description}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="standard-basic"
                    label="Price"
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewProduct({
                        ...newProduct,
                        price: event.target.value,
                      })
                    }
                    value={newProduct.price}
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={newProduct.active}
                    onChange={() =>
                      setNewProduct({
                        ...newProduct,
                        active: !newProduct.active,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleCreateProduct}>
                    <AddIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isLoading && <Loading />}
    </>
  );
};
