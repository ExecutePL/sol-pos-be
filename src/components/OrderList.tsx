import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Check from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { POINT_OF_SALE } from "../api/gql/queries/pointOfSale/pointOfSale";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../api/gql/queries/products/products";
import { Box, Dialog, DialogTitle, Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { UPDATE_ORDERED_PRODUCTS } from "../api/gql/mutations/pointsOfSale/updateOrderedProduct";
import { DELETE_ORDERED_PRODUCT } from "../api/gql/mutations/pointsOfSale/deleteOrderedProduct";
import { CHECK_OR_CREATE_BILL } from "../api/gql/mutations/bill/checkOrCreateBill";
import { Loading } from "./Loading";
import { CREATE_ORDERED_PRODUCT } from "../api/gql/mutations/pointsOfSale/createOrderProduct";
const TAX_RATE = 0.07;

type BillData = {
  sum: number;
  tip: number;
  total: number;
  id?: number;
};

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(
  o_id: number,
  id: number,
  name: string,
  qty: number,
  unit: number,
  status: number
) {
  const price = priceRow(qty, unit);
  return { o_id, id, name, qty, unit, price, status };
}

interface Row {
  id: number;
  name: string;
  qty: number;
  unit: number;
  price: number;
  status: number;
}

const productStatuses = [
  { id: 1, name: "Ordered" },
  { id: 2, name: "In progress" },
  { id: 3, name: "Canceled" },
  { id: 4, name: "Complete" },
];
export const OrderList = () => {
  const [isEditDialogOpened, setIsEditDialogOpened] = useState<boolean>(false);
  const [orderedProductStatus, setOrderedProductStatus] = useState<
    number | undefined
  >(undefined);
  const [newOrderedProductStatus, setNewOrderedProductStatus] = useState<
    number | undefined
  >(undefined);
  const newProductIdRef = useRef<HTMLInputElement>();
  const newProductQtyRef = useRef<HTMLInputElement>();
  const newOrderedProductIdRef = useRef<HTMLInputElement>();
  const { tableId } = useParams();
  const [productsList, setProductsList] = useState<
    {
      id: number;
      name: string;
      description: string;
      active: boolean;
      price: number;
    }[]
  >([]);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [newProductId, setNewProductId] = useState(Number);
  const [newProductQty, setNewProductQty] = useState(1);
  const [billData, setBillData] = useState<BillData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loading, data } = useQuery(POINT_OF_SALE, {
    variables: { id: tableId },
  });
  useEffect(() => {
    if (!data) return;
    if (!loading) {
      if (
        data.pointOfSale.bills[0] &&
        typeof data.pointOfSale.bills[0].orderedProducts
      ) {
        const orderedProducts = data.pointOfSale.bills[0].orderedProducts.map(
          (orderedItems: {
            id: number;
            status: number;
            product: { id: number; name: string; price: number };
          }) =>
            createRow(
              orderedItems.id,
              orderedItems.product.id,
              orderedItems.product.name,
              1,
              orderedItems.product.price,
              orderedItems.status
            )
        );
        setOrderList(orderedProducts);
        console.log(data.pointOfSale);
        if (data.pointOfSale.bills[0]) {
          const sum = data.pointOfSale.bills[0].sum;
          const total = data.pointOfSale.bills[0].total;
          const tip = data.pointOfSale.bills[0].tip;
          const id = data.pointOfSale.bills[0].id;
          const billData = {
            sum,
            total,
            tip,
            id,
          };
          setBillData(billData);
        }
      } else {
        console.log("No products");
      }
      /* */
    }
  }, [data, loading]);

  useQuery(PRODUCTS, {
    onCompleted: (data) => {
      if (!data) return;
      setProductsList(data.products.data);
    },
  });

  const [updateOrderedProduct, { loading: updateProductStatusLoading }] =
    useMutation(UPDATE_ORDERED_PRODUCTS, {
      refetchQueries: [POINT_OF_SALE],
    });
  const [deleteOrderedProduct, { loading: deleteProductStatusLoading }] =
    useMutation(DELETE_ORDERED_PRODUCT, {
      refetchQueries: [POINT_OF_SALE],
    });

  const [checkOrCreateBill] = useMutation(CHECK_OR_CREATE_BILL, {
    onCompleted: (data) => {
      if (!data) return;
      console.log(data);
      const waiterName = data.checkOrCreateBill.worker.name;
      const tableName = data.checkOrCreateBill.pointOfSale.name;
    },
  });

  const [createOrderedProduct, { loading: createOrderProductLoading }] =
    useMutation(CREATE_ORDERED_PRODUCT, {
      refetchQueries: [POINT_OF_SALE],
    });

  useEffect(() => {
    checkOrCreateBill({
      variables: { posId: tableId, userId: 1, workerId: 1 },
    });
  }, [tableId]);

  useEffect(() => {
    const isLoading =
      loading ||
      updateProductStatusLoading ||
      deleteProductStatusLoading ||
      createOrderProductLoading;
    setIsLoading(isLoading);
  }, [
    deleteProductStatusLoading,
    loading,
    updateProductStatusLoading,
    createOrderProductLoading,
  ]);

  const handleRemove = (o_id: number) => {
    deleteOrderedProduct({
      variables: { id: o_id },
    }).then((result) => {
      if (result) {
        console.log(result);
      }
    });
  };

  const handleSubmit = () => {
    if (billData) {
      createOrderedProduct({
        variables: { billId: billData.id, productId: newProductId },
      });
    }
  };
  const handleOrderedProductStatus = () => {
    if (orderedProductStatus) {
      updateOrderedProduct({
        variables: {
          id: orderedProductStatus,
          status: newOrderedProductStatus,
        },
      }).then((result) => {
        if (result) {
          setIsEditDialogOpened(false);
        }
      });
    }
  };

  const editOrderedProductStatus = (
    <Dialog
      open={isEditDialogOpened}
      onClose={() => setIsEditDialogOpened(false)}
    >
      <div style={{ padding: "20px" }}>
        <DialogTitle>Edit status:</DialogTitle>
        <TextField
          id="standard-select-currency"
          select
          label="Product status"
          onChange={(e) => setNewOrderedProductStatus(Number(e.target.value))}
          helperText="Please select new status"
          variant="standard"
          inputRef={newOrderedProductIdRef}
        >
          {productStatuses.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Fab
          color="primary"
          aria-label="save"
          onClick={handleOrderedProductStatus}
          sx={{ marginLeft: "10px" }}
        >
          <SaveIcon />
        </Fab>
      </div>
    </Dialog>
  );
  return (
    <>
      <Box>
        <h2>Table: {!loading ? data.pointOfSale.name : ""}</h2>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList &&
              orderList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">x{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  <TableCell align="center">
                    {row.status === 4 && (
                      <Chip
                        color="success"
                        label={<span>Complete</span>}
                        icon={<Check fontSize="small" />}
                        onClick={() => {
                          setIsEditDialogOpened(true);
                          setOrderedProductStatus(row.o_id);
                        }}
                      />
                    )}
                    {row.status === 3 && (
                      <Chip
                        color="error"
                        label={<span>Canceled</span>}
                        icon={<Check fontSize="small" />}
                      />
                    )}
                    {row.status === 2 && (
                      <Chip
                        color="warning"
                        label={<span>In progress</span>}
                        icon={<Check fontSize="small" />}
                        onClick={() => {
                          setIsEditDialogOpened(true);
                          setOrderedProductStatus(row.o_id);
                        }}
                      />
                    )}
                    {row.status === 1 && (
                      <Chip
                        label={<span>Ordered</span>}
                        icon={<Check fontSize="small" />}
                        onClick={() => {
                          setIsEditDialogOpened(true);
                          setOrderedProductStatus(row.o_id);
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => handleRemove(row.o_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {/* <IconButton aria-label="delete" size="large">
                    <EditIcon />
                  </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            {orderList.length > 0 && billData && (
              <>
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {billData.sum === 0 ? 0 : ccyFormat(billData.sum)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tip</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(billData.tip)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {billData.total === 0 ? 0 : ccyFormat(billData.total)}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Product"
                  onChange={(e) => setNewProductId(Number(e.target.value))}
                  helperText="Please select product"
                  variant="standard"
                  inputRef={newProductIdRef}
                >
                  {productsList &&
                    productsList.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  id="standard-number"
                  label="Qty"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  helperText="Please select qty"
                  variant="standard"
                  inputRef={newProductQtyRef}
                  onChange={(e) => {
                    setNewProductQty(Number(e.target.value));
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit}
                >
                  Add new product
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      {editOrderedProductStatus}
      {isLoading && <Loading />}
    </>
  );
};
