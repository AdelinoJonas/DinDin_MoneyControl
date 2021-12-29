import {useState} from 'react';
import Header from '../../components/Header';
import ModalTransactions from '../../components/ModalTransactions';
import Resume from '../../components/Resume';
import TransactionsList from '../../components/TransactionsList';
import './styles.css';

function Main() {
  const [open,setOpen] = useState(false);

return (
    <div className="App">
      <Header />
      <main>
        <TransactionsList />
        <div>
          <Resume />
          <button className='btn-insert-register'
          onClick={() => setOpen(true)}
          >
            Adicionar registro
          </button>
        </div>
      </main>

        <ModalTransactions 
          open={open}
          setOpen={setOpen}
          />
          
    </div>
  );
}

export default Main;
