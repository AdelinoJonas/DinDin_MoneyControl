import { useState } from 'react';
import editIcon from '../../assets/lapis.svg';
import deleteIcon from '../../assets/lixeira.svg';
import {
    capitalizarWord, 
    formatToDate, 
    formatToMoney
} from '../../utils/formatters';
import ConfirmChoose from '../ConfirmChoose';
import './styles.css';
import TableHeader from './TableHeader';

function TransactionsList({
    transactions, 
    setCurrentTransaction,
    reload,
    setReload,
    handleOrderTransactions
}){
    const [idItemDelete, setIdItemDelete] = useState(null);

    async function handleDeleteItem() {
        await fetch(`http://localhost:3334/transactions/${idItemDelete}`, {
            method: 'DELETE'
        });
        setIdItemDelete(null);
        setReload(!reload);
    }
    return(
        <div className='table'>
            <TableHeader 
            transactions={transactions}
            handleOrderTransactions={handleOrderTransactions}
            />
            <div className='table-body'>
                {transactions.map((item) => (
                    <div className="table-line" key={item.id}>
                    <div className="line-items">
                        {formatToDate(item.date)}
                    </div>
                    <div className="line-items">
                        {capitalizarWord(item.week_day)}
                    </div>
                    <div className="line-items">
                        {item.description}
                    </div>
                    <div className="line-items">
                        {item.category}
                    </div>
                    <div 
                        className="line-items value-item"
                        style={{color: item.type === 'credit' ? '#7b61ff' : '#fa8c10'}}
                    >
                        {formatToMoney(item.value)}
                    </div>
                    <div className="line-items space-icons">
                        <img 
                            src={editIcon} 
                            alt="edit icon" 
                            className='actions-button'
                            onClick={() => setCurrentTransaction(item)}
                        />
                        <img 
                            src={deleteIcon}
                            alt="delete icon" 
                            className='actions-button'
                            onClick={() => setIdItemDelete(item.id)}
                        />
                        <ConfirmChoose 
                        show={ item.id === idItemDelete }
                        setClose={() => setIdItemDelete(null)}
                        message='Apagar item?'
                        handleConfim={() => handleDeleteItem()}
                        />
                    </div>
                </div>
                ))}
            </div>
       </div>
    );
}

export default TransactionsList;