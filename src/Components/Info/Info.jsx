import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Info.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { createChatSession } from '../../utils';
import { getReportStats } from '../../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);


const hateCrimeDefinition = `
  <h2>What is a Hate Crime?</h2>
  <p>A crime + Motivation for committing the crime based on bias = Hate crime</p>
  <p>In the simplest terms, a hate crime must include both "hate" and a "crime."</p>
  
  <h3>Hate</h3>
  <p>The term "hate" can be misleading. When used in a hate crime law, the word "hate" does not mean rage, anger, or general dislike. In this context "hate" means bias against people or groups with specific characteristics that are defined by the law.</p>
  <p>At the federal level, hate crime laws include crimes committed on the basis of the victim's perceived or actual race, color, religion, national origin, sexual orientation, gender, gender identity, or disability.</p>
  <p>Most state hate crime laws include crimes committed on the basis of race, color, and religion; many also include crimes committed on the basis of sexual orientation, gender, gender identity, and disability.</p>
  
  <h3>Crime</h3>
  <p>The "crime" in hate crime is often a violent crime, such as assault, murder, arson, vandalism, or threats to commit such crimes. It may also cover conspiring or asking another person to commit such crimes, even if the crime was never carried out.</p>
`;



function Info({ setIsSignedIn }) {
    const [reportStats, setReportStats] = useState({ totalReports: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const stats = await getReportStats();
                setReportStats(stats);
            } catch (error) {
                console.error('Error fetching report stats:', error);
            }
        };

        fetchStats();

        const intervalId = setInterval(fetchStats, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const typesOfHateCrimes = {
        labels: ['Intimidation', 'Destruction of property', 'Assault'],
        datasets: [{
            data: [1758, 1703, 390],
            backgroundColor: [
                '#ff4b4b',  // Bright red
                '#ff8c8c',  // Lighter red
                '#b30000'   // Darker red
            ],
            borderColor: '#1b1b1b',
            borderWidth: 2
        }]
    };

    const hateCrimesTrend = {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Reported Hate Crime Offenses',
            data: [700, 911, 500, 896, 1336],
            fill: false,
            borderColor: '#ff4b4b',
            
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
                        <h3>Reports submitted through report.ai</h3>
                        <p className="big-number">{reportStats.totalReports}</p>
                        {reportStats.lastReportTimestamp && (
                            <p className="last-report">
                                Last report: {new Date(reportStats.lastReportTimestamp.seconds * 1000).toLocaleDateString()}
                            </p>
                        )}
                    </div>
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
                        <h2>Types of Hate Crimes on Campuses</h2>
                        <div className="chart-wrapper">
                        <Pie 
                            data={typesOfHateCrimes} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        align: 'center',
                                        labels: {
                                            color: '#ffffff',  // Set legend text color to white
                                            boxWidth: 15,
                                            padding: 20,
                                            font: {
                                                size: 14,
                                                weight: '500'  // Make text slightly bolder for better visibility
                                            }
                                        }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const label = context.label || '';
                                                const value = context.raw || 0;
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = ((value / total) * 100).toFixed(1);
                                                return `${label}: ${value} (${percentage}%)`;
                                            }
                                        }
                                    }
                                },
                                layout: {
                                    padding: {
                                        left: 50,
                                        right: 50,
                                        top: 0,
                                        bottom: 0
                                    }
                                }
                            }}
                        />

                        </div>
                    </div>
                    <div className="chart-container">
                        <h2>Reported Hate Crime Offenses by Year</h2>
                        <Line 
                            data={hateCrimesTrend} 
                            options={{
                                responsive: true,
                                scales: {
                                    x: {
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'  // Light grid lines
                                        },
                                        ticks: {
                                            color: '#ffffff'  // White text for x-axis labels
                                        }
                                    },
                                    y: {
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'  // Light grid lines
                                        },
                                        ticks: {
                                            color: '#ffffff'  // White text for y-axis labels
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#ffffff'  // White text for legend
                                        }
                                    }
                                }
                            }}
                        />

                    </div>
                </div>

                <div className="hate-crime-definition" dangerouslySetInnerHTML={{ __html: hateCrimeDefinition }}></div>

                <div className="info-text">
                     <ul>
                        <li>In 2022, 10% of all reported hate crimes in the U.S. occurred at schools or on college campuses.</li>
                        <li>Anti-Black hate crimes were the most frequently reported (1,690 offenses), followed by anti-LGBTQ (901 offenses) and anti-Jewish (745 offenses) between 2018-2022.</li>
                        <li>Experts caution that hate crimes tend to be significantly underreported by both victims and local law enforcement.</li>
                        <li>Over 30% of all juvenile victims of hate crimes were targeted at school.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Info;
