import express, { response } from 'express';
import mysql from 'mysql';
import sequelizePackage  from 'sequelize';
const {DataTypes , Model , Sequelize} = sequelizePackage;

const sqlize = new Sequelize('Todolist','root','James8416801',{
    host:'localhost',
    dialect: 'mysql',

})

const pool = mysql.createPool({
    host:'localhost',
    database:'TodoList',
    user:'root',
    password:'James8416801',
    prot:'3306'
});

try{
    await sqlize.authenticate();
    console.log('Connect to mysql server sccueefully');
}catch(err){
    console.error('Cannot connect to mysql server!');
}

class Todo extends Model{}

Todo.init(
    {
    id:{type:DataTypes.INTEGER, primaryKey : true},
    title:{type: DataTypes.STRING},
    },
    {sequelize: sqlize, modelName:'Todo', tableName:'Todo'}
);

Todo.sync();


const app = express();
app.use(express.json());
const port = 3000;
const results = []
//新增users
app.post('/',async (req,res) =>{
    const newTodo = await Todo.create({id:req.body.id , title:req.body.title});
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(newTodo.toJSON()));
    res.end();
});

//取得所有users
app.get('/',async (req,res) =>{
    const AllTodo = await Todo.findAll();
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(AllTodo));
    res.end();
});

//取得某個users
app.get('/:id',async (req,res) =>{
    const ThisTodo = await Todo.findByPk(req.params.id);
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(ThisTodo));
    res.end();
});

//更新某個users
app.put('/:id',async (req,res) =>{
    const ThisTodo = await Todo.findByPk(req.params.id);
    ThisTodo.set('title' ,req.body.title);
    ThisTodo.save();
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(ThisTodo.toJSON()));
    res.end();
});

//刪除某個users
app.delete('/:id',async (req,res) =>{
    await Todo.destroy({where:{id:req.params.id}});
    res.setHeader('Content-Type', 'application/JSON');
    res.write('ok');
    res.end();
});

app.listen(port, ()=>{
    console.log(`express app listen port:${port}`);
})
