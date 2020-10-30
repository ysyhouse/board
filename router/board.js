const express = require('express');
const router = express.Router();

const {pool} = require('../modules/mysql-conn');

router.get(['/','/list'],(req,res, next) => {
  const pug = {title : "게시판 리스트" ,css:"board", js:"board"}
  res.render('./board/list.pug',pug);
});


router.get('/write',(req,res, next) => {
  const pug = {title : "게시판 작성" ,css:"board", js:"board"}
  res.render('./board/write.pug',pug);
});

router.post('/save' ,async (req,res, next) => {
const { title, content, writer} =req.body;
var values=[ title, content , writer];
var sql= 'INSERT INTO board SET title=? , content=?, writer=?';

try{
  const connect= await pool.getConnection();
  const rs = await connect.query(sql, values);
  connect.release();
  res.json(rs[0]);
}
catch(err){
  next(err);
}


});



module.exports = router;