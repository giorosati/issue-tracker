"use client";
import { TextField } from "@radix-ui/themes";
// import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  notes: string;
  description: string;
}

// import React from "react";

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  // console.log(register("title"));

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
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
      <div>
        <label htmlFor="notes">notes</label>
        <input
          id="notes"
          placeholder="Notes"
          {...register("notes", { required: true })}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
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

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
