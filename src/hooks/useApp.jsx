import { useCallback, useContext } from "react";
import { Context } from "../contex/appContext";

export const useApp = () => useContext(Context)
