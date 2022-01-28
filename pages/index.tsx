/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 09:31:16
 * @modify date 2021-07-15 15:08:13
 * @desc [description]
 */
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import TopNav from "../components/global/TopNav";
import withAuth from "../middleware/withAuth";

import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import { useAuth } from "../middleware/AuthProvider";

/**
 * The main page of frontend application
 * @returns - Home page component
 */
function Home(): JSX.Element {
  const { accessToken } = useAuth();

  const [user, setUser] = useState();

  useEffect(() => {
    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      setUser(decoded.username);
    }
  }, [accessToken]);

  return (
    <>
      <TopNav />
      <Grid padded>
        <Grid.Column>
          <Container>
            <Header as="h2" icon textAlign="center">
              Hello, {user}
            </Header>
            <Segment vertical>
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>Sequences</List.Header>
                    <List.Description>
                      RUN dataset in a table view
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Analysis</List.Header>
                    <List.Description>CPO, TB, Metagenome</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>cmpAnalysis</List.Header>
                    <List.Description>Comparison Analysis</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default withAuth(Home);
