import { useState } from 'react'
import './App.css'
import GaugeChart from 'react-gauge-chart'
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
    const [searchValue, setSearchValue] = useState('');
    const [level, setLevel] = useState(0.90)
    const { user, logout } = useAuth0();

    const handleChange = event => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="Dashboard">
            <h1>Welcome to UBhacking</h1>
            <div class="search-box">
                <input className="search-txt" type="text" name="" placeholder="type to search" />
                <a className="search-btn" href="#">
                    <i class="fas fa-search"></i>
                </a>
            </div>
            {/* <div className='searcharea'>
                <input className="searchbox" type="text" value={searchValue} onChange={handleChange}/>
                <button className='searchbutton' onClick={test}>SEARCH</button>
            </div> */}
            <div className="card">
                <GaugeChart id="gauge-chart1" animate={true} percent={level} hideText={true} />
            </div>
            <button onClick={() => {
                logout({ returnTo: window.location.origin });
            }}>Log out</button>
        </div >
    )
}

export default Dashboard
