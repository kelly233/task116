"use strict";
let sinon = require("sinon");
let Method = require("../lib/method");
describe("method",() => {
   it("method.Readin()",()=>{
      let input = "王大锤, 001, 汉, 201701, 数学: 100, 语文: 90, 英语: 80, 编程: 70";
      let result = Method.Readin(input);
      let answer = { name: "王大锤", id: "001", people: "汉", class: "201701", "数学": 100, "语文": 90, "英语": 80, "编程": 70 }
      expect(result).toEqual(answer);
   });
   it("method.Writeout()",()=>{
       sinon.spy(console, 'log');
       let students = [{ name: "王大锤", id: "001", people: "汉", class: "201701", "数学": 100, "语文": 90, "英语": 80, "编程": 70 },
          { name: "张小花", id: "002", people: "汉", class: "201701", "数学": 80, "语文": 100, "英语": 80, "编程": 90 }];
       let id = "001, 002";
       let result = Method.Writeout(id,students);
       let answer = "成绩单\n" +
           "姓名|数学|语文|英语|编程|平均分|总分 \n" +
           "========================\n" +
           "王大锤100|90|80|70|85|340\n" +
           "张小花80|100|80|90|87.5|350\n" +
           "========================\n" +
           "全班总分平均数：345\n" +
           "全班总分中位数：345";
       expect(console.log.args.join()).toBe(answer);
   });

});