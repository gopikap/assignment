const mysql = require("mysql-await");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "user_records"
});

const userRepository = {};

userRepository.createIfNotExists = async (userRecord) => {
    const existing = await pool.awaitQuery("SELECT * FROM users WHERE name = ? and age = ? LIMIT 1", [userRecord.name, parseInt(userRecord.age)]);
    if (existing && existing.length == 1)
        return existing[0].id;

    const inserted = await pool.awaitQuery("INSERT INTO users SET name = ?, age = ?", [userRecord.name, parseInt(userRecord.age)]);
    return { id: inserted.insertedId, ...userRecord };
}

userRepository.getAll = async () => {
    const records = await pool.awaitQuery("SELECT * FROM users");
    return records;
}

module.exports = userRepository;