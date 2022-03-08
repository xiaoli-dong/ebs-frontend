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
import StatsView from "../../components/views/isolates/StatsView";
import MLSTView from "../../components/views/isolates/MLSTView";
import ResistomeView from "../../components/views/isolates/ResistomeView";
import VirulomeView from "../../components/views/isolates/VirulomeView";
import PlasmidView from "../../components/views/isolates/PlasmidView";
import TBSummaryView from "../../components/views/isolates/TBSummaryView";
import SequenceView from "../../components/views/isolates/SequenceView";
//import TestView from "../../components/views/isolates/SequenceView";
import SideMenu from "../../components/views/isolates/SideMenu";

/**
 * Isolates
 * @returns - Isolates Main View Component
 */
function Isolates() {
  
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isTabChange, setTabChange] = useState<boolean>(false)

  const [panes, setPanes] = useState([
    /* {
      menuItem: "Test",
      render: function getContent() {
        
        return (
          <TestView
            query={query}
            search={search}
            isTabChange={isTabChange}
            setQuery={setQuery}
            setSearch={setSearch}
            setTabChange={setTabChange}
          />
        );
      },
    }, */
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
	 {
      menuItem: "Stats",
      render: function getContent() {
        return (
          <StatsView
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
      menuItem: "MLST",
      render: function getContent() {
        return (
          <MLSTView
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
      menuItem: "Resistome",
      render: function getContent() {
        return (
          <ResistomeView
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
      menuItem: "Virulome",
      render: function getContent() {
        return (
          <VirulomeView
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
      menuItem: "Plasmid",
      render: function getContent() {
        return (
          <PlasmidView
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
      menuItem: "TBProfile",
      render: function getContent() {
        return (
          <TBSummaryView
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
  const handleTabChange = (e, data) => {
    console.log("handleTabChange.....................................................")
    console.log(data)
    setCurrentTab(data);
    setTabChange(true)
  }

  const [currentTab, setCurrentTab] = useState({
    activeIndex: 0,
    grid: { paneWidth: 12, tabWidth: 4 },
    menu: { attached: true, tabular: true },
    onTabChange: handleTabChange,
    panes: panes,
    renderActiveOnly: true
    
    
  });
  
  const [wideView, setWideView] = useState(false);

  useEffect(() => {
    
    setPanes([
      /* {
        menuItem: "Test",
        render: function getContent() {
          return (
            <TestView
            query={query}
            search={search}
            isTabChange={isTabChange}
            setQuery={setQuery}
            setSearch={setSearch}
            setTabChange={setTabChange}
            />
          );
        },
      }, */
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
	{
        menuItem: "Stats",
        render: function getContent() {
          return (
            <StatsView
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
        menuItem: "MLST",
        render: function getContent() {
        
          return (
            <MLSTView
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
        menuItem: "Resistome",
        render: function getContent() {
          
          return (
            <ResistomeView
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
        menuItem: "Virulome",
        render: function getContent() {
          return (
            <VirulomeView
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
        menuItem: "Plasmid",
        render: function getContent() {
          return (
            <PlasmidView
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
        menuItem: "TBProfile",
        render: function getContent() {
          return (
            <TBSummaryView
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
  }, [query, search, currentTab]);
  
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
            search={search}
            wideView={wideView}
            isTabChange = {isTabChange}
            setWideView={setWideView}
            setQuery={setQuery}
            setSearch={setSearch}
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

export default withAuth(Isolates);
