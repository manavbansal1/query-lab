'use client'

import { useState } from 'react'
import '../styles/QueryTab.css';
import { FaPlay, FaTrash, FaDatabase, FaEye, FaEnvelope } from 'react-icons/fa';

const QueryTab = () => {
    
    const [dbMode, setDbMode] = useState("sql"); // sql or mongodb   default: sql
    const [ currentDatabase, setCurrentDatabase ] = useState('users');  // users default

    return (
        <div className="querylab-container">
            <div className="querylab-content">
                {/* Database Mode Selector */}
                <div className="querylab-card">
                <div className="querylab-card-body">
                    <label className="form-label">Select Database Type</label>
                    
                    {/* The buttons to choose between SQL or MongoDB */}
                    <div className="button-group">
                        <button className={`btn ${dbMode === 'sql' ? 'btn-active-db' : 'btn-inactive-db'}`}
                        onClick={ () => setDbMode("sql") }
                        >
                            <FaDatabase size={25} className="db-symbol mx-2" />
                            SQL (SQLite)
                        </button>

                        <button
                            className={`btn ${dbMode === 'mongodb' ? 'btn-active-db' : 'btn-inactive-db'}`}
                            onClick={() => setDbMode('mongodb')}
                        >
                            <FaDatabase size={25} className="db-symbol mx-2" />
                            MongoDB
                        </button>
                    </div>

                    {/* Select the database you want to practice on */}
                    <label className="form-label">Select Database Type</label>
                    <div className='row database-grid'>
                        <button 
                            className={`btn col-3 ${ currentDatabase === 'users' ? 'btn-active-db' : 'btn-inactive-db' }`}
                            onClick={() => setCurrentDatabase('users')}
                        >
                            Users & Orders
                        </button>
                        <button 
                            className={`btn col-3 ${ currentDatabase === 'blog' ? 'btn-active-db' : 'btn-inactive-db' }`}
                            onClick={() => setCurrentDatabase('blog')}
                        >
                            Blog
                        </button> 
                        <button 
                            className={`btn col-3 ${ currentDatabase === 'ecommerce' ? 'btn-active-db' : 'btn-inactive-db' }`}
                            onClick={() => setCurrentDatabase('ecommerce')}
                        >
                            E-Commerce
                        </button> 
                        <button 
                            className={`btn col-3 ${ currentDatabase === 'custom' ? 'btn-active-db' : 'btn-inactive-db' }`}
                            onClick={() => setCurrentDatabase('custom')}
                        >
                            Custom
                        </button>  
                    </div>


                </div>
                </div>
            </div>
        </div>
  )
}

export default QueryTab
