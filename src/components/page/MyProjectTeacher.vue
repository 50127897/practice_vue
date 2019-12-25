<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的课题
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
<!--            <div class="handle-box"style="padding: 10px">-->
                <el-row>
                    <el-button
                            type="primary"
                            icon="el-icon-thumb"
                            class="handle-del mr10"
                            @click="showCreateProject"

                    >创建课题</el-button>
                </el-row>


<!--            </div>-->
            <el-row :gutter="18">
                <el-col :span="3.9" v-for="item in projects"  style="padding: 8px">
                    <el-card class="box-card" style="width: 280px;height: 200px" shadow="hover">
<!--                        <div slot="header" class="clearfix" >-->
                        <div slot="header" class="clearfix" >
                            {{item.pname}}

                        </div>
                        <div  class="text item">
                            需求人数:{{item.member}}
                        </div>
                        <div  class="text item">
                            已选人数:{{item.selected}}
                        </div>

                        <div >
                            <el-button type="primary" @click="showProjectDetail(item.pid)" >详情</el-button>
                            <el-button type="success" @click="chooseVisible=true" v-if="item.status==4">选择学生</el-button>
                            <el-button type="success" @click="seeVisible=true" v-if="item.status==4">查看学生</el-button>
                            <el-button type="info" @click="" v-if="item.status==3">审核不通过</el-button>
                            <el-button type="danger" @click="deleteProject(item.pid)" v-if="item.status==3">删除</el-button>
                            <el-button type="info" @click="" v-if="item.status==2" >审核中</el-button>
                            <el-button type="warning" @click="cancel(item.pid)" v-if="item.status==2" >撤回</el-button>
                            <el-button type="success" @click="publish(item.pid)" v-if="item.status==1">发布</el-button>
                            <el-button type="danger" @click="deleteProject(item)" v-if="item.status==1">删除</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>





        <!-- 选择学生弹出框 -->
        <el-dialog title="选择学生" :visible.sync="chooseVisible" width="90%">

            <el-row >
                <h1 align="center">综合实践管理系统</h1>
            </el-row>


            <div align="center" style="padding: 10px">
                <el-input v-model="query.name" placeholder="学生名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
            </div>

            <el-row>
                <el-col :span="4.6" v-for="student in students" style="padding: 8px" >
                    <el-card class="box-card" style="width: 290px;height: 380px">

                        <div  class="text item">
                            姓名:{{student.name}}
                        </div>
                        <div  class="text item">
                            联系地址:{{student.address}}
                        </div>
                        <div  class="text item">
                            联系电话:{{student.telephone}}
                        </div>
                        <div  class="text item">
                            电子邮箱:{{student.email}}
                        </div>
                        <div  class="text item" v-if="student.source == 1">
                            来源:第一志愿
                        </div>
                        <div  class="text item" v-else-if="student.source == 2">
                            来源:第一志愿
                        </div>
                        <div  class="text item" v-else-if="student.source == 3">
                            来源:第一志愿
                        </div>
                        <div  class="text item">
                            自我简介:{{student.introduction}}
                        </div>
                        <div  class="text item" align="center" style="align:center">
                            <div  class="text item" style="position: absolute;bottom: 0;">
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                <el-row  class="el-dialog--center" >
                                    <el-button type="primary" @click="chooseStudent(student.id)" v-if="student.choose==0">选择</el-button>
                                    <el-button type="success" @click="" v-if="student.choose==1">已选择</el-button>
                                    <el-button type="danger" @click="cancelStudent(student.id)"  v-if="student.choose==2">取消</el-button>
                                </el-row>
                            </div>
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
            <div align="center">
                <el-row>
                    <el-button type="primary" @click="showCheck">确认选择</el-button>
                    <el-button @click="idsReset">重置</el-button>
                </el-row>
            </div>
        </el-dialog>




        <!-- 查看学生弹出框 -->
        <el-dialog title="已选择学生" :visible.sync="seeVisible" width="90%">

            <el-row >
                <h1 align="center">综合实践管理系统</h1>
            </el-row>
            <el-row>
                <el-col :span="4.6" v-for="student in students" style="padding: 8px">
                    <el-card class="box-card" style="width: 290px;height: 400px">
                        <div slot="header" >
                            <span>{{student.name}}</span>
                        </div>
                        <div  class="text item">
                            联系地址:{{student.address}}
                        </div>
                        <div  class="text item">
                            联系电话:{{student.telephone}}
                        </div>
                        <div  class="text item">
                            电子邮箱:{{student.email}}
                        </div>
                        <div  class="text item">
                            自我简介:{{student.introduction}}
                        </div>


                    </el-card>
                </el-col>
            </el-row>

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



        <!-- 创建课题弹出框 -->
        <el-dialog title="创建课题" :visible.sync="createVisible" width="70%">

            <el-form>
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                    <el-col :span="6">
                        <el-input v-model="project.pname"></el-input>
                    </el-col>

                </el-form-item>
                <el-form-item label="指导老师" :label-width="formLabelWidth">
                    <el-col :span="6">
                        <el-input v-model="project.teacherName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="需求人数" :label-width="formLabelWidth">

                        <el-select v-model="project.member" placeholder="请选择" style="width: 25%">
                            <el-option
                                    v-for="item in requires"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="要求简要" :label-width="formLabelWidth">
                    <quill-editor ref="myTextEditor" v-model="project.content" :options="editorOption"></quill-editor>
                </el-form-item>
                <el-form-item label="详细报告" :label-width="formLabelWidth">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传pdf,zip,doc或docx文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createProject">保存</el-button>
                <el-button type="success" @click="dialogFormVisible = false">保存并提交</el-button>
                <el-button type="danger" @click="reset">重置</el-button>
            </div>
        </el-dialog>






        <!--确认学生-->
        <el-dialog title="确认学生" :visible.sync="checkVisible" width="30%">

                <div style="width: 400px">
                    <div class="user-info-list" style="padding: 10px">
                        当前选择的学生：&emsp;
                    </div>
                    <div class="user-info-list" style="padding: 10px">
                        <span v-for="student in students">
                            <div>
                             <span v-for="id in ids " v-if="id == student.id">{{student.name}}</span>
                            </div>
                        </span>
                    </div>


                </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">提交</el-button>
                <el-button @click="checkVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        props: {
            group: {
                type: Object
            }
        },
        data() {
            return {
                ProjectReq:{
                    pId:'',
                    status:'',
                    teacherId:'',
                    rejectContent:'',
                    pName:'',
                    },
                fileList: [{name: 'food.doc', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                editorOption: {
                    placeholder: '请输入通知内容'
                },
                projectDemo:{
                    pid:'',
                    teacherId:'',
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
                project:{
                    pid:'',
                    teacherId:'',
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
                requires:[{
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                } ,{
                    value: '6',
                    label: '6'
                },
                {
                    value: '7',
                    label: '7'
                },
                ],
                ids:[

                ],
                seeVisible: false,
                checkVisible: false,
                chooseVisible:false,
                students:[{
                        id:2,
                        name: '张三',
                        introduction: '我爱学习，天天学习，学习使我快乐',
                        address:'d8-666',
                        telephone:'222111222',
                        email:'111222333',
                        source:'1',
                        choose:'0',
                    },
                    {
                        id:3,
                        name: '张四',
                        introduction: '我爱学习，天天学习，学习使我快乐',
                        address:'d8-666',
                        telephone:'222111222',
                        email:'111222333',
                        source:'2',
                        choose:'1',
                    },
                    {
                        id:4,
                        name: '张五',
                        introduction: '我爱学习，天天学习，学习使我快乐',
                        address:'d8-666',
                        telephone:'222111222',
                        email:'111222333',
                        source:'3',
                        choose:'0',
                    },
                    {
                        id:5,
                        name: '张六',
                        introduction: '我爱学习，天天学习，学习使我快乐',
                        address:'d8-666',
                        telephone:'222111222',
                        email:'111222333',
                        source:'2',
                        choose:'0',
                    },{
                    id:6,
                        name: '张七',
                        introduction: '我爱学习，天天学习，学习使我快乐',
                        address:'d8-666',
                        telephone:'222111222',
                        email:'111222333',
                        source:'1',
                        choose:'0',
                    },


                ],
                detailVisible: false,

                formLabelWidth:'100px',
                choosen:{
                    first: '207',
                    second: '208',
                    third: '209',
                },
                    projects :[{
                        pid:'123',
                        teacherId:'123',
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
                createVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.loadData();
        },
        components: {
            quillEditor
        },

        methods: {
            deleteProject(item){
                this.$deleteRequest("/project/"+item.pid).then(res=>{

                    if(res.body.resultCode=='0000'){
                        this.$message.success("删除成功");
                        Object.keys(this.projects).forEach(key => {
                            if(this.projects[key].pid === item.pid){
                                this.projects.splice(this.projects.indexOf(item),1);
                            }
                        });

                    }else{
                        this.$message.error("删除失败");
                    }
                }).catch(
                    reason => {
                        this.$message.error(reason);
                    }
                )
            },
            publish(pid){
                this.$put("/project/"+pid).then(res=>{
                    if(res.body.resultCode=='0000'){
                        this.$message.success("项目已提交管理员审查");
                        Object.keys(this.projects).forEach(key => {
                            if(this.projects[key].pid === pid){
                                this.projects[key].status = 2;
                            }
                        });

                    }else{
                        this.$message.error("项目提交失败");
                    }
                }).catch(
                    reason => {
                        this.$message.error(reason);
                    }
                )
            },
            cancel(pid){
                this.$put("/project/cancel/"+pid).then(res=>{
                    if(res.body.resultCode=='0000'){
                        this.$message.success("已撤回");
                        Object.keys(this.projects).forEach(key => {
                            if(this.projects[key].pid === pid){
                                this.projects[key].status = 1;
                            }
                        });

                    }else{
                        this.$message.error("撤回失败");
                    }
                }).catch(
                    reason => {
                        this.$message.error(reason);
                    }
                )
            },
            //加载项目数据
            loadData(){
                this.ProjectReq.teacherId = this.$cookies.get("mid");
                this.$fetch("/project",this.ProjectReq).then(res=>{
                    this.projects = res;
                })
            },
            //查看项目详情
            showProjectDetail(pid){
                Object.keys(this.projects).forEach(key => {
                    if(this.projects[key].pid === pid){
                        this.projectDemo = this.projects[key];
                    }
                });
                this.detailVisible=true;
            },
            //重置创建项目的信息
            reset(){
                Object.keys(this.project).forEach(key => (this.project[key] = ''));
                this.project.teacherId = this.$cookies.get("mid");
                this.project.teacherName = this.$cookies.get("name");
            },
            //打开创建项目弹窗
            showCreateProject(){
                this.project.teacherName = this.$cookies.get("name");
                this.createVisible = true;
            },
            //创建项目
            createProject(){
                this.project.teacherId = this.$cookies.get("mid");
                this.$post("/project",this.project).then(res =>{
                    if(res.resultCode === "0000") {
                        this.reset();
                        this.$message.success("创建项目成功");
                        this.createVisible = false;
                        this.loadData();
                    }else{
                        this.$message.success("创建项目失败");
                    }
                });
            },
            chooseStudent(id){
                for (let i=0; i<this.students.length;i++) {
                    let student = this.students[i];
                    if(student.id==id){
                        student.choose =2;
                        this.ids.push(id);
                    }
                }
            },
            cancelStudent(id){
                for (let i=0; i<this.students.length;i++) {
                    let student = this.students[i];
                    if(student.id==id){
                        student.choose =0;
                        for(let j=0;j<this.ids.length;j++){
                            let idd = this.ids[j]
                            if(idd == id){
                                this.ids.splice(j,1);
                            }

                        }
                    }
                }
            },
            showCheck(){
                this.checkVisible= true;

            },
            showDetail(id){

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
            },
            idsReset(){
              this.ids=[];
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
