import parseArgs from "minimist";


export let daoProducts;


export class daoFactory {
	constructor(dao) {
		this.dao = dao;
	}

	async getDao() {

		switch (this.dao) {
			case 'MONGO':
				const { default: mongoProductDao } = await import('../daos/mongoProductDao.js');
				daoProducts = mongoProductDao.getContainer();

				break;
			case 'FIREBASE':
				const { default: firebaseProductDao } = await import('../daos/firebaseProductDao.js');
				daoProducts =  firebaseProductDao.getContainer();

				break;
			default:
				const { default: fileProductDao } = await import('../daos/fileProductDao.js');
				daoProducts = fileProductDao.getContainer('products');

				break;
		}

	}
}



