<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 查看课程
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row style="padding: 15px">
                <el-radio-group v-model="stuReq.selected">
                    <el-radio-button  label="">全部</el-radio-button>
                    <el-radio-button label="1">已被选中</el-radio-button>
                    <el-radio-button label="0">未被选中</el-radio-button>
                </el-radio-group>
<!--                年级：-->
<!--                <el-select v-model="stuReq.grade" placeholder="请选择" style="padding: 10px">-->
<!--                    <el-option  label="1" value="1" ></el-option>-->
<!--                    <el-option  label="2" value="2"></el-option>-->
<!--                    <el-option  label="3" value="3"></el-option>-->
<!--                    <el-option  label="4" value="4"></el-option>-->
<!--                </el-select>-->
<!--                班级：-->
<!--                <el-select v-model="stuReq.classes" placeholder="请选择" style="padding: 10px">-->
<!--                    <el-option  label="1" value="1" ></el-option>-->
<!--                    <el-option  label="2" value="2"></el-option>-->
<!--                    <el-option  label="3" value="3"></el-option>-->
<!--                    <el-option  label="4" value="4"></el-option>-->
<!--                </el-select>-->
            </el-row>
            <el-row style="padding: 15px">
                姓名：<el-input v-model="stuReq.name" placeholder="学生名称" class="handle-input mr10"></el-input>
                专业：<el-input v-model="stuReq.major" placeholder="专业名称" class="handle-input mr10"></el-input>
                学院：<el-input v-model="stuReq.college" placeholder="学院名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchStu">搜索</el-button>
            </el-row>
            <el-row>
                <el-col :span="0.1" v-for="item in students" style="padding: 8px">
                    <el-card class="box-card" style="height: 280px;width: 240px"  >
                        <div slot="header" class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                        <div  class="text item">
                            学院:{{item.college}}
                        </div>
                        <div  class="text item">
                            年级:{{item.grade}}
                        </div>
                        <div  class="text item">
                            专业:{{item.major}}
                        </div>
                        <div  class="text item">
                            班级:{{item.classes}}
                        </div>

                        <div  class="text item" v-if="item.selected == 0">
                            未选中

                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <el-button type="primary" @click="showProject(item)" v-if="item.selected == 0">调剂</el-button>
                        </div>
                        <div  class="text item" v-else-if="item.selected == 1">
                            项目名称：{{item.projectName}}
                        </div>


                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total,sizes, prev, pager, next,jumper"
                        :current-page="stuReq.current"
                        :page-sizes="[3,8, 10, 12, 14]"
                        :page-size="stuReq.size"
                        :total="page.total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                ></el-pagination>
            </div>
        </div>



        <!-- 编辑学生调剂框 -->
        <el-dialog title="学生调剂" :visible.sync="addVisible" width="80%">

            <div class="container">
                <el-row style="padding: 15px">
                    项目名称：<el-input v-model="ProjectReq.pName" placeholder="项目名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchProject">搜索</el-button>
                </el-row>
                <el-row>
                    <el-col :span="0.1" v-for="item in projects" style="padding: 8px">
                        <el-card class="box-card" style="width: 250px;height: 250px">
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
                            <div >
                                <el-button type="primary" @click="showDetail(item)">查看详情</el-button>
                                <el-button type="success" @click="chooseProject(item.pid)">调剂</el-button>
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
                            :total="pageProject.total"
                            @current-change="currentChangeProject"
                            @size-change="sizeChangeProject"
                    ></el-pagination>
                </div>
            </div>

        </el-dialog>


        <!-- 查看详情弹出框 -->
        <el-dialog title="项目详情" :visible.sync="detailVisible" width="50%">

            <div style="width: 400px">
                <el-form ref="form" :model="projectDemo" label-width="80px" style="padding: 30px;font-size:large">
                    <div class="user-info-list" >
                        课题id：&emsp;&emsp;<span>{{projectDemo.pid}}</span>
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

            <div v-html="projectDemo.content"></div>
            <span slot="footer" class="dialog-footer">
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
                list:[],
                choiceDemo:{
                    cid:'',
                    pid:'',
                    mid:'',
                    type:'',
                },
                projects:[],
                //查看项目参数
                ProjectReq:{
                    status:'4',
                    pName:'',
                    size: 10,
                    current: 1,
                    isFull:0,
                },
                //项目分页参数
                pageProject:{
                    pages:1,
                    total:1,
                },
                //学生分页参数
                page:{
                    pages:1,
                    total:1,
                },
                //查看学生参数
                stuReq:{
                    selected:'',
                    college:'',
                    major:'',
                    grade:'',
                    classes:'',
                    current:1,
                    size:12,
                    name:'',
                },
                detailVisible: false,
                students:[],
                stuDetail:{
                    name:'',
                    college:'',
                    major: '',
                    grade:'',
                    class:'',
                    telephone:'',
                    email:'',
                    address:'',
                },
                showStudentDetail:false,
                isComplete:'',
                projectDemo:{

                },
                addVisible: false,
                formLabelWidth:'80px',

            };
        },
        created() {
            this.getData();
        },
        watch: {
            'stuReq.selected': { // 监视pagination属性的变化
                // deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    this.initPage();
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getData();
                }
            },

        },
        methods: {
            chooseProject(pid){
                this.choiceDemo.pid=pid;
                this.list.push(this.choiceDemo)
                this.$confirm('确定要调剂到该项目吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$post("project/submitChoice",this.list).then(res=>{
                        this.$message.success("调剂成功")
                        this.addVisible=false
                        this.getData();
                    }).catch(()=>{
                        this.$message.error("调剂失败")
                        }
                    )
                }).catch(() => {
                    });

            },
            //页面改变事件
            currentChangeProject(val){
                this.ProjectReq.current = val;
                this.getDataProject();
            },
            //页面大小改变事件
            sizeChangeProject(val){
                this.ProjectReq.size = val;
                this.getDataProject();
            },
            getDataProject(){
                this.$fetch("project",this.ProjectReq).then(res=>{
                    this.projects = res.records;
                    this.pageProject.pages = res.pages;
                    this.pageProject.total = res.total;
                })
            },
            showProject(item){
                this.choiceDemo.mid = item.mid
                this.getDataProject();
                this.addVisible=true
            },
            searchProject(){
                this.getDataProject();
            },
            //查找项目 模糊查询
            searchStu(){
                this.initPage();
                // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                this.getData();
            },
            //页面改变事件
            currentChange(val){
                this.stuReq.current = val;
                this.getData();
            },
            //页面大小改变事件
            sizeChange(val){
                this.stuReq.size = val;
                this.getData();
            },
            //初始化分页条件
            initPage(){
                this.stuReq.current=1;
                this.page.pages=1;
                this.page.total=0;
            },
            showDetail(item){
                this.projectDemo = item;
                this.detailVisible=true;
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$fetch("member",this.stuReq).then(res=>{
                    this.students = res.records;
                    this.page.total = res.total;
                    this.page.pages = res.pages;
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
