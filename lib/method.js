module.exports={
    Readin(input){
        //"王大锤, 001, 汉, 201701, 数学: 100, 语文: 90, 英语: 80, 编程: 70"
        let arr = input.split(/,\s/);
        let student = {name:'', id:'', people:'', class:'',};
        [student.name,student.id,student.people,student.class] = arr;
        for(let i = 4;i<arr.length;i++){
            let a = arr[i].split(/:\s/);
            student[a[0]] = Number(a[1]);
        }
        console.log("学生"+student.name+"的成绩被添加");
        return student;
    },

    Writeout(id,students){
        let arr = id.split(/,\s/);
        let sums = [];
        for(let item of students){
            let sum = item["数学"]+item["语文"]+item["英语"]+item["编程"];
            item.sum = sum;
            sums.push(sum);
        }
        let s = "成绩单\n" +"姓名|数学|语文|英语|编程|平均分|总分 \n";
            s += "========================\n";
            for(let i of arr){
                for(let item of students){
                if(item.id === i){
                    s += item.name+item["数学"]+'|'+item["语文"]+'|'+item["英语"]+'|'+item["编程"]+'|';
                    s += item.sum/4 + '|' + item.sum + '\n'
                }
            }
        }
        s += "========================\n";
        if(sums.length === 0){ return;}
        s += "全班总分平均数：" + (sums.reduce((x,y)=>x+y))/sums.length + '\n';
        s += "全班总分中位数：" + compute_median(sums);
        console.log(s);
    }
};
function compute_median(a) {
    a.sort((x,y)=>x-y);
    if(a.length %2 === 0){
        return  ((a[a.length/2]+a[a.length/2-1])/2);
    }
    if(a.length %2 !== 0){
        return  ((a[parseInt(a.length/2)]+a[parseInt(a.length/2)])/2);
    }
}
/*成绩单
姓名|数学|语文|英语|编程|平均分|总分
========================
张三|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：xxx
全班总分中位数：xxx
*/
