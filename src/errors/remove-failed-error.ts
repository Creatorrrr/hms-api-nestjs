import { ResultTypes } from "@/constants/result-types-constant";

export class RemoveFailedError extends Error {
  
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_REMOVE.$message);
  }

}
