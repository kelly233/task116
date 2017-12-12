let sinon = require("sinon");
let main = require("../lib/main");
let Input = require("../lib/input");
let Message = require("../lib/message");
let readlineSync = require("cli-interact");

describe('main()', () => {
    beforeEach(() => {
        sinon.stub(readlineSync, 'question');
    });

    afterEach(() => {
        readlineSync.question.restore();
    });

    it('first write 3', () => {
        readlineSync.question.returns(Input.MENU_EXIT);
        main();
        expect(readlineSync.question.args.join()).toBe(
`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
    });
    it('first write 1 and write the right information',()=>{
        sinon.spy(console, 'log');
        readlineSync.question.onFirstCall().returns(Input.MENU_ADD_STUDENT_INFO);
        readlineSync.question.onSecondCall().returns("王大锤, 001, 汉, 201701, 数学: 100, 语文: 90, 英语: 80, 编程: 70");
        readlineSync.question.onThirdCall().returns(Input.MENU_EXIT);
        main();
        expect(console.log.args.join()).toBe("学生王大锤的成绩被添加");
    });

    it('should ask to retry when add student info failed', () => {
        let invalidStudentInfo = "3";
        readlineSync.question
            .onCall(0).returns(Input.MENU_ADD_STUDENT_INFO)
            .onCall(1).returns(invalidStudentInfo)
            .onCall(2).returns("张小花, 002, 汉, 201701, 数学: 80, 语文: 100, 英语: 80, 编程: 90")
            .onCall(3).returns(Input.MENU_EXIT);
       main();
        expect(readlineSync.question.thirdCall.args.join()).toBe('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
    });

    it('should ask to retry when input invalid menu', () => {
        let invalidMenuItem = 4;
        readlineSync.question
            .onCall(0).returns(invalidMenuItem)
            .onCall(1).returns(Input.MENU_EXIT);
        main();
        expect(readlineSync.question.secondCall.args.join()).toBe(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
    });
});
