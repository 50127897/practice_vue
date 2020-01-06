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
                <el-col :span="0.1" v-for="item in projects" style="padding: 8px">
                    <el-card class="box-card" style="width: 240px;height: 280px">
                        <div slot="header" class="clearfix">
                            <span>{{item.pname}}</span>
                        </div>
                        <div  class="text item">
                            课题ID:{{item.pid}}
                        </div>
                        <div  class="text item">
                            指导老师:{{item.teacherName}}
                        </div>
                        <div  class="text item">
                            需求人数:{{item.member}}
                        </div>
                        <div  class="text item">
                            入选人数:{{item.selected}}
                        </div>
                        <div >
                            <el-button type="primary" @click="showDetail(item.pid)">查看详情</el-button>
                            <el-dropdown style="padding: 3px">
                                <el-button type="success" >
                                    选择志愿<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item @click.native="first(item.pid)">第一志愿</el-dropdown-item>
                                    <el-dropdown-item @click.native="second(item.pid)">第二志愿</el-dropdown-item>
                                    <el-dropdown-item @click.native="third(item.pid)">第三志愿</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total,sizes, prev, pager, next,jumper"
                        :current-page="ProjectReq.current"
                        :page-sizes="[3,8, 10, 12, 14]"
                        :page-size="ProjectReq.size"
                        :total="page.total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                ></el-pagination>
            </div>
        </div>


        <div class="container">
            <el-row>
                <div class="text item">已选课题(可多次提交)</div>
            </el-row>


                <div style="width: 600px">
            <el-form ref="form"  label-width="80px">
                <el-form-item label="第一志愿">
                    <el-input v-model="List[0].pid" readonly></el-input>
                </el-form-item>
                <el-form-item label="第一志愿自我介绍">
                    <el-input type="textarea" v-model="List[0].choiceIntro" :rows="4"></el-input>
                </el-form-item>

                <el-form-item label="第二志愿">
                    <el-input v-model="List[1].pid" readonly></el-input>
                </el-form-item>
                <el-form-item label="第二志愿自我介绍">
                    <el-input type="textarea" v-model="List[1].choiceIntro" :rows="4"></el-input>
                </el-form-item>

                <el-form-item label="第三志愿">
                    <el-input v-model="List[2].pid" readonly></el-input>
                </el-form-item>
                <el-form-item label="第三志愿自我介绍">
                    <el-input type="textarea" v-model="List[2].choiceIntro" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitChoice()">提交志愿</el-button>
                    <el-button @click="resetChoice()">重置</el-button>
                    </el-form-item>
                    </el-form>
            </div>










        </div>
        <!-- 详情弹出框 -->
        <el-dialog title="项目详情" :visible.sync="detailVisible" width="50%">

            <div style="width: 400px">
            <el-form ref="form" :model="projectDemo" label-width="80px" style="padding: 30px;font-size:large">
                <div class="user-info-list" >
                    课题id&emsp;&nbsp;：&emsp;&emsp;<span>{{projectDemo.pid}}</span>
                </div>
                <div class="user-info-list" >
                    项目名称：&emsp;&emsp;<span>{{projectDemo.pname}}</span>
                </div>
                <div class="user-info-list" >
                    指导老师：&emsp;&emsp;<span>{{projectDemo.teacherName}}</span>
                </div>
                <div class="user-info-list" >
                    需求人数：&emsp;&emsp;<span>{{projectDemo.member}}</span>
                </div>
                <div  class="user-info-list">
                    入选人数：&emsp;&emsp;<span>{{projectDemo.selected}}</span>
                </div>
                <div class="user-info-list" >
                    第一志愿已选人数：&emsp;&emsp;<span>{{projectDemo.first}}</span>
                </div>
                <div class="user-info-list" >
                    第二志愿已选人数：&emsp;&emsp;<span>{{projectDemo.second}}</span>
                </div>
                <div class="user-info-list" >
                    第三志愿已选人数：&emsp;&emsp;<span>{{projectDemo.third}}</span>
                </div>

            </el-form>
            </div>
            <div v-html="projectDemo.content" style="padding: 20px"></div>
            <span slot="footer" class="dialog-footer">

                <el-dropdown style="padding: 3px">
                    <el-button type="success" >
                        选择志愿<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item @click.native="first(projectDemo.pid)" >第一志愿</el-dropdown-item>
                        <el-dropdown-item @click.native="second(projectDemo.pid)" >第二志愿</el-dropdown-item>
                        <el-dropdown-item @click.native="third(projectDemo.pid)">第三志愿</el-dropdown-item>
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
        props:{
        },
        data() {
            return {
                List:[{
                    cid:'',
                    mid:'',
                    pid:'',
                    choiceIntro:'',
                    type:1,
                },{
                    cid:'',
                    mid:'',
                    pid:'',
                    choiceIntro:'',
                    type:2,
                },{
                    cid:'',
                    mid:'',
                    pid:'',
                    choiceIntro:'',
                    type:3,
                }],
                ChoiceReq:{
                    mid:'',
                    first:'',
                    second:'',
                    third:'',
                    firstIntro:'',
                    secondIntro:'',
                    thirdIntro:'',
                    address:'',
                    phone:'',
                    email:'',
                },
                page:{
                    pages:1,
                    total:1,
                },
                ProjectReq:{
                    pid:'',
                    status:'4',
                    teacherid:'',
                    pName:'',
                    size: 12,
                    current: 1,
                },
                projectDemo:{
                    pid:'',
                    teacherid:'',
                    pname:'',
                    teacherName:'',
                    content:'',
                    member:'',
                    file:'',
                    status:'',
                    isFull:'',
                    selected:'',
                    first:'',
                    second:'',
                    third:'',
                },
                detailVisible: false,
                formLabelWidth:'80px',
                    projects :[],
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
            this.getChoice();
        },
        methods: {
            getChoice(){
                this.$fetch("/project/choice?mid="+this.$cookies.get("mid")).then(res=>{
                    res.forEach(choice=>{
                        if(choice.type == 1){
                            this.List[0].pid = choice.pid;
                            this.List[0].choiceIntro = choice.choiceIntro;
                            this.List[0].type = choice.type;
                            this.List[0].cid = choice.cid;
                            this.List[0].mid = choice.mid;
                        } else if(choice.type == 2){
                            this.List[1].pid = choice.pid;
                            this.List[1].choiceIntro = choice.choiceIntro;
                            this.List[1].type = choice.type;
                            this.List[1].cid = choice.cid;
                            this.List[1].mid = choice.mid;
                        } else if(choice.type == 3){
                            this.List[2].pid = choice.pid;
                            this.List[2].choiceIntro = choice.choiceIntro;
                            this.List[2].type = choice.type;
                            this.List[2].cid = choice.cid;
                            this.List[2].mid = choice.mid;
                        }
                    })

                })
            },
            //重置项目选择
            resetChoice(){
                this.List.forEach(choice=>{
                    choice.pid = '';
                    choice.choiceIntro = null;
                })
            },
            //选为第一志愿
            first(pid){
                this.List[0].pid = pid;
                this.$message.success("已将ID为"+pid+"的项目选为第一志愿")
                this.detailVisible=false
            },
            //选为第二志愿
            second(pid){
                this.List[1].pid = pid;
                this.$message.success("已将ID为"+pid+"的项目选为第二志愿")
                this.detailVisible=false
            },
            //选为第三志愿
            third(pid){
                this.List[2].pid = pid;
                this.$message.success("已将ID为"+pid+"的项目选为第三志愿")
                this.detailVisible=false
            },
            //提交志愿
            submitChoice(){
                if(this.List[0].pid == ''||this.List[1].pid == ''||this.List[2].pid == ''){
                    this.$message.error("请选中三个志愿后再提交")

                }else {
                    this.List[0].mid = this.$cookies.get("mid")
                    this.List[1].mid = this.$cookies.get("mid")
                    this.List[2].mid = this.$cookies.get("mid")
                    // 二次确认提交志愿
                    this.$confirm('确定要提交志愿吗？', '提示', {
                        type: 'success'
                    }).then(() => {
                        this.$post("/project/choice", this.List).then(
                            res => {
                                this.$message.success(res.message);
                                this.getChoice();
                            }
                        )


                    })
                        .catch(() => {
                        });
                }

            },
            //初始化分页条件
            initPage(){
                this.ProjectReq.current=1;
                this.page.pages=1;
                this.page.total=0;
            },
            //页面改变事件
            currentChange(val){
                this.ProjectReq.current = val;
                this.getData();
            },
            //页面大小改变事件
            sizeChange(val){
                this.ProjectReq.size = val;
                this.getData();
            },
            //查看项目详情
            showDetail(id){
                Object.keys(this.projects).forEach(key => {
                    if(this.projects[key].pid === id){
                        this.projectDemo = this.projects[key];
                    }
                });
                this.detailVisible=true
            },
            // 获取数据
            getData() {
                this.$fetch("/project",this.ProjectReq).then(res=>{
                    this.projects = res.records;
                    this.page.total = res.total;
                    this.page.pages = res.pages;
                    this.ProjectReq.size = res.size;

                })
            },
            // // 触发搜索按钮
            // handleSearch() {
            //     this.$set(this.query, 'pageIndex', 1);
            //     this.getData();
            // },
            // // 删除操作
            // handleDelete(index, row) {
            //     // 二次确认删除
            //     this.$confirm('确定要删除吗？', '提示', {
            //         type: 'warning'
            //     })
            //         .then(() => {
            //             this.$message.success('删除成功');
            //             this.tableData.splice(index, 1);
            //         })
            //         .catch(() => {});
            // },
            // // 多选操作
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            // delAllSelection() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.delList = this.delList.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error(`删除了${str}`);
            //     this.multipleSelection = [];
            // },
            // // 编辑操作
            // handleEdit(index, row) {
            //     this.idx = index;
            //     this.form = row;
            //     this.editVisible = true;
            // },
            // // 保存编辑
            // saveEdit() {
            //     this.editVisible = false;
            //     this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            //     this.$set(this.tableData, this.idx, this.form);
            // },
            // // 分页导航
            // handlePageChange(val) {
            //     this.$set(this.query, 'pageIndex', val);
            //     this.getData();
            // }
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
