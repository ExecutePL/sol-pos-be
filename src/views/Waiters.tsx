/** @jsxImportSource @emotion/react */
import {
  Button,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { PersonAdd } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { useQuery, useMutation } from "@apollo/client";
import { WAITERS } from "../api/gql/queries/waiters/waiters";
import { CREATE_WAITER } from "../api/gql/mutations/waiters/createWaiter";
import { REMOVE_WAITER } from "../api/gql/mutations/waiters/removeWaiter";
import { UPDATE_WAITER } from "../api/gql/mutations/waiters/updateWorker";
import { Loading } from "../components/Loading";
import { css } from "@emotion/react";
type Waiter = {
  id: number;
  name: string;
};
export const Waiters = () => {
  const { data, loading } = useQuery(WAITERS);
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [newWaiterName, setNewWaiterName] = useState<string | undefined>(
    undefined
  );
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter | undefined>();
  const [isEditDialogOpened, setIsEditDialogOpened] = useState<boolean>(false);

  const [createWaiter, { loading: createWaiterLoading }] = useMutation(
    CREATE_WAITER,
    {
      refetchQueries: [WAITERS],
    }
  );
  const [removeWaiter, { loading: removeWaiterLoading }] =
    useMutation(REMOVE_WAITER);
  const [updateWaiter, { loading: updateWaiterLoading }] = useMutation(
    UPDATE_WAITER,
    {
      refetchQueries: [WAITERS],
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    const waiters = data.workers.data;
    setWaiters(waiters);
  }, [data]);

  useEffect(() => {
    const isLoading =
      loading ||
      updateWaiterLoading ||
      createWaiterLoading ||
      removeWaiterLoading;
    setIsLoading(isLoading);
  }, [createWaiterLoading, loading, removeWaiterLoading, updateWaiterLoading]);

  const handleWaiterDelete = (selectedWaiter: Waiter) => {
    if (selectedWaiter) {
      const newWaiters = waiters.filter(
        (waiter: Waiter) => waiter.name !== selectedWaiter.name
      );
      setWaiters([...newWaiters]);
    }
    removeWaiter({
      variables: { id: selectedWaiter.id, userId: 1 },
    });
  };
  const handleNewWaiter = () => {
    createWaiter({
      variables: {
        name: newWaiterName,
        userId: 1,
      },
    }).then((result) => {
      if (result) {
        setIsDialogOpened(false);
      }
    });
  };
  const handleNewWaiterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWaiterName(event.target.value);
  };

  const handleTableNameEdit = (waiter_id: number) => {
    if (newWaiterName) {
      updateWaiter({
        variables: {
          id: waiter_id,
          name: newWaiterName,
          userId: 1,
        },
      }).then((result) => {
        if (result) {
          setIsDialogOpened(false);
        }
      });
      setIsEditDialogOpened(false);
    }
  };
  const handleEditButtonClick = (waiter: Waiter) => {
    setSelectedWaiter(waiter);
    console.log(waiter);
    setIsEditDialogOpened(true);
  };

  const addNewWaiterDialog = (
    <Dialog
      open={isDialogOpened}
      onClose={() => setIsDialogOpened(false)}
      sx={{ pt: 0 }}
    >
      <div style={{ padding: "20px" }}>
        <DialogTitle>Add new waiter:</DialogTitle>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Table name"
              variant="outlined"
              onChange={handleNewWaiterName}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" onClick={handleNewWaiter}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );

  const editWaiterDialog = (
    <Dialog
      open={isEditDialogOpened}
      onClose={() => setIsEditDialogOpened(false)}
    >
      <div style={{ padding: "20px" }}>
        <DialogTitle>Edit waiter name:</DialogTitle>
        <TextField
          id="outlined-basic"
          label="Table name"
          variant="outlined"
          onChange={handleNewWaiterName}
          defaultValue={selectedWaiter?.name}
        />
        <Fab
          color="primary"
          aria-label="save"
          onClick={() => handleTableNameEdit(selectedWaiter!.id)}
          sx={{ marginLeft: "10px" }}
        >
          <SaveIcon />
        </Fab>
      </div>
    </Dialog>
  );

  return (
    <>
      <List sx={{ width: "100%" }}>
        {waiters.map((waiter) => (
          <ListItem
            sx={{
              borderBottom: "1px solid ",
              padding: "20px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "15px" }}>
              <Person />
              <Typography>{waiter.name}</Typography>
            </div>
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditButtonClick(waiter)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleWaiterDelete(waiter)}
              >
                <DeleteIcon />
              </IconButton>

              <Button variant="contained" sx={{ marginLeft: "20px" }}>
                Generate link
              </Button>
            </div>
          </ListItem>
        ))}
      </List>{" "}
      <div style={{ width: "100%", textAlign: "right", padding: "20px" }}>
        <Fab
          color="primary"
          aria-label="addPerson"
          onClick={() => setIsDialogOpened(true)}
          css={css`
            position: fixed;
            bottom: 20px;
            right: 20px;
          `}
        >
          <PersonAdd />
        </Fab>
      </div>
      {addNewWaiterDialog}
      {editWaiterDialog}
      {isLoading && <Loading />}
    </>
  );
};
