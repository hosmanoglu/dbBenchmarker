const { default: Surreal } = require('surrealdb.node');

const db = new Surreal();

async function main() {
	try {

		// Use any of these 3 connect methods to connect to the database
		// 1.Connect to the database
		await db.connect('http://127.0.0.1:8000/rpc');
		// 2. Connect to database server
		await db.connect('ws://127.0.0.1:8000');
		// 3. Connect via rocksdb file
		await db.connect(`rocksdb://${process.cwd()}/test.db`);

		// Signin as a namespace, database, or root user
		await db.signin({
			username: 'root',
			password: 'root',
		});

		// Select a specific namespace / database
		await db.use({ namespace: 'test', database: 'test' });

		// Create a new person with a random id
		let created = await db.create('person', {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).slice(2, 12),
		});

		// Update a person record with a specific id
		let updated = await db.merge('person:jaime', {
			marketing: true,
		});

		// Select all people records
		let people = await db.select('person');

		// Perform a custom advanced query
		let groups = await db.query(
			'SELECT marketing, count() FROM type::table($tb) GROUP BY marketing',
			{
				tb: 'person',
			}
		);
	} catch (e) {
		console.error('ERROR', e);
	}
}

main();