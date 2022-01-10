import './styles.css';
import closeSmall from '../../assets/closeSmall.svg';
import add from '../../assets/add.svg';

function Chip({ title, selected, handleSelectChip }) {
    return (
       <div className= {`container-chip ${selected && 'selected-chip'}`} 
       onClick={() => handleSelectChip(title)}
       >
           <span>{title}</span>
           <img 
           className='icon-chip'
           src={selected ? closeSmall : add} 
           alt="chip icon" />
       </div>
    );
}

export default Chip;