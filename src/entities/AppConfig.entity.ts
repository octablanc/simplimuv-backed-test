import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "app_config",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: ()=> v4()
            },
            header: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            footer: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            generalColors: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            social: {
                type: DataTypes.JSONB,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
