/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-09-02 10:07:30
 * @modify date 2021-09-02 10:07:30
 * @desc [description]
 */

import React, { useCallback, useReducer } from "react";
import { Grid, Input } from "semantic-ui-react";

/**
 * Search
 * @param param - keyword, setKeyword
 * @returns - Search Component
 */
function Search({ keyword, setKeyword }): JSX.Element {
  const initialSearchState = {
    loading: false,
    searchValue: "",
  };

  function searchReducer(state, action) {
    switch (action.searchType) {
      case "CLEAN_QUERY":
        return initialSearchState;
      case "START_SEARCH":
        return { ...state, loading: true, searchValue: action.searchQuery };
      case "FINISH_SEARCH":
        return { ...state, loading: false, searchValue: action.searchQuery };
      case "NOT_FOUND":
        return { ...state, loading: false };

      default:
        throw new Error();
    }
  }

  const [searchState, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchState
  );
  const { searchValue } = searchState;

  const handleSearchChange = useCallback((e, data) => {
    dispatchSearch({ searchType: "START_SEARCH", searchQuery: data.value });

    if (data.value.length === 0) {
      dispatchSearch({ searchType: "CLEAN_QUERY" });
      setKeyword("");
      return;
    }

    dispatchSearch({
      searchType: "FINISH_SEARCH",
      searchQuery: data.value,
    });

    setKeyword(data.value);
  }, []);

  return (
    <Input
      onChange={handleSearchChange}
      value={searchValue}
      icon="search"
      placeholder="Search..."
      type="text"
    />
  );
}

/**
 * JIYTableCustomHead
 * @param param0 - title, search, isLoading, setSearch, setLoading
 * @returns - Custom Head Component
 */
function JIYTableCustomHead({
  title,
  search,
  isLoading,
  setSearch,
  setLoading,
}): JSX.Element {
  return (
    <>
      <Grid.Column width={8} textAlign="left">
        <h2>{title}</h2>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <Search keyword={search} setKeyword={setSearch} />
      </Grid.Column>
    </>
  );
}
export default JIYTableCustomHead;
