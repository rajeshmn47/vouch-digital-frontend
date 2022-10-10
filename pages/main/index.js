import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      company: companyName,
      email: email,
      phonenumber: phoneNo,
      website: [website],
      name: user?.username,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post(
          "https://vouch-digital-backend.herokuapp.com/client/upload",
          data
        );
      } catch (err) {}
    }
    try {
      await axios.post(
        "https://vouch-digital-backend.herokuapp.com/client/createclient",
        newPost
      );
      router.push("/viewclients");
    } catch (err) {}
  };

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
            <h3>{user?.username ? user.username : "James Burton"}</h3>
            <p>{user?.email ? user.email : "rajeshmn47@gmail.com"}</p>
          </div>
          <Icon>
            <LogoutIcon style={{ color: "#B8BABC" }} />
          </Icon>
        </User>
      </LoginContainer>
      <Assets>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <h3 style={{ color: "#030037" }}>Create Client Profile</h3>
            <p style={{ color: "#686687", fontSize: "10px", margin: "5px 0" }}>
              Add some basic information related to the client.
            </p>
            <Grid container spacing={3}>
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
             
                   <input
              type="file"
              id="file"
            
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
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Select Business Category"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Select Facility Management Company *"
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
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Mobile Number *"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Select State" />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Input alt="" type="text" placeholder="Select City" />
              </Grid>
              <Grid item xs={12} lg={2}>
                <Input alt="" type="text" placeholder="Pincode" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="GST Number *" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Fax Number" />
              </Grid>

              <Grid item xs={12} lg={3}>
                <InputSubmit value="save & continue" type="submit" />
              </Grid>
            </Grid>
          </Form>
        </FormContainer>
        <FormContainer>
          <Form>
            <h3 style={{ color: "#030037" }}>Payment Setup</h3>
            <p style={{ color: "#686687", fontSize: "10px", margin: "5px 0" }}>
              Set up payments for the client.{" "}
            </p>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Input alt="" type="text" placeholder="Billing Address" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Select State" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Select City" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Select Number of Site Access *"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input
                  alt=""
                  type="text"
                  placeholder="Rs. Payable Amount per Site *"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Discount (%) *" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Input alt="" type="text" placeholder="Reason *" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <h3 style={{ color: "#030037", fontSize: "14px" }}>
                  Payment Mode
                </h3>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />

                  <label for="vehicle1"> I have a bike</label>
                  <input
                    type="checkbox"
                    id="vehicle2"
                    name="vehicle2"
                    value="Car"
                  />
                  <label for="vehicle2"> I have a car</label>
                  <input
                    type="checkbox"
                    id="vehicle3"
                    name="vehicle3"
                    value="Boat"
                  />
                  <label for="vehicle3"> I have a boat</label>
                </CheckboxContainer>
              </Grid>
              <Grid item xs={12} lg={6}>
                <h3 style={{ color: "#030037", fontSize: "14px" }}>
                  Payment Status
                </h3>
                <RadioButtons>
                  <Radio
                    type="radio"
                    id="html"
                    name="paymentstatus"
                    value="HTML"
                  />
                  <label for="html">HTML</label>

                  <Radio
                    type="radio"
                    id="css"
                    name="paymentstatus"
                    value="CSS"
                  />
                  <label for="css">CSS</label>
                </RadioButtons>
              </Grid>

              <Grid item xs={12} lg={3}>
                <InputSubmit value="save & continue" />
              </Grid>
            </Grid>
          </Form>
        </FormContainer>
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
  justify-content: space-between;
  padding: 10px 10px;
  height: 100vh;
  background-color: #ffffff;
`;

const Assets = styled.div`
  width: 82%;
  height: auto;
  color: #ffffff;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  /* Inside auto layout */
  margin-top: 15px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
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
const ImageInput = styled.input`
  margin-top: 8px;
  outline: none;
  background-color: tranparent;
`;
