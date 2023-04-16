const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mysql = require("mysql");
const { JSON } = require("mysql/lib/protocol/constants/types");

const pool = mysql.createPool({
    host:'localhost',
    database:'TodoList',
    user:'root',
    password:'James8416801',
});


const app = express();
app.use(express.json());
const port = 3000;

//新增users
app.post('/',async (req,res) =>{
    pool.getConnection((err,conn) => {
        // if(err){
        //     res.write("Error Connect");
        //     res.end();
        // };
        conn.query("INSERT INTO VALUES (? , ? )",
        [req.body.id , req.body.name], 
        (err, results , fields) => {
            res.setHeader('Content-Type', 'application/JSON');
            res.write(JSON.stringify(results));
            res.end();

        });
        
    });
});

//取得所有users
app.get('/',async (req,res) =>{
    const usersId = req.query.users_id;
    const usersName = req.query.users_name;
    pool.getConnection((err,conn) =>{
        conn.query(
            "INSERT INTO users VALUES (? , ?)",
            [usersId , usersName],
            (err,result,fields) =>{
                res.write("Hello World!");
                res.end();
            }
        );
    });
});

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
