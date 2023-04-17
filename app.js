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

function getConnection() {
    return new Promise((resolve , reject) =>{
        pool.getConnection((err,conn)=>{
            if(err) reject(err);
            else resolve(conn);
        });
    });
}

function executeQuery(conn,query,data){
    return new Promise((resolve , reject) =>{
        conn.query(query,data, (err,results,fields) =>{
            if(err) reject(err);
            else resolve({results , fields});
        });
    });
}
//新增users
app.post('/',async (req,res) =>{
    const conn = await getConnection();
    const {results , fields} = await executeQuery(
        conn ,
        "INSERT INTO todo VALUES (? , ? )",
        [req.body.id , req.body.title]
    );
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(results));
    res.end();
});

//取得所有users
app.get('/',async (req,res) =>{
    const conn = await getConnection();
    const {results , fields} = await executeQuery(
        conn ,
        "SELECT * FROM todo");
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(results));
    res.end();
});

//取得某個users
app.get('/:id',async (req,res) =>{
    const conn = await getConnection();
    let {results , fields} = await executeQuery(
        conn ,
        "SELECT * FROM todo WHERE id=?",
        [req.params.id]
    );
    if(results.length > 0) results = results[0];
    else {
        res.status(404);
        res.write("Not found");
        res.end();
        return;
    };
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(results));
    res.end();
});

//更新某個users
app.put('/:id',async (req,res) =>{
    const conn = await getConnection();
    const {results , fields} = await executeQuery(
        conn ,
        "UPDATE todo SET title=? WHERE id=?",
        [req.body.title , req.params.id]
    );
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(results));
    res.end();
});

//刪除某個users
app.delete('/:id',async (req,res) =>{
    const conn = await getConnection();
    const {results , fields} = await executeQuery(
        conn ,
        "DELETE FROM todo WHERE id=?",
        [req.params.id]
    );
    res.setHeader('Content-Type', 'application/JSON');
    res.write(JSON.stringify(results));
    res.end();
});

app.listen(port, ()=>{
    console.log(`express app listen port:${port}`);
})
