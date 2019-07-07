import { ResultTypes } from "@/constants/result-types-constant";

export class GetFailedError extends Error {
  
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_GET.$message);
  }

}