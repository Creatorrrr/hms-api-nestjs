import { ResultTypes } from "@/constants/result-types-constant";

export class RegisterFailedError extends Error {
  
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_REGISTER.$message);
  }

}