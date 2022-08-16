import { useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useLayoutEffect, useState } from "react";
import { USER } from "../api/gql/queries/user";
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
];
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
  const { data, loading, refetch } = useQuery(USER);
  useEffect(() => {
    if (!data) return;
    const bills = data.me.bills;
    const formatedBills = bills.map((bill: Bill) => {
      return {
        ...bill,
        workerName: bill?.worker?.name,
        tableName: bill?.pointOfSale?.name,
        status: bill.status === 1 ? "opened" : "closed",
      };
    });
    setBills(formatedBills);
  }, [data]);
  useLayoutEffect(() => {
    refetch();
  }, []);
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
