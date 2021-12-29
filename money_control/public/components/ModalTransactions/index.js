import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';
import closeBtn from '../../assets/closeBtn.svg';
import './styles.css';

const defaultValuesForm = {
    value: 0,
    category: '',
    date: '',
    description: ''
}

function ModalTransactions({open, setOpen}){

const [activeButton, setActiveButton] = useState('debit');
const [form, setForm] = useState(defaultValuesForm);

useEffect(() => {
    if(open){
        setForm(defaultValuesForm);
    }
}, [open])

function handleChange(target){
 setForm({ ...form, [target.name]: target.value });
}

async function handleSubmit(event){
    event.preventDefault();

    const [day, month, year] = form.date.split('/');

    const selectedDate = new Date(`${month}/${day}/${year}`);

    const body = {
        date: selectedDate,
        week_day: format(selectedDate, 'eee', {
            locale: ptBR
        }),
        description: form.description,
        value: form.value,
        category: form.category,
        type: activeButton
    }

    const response = await fetch("http://localhost:3334/transactions/", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    setOpen(false);
}

    return(
        <div className="backdrop" style={{display: !open && 'none'}}>
            <div className="modal-content modal-storage">
                <img 
                className='close-icon'
                src={closeBtn} 
                alt="close button" 
                onClick={() => setOpen(false)}
                />
                <h2>Adicionar Registo</h2>
                <div className='container-buttons'>
                    <button 
                    className={`btn-empty ${activeButton === 'credit' && 'btn-credit'}`}
                    onClick={() => setActiveButton('credit')}
                    >
                        Entrada
                    </button>
                    <button 
                    className={`btn-empty ${activeButton === 'debit' && 'btn-debit'}`}
                    onClick={() => setActiveButton('debit')}
                    >
                        Saida
                    </button>
                </div>   
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Valor</label>
                        <input 
                            name='value'
                            type="number"
                            value={form.value}
                            onChange={event => handleChange(event.target)}
                        />
                    </div>
                    <div>
                        <label>Categoria</label>
                        <input 
                        type="text"
                        name='category'
                        value={form.category}
                        onChange={event => handleChange(event.target)} />
                    </div>
                    <div>
                        <label>Data</label>
                        <InputMask 
                        mask="99/99/9999"
                        name='date'
                        type="text"
                        value={form.date}
                        onChange={event => handleChange(event.target)} />
                    </div>
                    <div>
                        <label>Descrição</label>
                        <input 
                        type="text"
                        name='description'
                        value={form.description}
                        onChange={event => handleChange(event.target)} />
                    </div>
                    <div className='container-btn-confirm-insert'>
                        <button className='btn-confirm-insert'>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalTransactions;