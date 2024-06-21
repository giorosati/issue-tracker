"use client";
// import { TextField } from "@radix-ui/themes";
// import { TextArea } from "@radix-ui/themes";
import { Button, Text } from "@radix-ui/themes";
import { Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
// import { Spinner } from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   notes: string;
//   description: string;
// }

// import React from "react";

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className=" max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" space-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Title"
            {...register("title", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <div>
          <label htmlFor="notes">notes</label>
          <input
            id="notes"
            placeholder="Notes"
            {...register("notes", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <ErrorMessage>{errors.notes?.message}</ErrorMessage>

        {/* <TextField.Root placeholder="Title">
        <TextField.Slot {...register("title")} />
      </TextField.Root> */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue
          {/* Spinner causes error */}
          {/* {isSubmitting && <Spinner /> */}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
