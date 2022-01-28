/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-09 08:26:21
 * @modify date 2021-08-09 08:26:21
 * @desc [description]
 */
import withAuth from "../../middleware/withAuth";
import React, { useEffect, useState } from "react";

import TopNav from "../../components/global/TopNav";

import { Grid, Icon, Menu, Segment } from "semantic-ui-react";

function CoreAnalysis() {
  const [wideView, setWideView] = useState(false);

  useEffect(() => {
    console.log("core");
  }, []);

  return (
    <>
      <TopNav />
      <div
        className={`${
          wideView
            ? "ebs-left-side-content-wide-frame"
            : "ebs-left-side-content-frame"
        }`}
      >
        {wideView ? (
          <Grid
            verticalAlign="middle"
            centered
            padded
            className="ebs-left-side-as-button-frame"
            onClick={() => {
              setWideView(!wideView);
            }}
          >
            <Grid.Row>
              <Grid.Column className="ebs-paddingless">
                <Icon name="angle double right" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <>
            {/* <Segment className="ebs-borderless ebs-shadowless"></Segment> */}
            <div className="ebs-scrollable-inner">
              {/* <Accordion
                className="ebs-borderless ebs-shadowless"
                fluid
                as={Menu}
                vertical
              ></Accordion> */}
            </div>
            <Segment className="ebs-borderless ebs-shadowless">
              <Menu.Item
                onClick={() => {
                  setWideView(!wideView);
                }}
              >
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>Wide View</Grid.Column>
                    <Grid.Column textAlign="right">
                      <Icon name="angle double left" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Menu.Item>
            </Segment>
          </>
        )}
      </div>
      <div
        className={`${
          wideView
            ? "ebs-main-content-with-left-side-wide-frame"
            : "ebs-main-content-with-left-side-frame"
        }`}
      >
        <Grid padded>
          <Grid.Row>
            <Grid.Column>Comparison Analysis</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(CoreAnalysis);
