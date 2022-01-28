/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:15:48
 * @modify date 2021-07-15 13:15:54
 * @desc [description]
 */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import withoutAuth from "../middleware/withoutAuth";

import TopNav from "../components/global/TopNav";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Segment,
  Modal,
  Header,
  Message,
} from "semantic-ui-react";
import { API, API_REGISTER } from "../config/apis";

/**
 * Registration
 * @returns Registration page component
 */
function Register(): JSX.Element {
  const router = useRouter();

  const passwordRef = useRef(null);

  const [openAlert, setOpenAlert] = useState(false);
  const [match, setMatch] = useState(false);
  const [feedback, setFeedback] = useState("");

  const register = useCallback(
    async (e) => {
      e.preventDefault();

      if (match) {
        const form_data = new FormData();
        form_data.append("email", e.target.elements.email.value);
        form_data.append("username", e.target.elements.username.value);
        form_data.append("password", e.target.elements.password.value);

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        await axios
          .post(API + API_REGISTER, form_data, config)
          .then((res) => {
            if (res.status === 201) {
              setOpenAlert(true);
              setTimeout(() => {
                setOpenAlert(false);
                router.push("/login");
              }, 2000);
            }
          })
          .catch(() => {
            setFeedback("Your email is already registered");
          });
      } else {
        setFeedback("Please check register form again");
      }
    },
    [match]
  );

  const handleMatchingPassword = (e) => {
    if (
      e.currentTarget.value === passwordRef.current?.inputRef.current?.value
    ) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  return (
    <>
      <TopNav />
      <Grid centered padded>
        <Grid.Column className="ebs-register-form-wrapper" textAlign="center">
          <Segment className="middle aligned">
            <Icon name="dna" size="huge" />
            <h2>EBS Sign Up</h2>
            <Form onSubmit={register}>
              <Form.Field>
                <Input
                  name="email"
                  type="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  required
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="username"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  required
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="repeat"
                  iconPosition="left"
                  placeholder="Repeat password"
                  type="password"
                  onChange={handleMatchingPassword}
                  required
                >
                  <Icon color={match ? "green" : "red"} name="check" />
                  <input />
                </Input>
              </Form.Field>
              <Message negative hidden={feedback === ""}>
                <Message.Header>Registration Failed</Message.Header>
                <p>{feedback}</p>
              </Message>
              <Button primary fluid type="submit">
                Sign Up
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>

      <Modal
        basic
        onClose={() => setOpenAlert(false)}
        onOpen={() => setOpenAlert(true)}
        open={openAlert}
        size="small"
        dimmer="blurring"
      >
        <Header icon color="green">
          <Icon name="hand peace outline" />
          Your account has been successfully registered!
        </Header>
        <Modal.Content>
          <Grid>
            <Grid.Column textAlign="center">
              <p>We will redirect you to a login page.</p>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        {/* <Modal.Actions>
          <Grid>
            <Grid.Column textAlign="center">
              <Button
                color="green"
                inverted
                onClick={() => setOpenAlert(false)}
              >
                <Icon name="checkmark" /> Confirm
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Actions> */}
      </Modal>
    </>
  );
}

export default withoutAuth(Register);
