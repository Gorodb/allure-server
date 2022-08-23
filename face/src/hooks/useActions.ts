import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {reportsActions} from "../store/reports/reports.slice";
import {pushActions} from "../store/alerts/alerts.slice";
import {modalActions} from "../store/modal/modal.slice";

const allActions = {
  ...reportsActions,
  ...pushActions,
  ...modalActions,
}

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
