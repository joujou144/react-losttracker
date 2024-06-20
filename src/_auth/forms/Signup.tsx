import { userSignupFormSchema } from "@/lib/schemaValidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
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
import { Link, LoadingSpinner } from "@/components/custom";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import { usePostSignIn, usePostSignUp } from "@/lib/queries/queries";
import { useUserContext } from "@/context/useUserContext";

type FormData = z.infer<typeof userSignupFormSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    usePostSignUp();

  const { mutateAsync: signInAccount } = usePostSignIn();

  const form = useForm<FormData>({
    resolver: zodResolver(userSignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormData) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again." });
    }

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
      return toast({ title: "Sign up failed. Please try again." });
    }
  }

  return (
    <>
      <h2 className="h2-bold text-primary-600">Create an account</h2>

      <div className="py-6 flex items-center gap-1.5 text-sm">
        <p className="text-gray-20">Already have an account?</p>

        <ReactLink to="/login" className="underline">
          Login
        </ReactLink>
      </div>

      <p>
        Registration is open to family or friends of missing people, law
        enforcement, and volunteers.
      </p>

      {/* Signup Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col border-2 mt-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            disabled={isCreatingUser}
          >
            Sign up
            {isCreatingUser && <LoadingSpinner />}
          </Button>
        </form>
      </Form>

      <TermsAndConditions />
    </>
  );
};

export const TermsAndConditions = () => {
  return (
    <div className="flex flex-col mt-6 text-center border-t-[1px] border-gray-50">
      <p className="pt-4 text-xxs lg:text-[12px] text-gray-20">
        By joining, you agree to our{" "}
        <Link to="/login">
          Terms of Service
          <HiMiniArrowTopRightOnSquare />
        </Link>{" "}
        and{" "}
        <Link to="/login">
          Privacy Policy
          <HiMiniArrowTopRightOnSquare />
        </Link>
      </p>
    </div>
  );
};

export default Signup;
