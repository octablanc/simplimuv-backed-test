import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "variant_image",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: ()=> v4()
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );

