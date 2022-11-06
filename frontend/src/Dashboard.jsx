import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import GaugeChart from 'react-gauge-chart'
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
    const [searchValue, setSearchValue] = useState('');
    const [level, setLevel] = useState(0.0)
    const { user, logout } = useAuth0();
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = event => {
        setSearchValue(event.target.value);
    }

    async function handleClick() {
        setIsLoading(true)
        let resposne = await axios.post('http://127.0.0.1:8000/api/search', { query: searchValue })
        setLevel(parseInt(resposne.data.score) / 100)
        setIsLoading(false)
        console.log(resposne)
    }

    useEffect(() => {
        if (searchValue.length === 0) {
            setLevel(0)
        }
    }, [searchValue])

    return (
        <div className="Dashboard">
            <h1>Welcome to UBhacking</h1>
            <div className="search-box">
                <input className="search-txt" type="text" name="" placeholder="type to search" value={searchValue} onChange={handleChange} />
                <a className="search-btn" onClick={handleClick}>
                    <i class="fas fa-search"></i>
                </a>
            </div>
            {isLoading && <p>Loading</p>}
            <div className="card">
                <GaugeChart id="gauge-chart1" colors={['#EA4228', '#F5CD19', '#5BE12C']} animate={true} percent={level} hideText={true} />
            </div>
            <button onClick={() => {
                logout({ returnTo: window.location.origin });
            }}>Log out</button>
        </div >
    )
}

export default Dashboard
