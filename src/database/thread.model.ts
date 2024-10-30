import {DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize,} from '@sequelize/core';
import {Attribute, NotNull, Table} from '@sequelize/core/decorators-legacy';
import {SqliteDialect} from '@sequelize/sqlite3';

const sequelize = new Sequelize({dialect: SqliteDialect});

@Table({
    modelName: "threads"
})
export class Thread extends Model<InferAttributes<Thread>, InferCreationAttributes<Thread>> {
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare chat_id: number;

    @Attribute(DataTypes.STRING)
    declare thread_id: string;
}