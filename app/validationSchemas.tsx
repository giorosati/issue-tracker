import React from "react";
import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  notes: z.string().min(1, "Notes are required"),
});
