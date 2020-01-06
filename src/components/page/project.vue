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
            <div style="padding: 8px">
                <el-row>
                    是否满人：
                    <el-select  v-model="ProjectReq.isFull" placeholder="请选择" style="padding: 10px">
                        <el-option  label="已满人" value="1" ></el-option>
                        <el-option  label="未满人" value="0"></el-option>
                    </el-select>

                    导师：<el-input v-model="ProjectReq.teacherNameLike" placeholder="导师名称" class="handle-input mr10"></el-input>
                    项目名称：<el-input v-model="ProjectReq.pName" placeholder="项目名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchProject">搜索</el-button>
                </el-row>
            </div>
            <div style="height: 15px">
            </div>
            <el-row >
                <el-col :span="0.1" v-for="item in projects" style="padding: 8px">
                    <el-card class="box-card" style="width: 280px;height: 270px">

                        <div slot="header" class="clearfix">
                            <span>{{item.pname}}</span>&nbsp;
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
                            <el-button type="primary" @click="showDetail(item.pid)" >详情</el-button>
                            <el-button type="success" @click="showStu(item)">查看学生</el-button>
                            <el-button type="success" @click="showProjectDoc(item.pid)">文档管理</el-button>
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


        <!--        <div class="container">-->
        <!--            <el-row>-->
        <!--                <div class="text item">已选课题</div>-->
        <!--            </el-row>-->


        <!--                <div style="width: 600px">-->
        <!--            <el-form ref="form" :model="choosen" label-width="80px">-->
        <!--                <el-form-item label="第一志愿">-->
        <!--                    <el-input v-model="choosen.first"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="第一志愿自我介绍">-->
        <!--                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>-->
        <!--                </el-form-item>-->

        <!--                <el-form-item label="第二志愿">-->
        <!--                    <el-input v-model="choosen.second"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="第二志愿自我介绍">-->
        <!--                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>-->
        <!--                </el-form-item>-->

        <!--                <el-form-item label="第三志愿">-->
        <!--                    <el-input v-model="choosen.third"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="第三志愿自我介绍">-->
        <!--                    <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>-->
        <!--                </el-form-item>-->



        <!--                <el-form-item>-->
        <!--                    <el-button type="primary" @click="onSubmit">提交志愿</el-button>-->
        <!--                    <el-button>重置</el-button>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            </div>-->



        <!--        </div>-->





        <!-- 编辑弹出框 -->
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

                </el-form>
            </div>
            <div v-html="projectDemo.content" style="padding: 20px"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">返 回</el-button>
            </span>
        </el-dialog>


        <!-- 查看学生弹出框 -->
        <el-dialog title="已选择学生" :visible.sync="seeVisible" width="90%">

            <el-row >
                <h1 align="center">综合实践管理系统</h1>
            </el-row>
            <el-row>
                <h2 align="center" v-if="students.length <1">暂无学生入选 </h2>
                <el-col :span="4.6" v-for="student in students" style="padding: 8px">
                    <el-card class="box-card" style="width: 290px;height: 400px">
                        <div slot="header" >
                            <span>{{student.name}}</span>
                        </div>
                        <div  class="text item">
                            年级:{{student.grade}}
                        </div>
                        <div  class="text item">
                            学院:{{student.college}}
                        </div>
                        <div  class="text item">
                            专业:{{student.major}}
                        </div>
                        <div  class="text item">
                            班级:{{student.classes}}
                        </div>
                        <div  class="text item">
                            联系地址:{{student.address}}<span v-if="student.address == null"> 未填写</span>
                        </div>
                        <div  class="text item">
                            联系电话:{{student.telephone}}<span v-if="student.telephone == null"> 未填写</span>
                        </div>
                        <div  class="text item">
                            电子邮箱:{{student.email}}<span v-if="student.email == null"> 未填写</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </el-dialog>


        <!--确认学生-->
        <el-dialog title="文档管理" :visible.sync="docVisible" width="60%" align="center">
            <div style="width: 900px" >
                <el-table
                        :data="fileList"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                >
                    <el-table-column prop="pdId" label="ID" width="55px" align="center"></el-table-column>
                    <el-table-column prop="pdName" label="文档名"></el-table-column>
                    <el-table-column prop="type" label="文档类型"></el-table-column>
                    <el-table-column prop="studentName" label="上传者"></el-table-column>
                    <el-table-column prop="createTime" label="上传时间"></el-table-column>
                    <el-table-column label="操作" width="180px" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    @click="getFile(scope.row.studentId,scope.row.type,scope.row.pdName)"
                                    type="text"
                                    icon="el-icon-document"
                            >下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'basetable',
        data() {

            return {
                getFileReq:{
                  type:'',
                  studentId:'',
                },
                docVisible:false,
                fileList: [],
                //文档请求参数
                fileListReq:{
                    pid:'',
                },
                seeVisible:false,
                students:[],
                showStuReq:{
                    pId:'',
                },
                page:{
                    pages:1,
                    total:1,
                },
                editorOption:{
                    placeholder: '驳回原因'
                },
                ProjectReq:{
                    pid:'',
                    status:'4',
                    teacherid:'',
                    rejectContent:'',
                    pName:'',
                    size: 10,
                    current: 1,
                    isFull:"0",
                    teacherNameLike:'',
                },
                ProjectRequest:{
                    pid: '',
                    status:'',
                    teacherid:'',
                    rejectContent:'',
                    pName:'',
                },
                radio1:'未审核',
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
                rejectVisible: false,
                detailVisible: false,
                formLabelWidth:'80px',

                projects:[
                    {
                        pid:'123',
                        teacherid:'123',
                        pname:'123',
                        teacherName:'123',
                        content:'123',
                        member:'123',
                        file:'123',
                        status:'1',
                        isFull:'1',
                        selected:'123',
                        first:'123',
                        second:'123',
                        third:'123',
                    }
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
        components: {
            quillEditor
        },
        created() {
            this.getData();
        },
        watch: {
            'ProjectReq.isFull': { // 监视pagination属性的变化
                // deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    this.initPage();
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getData();
                }
            },

        },
        methods: {
            //获取文档
            getFile(studentId,type,pdName){
                if(type == "项目分工说明书"){
                    type = 1
                }else if(type == "项目规划说明书"){
                    type = 2
                }else if(type == "需求分析说明书"){
                    type = 3
                }else if(type == "概要设计说明书"){
                    type = 4
                }else if(type == "详细设计说明书"){
                    type = 5
                }else if(type == "系统测试报告"){
                    type = 6
                }else if(type == "推广实施说明书"){
                    type = 7
                }else if(type == "资金预算表"){
                    type = 8
                }else if(type == "资金执行计划表"){
                    type = 9
                }else if(type == "用户手册"){
                    type = 10
                }else if(type == "工作周志"){
                    type = 11
                }else if(type == "项目工程实践报告"){
                    type = 12
                }else if(type == "项目工程实践成果登记表"){
                    type = 13
                }else if(type == "讲座听后感"){
                    type = 14
                }
                this.getFileReq.type = type
                this.getFileReq.studentId = studentId
                this.$getFile("/file",this.getFileReq).then(res=>{
                    let url = window.URL.createObjectURL(res.data); //表示一个指定的file对象或Blob对象
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    // let filename= res.headers["content-disposition"].split(";")[1].split("filename=")[1];  //filename名称截取
                    a.href = url;
                    a.download = pdName; //命名下载名称
                    a.click(); //点击触发下载
                    window.URL.revokeObjectURL(url);  //下载完成进行释放
                })
            },
            //查看文档
            showProjectDoc(pid){
                this.fileListReq.pid = pid;
                this.$fetch("/file/lists",this.fileListReq).then(res =>{
                    this.fileList = res;
                    this.fileList.forEach(doc=>{
                        if(doc.type == 1){
                            doc.type = "项目分工说明书";
                        }else if(doc.type == 2){
                            doc.type = "项目规划说明书";
                        }else if(doc.type == 3){
                            doc.type = "需求分析说明书";
                        }else if(doc.type == 4){
                            doc.type = "概要设计说明书";
                        }else if(doc.type == 5){
                            doc.type = "详细设计说明书";
                        }else if(doc.type == 6){
                            doc.type = "系统测试报告";
                        }else if(doc.type == 7){
                            doc.type = "推广实施说明书";
                        }else if(doc.type == 8){
                            doc.type = "资金预算表";
                        }else if(doc.type == 9){
                            doc.type = "资金执行计划表";
                        }else if(doc.type == 10){
                            doc.type = "用户手册";
                        }else if(doc.type == 11){
                            doc.type = "工作周志";
                        }else if(doc.type == 12){
                            doc.type = "项目工程实践报告";
                        }else if(doc.type == 13){
                            doc.type = "项目工程实践成果登记表";
                        }else if(doc.type == 14){
                            doc.type = "讲座听后感";
                        }
                    })
                    this.docVisible = true
                })
            },
            //查看已选学生信息
            showStu(project){
                this.showStuReq.pId = project.pid;
                this.$fetch("/project/students",this.showStuReq).then(res=>{
                    this.students = res;
                    this.seeVisible=true
                })

            },
            //查找项目 模糊查询
            searchProject(){
                this.initPage();
                // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                this.getData();
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
            //审核通过
            passProject(item){
                this.ProjectRequest.pid = item.pid;
                this.ProjectRequest.status = 4;
                this.$patch("/project",this.ProjectRequest).then(res=>{
                    this.$message.success("项目审核通过")
                    Object.keys(this.projects).forEach(key => {
                        if(this.projects[key].pid === item.pid){
                            this.projects[key].status = 4;
                        }
                    });
                })
            },
            //弹窗驳回窗口
            showReject(item){
                Object.keys(this.projects).forEach(key => {
                    if(this.projects[key].pid === item.pid){
                        this.projectDemo = this.projects[key];
                    }
                });
                this.rejectVisible=true
            },
            //驳回项目
            rejectProject(pid){
                this.ProjectRequest.pid = pid;
                this.ProjectRequest.status = 3 ;
                this.$patch("/project",this.ProjectRequest).then(res=>{
                    this.$message.success("已驳回项目");
                    Object.keys(this.projects).forEach(key => {
                        if(this.projects[key].pid === pid){
                            this.projects[key].status = 3;
                        }
                    });
                    this.rejectVisible = false;
                })
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
            //获取数据
            getData(){
                this.$fetch("/project",this.ProjectReq).then(res=>{
                    this.projects = res.records;
                    this.page.total = res.total;
                    this.page.pages = res.pages;
                    this.ProjectReq.size = res.size;

                })
            },
            // // 获取 easy-mock 的模拟数据
            // getData() {
            //     fetchData(this.query).then(res => {
            //         this.tableData = res.list;
            //         this.pageTotal = res.pageTotal || 50;
            //     });
            // },
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
