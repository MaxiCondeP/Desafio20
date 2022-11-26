import parseArgs from "minimist";


export let daoMessages;
const options = { default: { PORT: 8080, MODE: "fork", DAO: "MONGO" }, alias: { p: "PORT", m: "MODE", d: "DAO" } }
const args = parseArgs(process.argv.slice(2), options);
const dao = args.DAO.toUpperCase();

export class daoFactory {
	constructor(dao) {
		this.dao = dao;
	}

	async getDao(dao) {

		switch (dao) {
			case 'MONGO':
				const { default: mongoMessageDao } = await import('../daos/mongoMessageDao.js');
				daoMessages = mongoMessageDao.getContainer();

				break;
			case 'FIREBASE':
				const { default: firebaseMessageDao } = await import('../daos/firebaseMessageDao.js');
				daoMessages =  firebaseMessageDao.getContainer();
                
				break;
			default:
				const { default: fileMessageDao } = await import('../daos/fileMessageDao.js');
				daoMessages = fileMessageDao.getContainer('messages');

				break;
		}

	}
}



