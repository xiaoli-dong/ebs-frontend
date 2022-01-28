/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-27 12:15:22
 * @modify date 2021-07-27 12:15:22
 * @desc [description]
 */

import React from "react";
import { Placeholder } from "semantic-ui-react";

/**
 * TablePlaceholder
 * @returns - Table Placeholder Component
 */
function TablePlaceholder(): JSX.Element {
  return (
    <Placeholder>
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="very short" />
      <Placeholder.Line length="very short" />
    </Placeholder>
  );
}

export default TablePlaceholder;
