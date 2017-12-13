let sinon = require("sinon");
let Input = require("./input");
let Message = require("./message");
let readlineSync = require("cli-interact");
let Method = require("./method");
module.exports = () => {
    let s =Message.MENU;
    let students =  [];
    let input = readlineSync.question(s);
    let re = /^[\u4e00-\u9fa5]+,\s(\d)+,\s[\u4e00-\u9fa5]+,\s(\d)+,(\s[\u4e00-\u9fa5]+:\s(\d)+,)*\s[\u4e00-\u9fa5]+:\s(\d)+/;
    let we = /((\d){3},)*(\d){3}/;
    while (true) {
        //input==='1'
        if (input === Input.MENU_ADD_STUDENT_INFO) {
            let mes = readlineSync.question(Message.ADD_STUDENT_INFO);
            while(true){
                if (re.test(mes)) {
                //写入字符串的函数
                students.push(Method.Readin(mes));
                break;
            }
            else {
                    mes = readlineSync.question(Message.INVALID_STUDENT_INFO);
                }
            }
        }

       //input==='2'
        if(input === Input.MENU_PRINT_SCORE_SHEET){
            let mes = readlineSync.question(Message.PRINT_SCORE_SHEET);
            while(true){
                if(we.test(mes)){
                    //写出表单的函数
                    Method.Writeout(mes,students);
                }
                else {mes = readlineSync.question(Message.INVALID_STUDENT_ID);}
            }
        }


        //input==='3'
        if(input === Input.MENU_EXIT){break;}
       //input !== '1' or '2' or '3'
     input = readlineSync.question(Message.MENU);
    }

};