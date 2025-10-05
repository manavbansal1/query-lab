'use client'

import { useState } from 'react'
import '../styles/QueryTab.css';
import { FaPlay, FaTrash, FaDatabase, FaEye, FaEnvelope } from 'react-icons/fa';

const QueryTab = () => {
    
    const [dbMode, setDbMode] = useState("sql"); // sql or mongodb   default: sql

    return (
        <div className="querylab-container">
        <div className="querylab-content">
            {/* Database Mode Selector */}
            <div className="querylab-card">
            <div className="querylab-card-body">
                <label className="form-label">Select Database Type</label>
                {/* The buttons to choose between SQL or MongoDB */}
                <div className="button-group">
                    <button className={`btn ${dbMode === 'sql' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={ () => setDbMode("sql") }
                    >
                        <FaDatabase size={25} className="db-symbol mx-2" />
                        SQL (SQLite)
                    </button>
                    <button
                        className={`btn ${dbMode === 'mongodb' ? 'btn-success' : 'btn-outline'}`}
                        onClick={() => setDbMode('mongodb')}
                    >
                        <FaDatabase size={25} className="db-symbol mx-2" />
                        MongoDB
                    </button>
                </div>

            </div>
            </div>
        </div>
        </div>
  )
}

export default QueryTab
