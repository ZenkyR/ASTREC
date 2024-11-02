import axios from 'axios';
import { useState } from 'react';

export const Filter = ({ onFilter }) => {
    const [selectedFilterValues, setSelectedFilterValues] = useState([]); 

    const toggleFilter = (filterName) => {
        if (selectedFilterValues.includes(filterName)) {
            setSelectedFilterValues(selectedFilterValues.filter(filter => filter !== filterName));
        } else {
            setSelectedFilterValues([...selectedFilterValues, filterName]);
        }
    };
    
    const applyFilters = () => {
        const queryParams = selectedFilterValues.join(',');
        axios.get(`https://127.0.0.1:8000/filters/${queryParams}`)
            .then((response) => {
                onFilter(response.data);
            });
    };

    console.log(onFilter)
    
    return (
        <div className='FilterContainer'>
            <div className='FilterRoundBtn' onClick={() => toggleFilter('decroissant')}>
                <div className='TexteFilter'>
                    <h3>Prix décroissant</h3>
                </div>
                <div className='cercle'></div>
            </div>
            <div className='FilterRoundBtn' onClick={() => toggleFilter('croissant')}>
                <div className='TexteFilter'>
                    <h3>Prix Croissant</h3>
                </div>
                <div className='cercle'></div>
            </div>
            <div className='FilterRoundBtn' onClick={() => toggleFilter('nouveaux')}>
                <div className='TexteFilter'>
                    <h3>Nouveaux</h3>
                </div>
                <div className='cercle'></div>
            </div>
            <div className='FilterRoundBtn' onClick={() => toggleFilter('anciens')}>
                <div className='TexteFilter'>
                    <h3>Anciens</h3>
                </div>
                <div className='cercle'></div>
            </div>
            <button onClick={applyFilters}>Confirmer</button>
        </div>
    );
};
