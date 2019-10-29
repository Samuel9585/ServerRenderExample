import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './app';
import {
   DemoComponet
} from "./components/message";
import template from './template';
import * as phantom from 'phantom';
import * as fs from "fs";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('dist/public'));

app.get('/', (req, res) => {
   const body = ReactDOM.renderToString( < DemoComponet /> );
   const html = template(body);
    res.send(html);
 });

 app.get('/export',(rep,res) => {
   const body = ReactDOM.renderToString( < DemoComponet /> );
   const html = template(body);
   phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
         page.on('onLoadFinished',(status)=> {
            console.log("page loadFinshed",status);
            setTimeout(()=>{
               page.render('report.pdf').then((result)=>{
                  console.log('Page rendered:',result);
                  // ph.exit();
                  console.log("__dirname:",__dirname);
                  console.log("__filename:",__filename);
                  var file =  './report.pdf';
                  // res.send("export success");
                  fs.readFile('./report.pdf',function(err,data) {
                     if(err) 
                     console.log('read file error:',err);
                     else
                     console.log('read file success:',data);
                  });
                  res.download(file, '学生作业报告.pdf');
                  });
            },200);
         });
         page.setContent(html,"http:www.report.zhishinet.com").then((status)=>{
            console.log("setContent status:",status);
            page.property('paperSize', {format: 'A4',orientation: 'portrait',margin: '1cm'});
         }).catch((err)=>{
            console.log("opps！error:",err);
         });

      // http://localhost:3000/
      //  page.open(html).then(function(status) {
      //    page.property('paperSize', {format: 'A4',orientation: 'portrait',margin: '1cm'});
      //    console.log("url opend:",status);
      //    if (status !== 'success') {
      //       console.log('Unable to access network');
      //     } else {
      //       setTimeout(()=> {
      //          page.render('report.pdf').then(function(result){
      //             console.log('Page rendered:',result);
      //             // ph.exit();
      //             console.log("__dirname:",__dirname);
      //             console.log("__filename:",__filename);
      //             var file =  './report.pdf';
      //             // res.send("export success");
      //             res.download(file, '学生作业报告.pdf');
      //            });
      //       },200);
      //     }
      //  });
      });
     });
 });

 app.listen(port, () => {    
    console.log('Listening on port ' + port);
 });
 
