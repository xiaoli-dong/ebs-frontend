/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 10:38:41
 * @modify date 2021-07-15 10:56:22
 * @desc [description]
 */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import {
  Menu,
  Segment,
  Pagination,
  Button,
  Dropdown,
  Grid,
  Icon,
  Modal,
  Header,
  Table,
  TableBody,
} from "semantic-ui-react";
import TablePlaceholder from "../../../../components/global/TablePlaceholder";
import { useAuth } from "../../../../middleware/AuthProvider";
import { pick } from "../libs/gizmos";
import { URLHandler } from "../libs/handler";
import { JIYTableStateContext } from "../models/JIYContexts";

/**
 * ColumnSelector
 * @param param0 - headers, setHeaders
 * @returns - Column Selector component
 */
function ColumnSelector({ headers, setHeaders }): JSX.Element {
  const handleChange = useCallback(
    (e) => {
      setHeaders(
        headers.map((colState) => {
          return colState.value === e.currentTarget.value
            ? {
                ...colState,
                display: colState.display === "visible" ? "hidden" : "visible",
              }
            : colState;
        })
      );
    },
    [headers]
  );

  return (
    <Grid columns={5}>
      {headers &&
        headers
          // .filter((colState) => colState.display === "visible" || "hidden")
          .filter((colState) => colState.display !== "none")
          .map((column, index) => (
            <Grid.Column key={index}>
              <input
                disabled={column.primary}
                // label={column.value}
                value={column.value}
                onChange={handleChange}
                defaultChecked={column.display === "visible"}
                type="checkbox"
              />
              <label>{column.alias ? column.alias : column.value}</label>nm==           </Grid.Column>
          ))}
    </Grid>
  );
}

/**
 * Page Size Selector
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Page Size Selector Component
 */
function PageSizeSelector({ pageSize, setPageSize }): JSX.Element {
  const pageSizeOptions = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "50", value: 50 },
    { key: 5, text: "100", value: 100 },
  ];

  const handlePageSizeChange = useCallback(
    (e, data) => {
      setPageSize(data.value);
    },
    [pageSize]
  );

  return (
    <>
      <label>Show </label>
      <Menu compact>
        <Dropdown
          onChange={handlePageSizeChange}
          text={pageSize.toString()}
          options={pageSizeOptions}
          compact
          selection
        />
      </Menu>
      <label> rows</label>
    </>
  );
}

/**
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Table Tools Component
 */
function JIYTableTools<T, R>({
  title,
  path,
  url,
  prev,
  next,
  total,
  page,
  pageSize,
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
  const { accessToken } = useAuth();

  const [activeItem, setActiveItem] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [exportItems, setExportItems] = useState(null);

  const fetchData = useCallback(
    async (reqURL: string) => {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      await axios
        .get(reqURL, config)
        .then((res) => {
          if (res.status === 200) {
            const { headers: cols, records: rows } = handler(
              res.data.results,
              invertSelection
            );
            const keys = headers.filter(
              (colState) => colState.display === "visible"
            );

            // Applying a column
            // Export only selected records
            // Condition: reverse selection / normal selection
            if (invertSelection) {
              const disabledList = excludedItems
                .filter((item) => !item.isSelected) // double check
                .map((item) => item.data["id"]);
              const diffItems = rows
                .filter((row) => !disabledList.includes(row.data["id"]))
                .map((item) => ({ ...item, data: pick(item.data, keys) }));
              setExportItems(diffItems);
            } else {
              const items = excludedItems
                .filter((item) => item.isSelected)
                .map((item) => ({ ...item, data: pick(item.data, keys) }));
              // setExportItems(excludedItems);
              setExportItems(items);
            }
          }
        })
        .catch((err) => console.log(err));
    },
    [headers, openAlert, exportItems, excludedItems, invertSelection]
  );

  const handleExport = useCallback(() => {
    // fetchData(URLHandler(url.uri, null, null, null, 1, total, null).url);
    fetchData(URLHandler(url.uri, null, "TB", null, 1, total, null).url);
    // fetchData(URLHandler(url.uri, null, null, null, 1, 20, null).url);
    setOpenAlert(!openAlert);
    // console.log(excludedItems);
  }, [headers, openAlert, exportItems, excludedItems, invertSelection]);

  const handleItemClick = useCallback(
    (e, { name }) => {
      name === activeItem ? setActiveItem("") : setActiveItem(name);
    },
    [activeItem]
  );

  const handlePageChange = useCallback(
    (e, data) => {
      setPage(data.activePage);
    },
    [page]
  );

  const handleSubMenuClose = useCallback((e) => {
    e.preventDefault();
    setActiveItem("");
  }, []);

  const handleRefresh = useCallback((e) => {
    e.preventDefault();
    setInvertSelection(false);
    setQuery("");
    setSearch("");
    setOrdering(null);
    setExcludedItems([]);
    setHeaders(null);
    setRecords(null);
    setRefreshing(true);
  }, []);

  const getSubMenu = useCallback(() => {
    switch (activeItem) {
      case "page":
        return (
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        );

      case "columns":
        return <ColumnSelector headers={headers} setHeaders={setHeaders} />;

      default:
        return null;
    }
  }, [headers, activeItem, pageSize]);

  const getExportItemCount = useCallback(() => {
    return exportItems.length;
  }, [exportItems]);

  useEffect(() => {
    setExportItems(null);
  }, [invertSelection]);

  return (
    <>
      <Menu attached="top" tabular fluid>
        <Menu.Item>
          <Button onClick={handleExport}>Export as CSV</Button>
        </Menu.Item>
        <Menu.Item>
          <Pagination
            secondary
            activePage={page}
            totalPages={
              total % pageSize > 0
                ? Math.floor(total / pageSize) + 1
                : Math.floor(total / pageSize)
            }
            onPageChange={handlePageChange}
            boundaryRange={0}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            {(() => {
              return (
                "Showing " +
                ((page - 1) * pageSize + (total > 0 ? 1 : 0)).toString() +
                " - " +
                (pageSize > total ? total : page * pageSize).toString() +
                " of " +
                total
              );
            })()}
          </Menu.Item>

          <Menu.Item>
            <Button icon basic onClick={handleRefresh}>
              <Icon name="refresh" />
            </Button>
          </Menu.Item>

          <Menu.Item
            name="page"
            active={activeItem === "page"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="columns"
            active={activeItem === "columns"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>

      <Segment hidden={activeItem === ""} attached="bottom">
        {getSubMenu()}
        <Button
          circular
          floated="right"
          size="mini"
          icon="close"
          onClick={handleSubMenuClose}
        />
      </Segment>

      <Modal
        onClose={() => setOpenAlert(false)}
        onOpen={() => setOpenAlert(true)}
        open={openAlert}
        size="small"
      >
        <Modal.Header>Export as CSV</Modal.Header>
        {exportItems ? (
          <>
            <Modal.Content>
              <Modal.Description>
                <Header>Selection Details</Header>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>
                        Rows selected
                      </Table.HeaderCell>
                      <Table.HeaderCell singleLine>Filename</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <TableBody>
                    <Table.Row>
                      <Table.Cell>
                        <Header as="h2" textAlign="center">
                          {/* {records.filter((record) => record.isSelected).length} */}
                          {getExportItemCount()}
                        </Header>
                      </Table.Cell>
                      {exportItems.length > 0 ? (
                        <Table.Cell singleLine>{`${
                          title +
                          "_" +
                          path.split("/")[1] +
                          "_" +
                          new Date().toISOString()
                        }.csv`}</Table.Cell>
                      ) : (
                        <Table.Cell singleLine>N/A</Table.Cell>
                      )}
                    </Table.Row>
                  </TableBody>
                </Table>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setOpenAlert(false)}>
                Cancel
              </Button>
              <div
                className={`ui green button ebs-custom-csv-export ${
                  exportItems.filter((item) => item.isSelected).length > 0
                    ? ""
                    : "disabled"
                }`}
              >
                <CSVLink
                  data={exportItems
                    .filter((item) => item.isSelected)
                    .map((item) => item.data)}
                  filename={`${
                    title +
                    "_" +
                    path.split("/")[1] +
                    "_" +
                    new Date().toISOString()
                  }.csv`}
                >
                  Export
                </CSVLink>
              </div>
            </Modal.Actions>
          </>
        ) : (
          <TablePlaceholder />
        )}
      </Modal>
    </>
  );
}

export default JIYTableTools;
