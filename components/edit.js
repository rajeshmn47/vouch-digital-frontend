import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";

function Edit({ dialogOpen, setDialogOpen, currentitem, refreshData }) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState(currentitem?.email);
  const [phoneNo, setPhoneNo] = useState(currentitem?.phonenumber);
  const [contactPerson, setContactPerson] = useState(currentitem?.name);
  const [website, setWebsite] = useState(currentitem?.website);
  const [file, setFile] = useState(currentitem?.image);
  useEffect(() => {
    setCompanyName(currentitem?.company);
    setEmail(currentitem?.email);
    setPhoneNo(currentitem?.phonenumber);
    setContactPerson(currentitem?.name);
    setWebsite(currentitem?.website[0]);
    setFile(currentitem?.image);
  }, [currentitem]);
  const handleClose = () => {
    setDialogOpen(false);
  };
  console.log(currentitem, "inside edit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      company: companyName,
      email: email,
      phonenumber: phoneNo,
      website: [website],
      name: user?.username,
      id: currentitem._id,
    };
    console.log("dsatyu");
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        const f = await axios.post(
          "https://vouch-digital-backend.herokuapp.com/client/upload",
          data
        );
      } catch (err) {}
    }
    try {
      await axios.post("https://vouch-digital-backend.herokuapp.com/client/editclient", newPost);
      setDialogOpen(false);
      refreshData();
    } catch (err) {}
  };

  return (
    <Dialog onClose={handleClose} open={dialogOpen}>
      <form onSubmit={handleSubmit}>
        <Container container spacing={3}>
          <Grid item lg={12} style={{ marginTop: "15px" }}>
            <h3
              style={{
                color: "#030037",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              Company Logo
            </h3>
            <p
              style={{
                color: "#030037",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              Add some basic information related to the client.
            </p>
            <ImageInput
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
              required='true'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              alt=""
              type="text"
              placeholder="Company Name *"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required='true'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              alt=""
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required='true'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Input
              alt=""
              type="text"
              placeholder="Company Email Address"
              required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required='true'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              alt=""
              type="text"
              placeholder="Mobile Number *"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required='true'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputSubmit value="save & continue" type="submit" />
          </Grid>
        </Container>
      </form>
    </Dialog>
  );
}

export default Edit;

const Container = styled(Grid)`
  padding: 10px 10px;
  width: 40vw;
  height: 450px;
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

const ImageInput = styled.input`
  margin-top: 8px;
  outline: none;
  background-color: tranparent;
`;
