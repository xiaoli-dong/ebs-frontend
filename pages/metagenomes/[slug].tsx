/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:17:08
 * @modify date 2021-07-15 13:17:13
 * @desc [description]
 */
import { useRouter } from "next/router";
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/global/TopNav";
import { Grid } from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";
import { URLHandler } from "../../modules/JIYTable/core/libs/handler";
import { useAuth } from "../../middleware/AuthProvider";
import { API_MSEQUENCE_DETAIL } from "../../config/apis";
import axios from "axios";

/**
 * Single TB Sample
 * @returns - Details of selected Sequence
 */
function TBSample(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;

  const URL = URLHandler(API_MSEQUENCE_DETAIL + slug);
  const { accessToken } = useAuth();

  const [data, setData] = useState(null);

  const fetchData = useCallback(async (reqURL: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get(reqURL, config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData(URL.url);
  }, []);

  return (
    <>
      <TopNav />
      <Grid padded>
        <Grid.Column>{JSON.stringify(data, null, 4)}</Grid.Column>
      </Grid>
    </>
  );
}

export default withAuth(TBSample);
