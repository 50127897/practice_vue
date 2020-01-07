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
                <el-row>
                    <el-button
                            type="primary"
                            icon="el-icon-thumb"
                            class="handle-del mr10"
                            @click="showCreateProject"

                    >创建课题</el-button>
                </el-row>
            <el-row :gutter="18">
                <el-col :span="3.9" v-for="item in projects"  style="padding: 8px">
                    <el-card class="box-card" style="width: 280px;height: 240px" shadow="hover">
<!--                        <div slot="header" class="clearfix" >-->
                        <div slot="header" class="clearfix" >
                            {{item.pname}}
                        </div>
                        <div  class="text item">
                            项目id:{{item.pid}}
                        </div>
                        <div  class="text item">
                            需求人数:{{item.member}}
                        </div>
                        <div  class="text item">
                            已选人数:{{item.selected}}
                        </div>
                        <div >
                            <el-button type="primary" v-if="item.status!=4" @click="showProjectDetail(item.pid)" >详情</el-button>
                            <el-button type="primary" v-if="item.status==4" @click="showProjectDoc(item.pid)" >文档</el-button>
                            <el-button type="success" @click="showChooseStu(item)" v-if="item.status==4">选择学生</el-button>
                            <el-button type="success" @click="showStu(item)" v-if="item.status==4">查看学生</el-button>
                            <el-button type="info" @click="showUnPass(item)" v-if="item.status==3">审核不通过</el-button>
                            <el-button type="danger" @click="deleteProject(item)" v-if="item.status==3">删除</el-button>
                            <el-button type="info" @click="" v-if="item.status==2" >审核中</el-button>
                            <el-button type="warning" @click="cancel(item.pid)" v-if="item.status==2" >撤回</el-button>
                            <el-button type="success" @click="publish(item.pid)" v-if="item.status==1">发布</el-button>
                            <el-button type="danger" @click="deleteProject(item)" v-if="item.status==1">删除</el-button>
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


        <!-- 选择学生弹出框 -->
        <el-dialog title="选择学生" :visible.sync="chooseVisible" width="90%">
            <el-row >
                <h1 align="center">{{choiceShow.projectTitle}} </h1>
            </el-row>
            <div align="center">
                <el-radio-group v-model="choiceReq.type" style="padding: 10px" >
                    <el-radio-button  label="">全选</el-radio-button>
                    <el-radio-button  label="1">第一志愿</el-radio-button>
                    <el-radio-button label="2">第二志愿</el-radio-button>
                    <el-radio-button label="3">第三志愿</el-radio-button>
                </el-radio-group>
                <span>&emsp;&emsp;&emsp;&emsp;需求人数：{{choiceShow.member}}&emsp;&emsp;&emsp;已选人数：{{choiceShow.selected}} &emsp;&emsp;&emsp;可选人数：{{choiceShow.require}} </span>
            </div>

            <el-row>
                <h2 align="center" v-if="choices.length == 0">暂无学生选择 </h2>
                <el-col :span="4.6" v-for="choice in choices" style="padding: 8px" >
                    <el-card class="box-card" style="width: 290px;height: 380px" >

                        <div  class="text item">
                            姓名:{{choice.member.name}}
                        </div>
                        <div  class="text item">
                            联系地址:{{choice.member.address}}
                        </div>
                        <div  class="text item">
                            联系电话:{{choice.member.phone}}
                        </div>
                        <div  class="text item">
                            电子邮箱:{{choice.member.email}}
                        </div>
                        <div  class="text item" v-if="choice.type == 1">
                            来源:第一志愿
                        </div>
                        <div  class="text item" v-else-if="choice.type == 2">
                            来源:第二志愿
                        </div>
                        <div  class="text item" v-else-if="choice.type == 3">
                            来源:第三志愿
                        </div>
                        <div  class="text item" style="height: 100px">
                            自我简介:{{choice.choiceIntro}}
                        </div>
                        <div  class="text item" align="center">
                            <div  class="text item" style="bottom: 0">
<!--                            <div  class="text item" style="position: absolute;bottom: 0;">-->
<!--                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-->
<!--                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-->
                                <el-row  class="el-dialog--center" >
                                    <el-button type="primary" @click="chooseStudent(choice.member)" v-if="choice.member.choose==0">选择</el-button>
                                    <el-button type="danger" @click="cancelStudent(choice.member)"  v-if="choice.member.choose==1">取消</el-button>
                                </el-row>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <div class="pagination">
                <el-pagination
                        background
                        layout="total,sizes, prev, pager, next,jumper"
                        :current-page="choiceReq.current"
                        :page-sizes="[3,4, 5, 6, 7]"
                        :page-size="choiceReq.size"
                        :total="pageChoice.total"
                        @current-change="currentChangeChoice"
                        @size-change="sizeChangeChoice"
                ></el-pagination>
            </div>
            <div align="center">
                <el-row>
                    <el-button type="primary" @click="chooseCheck">确认选择</el-button>
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
                            联系电话:{{student.phone}}<span v-if="student.phone == null"> 未填写</span>
                        </div>
                        <div  class="text item">
                            电子邮箱:{{student.email}}<span v-if="student.email == null"> 未填写</span>
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
                <el-form-item label="详细文档" :label-width="formLabelWidth">
                        <input type="file" ref="myfile" >
<!--                    <input type="file" ref="myfile">-->
<!--                    <el-button  @click="uploadData" id="btn" type="success" size="mini" icon="el-icon-upload2" style="visibility:visible">导入数据</el-button>-->
<!--                    <el-upload-->
<!--                            style="display: inline"-->
<!--                            class="upload-demo"-->
<!--                            :on-success="onSuccess"-->
<!--                            :on-error="onError"-->
<!--                            :before-upload="beforeUpload"-->
<!--                            drag-->
<!--                            action="https://localhost:8088/file"-->
<!--                            :limit="1"-->
<!--                            :file-list="fileList">-->
<!--                        <i class="el-icon-upload"></i>-->
<!--                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>-->
<!--                        <div class="el-upload__tip" slot="tip">只能上传pdf,zip,doc或docx文件，且不超过500kb</div>-->
<!--                    </el-upload>-->
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createProject">保存</el-button>
                <el-button type="success" @click="createAndPublishProject">保存并提交</el-button>
                <el-button type="danger" @click="reset">重置</el-button>
            </div>
        </el-dialog>






        <!--确认学生-->
        <el-dialog title="确认学生" :visible.sync="checkVisible" width="30%">
                <div style="width: 400px">
                    <div class="user-info-list" style="padding: 10px">
                        当前选择的学生：&emsp;
                    </div>
                    <div class="user-info-list" v-for="name in names " style="padding: 10px">
                            <div>
                             <span  >{{name}}</span>
                            </div>
                    </div>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitChoices">提交</el-button>
                <el-button @click="checkVisible = false">取消</el-button>
            </span>
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

        <!-- 查看审核不通过内容弹出框 -->
        <el-dialog title="审核不通过" :visible.sync="unPassVisible" width="50%">
            <div v-html="reject"></div>
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
                reject:'',
                unPassVisible:false,
                getFileReq:{
                    type:'',
                    studentId:'',
                },
                docVisible:false,
                fileList: [],
                //文档请求参数
                fileListReq:{
                    studentId:'',
                    pid:'',
                },
                deleteProjectReq:{
                  pId:"",
                },
                students:[],
                showStuReq:{
                    pId:'',
                },
                choiceDemo:{
                    cid:'',
                    pid:'',
                    mid:'',
                    type:'',
                },
                list:[],
                //查看志愿请求参数
                choiceReq:{
                    pId:'',
                    type:'',
                    current: 1,
                    size:5,
                },
                //查看志愿分页参数
                pageChoice:{
                    pages:1,
                    total:1,
                },
                //查看志愿项目名称
                choiceShow:{
                    projectTitle: '综合实践管理系统',
                    member: 0,
                    selected: 0 ,
                    require: 0,
                },


                //查看项目分页参数
                page:{
                    pages:1,
                    total:1,
                },
                //查看项目参数
                ProjectReq:{
                    pId:'',
                    status:'',
                    teacherId:'',
                    rejectContent:'',
                    pName:'',
                    size: 10,
                    current: 1,
                    },
                fileList: [],
                //富文本编辑器提示内容
                editorOption: {
                    placeholder: '请输入通知内容'
                },
                //新建项目参数
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
                //项目参数
                project:{
                    pid:'',
                    teacherId:'',
                    pname:'',
                    teacherName:'',
                    content:'',
                    member:'',
                    file:'',
                    status:'1',
                    isFull:'',
                    selected:'',
                    first:'',
                    second:'',
                    third:'',
                },
                //项目参数
                projects:[

                ],
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
                names:[

                ],
                seeVisible: false,
                checkVisible: false,
                chooseVisible:false,
                //查看志愿参数
                choices:[{
                    cId:'',
                    pId:'',
                    mId:'',
                    type:'',
                    choiceIntro:'',
                    member:[{
                        mid:'',
                        name:'',
                        userName:'',
                        grade:'',
                        college:'',
                        major:'',
                        classes:'',
                        address:'',
                        phone:'',
                        email:'',
                    }]
                }
                ],
                detailVisible: false,

                formLabelWidth:'100px',

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
        watch: {
            'choiceReq.type': { // 监视pagination属性的变化
                // deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    this.initPageChoice();
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getChoiceData();
                }
            },

        },
        methods: {
            showUnPass(item){
                this.reject = item.rejectContent
                this.unPassVisible = true;
            },
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
                this.fileListReq.studentId = this.$cookies.get("mid")
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
            // uploadData(){
            //     let myFile = this.$refs.myfile;
            //     let files = myFile.files;
            //     let file = files[0];
            //     let formData = new FormData();
            //     formData.append("file", file);
            //     this.$upload("/file",formData).then(resp=>{
            //         if (resp) {
            //             console.log(resp);
            //         }
            //     })
            // },
            onSuccess(response, file, fileList) {
                this.$message.success("上传成功")
            },
            onError(err, file, fileList) {
                this.$message.error("上传失败")
            },
            beforeUpload(file) {
                this.$message.warning("上传中")
            },
            //查看已选学生信息
            showStu(project){
                this.showStuReq.pId = project.pid;
                this.$fetch("/project/students",this.showStuReq).then(res=>{
                    this.students = res;
                    this.seeVisible=true
                })

            },
            //老师提交所选学生
            submitChoices(){
                this.$post("/project/submitChoice",this.list).then(res=>{
                    if(res ==1) {
                        this.choiceShow.selected += this.list.length;
                        this.choiceShow.require -= this.list.length;
                        this.checkVisible = false;
                        this.$message.success("选择成功");
                        this.initPageChoice();
                        this.getChoiceData();
                        this.loadData();
                    }else{
                        this.$message.error("选择失败");
                    }
                })
            },
            //确认是否选择
            chooseCheck(){

                this.list = [];
                this.names = [];
                this.choices.forEach(choice => {
                    if (choice.member.choose == 1) {
                        // this.choiceDemo.cid = choice.cid;
                        // this.choiceDemo.mid = choice.mid;
                        // this.choiceDemo.pid = choice.pid;
                        // this.choiceDemo.type = choice.type;
                        // this.list.add(this.choiceDemo);
                        // this.names.add(choice.member.name);
                        this.list.push(choice);
                        this.names.push(choice.member.name);
                    }

                })
                if(this.list.length >this.choiceShow.require){
                    this.$message.error("选择人数不能大于可选需求人数")
                }else {
                    this.checkVisible = true;
                }
            },
            //页面改变事件
            currentChangeChoice(val){
                this.choiceReq.current = val;
                this.getChoiceData();
            },
            //页面大小改变事件
            sizeChangeChoice(val){
                this.choiceReq.size = val;
                this.getChoiceData();
            },
            //初始化分页条件
            initPageChoice(){
                this.choiceReq.current=1;
                this.pageChoice.pages=1;
                this.pageChoice.total=0;
            },
            //打开选择学生模态框
            showChooseStu(project){
                this.choiceReq.type = '';
                this.choiceShow.projectTitle = project.pname;
                this.choiceShow.member = project.member;
                this.choiceShow.selected = project.selected;
                this.choiceShow.require = project.member- project.selected;
                this.choiceReq.pId = project.pid;
                this.initPageChoice
                this.$fetch("/project/stuChoice",this.choiceReq).then(res=>{
                    this.choices = res.records;
                    this.pageChoice.pages = res.pages;
                    this.pageChoice.total = res.total;
                    this.choiceReq.size = res.size;
                })
                this.chooseVisible=true
            },
            //获取志愿信息
            getChoiceData(){
                this.$fetch("/project/stuChoice",this.choiceReq).then(res=>{
                    this.choices = res.records;
                    this.pageChoice.pages = res.pages;
                    this.pageChoice.total = res.total;
                    this.choiceReq.size = res.size;
                })
            },
            //删除项目信息
            deleteProject(item){
                this.$confirm('确定要删除项目吗？', '提示', {
                    type: 'warning'
                }).then(() => {

                    this.$deleteRequest("/project/"+item.pid).then(res=>{
                        if(res.resultCode=='0000'){
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
                }).catch(() => {
                });




            },
            //发布项目
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
            //撤回项目审核
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
            //页面改变事件
            currentChange(val){
                this.ProjectReq.current = val;
                this.loadData();
            },
            //页面大小改变事件
            sizeChange(val){
                this.ProjectReq.size = val;
                this.loadData();
            },
            //初始化分页条件
            initPage(){
                this.ProjectReq.current=1;
                this.page.pages=1;
                this.page.total=0;
            },
            //加载项目数据
            loadData(){
                this.ProjectReq.teacherId = this.$cookies.get("mid");
                this.$fetch("/project",this.ProjectReq).then(res=>{
                    this.projects = res.records;
                    this.page.total = res.total;
                    this.page.pages = res.pages;
                    this.ProjectReq.size = res.size;
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
            createProject() {
                //保存文件
                let myFile = this.$refs.myfile;
                let files = myFile.files;
                if (files.length != 0) {
                    let file = files[0];
                    let formData = new FormData();
                    formData.append("file", file);
                    formData.append("type", "15");
                    formData.append("studentId", this.$cookies.get("mid"));
                    this.$upload("/file", formData).then(resp => {
                        this.$message.success(resp.message)
                    })
                }
                //保存项目
                console.log("ok")
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
            //创建项目
            createAndPublishProject(){
                this.project.status = 2
                //保存文件
                let myFile = this.$refs.myfile;
                let files = myFile.files;
                if (files.length != 0) {
                    let file = files[0];
                    let formData = new FormData();
                    formData.append("file", file);
                    formData.append("type", "15");
                    formData.append("studentId", this.$cookies.get("mid"));
                    this.$upload("/file", formData).then(resp => {
                        this.$message.success(resp.message)
                    })
                }
                //保存项目
                console.log("ok")
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
            //选中学生
            chooseStudent(member){
                member.choose = 1;
            },
            //取消选中学生
            cancelStudent(member){
                member.choose = 0;
            },


            showDetail(id){

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
