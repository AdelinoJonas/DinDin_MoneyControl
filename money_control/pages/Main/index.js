import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ModalTransactions from '../../components/ModalTransactions';
import Resume from '../../components/Resume';
import TransactionsList from '../../components/TransactionsList';
import Filter from '../../components/Filters';
import './styles.css';

function Main() {
  const [open,setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(()=> {
    handleLoadTransactions()
  }, [reload])

  useEffect(() => {
    if(currentTransaction) {
      return setOpen(true);
    }
  }, [currentTransaction]);

  useEffect(() =>{
    if(!open){
      handleLoadTransactions()
    }

    if(!open && currentTransaction){
      setCurrentTransaction(false);
    }
  }, [open, currentTransaction]);

  function handleOrderTransactions(newTransactions){
    setTransactions(newTransactions);
  }

  async function handleLoadTransactions(){
    const response = await fetch('http://localhost:3334/transactions', {
      method:'GET'
    });

    const data = await response.json();
    setTransactions(data)
  }

return (
    <div className="container-main">
      <Header />
      <main>
        <div>
          <Filter 
          transactions={transactions}
          reload={reload}
          setReload={setReload}
          handleLoadTransactions= {handleLoadTransactions}
          />
          <TransactionsList 
          transactions = {transactions}
          setCurrentTransaction={setCurrentTransaction}
          setReload={setReload}
          reload={reload}
          handleOrderTransactions={handleOrderTransactions}
          />
        </div> 
        <div>
          <Resume 
          transactions = {transactions}
          />
          <button 
          className='btn-insert-register'
          onClick={() => setOpen(true)}
          >
            Adicionar registro
          </button>
        </div>
      </main>
        <ModalTransactions 
          open={open}
          setOpen={setOpen}
          currentTransaction={currentTransaction}
          transactions={transactions}
          />
    </div>
  );
}

export default Main;
