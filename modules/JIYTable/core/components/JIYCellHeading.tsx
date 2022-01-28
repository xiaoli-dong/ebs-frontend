/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:00
 * @modify date 2021-07-15 13:27:06
 * @desc [description]
 */

import { useCallback } from "react";
import { Checkbox } from "semantic-ui-react";
import { JIYCellHeadingContext } from "../models/JIYContexts";

/**
 * JIYCellHeading
 * @param param0 - See {@link JIYCellHeadingContext}
 * @returns Cell Heading Component
 */
function JIYCellHeading<T>({
  invertSelection,
  excludedItems,
  record,
  records,
  index,
  setRecords,
  setInvertSelection,
  setExcludedItems,
}: JIYCellHeadingContext<T>): JSX.Element {
  const handleChange = useCallback(() => {
    // Excluded Item Handling
    invertSelection === !record.isSelected
      ? setExcludedItems(
          excludedItems.filter((item) => item.data["id"] !== record.data["id"])
        )
      : setExcludedItems([
          ...excludedItems,
          { ...record, isSelected: !record.isSelected },
        ]);
    // if (invertSelection) {
    //   // setInvertSelection(false);
    //   setRecords(
    //     records.map((record, i) =>
    //       i === index ? { ...record, isSelected: false } : record
    //     )
    //   );
    // } else {
    //   setRecords(
    //     records.map((record, i) =>
    //       i === index ? { ...record, isSelected: !record.isSelected } : record
    //     )
    //   );
    // }
    setRecords(
      records.map((record, i) =>
        i === index ? { ...record, isSelected: !record.isSelected } : record
      )
    );
  }, [invertSelection, records, record]);

  return <Checkbox checked={record.isSelected} onChange={handleChange} />;
}

export default JIYCellHeading;
