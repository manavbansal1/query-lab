let SQL = null;

// Initialize sql from CDN
export async function initSQLite() {
    // If Sql is already initialzied return
    if (SQL) return SQL;

    // Wait for sql.js to load from CDN
    if (typeof window === 'undefined') {
        throw new Error('SQL.js only works in browser');
    }
    
    // Wait for initSqlJs to be available
    while (!window.initSqlJs) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    SQL = await window.initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });

    return SQL;
}

// Create Empty database
export async function createEmptyDatabase() {
    const SQL = await initSQLite();
    return new SQL.Database();
}

  