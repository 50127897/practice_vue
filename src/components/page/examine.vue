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
            <div style="padding: 8px">
                <el-radio-group v-model="ProjectReq.status">
                    <el-radio-button  label="2">未审核</el-radio-button>
                    <el-radio-button label="4">已通过</el-radio-button>
                    <el-radio-button label="3">已驳回</el-radio-button>
                </el-radio-group>
                &nbsp;
                <el-input v-model="ProjectReq.pName" placeholder="项目名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchProject">搜索</el-button>
            </div>
            <div style="height: 15px">
            </div>
            <el-row >
                <el-col :span="0.1" v-for="item in projects" style="padding: 8px">
                    <el-card class="box-card" style="width: 230px;height: 250px">

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
                        <div >
                            <el-button type="primary" @click="showDetail(item.pid)" >详情</el-button>
                            <el-button type="primary" @click="passProject(item)" v-if="item.status == 2">通过</el-button>
                            <el-button type="danger" @click="showReject(item)" v-if="item.status == 2">驳回</el-button>
                            <el-button type="success" @click="" v-if="item.status == 4">已通过</el-button>
                            <el-button type="danger" @click="" v-if="item.status == 3">已驳回</el-button>

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


        <!-- 驳回项目弹出框 -->
        <el-dialog title="项目详情" :visible.sync="rejectVisible" width="65%">

            <div style="width: 400px">
                <el-form ref="form2" :model="projectDemo" label-width="80px" style="padding: 30px;font-size:large">
                    <div class="user-info-list" >
                        课题id&emsp;&nbsp;：<span>{{projectDemo.pid}}</span>
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

            <div style="padding: 20px">
                <quill-editor v-model="ProjectRequest.rejectContent" :options="editorOption"></quill-editor>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="rejectProject(projectDemo.pid)">确认驳回</el-button>
                <el-button @click="rejectVisible = false">返 回</el-button>
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
        name: 'basetable',
        data() {
            return {
                page:{
                    pages:1,
                    total:1,
                },
                editorOption:{
                    placeholder: '驳回原因'
                },
                ProjectReq:{
                    pid:'',
                    status:'2',
                    teacherid:'',
                    rejectContent:'',
                    pName:'',
                    size: 12,
                    current: 1,
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
            'ProjectReq.status': { // 监视pagination属性的变化
                // deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    this.initPage();
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getData();
                }
            },

        },
        methods: {
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
