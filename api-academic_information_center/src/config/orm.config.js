import typeorm from 'typeorm'

export const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'academic_information_center',
    synchronize: true,
    logging: false,
    entities: [
        'src/schemas/*.schema.js'
    ]
})