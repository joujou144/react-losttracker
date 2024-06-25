import { Heading, LoadingSpinner } from "@/components/custom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/useUserContext";
import { useToast } from "@/components/ui/use-toast";
import { useGetUserById, useUpdateUserProfile } from "@/lib/queries/queries";
import { userProfileSchema } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof userProfileSchema>;

const UpdateProfile = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const { data: currentUser } = useGetUserById(id || "");

  const form = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { mutateAsync: updateProfile, isPending: isUpdatingUser } =
    useUpdateUserProfile();

  const handleUpdate = async (values: FormData) => {
    console.log(values);
    const updatedUser = await updateProfile({
      userId: currentUser?.$id || "",
      name: values.name,
      email: values.email,
    });
    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...user,
      name: updatedUser?.name,
    });
    return navigate("/");
  };

  if (!user) return;

  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Update My Profile">
          <MdOutlineNoteAdd size={30} />
        </Heading>

        {!user && (
          <div className="mt-10">
            <LoadingSpinner />
          </div>
        )}

        {/* User Profile Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6 flex flex-col mt-6 w-full lg:w-[60%] xl:w-1/2 self-start"
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
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button-cancel"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap self-end"
                disabled={isUpdatingUser}
              >
                Update Profile
                {isUpdatingUser && <LoadingSpinner />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
