import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//reasons for creating a separate hook:
//to allow LoginForm to focus only on rendering the UI, not handling any code
//a separate hook just a good practise where you can do all your state management
//jsx for UI primarily, while js for logic

//loginAPI handles exactly interaction with supabase logging
//while this login func adds more to it such as
//what to do onSuccess, onError etc
export function useLogin() {
  //to allow page navigation
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      toast.success("Logged in!");
      navigate("/dashboard", { replace: true });
      console.log(user);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Incorrect credentials");
    },
  });

  return { login, isLoading };
}
