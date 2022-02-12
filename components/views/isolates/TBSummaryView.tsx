/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-27 10:26:33
 * @modify date 2021-08-27 10:26:33
 * @desc [description]
 */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Grid, Tab } from "semantic-ui-react";
import { API_TB_SUMMARY } from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import { FlatPsummary } from "../../../models/Isolate";
import {
  JIYHeaderContext,
  JIYOrderingContext,
  JIYRecordContext,
  JIYSharedStateLayoutContext,
  JIYTableLegendContext,
} from "../../../modules/JIYTable/core/models/JIYContexts";
import IsolatesVizView from "./VizView";
import {
  URLHandler,
  ProfileSummaryDataHandler as handler,
} from "../../../modules/JIYTable/core/libs/handler";
import TablePlaceholder from "../../global/TablePlaceholder";

/**
 * TBSummaryView
 * @returns - TB Summary View Component
 */
function TBSummaryView({
  query,
  search,
  isTabChange,
  setQuery,
  setSearch,
  setTabChange
}: JIYSharedStateLayoutContext): JSX.Element {
  const MODULE = "TB";
  const PATH = "Isolates,TBProfile";
  const URL = URLHandler(API_TB_SUMMARY);

  const { accessToken } = useAuth();

  const [next, setNext] = useState<string>(null);
  const [prev, setPrev] = useState<string>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  // const [query, setQuery] = useState<string>("");
  // const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<JIYOrderingContext>(null);
  const [headers, setHeaders] = useState<Array<JIYHeaderContext>>(null);
  const [records, setRecords] =
    useState<Array<JIYRecordContext<FlatPsummary>>>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const [invertSelection, setInvertSelection] = useState<boolean>(false);
  const [excludedItems, setExcludedItems] = useState<
    Array<JIYRecordContext<FlatPsummary>>
  >([]);
 
  let  mycolors = [
    'olive',
    'grey'
  ] 
  
  let mytexts = [
    'with drug resistance',
     'without drug resistance'
  ]
  
 let mysizes = [
   "huge" ,
   "huge",
 
]


const[colors, setColors] = useState<Array<string>>(mycolors);
const[texts, setTexts] = useState<Array<string>>(mytexts);
const[sizes, setSizes] =  useState<Array<string>>(mysizes);
const [legend, setLegend] = useState<JIYTableLegendContext>(null);

  const fetchData = useCallback(
    async (reqURL: string) => {
      
      console.log(reqURL)
      console.log(encodeURI(reqURL))
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
            const { headers: cols, records: rows } = handler(
              res.data.results,
              invertSelection
            );
            setNext(res.data.links.next);
            setPrev(res.data.links.previous);
            setTotal(Number(res.data.total));
            setPage(Number(res.data.page));
            setPageSize(Number(res.data.page_size));
            headers || setHeaders(cols);
            setRecords(rows);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    },
    [headers, invertSelection]
  );

  useEffect(() => {
    console.log("profile ordering=" + JSON.stringify(ordering))
    fetchData(
      URLHandler(URL.uri, query, MODULE, search, page, pageSize, ordering).url
    );
  }, [page, pageSize, search, ordering, query]);

  useEffect(() => {
    if (isRefreshing) {
      fetchData(URLHandler(URL.uri, "", MODULE, "", 1, 20, null).url);
      setRefreshing(false);
    }
  }, [isRefreshing]);

  useEffect(() => {
    setLegend({...legend, colors: colors, sizes: sizes, texts: texts})
   
    if (isTabChange) {
      fetchData(URLHandler(URL.uri, "", MODULE, "", 1, 20, null).url);
      setTabChange(false);
    }
  }, [isTabChange]); 
  
  return (
    <Tab.Pane>
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            {headers && records ? (
              <IsolatesVizView
                title={MODULE}
                path={PATH}
                url={URL}
                prev={prev}
                next={next}
                total={total}
                page={page}
                pageSize={pageSize}
                query={query}
                search={search}
                ordering={ordering}
                headers={headers}
                legend={legend}
                records={records}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
                invertSelection={invertSelection}
                excludedItems={excludedItems}
                setPage={setPage}
                setPageSize={setPageSize}
                setQuery={setQuery}
                setSearch={setSearch}
                setOrdering={setOrdering}
                setHeaders={setHeaders}
                setRecords={setRecords}
                setLegend={setLegend}
                setLoading={setLoading}
                setRefreshing={setRefreshing}
                setInvertSelection={setInvertSelection}
                setExcludedItems={setExcludedItems}
                handler={handler}
              />
            ) : (
              <TablePlaceholder />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

export default TBSummaryView;
