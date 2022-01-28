/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-27 12:15:22
 * @modify date 2021-07-27 12:15:22
 * @desc [description]
 */

import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

/**
 * SideMenuPlaceholder
 * @returns - Dimmer Component
 */
function SideMenuPlaceholder(): JSX.Element {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}

export default SideMenuPlaceholder;
