/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:59
 * @modify date 2021-07-15 13:20:05
 * @desc [description]
 */
import React, { useCallback, useEffect, useState, useRef } from "react";

import axios from "axios";
import {
  Accordion,
  Menu,
  Label,
  Checkbox,
  Segment,
  Grid,
  Icon,
  Header,
  Dropdown,
  DropdownMenu,
  Button,
  Modal,
} from "semantic-ui-react";

import {
  API,
  API_ASSEMBLY_METADATA,
  API_STATS_METADATA,
  API_MLST_METADATA,
  API_RESISTOME_METADATA,
  API_SEQUENCE_METADATA,
  API_TB_SUMMARY_METADATA,
  API_VIRULOME_METADATA,
} from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { JIYInteractiveSideMenuContext } from "../../../modules/JIYTable/core/models/JIYContexts";
import { DATE_FORMAT } from "../../../config/etc";

const ApiDict = [
  { tabName: "Test", endPoint: API_SEQUENCE_METADATA },
  { tabName: "Sequence", endPoint: API_SEQUENCE_METADATA },
  { tabName: "Assembly", endPoint: API_ASSEMBLY_METADATA },
  { tabName: "Stats", endPoint: API_STATS_METADATA},
  { tabName: "MLST", endPoint: API_MLST_METADATA },
  { tabName: "Resistome", endPoint: API_RESISTOME_METADATA },
  { tabName: "Virulome", endPoint: API_VIRULOME_METADATA },
  { tabName: "TBProfile", endPoint: API_TB_SUMMARY_METADATA },
];
import {
  URLHandler,
} from "../../../modules/JIYTable/core/libs/handler";
/**
 * SideMenu
 * @param param - See {@link VizViewContext}
 * @returns - SideMenu Component
 */
function SideMenu({
  currentTab,
  query,
  wideView,
  isTabChange,
  setQuery,
  setWideView,
  setTabChange
}: JIYInteractiveSideMenuContext): JSX.Element {
  const { accessToken } = useAuth();
  const [queryset, setQueryset] = useState([]);
  const [filters, setFilters] = useState(null);
  const [activeIndex, setActiveIndex] = useState({});
  const [currentRange, setNewRange] = useState([]);
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const [currentDateSelector, setCurrentDateSelector] = useState(null);
  const [dateCreatedMin, setDateCreatedMin] = useState(null);
  const [dateCreatedMax, setDateCreatedMax] = useState(null);
  const [lastUpdateMin, setLastUpdateMin] = useState(null);
  const [lastUpdateMax, setLastUpdateMax] = useState(null);
  const [checked, setChecked] = useState(false)
  const [seqtype_hidden, setSeqtype_hidden] = useState(true);
  const [platform_hidden, setPlatform_hidden] = useState(true);
  const [centername_hidden, setCentername_hidden] = useState(true); 
  const [libraryLayout_hidden, setLibraryLayout_hidden] = useState(true);
  const [sequencerModel_hidden, setSequencerModel_hidden] = useState(true);
  const [dateCreated_hidden, setDateCreated_hidden] = useState(true);
  const [lastUpdate_hidden, setLastUpdate_hidden] = useState(true);
  
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFilterOn, setFilterOn] = useState<boolean>(false)
  const [subMenuIndex, setSubMenuIndex] = useState({})
 
  const fetchData = useCallback(
    async (reqURL: string) => {
      console.log("reqURL=" + reqURL)
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      setLoading(true);
      await axios
        .get(reqURL, config)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            setFilters(res.data);

          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    },
    
    [query]
  );
  useEffect(() => {
    console.log("useEffect 0")
    // setQueryset([]);
    //   setQuery("")
    //fetchFilters();
    fetchData(
      URLHandler(URL.uri, "", "", "", undefined, undefined, null).url
    );
    return () => {

    }
  }, [currentTab]);

  /* useEffect(() => {
    console.log("useEffect 1")
    // setQueryset([]);
    // setQuery("")
    
  }, [isTabChange]); */
  const URL = URLHandler(API_SEQUENCE_METADATA);
  useEffect(() => {
    console.log("useEffect 2")
    console.log(queryset)
      setQuery(
        queryset
          .filter((obj) => obj.keywords.length > 0)
          .map((obj) => obj.field + "=" + obj.keywords.join(","))
          .join("&")
      );
       fetchData(
        URLHandler(URL.uri, query, "", "", undefined, undefined, null).url
      ); 
  }, [queryset, query]);
  

  const handleClick = (e, data) => {
    console.log("handle click")
    console.log(data)
    const { index, active } = data;
    setActiveIndex({ ...activeIndex, [index]: !active });
    {Object.entries(activeIndex).map(([key, val], i) => (
      console.log("key=" + key + " val=" + val)
  ))}
    
  };
  
  const handleChange = useCallback(
    (e, data) => {
      const [mykey, myvalue] = data.value.split("--");
      const [key, value] = [mykey, encodeURIComponent(myvalue)]
      console.log("handleChange key=" + key + " value=" + value)
      setChecked(e.target.checked)
      setQueryset(
        queryset.length > 0
          ? queryset.find((obj) => obj.field === key)
            ? queryset.map((obj) =>
                obj.field === key
                  ? {
                      ...obj,
                      keywords: obj.keywords.includes(value)
                        ? obj.keywords.filter(
                            (_, i) => i !== obj.keywords.indexOf(value)
                          )
                        : [...obj.keywords, value],
                    }
                  : { ...obj }
              )
            : [...queryset, { field: key, keywords: [value] }]
          : [{ field: key, keywords: [value] }]
      );
    },
    [queryset]
  );
  
  const handleFilterListChange =(e, data) => {
    console.log("handleFilterListChange data=")
    console.log(data)
    const {label, checked} = data
   setSubMenuIndex({ ...subMenuIndex, [label]: checked });
    {Object.entries(subMenuIndex).map(([key, val], i) => (
      console.log("key=" + key + " val=" + val)
  ))}
   
  }
  const getFilterList = () => {
    return Object.entries(filters).map(([key, value], index) => {
      console.log(key)
      return(
        <Grid.Row key={key}>
        <Grid.Column>
          <Checkbox 
            label={key}
            onChange={handleFilterListChange}
            checked ={subMenuIndex[key] =  subMenuIndex[key] == undefined ? false :  subMenuIndex[key] }
         />
        </Grid.Column>
      </Grid.Row>
      )
    
  })};
  const getFilterSubList = () => {
    console.log(" I am in getFilterSubList")
    console.log(subMenuIndex)
    return Object.entries(filters).map(([key, value], index) => {
      console.log("getFilterSubList key=" + key + " isMenuIndex=" + subMenuIndex[key])

      return(
        subMenuIndex[key]  ?
        <Segment raised key={key}>
        <Accordion className="ebs-borderless" fluid as={Menu.Item}>
        {filters && getFilterSubMenu(key)}
        </Accordion> 
        </Segment> : null
       
      )
    })
    }
  const getSubMenuItem = (parent, obj) => {
    
    if (Array.isArray(obj)) {
     
      return (
        <Grid className="ebs-filters-submenu">
          {obj.map((sub, index) => {
            let prefix = "";
            if (parent === "project__id") {
              if (currentTab !== "Sequence") {
                if (currentTab === "Assembly") {
                  prefix = "sequence__";
                } else {
                  prefix = "assembly__sequence__";
                }
              }
            }
            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  <Checkbox
                    label={sub[prefix + parent]}
                    name={String(sub[prefix + parent])}
                    value={prefix + parent + "--" + sub[prefix + parent]}
                    onChange={handleChange}
                    checked = {checked}
                  />

                  
                </Grid.Column>
                <Grid.Column width={2} floated="right">
                  <Label color="grey">{sub["total"]}</Label>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      );
    } 
  };

  const getFilterSubMenuItems = (parent, obj) => {
      return (
        <Grid className="ebs-filters-submenu">
          {obj.map((sub, index) => {
            // console.log("sub=" + sub)
            // console.log("index=" + index)
            let prefix = "";
            if (parent === "project__id") {
              if (currentTab !== "Sequence") {
                if (currentTab === "Assembly") {
                  prefix = "sequence__";
                } else {
                  prefix = "assembly__sequence__";
                }
              }
            }
            // console.log("parent=" + parent)
            // console.log(sub[prefix+parent])
            return (
              
              <Grid.Row className="ebs-filters-row" key={String(sub[prefix + parent])}>
                <Grid.Column>
                  <Checkbox
                    label={sub[prefix + parent]}
                    name={String(sub[prefix + parent])}
                    value={prefix + parent + "--" + sub[prefix + parent]}
                    onChange={handleChange}
                    checked = {checked}
                  />
                </Grid.Column>
                <Grid.Column width={4} floated="right">
                  <Label color="grey">{sub["total"]}</Label>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      );
    
  };

  const getFilterSubMenu = (val) =>{
   
    return Object.entries(filters).map(([key, value], index) => {
      if(key == val){
          
          return (
            <Menu.Item key={key}>
              <Accordion.Title
                active={activeIndex[key] = activeIndex[key]== undefined ? true : activeIndex[key]}
                content={key}
                index={key}
                onClick={handleClick}
              />
              
              <Accordion.Content
                key={key}
                active={activeIndex[key] = activeIndex[key]== undefined ? true : activeIndex[key]}
                content={getFilterSubMenuItems(key, value)}
              />
            </Menu.Item>
          );
        
      }
  })}
  const getFilterMenu = () => {
    
    return Object.entries(filters).map(([key, value], index) => {
      return (
        <Menu.Item key={index}>
          <Accordion.Title
            active={activeIndex[index]}
            content={key}
            index={index}
            onClick={handleClick}
          />
          
          <Accordion.Content
            key={index}
            active={activeIndex[index]}
            content={getSubMenuItem(key, value)}
          />
        </Menu.Item>
      );
    });
  };

  
  
  const fetchFilters = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const endPoint = ApiDict.find((d) => d.tabName === currentTab).endPoint;
    //setup the filter menu at the left side
    await axios
      	.get(API + endPoint, config)
	      .then((res) => {
	      console.log(API + endPoint)
        console.log(res.data);
        setChecked(false)
        setFilters(res.data);
      })
      .catch((err) => {
        setFilters({ menu: [{ menu: "No filter data found", total: "N/A" }] });
        console.log(err);
      });
  }, [currentTab]);
  
 

  return wideView ? (
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
      <Segment className="ebs-borderless ebs-shadowless">
        <Header>{currentTab} Filters</Header>
      </Segment>
      
<Segment className="ebs-borderless ebs-shadowless">
  { filters && getFilterList ()}
</Segment>

  
      {filters && getFilterSubList()}
    
      
    {/*  <div className="ebs-scrollable-inner">
         <Accordion className="ebs-borderless" fluid as={Menu} vertical>
          {filters && getFilterMenu()}
        </Accordion> 
      </div> */}
    
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
  );
}

export default SideMenu;
