"use server";
import { formSchema } from "../form-schema";
import { saveInfo } from "../../services/merchant/merchant";
import { MerchantInfo } from "../../dto/merchant";
import { ErrorValues } from "@/lib/utils";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  console.log(prevState);
  console.log(data);
  const formData = Object.fromEntries(data);
  if (formData.tags) {
    try {
      formData.tags = JSON.parse(formData.tags as string); // Convert back to array
    } catch (error) {
      console.error("Failed to parse tags:", error);
      return {
        message: "Failed to parse tags",
        issues: ["Tags must be a valid JSON array"],
      };
    }
  }
  const parsed = formSchema.safeParse(formData);

  return {} as FormState;
  // if (!parsed.success) {
  //   const fields: Record<string, string> = {};
  //   for (const key of Object.keys(formData)) {
  //     fields[key] = formData[key].toString();
  //   }
  //   return {
  //     message: "Invalid form data",
  //     fields,
  //     issues: parsed.error.issues.map((issue) => issue.message),
  //   };
  // }

  // try {
  //   const merchant: MerchantInfo = {
  //     name: formData.name.toString(),
  //     description: formData.description.toString(),
  //     profileImage: formData.profileImage
  //       ? formData.profileImage.toString()
  //       : undefined,
  //     url: formData.url ? formData.url.toString() : undefined,
  //   };
  //   await saveInfo(merchant);

  //   return { message: "User registered" };
  // } catch (err) {
  //   const localError = err as Error;
  //   const message =
  //     localError.message === ErrorValues.UNIQUE_CONSTRAINT_VIOLATION
  //       ? "User already registered"
  //       : localError.message;
  //   return {
  //     message,
  //     issues: [localError.message],
  //   };
  // }
}
