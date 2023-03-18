import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { changeRedirect } from "../features/app/boardSlice";

const useRedirect = (toWhere, ...dependencies) => {
  const { redirectSuccess } = useSelector((state) => state.board);
  // React Router
  const navigateFunction = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectSuccess) {
      navigateFunction(toWhere);
      dispatch(changeRedirect());
    }
  }, [redirectSuccess, ...dependencies]);
};

export default useRedirect;
