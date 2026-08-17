const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Estoque = db.define('estoque',{
    codEstoque: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'codUsuario'
        }
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'codProduto'
        }
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    qtdeMovimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'estoques'
})

module.exports = Estoque