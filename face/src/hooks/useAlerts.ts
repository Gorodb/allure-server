import {IAlert} from "../store/alerts/alerts.slice";
import {useActions} from "./useActions";
import {v4 as uuid} from "uuid";

export const useAlerts = () => {
  const {setAlert, removeAlert} = useActions()

  return (alert: IAlert, timeout = 3000) => {
    const id = uuid();
    setAlert({...alert, id})
    setTimeout(() => {
      removeAlert(id)
    }, timeout)
  };
}
