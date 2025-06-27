import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

//func for fetching cabins
export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  // console.log(cabins);
  if (error) console.log(error);
  return { isLoading, error, cabins };
}
