import {SqliteDialect} from "@sequelize/sqlite3";
import {Sequelize} from "@sequelize/core";
import {Thread} from "./thread.model";


export const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: 'database.sqlite',
    models: [
        Thread
    ]
});

