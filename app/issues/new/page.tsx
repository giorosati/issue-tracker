"use client";
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";

import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
