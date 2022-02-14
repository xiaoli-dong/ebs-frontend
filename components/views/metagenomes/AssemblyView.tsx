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
import { API_ASSEMBLY } from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import { FlatAssembly } from "../../../models/Isolate";
import {
  JIYHeaderContext,
  JIYOrderingContext,
  JIYRecordContext,
  JIYSharedStateLayoutContext,
  JIYTableLegendContext
} from "../../../modules/JIYTable/core/models/JIYContexts";
import IsolatesVizView from "./VizView";
import {
  URLHandler,
  AssemblyDataHandler as handler,
} from "../../../modules/JIYTable/core/libs/handler";
import TablePlaceholder from "../../global/TablePlaceholder";

/**
 * AssemblyView
 * @returns - AssemblyView Component
 */
function AssemblyView({
  query,
  search,
  setQuery,
  setSearch,
}: JIYSharedStateLayoutContext): JSX.Element {
  //const MODULE = "TB";
  //xiaoli
  const MODULE = ""
  const PATH = "Isolates,Assembly";
  const URL = URLHandler(API_ASSEMBLY);

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
    useState<Array<JIYRecordContext<FlatAssembly>>>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [invertSelection, setInvertSelection] = useState<boolean>(false);
  const [excludedItems, setExcludedItems] = useState<
    Array<JIYRecordContext<FlatAssembly>>
  >([]);
  const [legend, setLegend] = useState<JIYTableLegendContext>(null);
  const fetchData = useCallback(
    async (reqURL: string) => {
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
                records={records}
                legend={legend}
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

export default AssemblyView;
