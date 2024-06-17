import { Sequelize }  from 'sequelize';
const sequelize = new Sequelize('bxramq4aktguageel107', 'u2folbl4f2yecrsx', 'RKRr1gNsosRY9usJnqcj', {
    host: 'bxramq4aktguageel107-mysql.services.clever-cloud.com',
    dialect: 'mysql'
})
sequelize.authenticate().then(() => console.log('Connection has been established successfully.'),)
.catch((err)=>console.error('Unable to connect to the database:'))

export default sequelize