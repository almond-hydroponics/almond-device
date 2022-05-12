// eslint-disable-next-line @typescript-eslint/no-var-requires
const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('devices', {
			id: {
				type: DataTypes.UUID,
				field: 'id',
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				field: 'name',
				allowNull: false,
			},
			user: {
				type: DataTypes.STRING,
				field: 'user',
			},
			verified: {
				type: DataTypes.BOOLEAN,
				field: 'verified',
			},
			active: {
				type: DataTypes.BOOLEAN,
				field: 'active',
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			version: {
				type: DataTypes.INTEGER,
				field: 'version',
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('devices');
	},
};
