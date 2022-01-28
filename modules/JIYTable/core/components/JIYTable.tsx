/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:30
 * @modify date 2021-07-15 13:27:35
 * @desc [description]
 */

import React, { useCallback, useRef, useState } from "react";

import { JIYTableStateContext } from "../models/JIYContexts";
import JIYTableHeader from "./JIYTableHeader";
import JIYCellRow from "./JIYCellRow";

import { Grid, Ref, Sticky, Table } from "semantic-ui-react";
import JIYTableTools from "./JIYTableTools";
import JIYTableCustomHead from "../plugins/JIYTableCustomHead";
import { pick } from "../libs/gizmos";

/**
 * JIYTable
 * A top level table component layouts entire structure of data table
 * @param param0 - See {@link JIYTableStateContext}
 * @returns - Table Component
 */
function JIYTable<T, R>({
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
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const [headerOnTop, setHeaderOnTop] = useState(false);

  const draggableWrapperRef = useRef(null);
  const stickyNodeMountPointRef = useRef(null);
  const tableHeaderObserver = useRef<IntersectionObserver>();
  const options = {
    root: null,
    rootMargin: "-160px 0px 0px 0px",
    threshold: 0,
  };
  const stickyTableHeaderRef = useCallback(
    (node: HTMLElement | null) => {
      if (tableHeaderObserver.current) tableHeaderObserver.current.disconnect();
      tableHeaderObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add("ebs-table-header");
        }
      }, options);
      if (node) tableHeaderObserver.current.observe(node);
    },
    [headerOnTop]
  );

  const getCellRows = useCallback(() => {
    if (headers.length > 0) {
      if (records.length > 0) {
        const keys = headers.filter((colState) => colState.display !== "none");
        return records.map((record, index) => {
          let rowObj = record;
          const excludedItem = excludedItems.find(
            (item) => item.data["id"] === record.data["id"]
          );
          excludedItem
            ? (rowObj = {
                ...record,
                isSelected: excludedItem.isSelected,
                data: pick(record.data, keys),
              })
            : (rowObj = { ...record, data: pick(record.data, keys) });
          return (
            <JIYCellRow
              primaryField={headers.find((header) => header.primary)}
              path={path}
              invertSelection={invertSelection}
              excludedItems={excludedItems}
              headers={headers}
              records={records}
              record={rowObj}
              index={index}
              setRecords={setRecords}
              setInvertSelection={setInvertSelection}
              setExcludedItems={setExcludedItems}
              key={index}
            />
          );
        });
      } else {
        return (
          <Table.Row>
            <Table.Cell colSpan={headers.length + 1}>Data Not Found</Table.Cell>
          </Table.Row>
        );
      }
    } else {
      return (
        <Table.Row>
          <Table.Cell colSpan={headers.length + 1}>
            Unknown Table Schema
          </Table.Cell>
        </Table.Row>
      );
    }
  }, [headers, records, invertSelection, excludedItems]);

  const handleHorizontalScrolling = useCallback(
    (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }

      const x = e.pageX - draggableWrapperRef.current?.offsetLeft;
      const scroll = x - startX;
      draggableWrapperRef.current.scrollLeft = scrollLeft - scroll;
    },
    [mouseDown]
  );

  const startDragging = useCallback((e) => {
    setMouseDown(true);
    setStartX(e.pageX - draggableWrapperRef.current?.offsetLeft);
    setScrollLeft(draggableWrapperRef.current?.scrollLeft);
  }, []);

  const stopDragging = useCallback((e) => {
    setMouseDown(false);
  }, []);

  return (
    <Grid padded>
      <Grid.Column>
        <div ref={stickyNodeMountPointRef}>
          <Grid padded>
            <Grid.Row>
              <JIYTableCustomHead
                title={path.split(",")[0]}
                search={search}
                isLoading={isLoading}
                setSearch={setSearch}
                setLoading={setLoading}
              />
            </Grid.Row>
            <Sticky
              className="ebs-sticky-node"
              offset={40}
              context={stickyNodeMountPointRef}
              onStick={() => {
                setHeaderOnTop(true);
              }}
              onUnstick={() => {
                setHeaderOnTop(false);
              }}
            >
              <Grid.Row>
                <JIYTableTools
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
              </Grid.Row>
            </Sticky>
            {!isLoading && (
              <Ref innerRef={draggableWrapperRef}>
                <Grid.Row
                  className="ebs-table-draggable-wrapper ebs-header-anchor"
                  onMouseMove={handleHorizontalScrolling}
                  onMouseUp={stopDragging}
                  onMouseDown={startDragging}
                  onMouseLeave={stopDragging}
                >
                  <Table
                    className={`${
                      mouseDown
                        ? "ebs-table-draggable-inner-grabbing"
                        : "ebs-table-draggable-inner"
                    }`}
                    singleLine
                    sortable
                    celled
                    collapsing
                    striped
                    size="small"
                  >
                    <Ref innerRef={stickyTableHeaderRef}>
                      <JIYTableHeader
                        headers={headers}
                        records={records}
                        ordering={ordering}
                        invertSelection={invertSelection}
                        excludedItems={excludedItems}
                        setHeaders={setHeaders}
                        setRecords={setRecords}
                        setOrdering={setOrdering}
                        setInvertSelection={setInvertSelection}
                        setExcludedItems={setExcludedItems}
                      />
                    </Ref>
                    <Table.Body>{getCellRows()}</Table.Body>
                  </Table>
                </Grid.Row>
              </Ref>
            )}
          </Grid>
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default JIYTable;
