<template>
    <div>
        <el-row :gutter="20">

            <!--个人信息-->
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:400px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{member.name}}</div>
                            <div v-if="member.type === 1">管理员</div>
                            <div v-else-if="member.type === 2">教师</div>
                            <div v-else-if="member.type === 3">学生</div>
                        </div>
                        <el-tooltip class="item" effect="dark" content="修改个人信息" placement="bottom">
                            <el-button type="primary" icon="el-icon-edit" circle @click="showUpdateMember" ></el-button>
                        </el-tooltip>

                    </div>
                    <div class="user-info-list" >
                        帐号：&emsp;&emsp;<span>{{member.username}}</span>
                    </div>
                    <div class="user-info-list" >
                        学院：&emsp;&emsp;<span>{{member.college}}</span>
                    </div>
                    <div class="user-info-list" >
                        联系地址：<span v-if="member.address != null">{{member.address}}</span>
                        <span v-else-if="member.address == null" >（请补充）</span>
                    </div>
                    <div class="user-info-list" >
                        联系电话：<span v-if="member.phone != null">{{member.phone}}</span>
                        <span v-else-if="member.phone == null" >（请补充）</span>
                    </div>
                    <div class="user-info-list" >
                        电子邮箱：<span v-if="member.email != null">{{member.email}}</span>
                        <span v-else-if="member.email == null" >（请补充）</span>
                    </div>
                </el-card>
            </el-col>

            <!--通知-->
            <el-col :span="16">

                <el-card shadow="hover" style="height:400px;">
                    <div slot="header" class="clearfix">
                        <span>通知</span>
                    </div>
                    <div>
                        <el-scrollbar style="height: 380px;overflow-y: scroll">
                            <el-table :data="announceChild"  :show-header="false" style="width: 100%" >
                                <el-table-column>
                                    <template slot-scope="scope" >
                                        <span class="message-title"  @click="showAnnounceDetail(scope.row)">{{scope.row.title}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="180">
                                    <template slot-scope="scope" >
                                        <span>{{scope.row.time}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </div>

                </el-card>
            </el-col>
        </el-row>

        <!--工程实践流程-->
        <el-row :gutter="10" style="padding: 5px">
            <el-card shadow="hover" style="height:300px;">
                <div slot="header" class="clearfix" >
                    <span>工程实践流程</span>
                </div>
<!--                <img src="../../assets/img/navigation-student.gif">-->
                <div style="height: 50px"></div>
                <el-steps :space="200" :active="10" finish-status="process" style="padding: 30px">
                    <el-step v-for="item in navigation" :title="item.title"></el-step>
                </el-steps>
            </el-card>



        </el-row>
        <!--修改个人信息模态框-->
        <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible" center>
            <el-form :model="memberUpdate">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="memberUpdate.name" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="学院" :label-width="formLabelWidth">
                    <el-input v-model="memberUpdate.college" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="联系地址" :label-width="formLabelWidth">
                    <el-input v-model="memberUpdate.address" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="memberUpdate.phone" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                    <el-input v-model="memberUpdate.email" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateMember">修改</el-button>
                <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>


        <!--通知模态框-->
        <el-dialog title="通知详情" :visible.sync="detailVisible">
            <div v-html="detailChild"></div>
        </el-dialog>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        props: {
            announce: [{
                aid: Object,
                title: Object,
                time: Object,
                content: Object,
            }

            ],
            detail: '',


        },
        name: 'dashboard',
        data() {
            return {
                AnnounceParams: {
                    type: 2,
                    title: '',
                    mid:'',
                },
                detailChild: this.detail,
                announceChild:this.announce,
                navigation:[{
                    title:'教师登陆',
                },{
                    title:'创建课题',
                },{
                    title:'选择学生',
                },{
                    title:'查看结果',
                },{
                    title:'开始工程实践',
                },{
                    title:'查看学生报告',
                },{
                    title:'项目答辩',
                },

                ],
                detailVisible: false,

                grades: [{
                    value: '一年级',
                    label: '一年级'
                }, {
                    value: '二年级',
                    label: '二年级'
                }, {
                    value: '三年级',
                    label: '三年级'
                }, {
                    value: '四年级',
                    label: '四年级'
                }],
                classes: [{
                    value: '1班',
                    label: '1班'
                }, {
                    value: '2班',
                    label: '2班'
                }, {
                    value: '3班',
                    label: '3班'
                }, {
                    value: '4班',
                    label: '4班'
                }, {
                    value: '5班',
                    label: '5班'
                }, {
                    value: '6班',
                    label: '6班'
                }, {
                    value: '7班',
                    label: '7班'
                }, {
                    value: '8班',
                    label: '8班'
                }, {
                    value: '9班',
                    label: '9班'
                }],
                majors: [{
                    value: '计算机科学与技术',
                    label: '计算机科学与技术'
                }, {
                    value: '电子信息工程',
                    label: '电子信息工程'
                }, {
                    value: '网络工程',
                    label: '网络工程'
                }, {
                    value: '人工智能',
                    label: '人工智能'
                }],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                member:{
                    name:'',
                    type: null,
                    userName:'',
                    grade:'',
                    college:'',
                    major:'',
                    classes:'',
                    address:'',
                    phone:'',
                    email:'',
                },
                memberUpdate:{
                    mid:'',
                    name:'',
                    type: null,
                    userName:'',
                    grade:'',
                    college:'',
                    major:'',
                    classes:'',
                    address:'',
                    phone:'',
                    email:'',
                },


            }
        },
        methods: {
            //更新用户信息
            updateMember(){
                this.$put("/member",this.memberUpdate).then(res =>{
                    if(res.resultCode === '0000') {
                        this.loadMemberInfo();
                        this.$message.success(res.message);
                        this.dialogFormVisible = false;
                    }else{
                        this.$message.success(res.message);
                    }
                }).catch(()=>{
                    this.$message.error("参数错误");
                });

            },
            //打开更新模态框
            showUpdateMember(){
                this.$fetch('/member/'+this.$cookies.get("mid")).then(res => {
                    this.memberUpdate = res.data;
                    this.memberUpdate.mid = this.$cookies.get("mid");
                    this.memberUpdate.type = this.$cookies.get("type");
                });
                this.dialogFormVisible = true;
            },
            //加载用户信息
            loadMemberInfo(){
                this.$fetch('/member/'+this.$cookies.get("mid")).then(res => {
                    this.member = res.data;
                    this.$cookies.set("name",res.data.name)

                });
                this.member.type = this.$cookies.get("type");
            },
            //通知详情，弹出通知模态框
            showAnnounceDetail(announce){
                this.detailChild = announce.content;
                this.detailVisible = true;
            },
        },
        created() {
            this.AnnounceParams.mid = this.$cookies.get("mid")
            //加载通知信息
            this.$fetch('/announce/',this.AnnounceParams).then(res => {
                this.announceChild = res.data;
            });
            //加载用户信息
            this.loadMemberInfo();
        },
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 18px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
