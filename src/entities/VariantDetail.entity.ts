import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "variant_detail",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: ()=> v4()
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        { freezeTableName: true, timestamps: false }
    );
