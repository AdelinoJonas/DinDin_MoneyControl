import './styles.css';
import filterIcon from '../../assets/filtro.svg';
import {useEffect, useState} from 'react/cjs/react.development';
import Chip from '../Chip';
import defaultWeekDays from './defaultWeekDays';
import { getOnlySelectedWeekDays, getOnlySelectedCategories} from './utils';

function Filters({ transactions, handleOrderTransactions, reload, setReload }){
    const [open, setOpen] = useState(false);
    const [weekDays, setWeekDays] = useState(defaultWeekDays);
    const [categories, setCategories] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [tansactionsInFilter, settransactionsInFilter] = useState();


    useEffect(() => {
        const allCategories = [];

        for (const transact of transactions) {
            allCategories.push({
                name: transact.category,
                selected:false
            });
        }
        const categsIds =[];
        const categoriesWithoutDupplicatedItems = [];

        for (const categ of allCategories) {
            if(categsIds.indexOf(categ.name) === -1){
                categsIds.push(categ.name);
                categoriesWithoutDupplicatedItems.push(categ);
            }
            
        }

        setCategories(categoriesWithoutDupplicatedItems);
    }, [transactions]);

    async function loadTransactionsInFilter(){
        const response = fetch('http://localhost:3334/transactions', {
            method:'GET',
            headers:{
                'content-type': 'application/json'
            }
        });
        const data = await response.json();

        settransactionsInFilter();
    }

    function handleSelectedWeekDayFilter(weekDay){
        const localWeeksDay = [...weekDays];
        const day = localWeeksDay.find((day) => day.name === weekDay);

        day.selected = !day.selected;

        setWeekDays(localWeeksDay);
    }

    function handleSelectedCategFilter(categ){
        const localCategs = [...categories];
        const category = localCategs.find((category) => category.name === categ);

        category.selected = !category.selected;

        setCategories(localCategs);
    }

    function handleClearFilters(){
        const localWeeksDay = [...weekDays];

        for(const day of localWeeksDay) {
            day.selected = false;
        }
        setWeekDays(defaultWeekDays);

        const localCategs = [...categories];

        for(const categ of localCategs) {
            categ.selected = false;
        }

        setCategories(localCategs);
        setMaxValue(0);
        setMinValue(0);

        setReload(!reload);
    }

    function handleApplyFilters(){
        const selectedDays = getOnlySelectedWeekDays(weekDays);
       const selectedCategs = getOnlySelectedCategories(categories);

       const localTransacions = [...transactions];

       if(selectedDays.length === 0 && selectedDays.length === 0){
            
        const transactionsFilteredByValue = [];

        for(const transact of localTransacions){
            if(minValue && Number(transact.value) < minValue){
                continue;
            }
            if(maxValue && Number(transact.value) < maxValue){
                continue;
            }
            if(minValue && minValue <= Number(transact.value)){
                transactionsFilteredByValue.push(transact);
            }
            if(maxValue && maxValue >= Number(transact.value)){
                transactionsFilteredByValue.push(transact);
            }
          }
          const idTransactions = [];
          const transactionsRemovedDupplicateds = [];

          for (const transact of transactionsFilteredByValue){
              if(idTransactions.indexOf(transact.id) === -1){
                  idTransactions.push(transact.id);
                  transactionsRemovedDupplicateds.push(transact);
              }
          }

          handleOrderTransactions(transactionsRemovedDupplicateds);
       }
    }

    return(
       <div className="container-filters">
           <button 
           className='btn-filter'
           onClick={() => setOpen(!open)}
           >
            
               <img src={filterIcon} alt="filters" />
               <strong>Filtrar</strong>
           </button>
           {open &&
                <div className="content-filters">
                    <div className='items-filter'>
                        <strong>Dia da Semana</strong>
                        <div className='container-chips'>
                            {weekDays.map((day) => (
                              <Chip 
                                key={day.name}
                                title={day.name}
                                selected={day.selected}
                                handleSelectChip={handleSelectedWeekDayFilter}
                            />  
                            ))}
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className='items-filter'>
                        <strong>Categoria</strong>
                        <div className='container-chips'>
                            {categories.map((categ) => (
                              <Chip 
                                key={categ.name}
                                title={categ.name}
                                selected={categ.selected}
                                handleSelectChip={handleSelectedCategFilter}
                            />  
                            ))}
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className='items-filter'>
                        <strong>Valor</strong>
                        <div className="container-input-filter">
                            <label>Min.</label>
                            <input 
                            type="number" 
                            value={minValue} 
                            onChange={(e) => setMinValue(e.target.valueAsNumber)} />
                        </div>
                        <div className="container-input-filter">
                            <label>Max.</label>
                            <input 
                            type="number" 
                            value={maxValue} 
                            onChange={(e) => setMaxValue(e.target.valueAsNumber)} />
                        </div>
                    </div>
                    <div className="container-action-buttons">
                    <button 
                    className="btn-clear-filters"
                    onClick={() => handleClearFilters()}
                    >
                        Limpar filtros
                    </button>
                    <button 
                    className="btn-apply-filters"
                    onClick={()=> handleApplyFilters()}
                    >
                        Aplicar Filtros
                    </button>
                    </div>
                </div>
            }
       </div>
    );
}

export default Filters;