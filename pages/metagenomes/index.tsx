/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:09:39
 * @modify date 2021-07-15 13:09:41
 * @desc [description]
 */
import withAuth from "../../middleware/withAuth";
import React, { useEffect, useState } from "react";

import { Grid, Icon, Menu, Segment, Tab } from "semantic-ui-react";
import TopNav from "../../components/global/TopNav";
import AssemblyView from "../../components/views/isolates/AssemblyView";
import SequenceView from "../../components/views/metagenomes/SequenceView";
import SideMenu from "../../components/views/metagenomes/SideMenu";

/**
 * Isolates
 * @returns - Isolates Main View Component
 */
function Metagenomes() {
  const handleTabChange = (e, data) => setCurrentTab(data);

  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isTabChange, setTabChange] = useState<boolean>(false)

  const [panes, setPanes] = useState([
    {
      menuItem: "Sequence",
      render: function getContent() {
        return (
          <SequenceView
            query={query}
            search={search}
            isTabChange={isTabChange}
            setQuery={setQuery}
            setSearch={setSearch}
            setTabChange={setTabChange}
          />
        );
      },
    },
    {
      menuItem: "Assembly",
      render: function getContent() {
        return (
          <AssemblyView
          query={query}
          search={search}
          isTabChange={isTabChange}
          setQuery={setQuery}
          setSearch={setSearch}
          setTabChange={setTabChange}
          />
        );
      },
    },
   
  ]);
  const [currentTab, setCurrentTab] = useState({
    activeIndex: 0,
    grid: { paneWidth: 12, tabWidth: 4 },
    menu: { attached: true, tabular: true },
    onTabChange: handleTabChange,
    panes: panes,
    renderActiveOnly: true,
  });
  const [wideView, setWideView] = useState(false);

  useEffect(() => {
    setPanes([
      {
        menuItem: "Sequence",
        render: function getContent() {
          return (
            <SequenceView
            query={query}
            search={search}
            isTabChange={isTabChange}
            setQuery={setQuery}
            setSearch={setSearch}
            setTabChange={setTabChange}
            />
          );
        },
      },
      {
        menuItem: "Taxonomy",
        render: function getContent() {
          return (
            <AssemblyView
            query={query}
            search={search}
            isTabChange={isTabChange}
            setQuery={setQuery}
            setSearch={setSearch}
            setTabChange={setTabChange}
            />
          );
        },
      },
      
    ]);
  }, [query, search]);

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
        {currentTab && (
          <SideMenu
          currentTab={currentTab.panes[currentTab.activeIndex].menuItem}
          query={query}
          wideView={wideView}
          isTabChange = {isTabChange}
          setWideView={setWideView}
          setQuery={setQuery}
          setTabChange ={setTabChange}
          />
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
            <Grid.Column>
              <Tab panes={panes} onTabChange={handleTabChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(Metagenomes);
