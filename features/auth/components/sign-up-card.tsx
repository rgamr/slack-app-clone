import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@base-ui/react";
import React, { useState } from "react";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Something went wrong";
        
        if (message.includes("InvalidPassword") || message.toLowerCase().includes("password")) {
          setError("Password must be at least 8 characters");
        } else if (message.includes("UserAlreadyExists") || message.toLowerCase().includes("exists")) {
          setError("An account with this email already exists");
        } else {
          setError(message);
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>Use your email to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md gap-x-2 flex items-center text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-5" onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            value={name}
            placeholder="Full name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Input
            disabled={pending}
            value={email}
            placeholder="Email"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Input
            disabled={pending}
            value={password}
            placeholder="Password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <Input
            disabled={pending}
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Input>
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            size="lg"
            disabled={pending}
            onClick={() => {
              onProviderSignUp("google");
            }}
            variant="outline"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            size="lg"
            disabled={pending}
            onClick={() => {
              onProviderSignUp("github");
            }}
            variant="outline"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <span
            className="text-sky-700 cursor-pointer"
            onClick={() => setState("signIn")}
          >
            {" "}
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
