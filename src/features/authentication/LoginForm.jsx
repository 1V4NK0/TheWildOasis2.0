import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("ivan@ukr.com");
  const [password, setPassword] = useState("123456");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  // if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
