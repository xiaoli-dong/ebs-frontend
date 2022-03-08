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
  Input,
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
  API_PLASMID_METADATA,
} from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import {
  JIYInteractiveSideMenuContext,
  JIYRange,
  JIYBpRange
} from "../../../modules/JIYTable/core/models/JIYContexts";
import { DATE_FORMAT } from "../../../config/etc";

const ApiDict = [
  { tabName: "Test", endPoint: API_SEQUENCE_METADATA },
  { tabName: "Sequence", endPoint: API_SEQUENCE_METADATA },
  { tabName: "Assembly", endPoint: API_ASSEMBLY_METADATA },
  { tabName: "Stats", endPoint: API_STATS_METADATA},
  { tabName: "MLST", endPoint: API_MLST_METADATA },
  { tabName: "Resistome", endPoint: API_RESISTOME_METADATA },
  { tabName: "Virulome", endPoint: API_VIRULOME_METADATA },
  { tabName: "Plasmid", endPoint: API_PLASMID_METADATA },
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
  search,
  wideView,
  isTabChange,
  setQuery,
  setSearch,
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
 const [countRange, setCountRange] = useState<JIYRange>(null)
 const[bpRange, setBpRange] = useState<JIYBpRange>(null)
 
 

  const fetchData_org = useCallback(
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

  const fetchData = useCallback(
    async (reqURL: string, abortController: AbortController) => {

      try{
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        signal: abortController.signal
      };
      setLoading(true);
      console.log("fetchData url=" + reqURL)
      // const endPoint = ApiDict.find((d) => d.tabName === currentTab).endPoint;
      // console.log("url=" + API + endPoint + "/?" + query)
      await axios
       .get(reqURL, config)
       //.get(API + endPoint + "/?" + query, config)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            setFilters(res.data);

          }
        })
      } 
      catch (error) {
        console.log("error.name=" + error.name)
        console.log('error', error);
    }
    finally {
      setLoading(false);
    };
    
    },
    [ currentTab]
   //with the following option, the sidemenu will reload when query changes or any of the checkbox was checked 
    //[query, currentTab]
  );
  useEffect(() => {
    let isMounted = true;    
    console.log("useEffect 0  currentTab=" + currentTab)
    const abortController = new AbortController();
    const endPoint = ApiDict.find((d) => d.tabName === currentTab).endPoint;
    console.log("url=" + endPoint + "/?" + query)
    const URL = URLHandler(endPoint);
    const MODULE = ""

    if (isMounted){
      setQueryset([]);
      setQuery(null)
      setSearch(null)
      setSubMenuIndex({})
      console.log("useEffect 0  , ismounted is true, currentTab=" + currentTab)
      //fetchData(abortController)
      fetchData(URLHandler(URL.uri, null, MODULE, null, 1, 20, null).url, abortController);
    }
    //clean-up function
    return () => {
      isMounted = false 
      abortController.abort(); 
    }
  }, [currentTab]);

  useEffect(() => {
    setSearch(null)
    console.log("queryset change====")
    console.log(queryset)
    let isMounted = true;    
    
    const abortController = new AbortController();
    const endPoint = ApiDict.find((d) => d.tabName === currentTab).endPoint;
    console.log("url=" + endPoint + "/?" + query)
    const URL = URLHandler(endPoint);
    const MODULE = ""

    if (isMounted){
      setQuery(
        queryset
          .filter((obj) => obj.keywords.length > 0)
          .map( (obj) => obj.field + "=" + obj.keywords.join(",")
          /* .map( (obj) =>{
            let myarray = []
            Object.entries(obj.keywords).map(([key, value], index) => {
              //console.log("key=" + key + " value=" + value + " index=" + index" )
              console.log(key + ":" + value + ":" + index )
              myarray.push(obj.field + "=" + value)
              obj.field + "=" + value
            })
            return myarray.join("&")
          } */
          )
          .join("&")
      );
    console.log("useEffect 2 currentTab=" + currentTab + " query=" + query + " queryset=")
    console.log(queryset)
    console.log("fecth my data=")
      //fetchData(abortController)
      fetchData(URLHandler(URL.uri, query, MODULE, search, 1, 20, null).url, abortController);
    }
      return () => {
        isMounted = false 
        abortController.abort(); 
      }
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
 
  const countInputHandler = (e, data) =>{
    console.log("handle count_max click and data=")
    console.log(data)
    console.log(data.name)

    if (data.name ==='min_count'){ 
      setCountRange({...countRange, name: 'count', from: data.value, min: data.min, max: data.max})
    }
    if( data.name === 'max_count'){
        setCountRange({...countRange, name: 'count', to: data.value, min: data.min, max: data.max})
    }
    
  }
  

  const applyCountFilter = (e, data) =>{

    if(countRange){
    
        console.log("count range=================================")
        console.log(countRange)
      if( ! countRange.from){
        setCountRange({...countRange, name:'count', from: countRange.min})
      }
      if( ! countRange.to){
        setCountRange({...countRange, name:'count', to: countRange.max})
      }

      const myarray =  [
        {field: 'min_' + countRange.name, keywords: [countRange.from]},
        {field: 'max_' + countRange.name, keywords: [countRange.to]}
      ]
      
      let newset = []
      newset = queryset.filter((obj)=>obj.field !== 'min_count').filter((obj)=>obj.field !== 'max_count')
      setQueryset(
        newset.length > 0
            ? [...newset , myarray]
            : myarray
      );
      console.log("queryset ==================================")
      console.log(queryset)
    }
  }
  const bpInputHandler = (e, data) =>{
    console.log("handle bp input data=")
    console.log(data)
    console.log(data.name)

    if (data.name ==='min_bp'){ 
      ! bpRange
      ? setBpRange({...bpRange, name: 'bp', from: data.value, from_unit: 'MB', min: data.min, max: data.max})
      :  setBpRange({...bpRange, name: 'bp', from: data.value,  min: data.min, max: data.max})
    }
    if( data.name === 'max_bp'){
      ! bpRange
      ? setBpRange({...bpRange, name: 'bp', to: data.value, to_unit: 'MB', min: data.min, max: data.max})
      :  setBpRange({...bpRange, name: 'bp', to: data.value,  min: data.min, max: data.max})
    }
    
  }
  const onUnitChange = (e, data) =>{
    
    console.log("onUnitSelection.................................................. data=")
    console.log(data)
    console.log(data.name)
    if(data.name === 'min_bp'){
    setBpRange({...bpRange, name: 'bp', from_unit: data.value})
    }
    else if(data.name === 'max_bp'){
      setBpRange({...bpRange, name: 'bp', to_unit: data.value})
    }
    
  }
  const applyBpFilter = (e, data) =>{

    if(bpRange){
  
      // console.log("bp range=================================")
      // console.log(bpRange)
      if( ! bpRange.from){
        setBpRange({...bpRange, name:'bp', from: bpRange.min})
      }
      if( ! bpRange.to){
        setBpRange({...bpRange, name:'bp', to: bpRange.max})
      }
     
      let from = bpRange.from_unit === 'KB' ? bpRange.from * 1000 : bpRange.from * 1000000 
      let to = bpRange.to_unit === 'KB' ? bpRange.to * 1000 : bpRange.to * 1000000 

      const myarray =  [
        {field: 'min_' + bpRange.name, keywords: [from]},
        {field: 'max_' + bpRange.name, keywords: [to]}
      ]
      console.log("print myarray for bp")
      console.log(myarray)
      let newset = []
      newset = queryset.filter((obj)=>obj.field !== 'min_bp').filter((obj)=>obj.field !== 'max_bp')
      setQueryset(
        newset.length > 0
            ? [...newset , myarray]
            : myarray
      );
      console.log("queryset ==================================")
      console.log(queryset)
    }
  }
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
    
   /* {Object.entries(subMenuIndex).map(([key, val], i) => (
      console.log("key=" + key + " val=" + val)
      ))} */
      console.log("handleFilterListChange queryset=" + JSON.stringify(queryset))
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ")
      //reset queryset when uncheck the squence filter list
    if(!checked){
      
      console.log(label + " not checked")
      if(label === 'contig_total_count'){
        let copy_of_queryset = [...queryset]
        let new_array =  copy_of_queryset .filter(item => item.field !== 'min_count' &&  item.field !== 'max_count')
         setQueryset(new_array)
      }
      else if(label === 'contig_total_length'){
        let copy_of_queryset = [...queryset]
        let new_array =  copy_of_queryset .filter(item => item.field !== 'min_bp' &&  item.field !== 'max_bp')
         setQueryset(new_array)
      }
      else {
      let copy_of_queryset = [...queryset]
       let new_array =  copy_of_queryset .filter(item => item.field !== label)
        setQueryset(new_array)
      }

      console.log("handleFilterListChange queryset1=" +JSON.stringify(queryset))
    }
  }
  const getFilterList = () => {
    return Object.entries(filters).map(([key, value], index) => {
     
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
    // console.log(" I am in getFilterSubList")
    // console.log(subMenuIndex)
    return Object.entries(filters).map(([key, value], index) => {
      // console.log("getFilterSubList key=" + key + " isMenuIndex=" + subMenuIndex[key])

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
    const isIterable = (value) => {
      return Symbol.iterator in Object(value);
    }
    const options = [
      { key: 'MB', text: 'MB', value: 'MB' },
      { key: 'KB', text: 'KB', value: 'KB' },
    ]
    
  
  const getFilterSubMenuItems = (parent, obj) => {
    console.log("my objtype=")
    console.log(typeof(obj))
    console.log(obj)
      return (
        <Grid className="ebs-filters-submenu">
          { isIterable(obj) && obj.map((sub, index) => {
            console.log("sub=" + sub)
            console.log("index=" + index)
            console.log("parent=" + parent)
            let prefix = "";
            if (parent === "project__id" || parent === "sampleType") {
              if (currentTab !== "Sequence") {
                if( currentTab === "TBProfile"){
                  prefix = "sequence__";
                 
                } 
                else if( currentTab === "Assembly"){
                  //prefix = "sequence__";
                  prefix = "biosample__";
                } else {
                  //prefix = "assembly__sequence__";
                  prefix = "assembly__biosample__";
                }
              }
            }
            
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
                <Grid.Column width={3} floated="right">
                  <Label color="grey">{sub["total"]}</Label>
                </Grid.Column>
              </Grid.Row>
           );

          }
          )}
          {
          parent === "contig_total_count" ? 
          
             <>
               <Grid.Row className="ebs-filters-row" key="min_count">
               <Grid.Column>
                 
               <Input fluid
                 type="number"
                 min = {obj['count__min']}
                 max = {obj['count__max']}
                  name="min_count"
                  onChange={countInputHandler}
                placeholder={'Min contig count'}
                 />
               </Grid.Column>
              
             </Grid.Row>
             
             <Grid.Row className="ebs-filters-row" key="max_count">
               <Grid.Column>
               <Input fluid
                 type="number"
                 min = {obj['count__min']}
                  max = {obj['count__max']}
                  name="max_count"
                placeholder={'Max contig count' }
                onChange={countInputHandler}
                 />
               </Grid.Column>
              
             </Grid.Row>
             <Grid.Row>
               <Grid.Column textAlign="center">
               <Button type='submit'  onClick={applyCountFilter}>Apply</Button>
               </Grid.Column>
             </Grid.Row>
             </>
           :
           parent === "contig_total_length" ?
             <>
               <Grid.Row className="ebs-filters-row" key="min_bp">
               <Grid.Column>
               <Input fluid
                 type="number"
                 min = {Math.floor(obj['bp__min']/1000000)}
                 max = {Math.ceil(obj['bp__max']/1000000)}
                  name="min_bp"
                  // label = "Max total length"
                  label={<Dropdown name="min_bp"  defaultValue='MB' options={options}  onChange={onUnitChange}/>}
                  labelPosition='right'
                placeholder='Min total length'
                onChange={bpInputHandler}
                 />
               </Grid.Column>
              
             </Grid.Row>
             
             <Grid.Row className="ebs-filters-row" key="max_bp">
               <Grid.Column>
                 <Input fluid
                 type="number"
                 min = {Math.floor(obj['bp__min']/1000000)}
                 max = {Math.ceil(obj['bp__max']/1000000)}
                  name="max_bp"
                  // label = "Max total length"
                  label={<Dropdown name="max_bp" defaultValue='MB' options={options} onChange={onUnitChange}/>}
                  labelPosition='right'
                placeholder='Max total length'
                onChange={bpInputHandler}
                 />
               </Grid.Column>
              
             </Grid.Row>
             <Grid.Row>
               <Grid.Column textAlign="center">
               <Button type='submit' onClick={applyBpFilter} >Apply</Button>
               </Grid.Column>
             </Grid.Row>
             </>
              
            : null
  }
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
