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
                <h1 align="center">{{ResultResp.pname}}</h1>
            </el-row>
            <el-row>
                <el-col :span="0.1" style="padding: 8px">
                    <el-card class="box-card" style="width: 250px;height: 250px">
                    <div slot="header" >
                        <span>导师</span>
                    </div>
                    <div  class="text item">
                        名称:{{ResultResp.name}}
                    </div>
                    <div  class="text item">
                        邮箱:{{ResultResp.email}}
                    </div>
                    <div  class="text item">
                        联系地址：{{ResultResp.address}}
                    </div>
                    <div  class="text item">
                        联系电话：{{ResultResp.phone}}
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="0.1"style="padding: 8px" >

                    <el-card class="box-card" style="width: 1200px" >
                        <el-row>
                            <div class="text item"> 项目详情：</div>
                        </el-row>
                        <div v-html="ResultResp.content" style="padding: 20px"></div>

                        <el-button
                                @click="getFile(ResultResp.teacherId)"
                                type="text"
                                icon="el-icon-document"
                        >点击下载任务书</el-button>
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
        data() {
            return {
                getFileReq:{
                    studentId:'',
                    type:'15',
                },
                resultReq:{
                    mid:'',
                },
                ResultResp:{
                    pname:'',
                    content:'',
                    file:'',
                    email:'',
                    name:'',
                    address:'',
                    phone:'',
                },
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getFile(mid){
                this.getFileReq.studentId = mid;
                this.$getFile("/file",this.getFileReq).then(res=>{
                    let url = window.URL.createObjectURL(res.data); //表示一个指定的file对象或Blob对象
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    let filename= res.headers["content-disposition"].split(";")[1].split("filename=")[1];  //filename名称截取
                    a.href = url;
                    var strings = filename.split(".");
                    a.download = "项目任务书."+strings[1]; //命名下载名称
                    a.click(); //点击触发下载
                    window.URL.revokeObjectURL(url);  //下载完成进行释放
                })
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                this.resultReq.mid = this.$cookies.get("mid")
                this.$fetch("project/result",this.resultReq).then(res=>{
                    this.ResultResp = res;
                })
            },
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
