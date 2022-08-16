import { useQuery } from "@apollo/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { BILLS } from "../api/gql/queries/bills/bills";
import { Loading } from "./Loading";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "sum", headerName: "Sum", width: 130 },
  { field: "createdAt", headerName: "Created at", width: 170 },
  {
    field: "workerName",
    headerName: "Worker",
    width: 90,
  },
  {
    field: "tableName",
    headerName: "Table",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];
type Bill = {
  id: number;
  status: number;
  sum: number;
  createdAt: Date;
  worker: {
    id: number;
    name: string;
  };
  pointOfSale: {
    id: number;
    name: string;
  };
  workerName?: string;
  tableName?: string;
};
export const TransactionsTable = () => {
  const [bills, setBills] = useState<Bill[] | undefined>();
  const { data, loading } = useQuery(BILLS);
  useEffect(() => {
    if (!data) return;
    const bills = data.bills.data;
    const formatedBills = bills.map((bill: Bill) => {
      return {
        ...bill,
        workerName: bill.worker.name,
        tableName: bill.pointOfSale.name,
      };
    });
    setBills(formatedBills);
  }, [data]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {bills && (
        <DataGrid
          rows={bills}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{ color: "primary.main" }}
        />
      )}
      {loading && <Loading />}
    </div>
  );
};
