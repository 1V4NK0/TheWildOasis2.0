import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  //allows to read and update the URL, sort of a map with keys and values
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  //in this project it's okay to fetch all data and then filter and sort it
  //but it's better to fetch already filtered data because u might not need all the data
  //more efficient

  //FILTERING
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //SORTING
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  //to reverse arr for different direction sorted
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (typeof a[field] === "string") {
      //localeCompare is used for comparing string alphabetically
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr 0.3fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* you pass what you want render (cabins in this case) and what you want to do with data (create a cabin row) */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => {
            return <CabinRow cabin={cabin} key={cabin.id} />;
          }}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
