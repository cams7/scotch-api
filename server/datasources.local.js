var DATABASE_URL = process.env.DATABASE_URL || "postgres://scotch_admin:12345@127.0.0.1:5432/scotch";

module.exports = {
    scotchDS: {
        connector: "postgresql",    
        url: DATABASE_URL  
    }
};