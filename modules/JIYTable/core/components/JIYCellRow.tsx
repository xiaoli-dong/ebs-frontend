/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */

import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { pick } from "../libs/gizmos";
import { JIYCellRowContext } from "../models/JIYContexts";
import JIYCellHeading from "./JIYCellHeading";

/**
 * JIYCellRow
 * @param param0 - See {@link JIYCellRowContext}
 * @returns - Cell Row Component
 */
function JIYCellRow<T>({
  primaryField,
  path,
  invertSelection,
  excludedItems,
  headers,
  records,
  record,
  index,
  setRecords,
  setInvertSelection,
  setExcludedItems,
}: JIYCellRowContext<T>): JSX.Element {
  const [row, setRow] = useState(record.data);

  const getValue = (key, value) => {
    // if (primaryField.value === key) {
    //   return <Link href={`${path}/${value}`}>{value}</Link>;
    // } else {
    //   return value;
    // }
    return value;
  };

  useEffect(() => {
    const keys = headers.filter((colState) => colState.display === "visible");
    setRow(pick(record.data, keys));
  }, [headers]);

  return (
    <Table.Row>
      <Table.Cell>
        <JIYCellHeading
          invertSelection={invertSelection}
          excludedItems={excludedItems}
          record={record}
          records={records}
          index={index}
          setRecords={setRecords}
          setInvertSelection={setInvertSelection}
          setExcludedItems={setExcludedItems}
        />
      </Table.Cell>
      {row &&
        Object.entries(row).map(([key, value], index) => {
          if (typeof value === "object" && value !== null) {
            return (
              <Table.Cell className={value.style} key={index}>
                {getValue(key, value.value)}
              </Table.Cell>
            );
            return null;
          } else {
            return <Table.Cell key={index}>{getValue(key, value)}</Table.Cell>;
          }
        })}
    </Table.Row>
  );
}

export default JIYCellRow;
