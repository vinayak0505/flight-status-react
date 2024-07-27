import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './redux/store';
import { verifyToken } from './redux/reducer/auth.reducer';
import Router from './Router';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
