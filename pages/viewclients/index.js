import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { Grid, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Pagination from "../../components/pagination";
import Menu from "../../components/menu";
import Edit from "../../components/edit";

export default function Home({ clients }) {
  console.log(clients, "ia m rayshy");
  const router =useRouter()
  const[isRefreshing,setIsRefreshing] =useState(false)
  const [menuopen, setMenuopen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentitem, setCurrentitem] = useState(null);
  const anchorRef = useRef(null);
  const handleVertClick = () => {
    setMenuopen(true);
  };
  const handleDelete = async (id) => {
    console.log("sharif", id);
    const data = await axios.get(
      `https://vouch-digital-backend.herokuapp.com/client/deleteclient/${id}`
    );
    refreshData()
  };
  const handleEdit = async (d) => {
    console.log("sharif", id);
    const data = await axios.post(`https://vouch-digital-backend.herokuapp.com/client/editclient`, {
      d,
    });
  };
  const refreshData=()=>{
router.replace(router.asPath)
setIsRefreshing(true)
  }
  return (
    <Container>
      <LoginContainer>
        <div>
          <h3 style={{ color: "#030037", marginTop: "15px" }}>Company Name</h3>
          <LeftInput placeholder="search modules" />
          <h3
            style={{
              color: "#030037",
              marginTop: "15px",
              color: "#B8BABC",
              fontSize: "14px",
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            Client Master
          </h3>
          <h3
            style={{
              color: "#030037",
              marginTop: "5px",
              fontSize: "14px",
              marginTop: "15px",
              marginLeft: "5px",
            }}
          >
            View Clients
          </h3>

          <AddClient type="submit" value="Add Clients" />
        </div>
        <User>
          <div>
            <h3>James Burton</h3>
            <p>rajeshmn47@gmail.com</p>
          </div>
          <Icon>
            <LogoutIcon style={{ color: "#B8BABC" }} />
          </Icon>
        </User>
      </LoginContainer>
      <Assets>
        <h3 style={{ color: "#030037" }}>View Clients</h3>
        <p style={{ color: "#686687", fontSize: "10px", margin: "5px 0" }}>
          Client Master/view Clients
        </p>

        <Sorting>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <Input placeholder="Sort By" />
            </Grid>
            <Grid item lg={3}>
              <Input placeholder="Facilitator" />
            </Grid>
            <Grid item lg={3}>
              <ButtonReset
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "gray",
                  marginTop: "16px",
                }}
              >
                Reset
              </ButtonReset>
            </Grid>
          </Grid>
        </Sorting>
        <TableContainer>
          <SortingNew>
            <Grid
              container
              spacing={2}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid
                item
                lg={3}
                style={{ display: "flex", alignItems: "center" }}
              >
                <RightInput placeholder="Search" />
              </Grid>
            </Grid>
          </SortingNew>
          <Table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email Address</th>
                <th>Phone No</th>
                <th>Contact Person</th>
                <th>Facilitator</th>
                <th>Sites</th>
                <th>Tenants</th>
                <th>Tenants Groups</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients &&
                clients.map((c) => (
                  <tr>
                    <Td>
                      <img
                        src={`https://vouch-digital-backend.herokuapp.com/images/${c.image}`}
                        alt=""
                        width="40"
                      />
                      {c.company}
                    </Td>
                    <td>{c.email}</td>
                    <td>{c.phonenumber}</td>
                    <td>{c.name}</td>
                    <td>--</td>
                    <td>{c.website.length}</td>
                    <td>--</td>
                    <td>--</td>
                    <td>
                      <MoreVertIcon
                        onClick={() => handleVertClick()}
                        ref={anchorRef}
                      />
                      <Menu
                        menuopen={menuopen}
                        setMenuopen={setMenuopen}
                        anchorRef={anchorRef}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        setDialogOpen={setDialogOpen}
                        setCurrentitem={setCurrentitem}
                        row={c}
                        id={c._id}
                        row={c}
                        refreshData={refreshData}
                      />
                      <Edit
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        currentitem={currentitem}
                        refreshData={refreshData}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination />
          </PaginationContainer>
        </TableContainer>
      </Assets>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background: #f8f9fd;
`;

const LoginContainer = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: space-between;
  padding: 10px 10px;
  height: 100vh;
  background-color: #ffffff;
`;

const Assets = styled.div`
  margin-left: 18%;
  width: 82%;
  height: auto;
  color: #ffffff;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  label {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    /* identical to box height, or 143% */

    display: block;

    /* Secondary ISS Dark Blue/100% */

    color: #030037;

    /* Inside auto layout */
  }
`;

const Title = styled.h5`
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 44px;
  /* identical to box height */

  letter-spacing: -0.005em;

  /* White */

  color: #ffffff;
`;

const Welcome = styled.h5`
font-family: 'Nunito Sans';
font-style: normal;
font-weight: 800;
font-size: 32px;
line-height: 44px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.005em;
/* Secondary ISS Dark Blue/100% */5

`;

const Input = styled.input`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  outline: none;

  /* White */

  background: #ffffff;
  /* Grey/Light/100% */

  border: 1px solid #e6e6e6;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 5px 0;
  width: 100%;
`;
const InputSubmit = styled.input`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  width: 100%;
  margin: 5px 0;
  /* Primary Persian Blue/125% */
  color: #ffffff;
  outline: none;
  border: none;
  background: #1334b3;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  width: 85%;
  flex-direction: column;
  align-items: center;
`;
const Terms = styled.div``;

const FormContainer = styled.div`
  background: #f8f9fd;
  margin-top: 20px;
`;

const Form = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
`;

const Radio = styled.input`
  display: block;
`;
const RadioButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 120px;
  justify-content: space-between;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  margin-top: 10px;
`;
const RightInput = styled.input`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  /* White */

  background: #ffffff;
  /* Grey/Light/100% */

  border: 1px solid #e6e6e6;
  border-radius: 24px;
  outline: none;
  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const LeftInput = styled.input`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  /* White */

  background: #ffffff;
  /* Grey/Light/100% */

  border: 1px solid #e6e6e6;
  border-radius: 24px;
  margin-top: 10px;
  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  outline: none;
`;

const AddClient = styled.input`
  background: #153ac7;
  /* Card Shadow/04 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 12px;
  outline: none;
  border: none;
  width: 100%;
  margin-top: 15px;
  box-shadow: 0px 4px 16px rgba(3, 0, 55, 0.08);
  border-radius: 8px;
  color: #ffffff;
`;

const Icon = styled.div``;

const User = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 10px;
  }
`;
const Sorting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 100%;
  height: 72px;

  margin: 5px 0;
  /* White */

  background: #ffffff;
  /* Card Shadow/01 */

  box-shadow: 0px 1px 5px rgba(3, 0, 55, 0.08);
  border-radius: 12px;
`;
const SortingNew = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 100%;
  height: 72px;

  margin: 5px 0;
  /* White */

  background: #ffffff;
  /* Card Shadow/01 */
`;

const ButtonReset = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

const Table = styled.table`
  background-color: #ffffff;
  width: 100%;
  border-collapse: collapse;
  padding: 16px;
  border-radius: 8px;
  th {
    color: #030037;
    text-align: center;
    border: none;
    font-size: 14px;
    padding: 5px 0;
  }
  td {
    color: #030037;
    text-align: center;
    font-size: 14px;
    padding: 5px 0;
  }
  thead {
    background: #f8f9fd;
  }
  tr {
    border: 1px solid #f8f9fd;
  }
`;
const Td = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 10px;
  }
  overflow: hidden;
`;
const TableContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  box-shadow: 0px 1px 5px rgba(3, 0, 55, 0.08);
  border-radius: 8px;
`;
const PaginationContainer = styled.div`
  padding: 10px 0px;
`;
export async function getServerSideProps() {
  const clients = await fetch(
    "https://vouch-digital-backend.herokuapp.com/client/getallclients"
  ).then((res) => res.json());
  console.log(clients, "i am raj");
  return {
    props: {
      clients: clients.clients,
    },
  };
}
