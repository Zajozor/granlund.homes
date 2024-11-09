require(`dotenv-defaults`).config();

const username = process.env.POSTGRES_USER ?? 'postgres';
const password = process.env.POSTGRES_PASSWORD ?? 'postgres';
const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ? process.env.DB_PORT : '5432');
// Boolean environment variables are treated as string type
// Sequelize is strict on the datatype. Any string will be treated as true eventhough the string maybe 'false'
const sslRequired = process.env.DB_SSL_REQUIRED ? process.env.DB_SSL_REQUIRED.toLowerCase() === 'true' : false;
const loggingEnabled = process.env.DB_LOGGING_ENABLED ? process.env.DB_LOGGING_ENABLED.toLowerCase() === 'true' : false;

let config = {
	username: username,
	password: password,
	database: 'junctioner',
	host: host,
	port: port,
	dialect: 'postgres',
	pool: {
		min: 0,
		max: 5, // We can set on server this limit. Depending on the iron
		idle: 1000, // Release idle connections to avoid causing exceptions if the connection is terminated extrenally (e.g. db restore)
		acquire: 10000, // Default is 60s. Avoid lambda to get stuck and timeout and hide the real reason which db connection
		evict: 100, // Evaluate the idle timeout every 100ms to have more predictable timeout
	},
};

if (loggingEnabled) {
	config.logging = console.log;
} else {
	config.logging = false;
}

if (sslRequired) {
	const rejectUnauthorized = process.env.DB_REJECT_UNAUTHORIZED ? process.env.DB_REJECT_UNAUTHORIZED.toLowerCase() === 'true' : false;
	config.dialectOptions = {
		ssl: {
			require: sslRequired,
			rejectUnauthorized: rejectUnauthorized,
		},
	};
}

module.exports = config;
