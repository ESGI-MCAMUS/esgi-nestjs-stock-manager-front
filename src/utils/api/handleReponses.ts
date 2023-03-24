import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setLoading } from "../../store/application/slice";

interface HandleMutationResponseParams {
  response: any;
  dispatch: Dispatch<AnyAction>;
  successAction: () => void;
  errorAction: () => void;
}
export const handleMutationResponse = (params: HandleMutationResponseParams) => {
  if (params.response.status === "pending") {
    params.dispatch(setLoading(true));
  } else if (params.response.status === "fulfilled") {
    params.dispatch(setLoading(false));
    params.successAction();
  } else if (params.response.status === "rejected") {
    params.dispatch(setLoading(false));
    params.errorAction();
  }
}
