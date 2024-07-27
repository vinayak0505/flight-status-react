import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './redux/store';
import { verifyToken } from './redux/reducer/auth.reducer';
import Styles from './App.module.scss';
import Router from './Router';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <div className={Styles.app}>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
