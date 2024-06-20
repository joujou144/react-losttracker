import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/useUserContext";
import {
  usePostMissingPerson,
  useUpdateMissingPerson,
} from "@/lib/queries/queries";
import { missingProfileFormSchema } from "@/lib/schemaValidation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import FileUploader from "./FileUploader";
import LoadingSpinner from "./LoadingSpinner";

type FormData = z.infer<typeof missingProfileFormSchema>;

type MissingPersonFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const MissingPersonForm = ({ post, action }: MissingPersonFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    usePostMissingPerson();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdateMissingPerson();

  const { toast } = useToast();
  const navigate = useNavigate();

  const { user } = useUserContext();
  const form = useForm<FormData>({
    resolver: zodResolver(missingProfileFormSchema),
    defaultValues: {
      name: post ? post?.name : "",
      description: post ? post?.description : "",
      location: post ? post?.location : "",
      date: post ? new Date(post?.date) : new Date(),
      file: [],
    },
  });

  const onSubmit = async (values: FormData) => {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
        location: post?.location,
        date: new Date(post.date),
      });

      if (!updatedPost) {
        toast({ title: "Please try again." });
      }
      return navigate(`/missing-people/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
      date: values.date.toISOString(),
    });

    if (!newPost) {
      toast({
        title: "Please try again.",
      });
    }

    navigate("/");
  };

  const handleCancel = () => {
    if (action === "Create") {
      form.reset(); // Reset the form if action is Create
    } else if (action === "Update") {
      navigate(`/missing-people/${post?.$id}`); // Navigate to specific URL if action is Update
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full max-w-screen"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="London, United Kingdom"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Date of Last Seen</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-light border-[1px] border-primary-500 hover:bg-primary-500 hover:text-surface-mixed-200 hover:font-normal",
                        !field.value && "text-primary-700"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button-cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoadingCreate || isLoadingUpdate}
            className="shad-button_primary whitespace-nowrap"
          >
            {isLoadingCreate || (isLoadingUpdate && <LoadingSpinner />)}
            {action === "Create" && "Submit"}
            {action === "Update" && "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MissingPersonForm;
