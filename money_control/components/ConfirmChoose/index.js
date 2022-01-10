import './styles.css';

function ConfirmChoose({ 
    show, 
    setClose,
    message, 
    handleConfim }){
    return(
       <>
        {show &&
            <div className='container-confirm'>
                <div className='arrow-up'></div>
                <span>{message}</span>
                <button 
                className='btn-ations-confirm blue'
                onClick = {() => handleConfim()}>
                    Sim
                </button>
                <button
                className='btn-ations-confirm red'
                onClick = {() => setClose(false)}>
                    Não
                </button>
            </div>
        }
       </>
    );
}

export default ConfirmChoose;