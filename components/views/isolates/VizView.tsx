/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:20:13
 * @modify date 2021-07-15 13:20:19
 * @desc [description]
 */

import React from "react";

import { JIYTableStateContext } from "../../../modules/JIYTable/core/models/JIYContexts";
import JIYTable from "../../../modules/JIYTable/core/components/JIYTable";

/**
 * IsolateVizView
 * @param param0 - See {@link JIYTableStateContext}
 * @returns - Isolate Visualization View Component
 */
function IsolatesVizView<T, R>({
  title,
  path,
  url,
  prev,
  next,
  total,
  page,
  pageSize,
  query,
  search,
  ordering,
  headers,
  records,
  isLoading,
  isRefreshing,
  invertSelection,
  excludedItems,
  setPage,
  setPageSize,
  setQuery,
  setSearch,
  setOrdering,
  setHeaders,
  setRecords,
  setLoading,
  setRefreshing,
  setInvertSelection,
  setExcludedItems,
  handler,
}: JIYTableStateContext<T, R>): JSX.Element {
  return (
    <>
      <JIYTable
        title={title}
        path={path}
        url={url}
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
        setLoading={setLoading}
        setRefreshing={setRefreshing}
        setInvertSelection={setInvertSelection}
        setExcludedItems={setExcludedItems}
        handler={handler}
      />
    </>
  );
}

export default IsolatesVizView;
