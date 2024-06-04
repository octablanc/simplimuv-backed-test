import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "contact",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: ()=> v4()
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            finace: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            trade: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
