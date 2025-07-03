import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { useTelegram } from './hooks/useTelegram';
import { ButtonComponent } from './components';
import { sendPing } from './redux/services/pingSlice';

import styles from './App.module.css'


function App() {
  const dispatch = useDispatch();
  const { queryId, user, tg } = useTelegram();

  const pingBtnHandler = () => {
    dispatch(sendPing({ queryId, ...user}));
  }

  useEffect(() => {
    tg.ready()
  }, [tg]);

  return (
    <main className={styles.main__container}>
      <ButtonComponent onClick={pingBtnHandler}>
        Ping
      </ButtonComponent>
    </main>
  )
}

export default App
