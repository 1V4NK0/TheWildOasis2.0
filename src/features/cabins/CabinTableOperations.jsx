import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  //passing an array of objects as options
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (asc)" },
          { value: "name-desc", label: "Sort by name (desc)" },
          { value: "regularPrice-asc", label: "Sort by price (asc)" },
          { value: "regularPrice-desc", label: "Sort by price (desc)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (asc)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (desc)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
