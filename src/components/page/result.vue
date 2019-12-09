<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课题结果
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row >
                <h1 align="center">综合实践管理系统</h1>
            </el-row>
            <el-row>
                <el-col :span="4" style="padding: 8px">
                    <el-card class="box-card" >
                    <div slot="header" >
                        <span>导师</span>
                    </div>
                    <div  class="text item">
                        名称:{{teacher.name}}
                    </div>
                    <div  class="text item">
                        邮箱:{{teacher.email}}
                    </div>
                    <div  class="text item">
                        联系地址：{{teacher.address}}
                    </div>
                    <div  class="text item">
                        联系电话：{{teacher.telephone}}
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="20"style="padding: 8px">

                    <el-card class="box-card" style="width:100%">
                        <el-row>
                            <div class="text item"> 项目详情：</div>
                        </el-row>
                        <div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>
                        <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>
                        <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>
                        <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>
                        <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>
                        <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>
                        <div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>
                        <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>
                        <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>
                        <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>
                        <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>
                        <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>

                        <div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>
                        <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>
                        <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>
                        <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>
                        <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>
                        <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>

                        <div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>
                        <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>
                        <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>
                        <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>
                        <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>
                        <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>



                        <span><el-link href="https://element.eleme.io" target="_blank" style="font-size: large" type="primary">点击下载任务书</el-link></span>
                    </el-card>
<!--                    <el-col :span="6" v-for="student in students" style="padding: 8px">-->
<!--                        <el-card class="box-card" >-->
<!--                            <div slot="header" class="clearfix">-->
<!--                                <span>学生</span>-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                名称:{{student.name}}-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                学院:{{student.college}}-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                年级:{{student.grade}}-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                联系地址:{{student.address}}-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                联系电话:{{student.telephone}}-->
<!--                            </div>-->
<!--                            <div  class="text item">-->
<!--                                电子邮箱:{{student.email}}-->
<!--                            </div>-->




<!--                        </el-card>-->
<!--                    </el-col>-->
                </el-col>
            </el-row>

        </div>


<!--        <div class="container">-->
<!--&lt;!&ndash;            <h1 align="center">综合实践管理系统</h1>&ndash;&gt;-->
<!--            <el-row>-->
<!--                <div class="text item"> 项目详情：</div>-->
<!--            </el-row>-->
<!--                <div>项目名称:综合实践管理系统</div>-->
<!--                <div>老师名称:{{teacher.name}}</div>-->
<!--                <div>邮箱:{{teacher.email}}</div>-->
<!--                <div>联系地址：{{teacher.address}}</div>-->
<!--                <div>联系电话：{{teacher.telephone}}</div>-->














<!--            <div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>-->
<!--            <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>-->
<!--            <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>-->
<!--            <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>-->
<!--            <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>-->
<!--            <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>-->


<!--            <span><el-link href="https://element.eleme.io" target="_blank" style="font-size: large" type="primary">点击下载任务书</el-link></span>-->
<!--            <div class="user-info-list" >-->

<!--                </div>-->












<!--        </div>-->

    </div>
</template>

<script>
    import { fetchData } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                teacher:{
                    name:'胡老师',
                    address:'B3-xxx',
                    email:'xxxxx@163.com',
                    telephone:'1234567',
                },
                detailVisible: false,
                formLabelWidth:'80px',
                choosen:{
                    first: '207',
                    second: '208',
                    third: '209',
                },
                students :[{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },{
                    name:'小明',
                    college:'电子信息工程学院',
                    major: '计算机科学与技术',
                    grade:'4',
                    class:'6',
                    telephone:'1234567',
                    email:'1234567@qq.com',
                    address:'d8-666',
                },
                ],
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            showDetail(id){

            },
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {
                    this.tableData = res.list;
                    this.pageTotal = res.pageTotal || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 240px;
    }



    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
