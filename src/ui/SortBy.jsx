import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// eslint-disable-next-line react/prop-types
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  //this just handles updating search params url
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      type="white"
      options={options}
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
