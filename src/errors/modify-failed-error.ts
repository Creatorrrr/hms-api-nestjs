import { ResultTypes } from "@/constants/result-types-constant";

export class ModifyFailedError extends Error {
  
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_MODIFY.$message);
  }

}