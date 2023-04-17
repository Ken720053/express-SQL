import express, { response } from 'express';
import mysql from 'mysql';

const pool = mysql.createPool({
    host:'localhost',
    database:'TodoList',
    user:'root',
    password:'James8416801',
    prot:'3306'
});

const app = express();
app.use(express.json());
const port = 3000;


//新增users
app.post('/',async (req,res) =>{
    // const todoID = req.query.todo_id;
    // const todoTitle = req.query.todo_title;
    pool.getConnection((err,conn) => {
        if(err){
            console.log('err');
        };
        conn.query("INSERT INTO todo VALUES (? , ? )",
        [req.body.id , req.body.title], 
        (err, results , fields) => {
            res.setHeader('Content-Type', 'application/JSON');
            res.write(JSON.stringify(results));
            res.end();
        });
        
    });
});

//取得所有users
// app.get('/',async (req,res) =>{
//     const usersId = req.query.users_id;
//     const usersName = req.query.users_name;
//     pool.getConnection((err,conn) =>{
//         conn.query(
//             "INSERT INTO users VALUES (? , ?)",
//             [usersId , usersName],
//             (err,result,fields) =>{
//                 res.write("Hello World!");
//                 res.end();
//             }
//         );
//     });
// });

//取得某個users
app.get('/:id',async (req,res) =>{

});

//更新某個users
app.put('/:id',async (req,res) =>{

});

//刪除某個users
app.delete('/:id',async (req,res) =>{

});

app.listen(port, ()=>{
    console.log(`express app listen port:${port}`);
})
