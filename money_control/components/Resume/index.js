import './styles.css';

function Resume(){
    return(
        <div className='container-resume'>
            <h3>Resumo</h3>
            <div>
                <span>Entradas</span>
                <strong className='in'>R$ 10,00</strong>
            </div>
            <div>
                <span>Saídas</span>
                <strong className='out'>R$ 50,00</strong>
            </div>
            <div className="horizontal-line"></div>
            <div>
                <span>Entradas</span>
                <strong className='balance'>R$ -40,00</strong>
            </div>
        </div>
    );
}

export default Resume;