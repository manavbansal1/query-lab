'use client'

import { useState } from 'react'
import '../styles/QueryTab.css';
import { sampleQueries, databaseOptions } from '@/data/sampleQueries';
import { FaPlay, FaTrash, FaDatabase, FaEye, FaEnvelope } from 'react-icons/fa';

const QueryTab = () => {
    
    const [dbMode, setDbMode] = useState("sql"); // sql or mongodb   default: sql
    const [ currentDatabase, setCurrentDatabase ] = useState('users');  // users default
    const [ mongoConnected, setMongoConnected ] = useState(false);   // State to track if the db is connected
    const [ showSchema, setShowSchema ] = useState(true); // state to check if the user wants to see the  svhema 
    const [schema, setSchema] = useState([]);  // State for schema
    const [db, setDb] = useState(null);
    const [query, setQuery] = useState('');  // state to mnage query
    const [results, setResults] = useState(null);  // state to manage query result
    const [error, setError] = useState(null);  // error state
    const [loading, setLoading] = useState(false); // While processing, show spinner state
    const [executionTime, setExecutionTime] = useState(null);  // To show user the time it took to execute thequery

    const executeUserQuery = async () => {
        return;
    }

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

                {/* MongoDB Alert */}
                {dbMode === 'mongodb' && !mongoConnected && (
                <div className="alert alert-warning">
                    <h4>MongoDB Local Setup Required</h4>
                    <p>Download and run our installer to connect MongoDB locally.</p>
                    <button 
                        className="btn btn-warning btn-sm" 
                        // TODO: Add a new function that sends a ping to db api 
                        // and then update mongoConnected state
                        onClick={() => setMongoConnected(true)}
                    >
                        I've installed it - Connect
                    </button>
                </div>
                )}

                {dbMode === 'mongodb' && mongoConnected && (
                    <div className="alert alert-success">
                        Success: Connected to MongoDB at localhost:27017
                    </div>
                )};
                
                {/* Box to shwo to schema of the database being currently used */}
                { dbMode === 'sql' && (
                    <div className="card">
                        <div className="card-header">
                            <span className="header-title">
                                Database Schema
                            </span>
                            <button className="btn mx-1" onClick={() => setShowSchema(!showSchema)}>
                                <FaEye className='icon'/>
                                { showSchema ? 'Hide' : 'Show' }
                            </button>
                        </div>
                        {showSchema && (
                            <div className="card-body">
                                <pre className="schema-pre">
                                {schema.map((item, idx) => (
                                    <div key={idx}>
                                    <strong className="schema-type">{item[1]}</strong>: {item[0]}
                                    {item[2] && <div className="schema-sql">{item[2]}</div>}
                                    {idx < schema.length - 1 && <hr className="schema-divider" />}
                                    </div>
                                ))}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {/* TODO Query Writer */}
                <div className="card">
                    <div className="card-body">
                        <div className="editor-header">
                        <label className="form-label">
                            {dbMode === 'sql' ? 'SQL Query Editor' : 'MongoDB Query Editor'}
                        </label>
                        <button
                            className="btn-link"
                            onClick={() => setQuery(sampleQueries[dbMode][currentDatabase])}
                        >
                            Load Sample Queries
                        </button>
                        </div>
                            <textarea
                            className="query-editor"
                            rows={10}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={dbMode === 'sql' ? 'Enter your SQL query...' : 'Enter your MongoDB query...'}
                            spellCheck={false}
                            />
                            <div className="button-row">
                                <button
                                    className="btn btn-primary"
                                    onClick={executeUserQuery}
                                    disabled={!query.trim() || loading}
                                >
                                    {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Executing...
                                    </>
                                    ) : (
                                    <>
                                        <FaPlay className="icon" />
                                        Execute Query
                                    </>
                                    )}
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => { setResults(null); setError(null); setExecutionTime(null); setQuery(""); }}
                                >
                                    <FaTrash className="icon" />
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
  )
}

export default QueryTab
