import { DataTypes, Model } from "denodb";

class Example extends Model {
    static table = "examples";
    static timestamps = true;

    static fields = {
        id: {
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        url: DataTypes.TEXT,
        user: DataTypes.STRING,
    };
}

export default Example;
