/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:41
 * @modify date 2021-07-15 13:27:48
 * @desc [description]
 */

import { useCallback } from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { JIYTableHeaderContext } from "../models/JIYContexts";

/**
 * JIYTableHeader
 * @param param - See {@link JIYTableHeaderContext}
 * @returns - Table Header Component
 */
function JIYTableHeader<T>({
  headers,
  records,
  ordering,
  invertSelection,
  excludedItems,
  setHeaders,
  setRecords,
  setOrdering,
  setInvertSelection,
  setExcludedItems,
}: JIYTableHeaderContext<T>): JSX.Element {
  const handleInvertSelection = useCallback(() => {
    setExcludedItems([]);
    if (!invertSelection) {
      // all of rows will be selected
      records &&
        setRecords(records.map((record) => ({ ...record, isSelected: true })));
    } else {
      // all of rows will be deselected
      records &&
        setRecords(records.map((record) => ({ ...record, isSelected: false })));
    }
    setInvertSelection(!invertSelection);
  }, [invertSelection]);

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox
            checked={records.every(
              (record) =>
                record.isSelected === true && excludedItems.length === 0
            )}
            onChange={handleInvertSelection}
          />
        </Table.HeaderCell>
        {headers.length > 0 &&
          headers
            .filter((colState) => colState.display === "visible")
            .map((colState, index) => (
              <Table.HeaderCell
                sorted={
                  ordering !== null
                    ? ordering.column === colState.value
                      ? ordering.direction
                      : null
                    : null
                }
                onClick={() => {
                  if (ordering !== null && ordering !== undefined) {
                    if (colState.value === ordering.column) {
                      setOrdering({
                        column: colState.value,
                        direction:
                          ordering.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      });
                    } else {
                      setOrdering({
                        column: colState.value,
                        direction: "ascending",
                      });
                    }
                  } else {
                    setOrdering({
                      column: colState.value,
                      direction: "ascending",
                    });
                  }
                }}
                key={index}
              >
                {colState.alias ? colState.alias : colState.value}
              </Table.HeaderCell>
            ))}
      </Table.Row>
    </Table.Header>
  );
}

export default JIYTableHeader;
