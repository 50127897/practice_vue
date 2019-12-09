<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课题游览
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="4.1" v-for="item in project" style="padding: 8px">
                    <el-card class="box-card" >
                        <div slot="header" class="clearfix">
                            <span>{{item.title}}</span>
                        </div>
                        <div  class="text item">
                            课题ID:{{item.id}}
                        </div>
                        <div  class="text item">
                            指导老师:{{item.teacher}}
                        </div>
                        <div  class="text item">
                            需求人数:{{item.member}}
                        </div>
                        <div >
                            <el-button type="primary" @click="detailVisible=true">查看详情</el-button>
                            <el-dropdown style="padding: 3px">
                                <el-button type="success" >
                                    选择志愿<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item>第一志愿</el-dropdown-item>
                                    <el-dropdown-item>第二志愿</el-dropdown-item>
                                    <el-dropdown-item>第三志愿</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>


        <div class="container">
            <el-row>
                <div class="text item">已选课题(可多次提交)</div>
            </el-row>


                <div style="width: 600px">
            <el-form ref="form" :model="choosen" label-width="80px">
                <el-form-item label="第一志愿">
                    <el-input v-model="choosen.first"></el-input>
                </el-form-item>
                <el-form-item label="第一志愿自我介绍">
                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
                </el-form-item>

                <el-form-item label="第二志愿">
                    <el-input v-model="choosen.second"></el-input>
                </el-form-item>
                <el-form-item label="第二志愿自我介绍">
                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
                </el-form-item>

                <el-form-item label="第三志愿">
                    <el-input v-model="choosen.third"></el-input>
                </el-form-item>
                <el-form-item label="第三志愿自我介绍">
                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交志愿</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
            </div>










        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="项目详情" :visible.sync="detailVisible" width="50%">

            <div style="width: 400px">
            <el-form ref="form" :model="projectDemo" label-width="80px" style="padding: 30px;font-size:large">
                <div class="user-info-list" >
                    课题id：&emsp;&emsp;<span>{{projectDemo.id}}</span>
                </div>
                <div class="user-info-list" >
                    项目名称：&emsp;&emsp;<span>{{projectDemo.name}}</span>
                </div>
                <div class="user-info-list" >
                    指导老师：&emsp;&emsp;<span>{{projectDemo.teacher}}</span>
                </div>
                <div class="user-info-list" >
                    需求人数：&emsp;&emsp;<span>{{projectDemo.member}}</span>
                </div>
                <div class="user-info-list" >
                    第一志愿已选人数：&emsp;&emsp;<span>{{projectDemo.firstSelected}}</span>
                </div>
                <div class="user-info-list" >
                    第二志愿已选人数：&emsp;&emsp;<span>{{projectDemo.secondSelected}}</span>
                </div>
                <div class="user-info-list" >
                    第三志愿已选人数：&emsp;&emsp;<span>{{projectDemo.thirdSelected}}</span>
                </div>

            </el-form>
            </div>

            项目详情：<div> 各项目组制定项目计划，有步骤的完成项目内容并提交有关成果。项目实施过程中要求：</div>
            <div>（一）每位学生每周必须参加一次工程实践课程小组学习，由指导老师到场指导。填写《教师指导记录》</div>
            <div>（二）每位学生每周必须参加两次工程实践课程集体学习（讲座形式，由各指导老师和企业导师主讲）。填写《讲座考勤表》</div>
            <div>（三）每位学生按照计划完成每周工作。填写《学生工作日志》</div>
            <div>（四）每组有步骤的完成项目内容。需提交应用型成果及相应文档，如《规划说明书》、《软件需求分析说明书》、《软件设计说明书》、《软件测试说明书》、《推广实施说明书》、《资金预算表》、《资金执行计划表》、《用户手册》等。</div>
            <div>（五）每位学生需撰写项目工程实践报告。实践报告要求书写规范、文字通顺、图表清晰，不得少于8000字，要求文字打印，统一格式，统一封面，装订成册。撰写《项目工程实践报告》</div>

            <span slot="footer" class="dialog-footer">

                <el-dropdown style="padding: 3px">
                    <el-button type="success" >
                        选择志愿<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item>第一志愿</el-dropdown-item>
                        <el-dropdown-item>第二志愿</el-dropdown-item>
                        <el-dropdown-item>第三志愿</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button @click="detailVisible = false">返 回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                projectDemo:{
                    id:'207',
                    name:'综合实践管理系统',
                    teacher:'高教授',
                    member:'5',
                    firstSelected:'7',
                    secondSelected:'8',
                    thirdSelected:'9',
                },
                detailVisible: false,
                formLabelWidth:'80px',
                choosen:{
                    first: '207',
                    second: '208',
                    third: '209',
                },
                    project :[{
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
                    },
                    {
                        title:'综合实践管理系统',
                        id:'207',
                        teacher: '李教授',
                        member:'5',
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
