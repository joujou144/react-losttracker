import { Link, LoadingSpinner } from "@/components/custom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userLoginFormSchema } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

import { useUserContext } from "@/context/useUserContext";
import { usePostSignIn } from "@/lib/queries/queries";

type FormData = z.infer<typeof userLoginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = usePostSignIn();

  const form = useForm<FormData>({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormData) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again." });
    }
  }

  return (
    <>
      <h2 className="h2-bold text-primary-600">Welcome back</h2>
      <div className="pt-6 pb-2 text-sm">
        <p className="text-gray-20">
          If you want to profile a missing loved one in our database and already
          have filed a verifiable police report with local authorities, please{" "}
          <Link to="/sign-up" className="underline text-primary-600">
            sign up.
          </Link>
        </p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col border-2 mt-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isUserLoading}
          >
            Login
            {isUserLoading && <LoadingSpinner />}
          </Button>
        </form>
      </Form>

      <Link to="/sign-up" className="mt-2">
        Forgotten your password?
      </Link>
    </>
  );
};

export default Login;
