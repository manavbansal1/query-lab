'use client'

import { useState, useEffect } from 'react'
import '../styles/QueryTab.css';
import { sampleQueries, databaseOptions } from '@/data/SampleQueries';
import { FaPlay, FaTrash, FaDatabase, FaEye, FaRobot, FaTimes } from 'react-icons/fa';
import { createSampleDatabase, createEmptyDatabase, executeQuery, getDatabaseSchema } from "@/lib/sqlite-manager";
import Editor from "@monaco-editor/react";

const QueryTab = () => {
    
    const [ dbMode, setDbMode ] = useState("sql"); // sql or mongodb   default: sql
    const [ currentDatabase, setCurrentDatabase ] = useState('users');  // users default
    const [ mongoConnected, setMongoConnected ] = useState(false);   // State to track if the db is connected
    const [ showSchema, setShowSchema ] = useState(false); // state to check if the user wants to see the  svhema 
    const [ schema, setSchema ] = useState([]);  // State for schema
    const [ db, setDb ] = useState(null);
    const [ query, setQuery ] = useState('');  // state to mnage query
    const [ results, setResults ] = useState(null);  // state to manage query result
    const [ error, setError ] = useState(null);  // error state
    const [ loading, setLoading ] = useState(false); // While processing, show spinner state
    const [ executionTime, setExecutionTime ] = useState(null);  // To show user the time it took to execute thequery
    const [ aiLoading, setAiLoading ] = useState(false); // state to manage is loading
    const [ aiResponse, setAiResponse ] = useState(null); // Store ai response

    // Initialize database when mode or database changes
    useEffect(() => {
        if (dbMode === 'sql') {
        loadDatabase(currentDatabase);
        } else {
        // MongoDB mode - just load sample queries
        setQuery(sampleQueries.mongodb[currentDatabase]);
        setResults(null);
        setError(null);
        }
    }, [currentDatabase, dbMode]);

    const loadDatabase = async (dbType) => {
        setLoading(true);
        try {
        let newDb;
        if (dbType === 'custom') {
            newDb = await createEmptyDatabase();
        } else {
            newDb = await createSampleDatabase(dbType);
        }
        setDb(newDb);
        setQuery(sampleQueries.sql[dbType]);
        setResults(null);
        setError(null);
        
        const dbSchema = getDatabaseSchema(newDb);
        setSchema(dbSchema);
        } catch (err) {
        setError('Failed to load database: ' + err.message);
        } finally {
        setLoading(false);
        }
    };

    const executeUserQuery = async () => {
        
        setAiResponse(null); // Clear AI response

        if (dbMode === 'mongodb') {
        if (!mongoConnected) {
            setError('MongoDB is not connected. Please run the local installer first.');
            return;
        }
        // Execute MongoDB query via bridge server
        executeMongoQuery();
        return;
        }

        if (!db) return;
        
        setLoading(true);
        setError(null);
        setResults(null);
        setExecutionTime(null);
        
        const startTime = performance.now();
        
        try {
            const result = executeQuery(db, query);
            setResults(result);
            
            const newSchema = getDatabaseSchema(db);
            setSchema(newSchema);
            
            setExecutionTime(((performance.now() - startTime) / 1000).toFixed(3));
        } catch (err) {
            const endTime = ((performance.now() - startTime) / 1000).toFixed(3);
            setError(err.message);
            setExecutionTime(null); // Don't show execution time on error
        } finally {
            setLoading(false);
        }
    };

    const executeMongoQuery = async () => {
        setLoading(true);
        setError(null);
        setResults(null);
        
        const startTime = performance.now();
        
        try {
        const response = await fetch('http://localhost:8080/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Query failed');
        }
        
        setResults({
            type: 'json',
            data: data.results,
            documentCount: data.results.length
        });
        
        setExecutionTime(((performance.now() - startTime) / 1000).toFixed(3));
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    const askGemini = async () => {
        setAiLoading(true);
        setAiResponse(null);
        
        try {
          const res = await fetch("/api/ask-gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query,
              error,
              schema,
            }),
          });
      
          if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to get AI assistance");
          }
      
          const data = await res.json();
          setAiResponse(data.answer);
        } catch (err) {
            console.error("Gemini error:", err.message);
            setAiResponse(`Failed to get AI help: ${err.message}`);
        } finally {
            setAiLoading(false);
        }
    };

    const closeAiResponse = () => {
        setAiResponse(null);
    };
            

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
                )}
                
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

                {/* Query Writer */}
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
                            {/* <textarea
                            className="query-editor"
                            rows={10}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={dbMode === 'sql' ? 'Enter your SQL query...' : 'Enter your MongoDB query...'}
                            spellCheck={false}
                            /> */}
                            <Editor
                                height="200px"
                                language={dbMode === 'sql' ? 'sql' : 'javascript'} // ✅ 'sql' for SQL, 'javascript' for MongoDB
                                theme="vs-light"
                                value={query}
                                className='query-editor'
                                onChange={(value) => setQuery(value || "")}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    wordWrap: "on",
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                }}
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
                                    onClick={() => { setResults(null); setError(null); setExecutionTime(null); setQuery(""); setAiResponse(null); }}
                                >
                                    <FaTrash className="icon" />
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                
                {/* Execution Time */}
                {executionTime && !error && (
                    <div className="alert alert-success">
                        ✅ Query executed in <strong>{executionTime}s</strong>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        <div className="error-section">
                            <h4>Error</h4>
                            <code className="error-code">{error}</code>
                        </div>
                        <button 
                            className="btn btn-ai-help"  
                            onClick={askGemini}
                            disabled={aiLoading}
                        >
                            {aiLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Asking Gemini...
                                </>
                            ) : (
                                <>
                                    <FaRobot/>
                                    Ask Gemini for Help
                                </>
                            )}
                        </button>
                        {aiResponse && (
                            <div className="ai-response">
                                <div className="ai-header">
                                    <h5>💡 AI Suggestion:</h5>
                                    <button className="close-ai-btn" onClick={closeAiResponse} title="Close suggestion">
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="ai-content">
                                    {aiResponse}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Success Message if the query is successfull */}
                {results && results.type === 'success' && (
                    <div className="alert alert-success">
                        <strong>✅ {results.message}</strong>
                        {results.changes > 0 && <div>{results.changes} row(s) affected</div>}
                    </div>
                )}

                {/* Results Table if sql */}
                {results && results.type === 'table' && (
                    <div className="card">
                        <div className="card-header">
                        <strong>Query Results</strong>
                        <span className="badge badge-primary">{results.rowCount} rows</span>
                        </div>
                        <div className="card-body">
                        <div className="table-container">
                            <table className="results-table">
                            <thead>
                                <tr>
                                {results.columns.map((col, idx) => (
                                    <th key={`col-${idx}`}>{col}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.rows.map((row, rowIdx) => (
                                <tr key={`row-${rowIdx}`}>
                                    {results.columns.map((col, colIdx) => (
                                    <td key={`cell-${rowIdx}-${colIdx}`}>{row[col]}</td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                )}

                {/* Results JSON  if mongodb */}
                {results && results.type === 'json' && (
                    <div className="card">
                        <div className="card-header">
                        <strong>Query Results</strong>
                        <span className="badge badge-success">{results.documentCount} documents</span>
                        </div>
                        <div className="card-body">
                        <pre className="json-pre">
                            <code>{JSON.stringify(results.data, null, 2)}</code>
                        </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
  );
}

export default QueryTab
