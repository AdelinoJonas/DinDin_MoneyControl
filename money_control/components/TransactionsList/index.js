import editIcon from '../../assets/lapis.svg';
import deleteIcon from '../../assets/lixeira.svg';
import './styles.css';
import TableHeader from './TableHeader';

function TransactionsList(){
    return(
        <div className='table'>
            <TableHeader />
            <div className='table-body'>
                <div className="table-line">
                    <div className="line-items">
                        data
                    </div>
                    <div className="line-items">
                        semana
                    </div>
                    <div className="line-items">
                        descricao
                    </div>
                    <div className="line-items">
                        tipo
                    </div>
                    <div className="line-items">
                        valor
                    </div>
                    <div className="line-items space-icons">
                        <img src={editIcon} alt="edit icon" />
                        <img src={deleteIcon} alt="delete icon" />
                    </div>
                </div>

            </div>
       </div>
    );
}

export default TransactionsList;