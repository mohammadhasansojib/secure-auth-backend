import * as z from "zod"

export const formatZodError = (error: z.ZodError) => {
    const flat = error.flatten();
  
    return {
        status: "error",
        message: "Validation failed",
        errors: flat.fieldErrors // { email: ["Invalid email"], password: ["..."] }
    };
}