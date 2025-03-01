import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Info.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { createChatSession } from '../../utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

function Info({ setIsSignedIn }) {
    const [sources, setSources] = useState([]);
    const [isLoadingSources, setIsLoadingSources] = useState(false);
    const [chatSession, setChatSession] = useState(null);

    useEffect(() => {
        const session = createChatSession();
        setChatSession(session);
        fetchSources();
    }, []);

    const fetchSources = async () => {
        if (!chatSession) return;
        setIsLoadingSources(true);
        try {
            const result = await chatSession.sendMessage("Generate 10 article titles and URLs about college hate crimes for educational purposes. Format the response as a JSON array of objects, each with 'title' and 'url' properties.");
            const response = await result.response.text();
            const cleaned = response.replace(/^``````\s*$/g, '');
            const parsedSources = JSON.parse(cleaned);
            setSources(parsedSources);
        } catch (error) {
            console.error('Error fetching sources:', error);
        } finally {
            setIsLoadingSources(false);
        }
    };

    const hateCrimesByAccreditor = {
        labels: ['NECHE', 'MSCHE', 'NWCCU', 'HLC', 'WASC', 'SACSCOC'],
        datasets: [{
            label: 'Hate Crimes per 100,000 FTE students',
            data: [12.97, 9.95, 7.54, 6.69, 5.10, 3.23],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    const typesOfHateCrimes = {
        labels: ['Intimidation', 'Destruction of property', 'Simple assault'],
        datasets: [{
            data: [1758, 1703, 390],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    const hateCrimesTrend = {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Reported Hate Crime Offenses',
            data: [700, 911, 500, 896, 1336],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div className="info-container">
            <Header setIsSignedIn={setIsSignedIn} />
            <div className="info-content">
                <h1 className="hero-heading">Hate Crimes on College Campuses</h1>

                <div className="stats-overview">
                    <div className="stat-box">
                        <h3>Total reported on-campus hate crimes (2015-2021)</h3>
                        <p className="big-number">4,246</p>
                    </div>
                    <div className="stat-box">
                        <h3>Percentage of unreported on-campus hate crimes</h3>
                        <p className="big-number">50%</p>
                    </div>
                </div>

                <div className="charts-row">
                    <div className="chart-container">
                        <h2>Hate Crimes by Accreditor</h2>
                        <Bar data={hateCrimesByAccreditor} />
                    </div>
                    <div className="chart-container">
                        <h2>Types of Hate Crimes on Campuses</h2>
                        <Pie data={typesOfHateCrimes} />
                    </div>
                    <div className="chart-container">
                        <h2>Reported Hate Crime Offenses by Year</h2>
                        <Line data={hateCrimesTrend} />
                    </div>
                </div>

                <div className="info-text">
                    <h2>Key Findings</h2>
                    <ul>
                        <li>In 2022, 10% of all reported hate crimes in the U.S. occurred at schools or on college campuses.</li>
                        <li>Anti-Black hate crimes were the most frequently reported (1,690 offenses), followed by anti-LGBTQ (901 offenses) and anti-Jewish (745 offenses) between 2018-2022.</li>
                        <li>Experts caution that hate crimes tend to be significantly underreported by both victims and local law enforcement.</li>
                        <li>Over 30% of all juvenile victims of hate crimes were targeted at school.</li>
                    </ul>
                </div>

                <div className="sources-section">
                    <h2>Educational Resources on College Hate Crimes</h2>
                    <button onClick={fetchSources} disabled={isLoadingSources}>
                        {isLoadingSources ? 'Refreshing...' : 'Refresh Sources'}
                    </button>
                    <ul className="sources-list">
                        {sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.url} target="_blank" rel="noopener noreferrer">
                                    {source.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Info;
