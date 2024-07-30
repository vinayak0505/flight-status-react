import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './redux/store';
import { verifyToken } from './redux/reducer/auth.reducer';
import Styles from './App.module.scss';
import Router from './Router';
import { requestNotificationPermission } from './notifications/permissions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // verify token if user has saved token in local storage
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    // request notiication permisstion and get device token if accepted
    requestNotificationPermission(dispatch);
  }, [dispatch])

  return (
    <div className={Styles.app}>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
