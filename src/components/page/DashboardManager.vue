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
                        <tr>
                            <td width="8%"><span>通知</span></td>
                            <td >
                                <el-radio-group v-model="AnnounceParams.type">
                                    <el-radio-button :label="null">全部</el-radio-button>
                                    <el-radio-button :label="1">教师</el-radio-button>
                                    <el-radio-button :label="2">学生</el-radio-button>
                                </el-radio-group>
                            </td>
                            <td width="5%">
                                <el-button type="primary" @click="deliverVisible = true">发布通知</el-button>
                            </td>

                        </tr>
                    </div>


                    <div style="height: 350px">
                        <el-scrollbar style="height: 330px;overflow-y: scroll">
                            <el-table :data="announceChild"  :show-header="false" style="width: 100%" >
                                <el-table-column>
                                    <template slot-scope="scope" >
                                        <span class="message-title"  @click="showAnnounceDetail(scope.row.aid)">
                                            {{scope.row.title}}
                                        </span>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80">
                                    <template slot-scope="scope" >
                                        <span v-if="scope.row.type==2">学生</span>
                                        <span v-else-if="scope.row.type==1">教师</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="100">
                                    <template slot-scope="scope" >
                                        <span>{{scope.row.time}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="80">
                                    <template slot-scope="scope" >
                                        <el-button type="danger" @click="handleDelete(scope.row.aid)">删除</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column width="20">
                                </el-table-column>

                            </el-table>
                        </el-scrollbar>
                    </div>


<!--                        <el-table :data="unread" :show-header="false" style="width: 100%">-->
<!--                            <el-table-column>-->
<!--                                <template slot-scope="scope" >-->
<!--                                    <span class="message-title"  @click="detailVisible = true">{{scope.row.title}}</span>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column width="80">-->
<!--                                <el-button type="danger" @click="dialogFormVisible = false">删除</el-button>-->
<!--                            </el-table-column>-->
<!--                            <el-table-column prop="date" width="140"></el-table-column>-->

<!--                        </el-table>-->

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

        <!--发布通知弹窗-->
        <el-dialog title="发布通知" :visible.sync="deliverVisible" center width="70%">
            <el-form >
                <el-form-item label="通知对象" :label-width="formLabelWidth">

                    <el-select v-model="newAnnounce.type" placeholder="请选择" style="width: 25%">
                        <el-option
                                value="2" label="学生">学生
                        </el-option>
                        <el-option
                                value="1" label="教师">教师
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="通知标题" :label-width="formLabelWidth">
                    <el-col :span="6">
                        <el-input v-model="newAnnounce.title"></el-input>
                    </el-col>

                </el-form-item>

                <el-form-item label="通知内容" :label-width="formLabelWidth">
                    <quill-editor ref="myTextEditor" v-model="newAnnounce.content" :options="editorOption"></quill-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="addAnnounce">发布</el-button>
                <el-button type="primary" @click="resetAnnounce">重置</el-button>
                <el-button type="danger" @click="deliverVisible = false">取 消</el-button>
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
    import { fetchData } from '../../api/index';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        props: {
            announce: [{
                aid: Object,
                type: Object,
                title: Object,
                content: Object,
                time: Object,
            }

            ],
            detail: '',


        },
        name: 'dashboard',
        data() {
            return {
                AnnounceParams: {
                    type: null,
                    title: '',
                },
                detailChild: this.detail,
                announceChild:this.announce,
                newAnnounce: [{
                    aid: '',
                    type: '',
                    title: '',
                    content: '',
                    time: '',
                }

                ],
                deliverVisible: false,
                editorOption: {
                    placeholder: '请输入通知内容'
                },
                radio1:'全部',
                navigation:[{
                    title:'管理员登陆',
                },{
                    title:'发布通知',
                },{
                    title:'选择项目工程时间',
                },{
                    title:'项目审核',
                },{
                    title:'调剂学生',
                },

                ],
                detailVisible: false,
                unread: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',

                },{
                    date: '2018-04-19 21:00:00',
                    title: '今晚12点整发大红包，先到先得',
                }],
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
                    mid:'',
                    name:'',
                    type: null,
                    username:'',
                    grade:'',
                    college:'',
                    major:'',
                    classes:'',
                    address:'',
                    phone:'',
                    email:'',
                    selected:'',
                    teacherid:'',
                    projectid:'',
                    projectname:'',
                },
                memberUpdate:{

                    mid:'',
                    name:'',
                    type: null,
                    username:'',
                    grade:'',
                    college:'',
                    major:'',
                    classes:'',
                    address:'',
                    phone:'',
                    email:'',
                    selected:'',
                    teacherid:'',
                    projectid:'',
                    projectname:'',
                },
                name: localStorage.getItem('ms_username'),


            }
        },
        components: {
            Schart,
            quillEditor
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){

            this.changeDate();
        },
        activated(){

        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            updateMember(){
                this.$post("/member/update",this.memberUpdate).then(res =>{
                    if(res > 0) {
                        Object.keys(this.memberUpdate).forEach(key => (this.member[key] = this.memberUpdate[key]));
                        Object.keys(this.memberUpdate).forEach(key => (this.memberUpdate[key] = ''));
                        this.$message.success("修改信息成功");
                        this.dialogFormVisible = false;
                    }else{
                        this.$message.success("修改信息失败");
                    }
                });

            },
            showUpdateMember(){
                this.$fetch('/member/getInfo?mid='+this.$cookies.get("mid")).then(res => {
                    this.memberUpdate = res;
                });
                this.dialogFormVisible = true;
            },
            //通知详情，弹出通知模态框
            showAnnounceDetail(aid){
                let params = {
                    aid: aid
                }
                this.$fetch("/announce",params).then(res =>{
                    this.detailChild =res.data.content;
                        this.detailVisible = true;
                    }
                )
            },
            //加载通知信息
            loadAnnounce(){
                this.$fetch('/announce/',this.AnnounceParams).then(res => {
                    this.announceChild = res.data;
                });
            },
            //删除通知
            handleDelete(aid) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                        this.$deleteRequest('/announce/'+aid).then(res => {
                            if(res.resultCode === '0000') {
                                this.$message.success(res.message);
                                this.loadAnnounce();
                            }else{
                                this.$message.warning(res.message);
                            }
                        });

                    })
                    .catch(() => {
                    });
            },
            //添加通知
            addAnnounce(){
                console.log(this.newAnnounce);
                this.$post('/announce',this.qs.stringify(this.newAnnounce)).then(res => {
                    if(res.resultCode === '0000') {
                        this.deliverVisible = false;
                        this.$message.success(res.message);
                        this.resetAnnounce();
                        this.loadAnnounce();
                    }else{
                        this.$message.warning(res.message);
                    }
                });
            },
            resetAnnounce(){
                Object.keys(this.newAnnounce).forEach(key => {
                    this.newAnnounce[key] = '';
                })

            },
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },

        },
        created() {
            //加载通知信息
            this.loadAnnounce();
            this.member = JSON.parse(localStorage.getItem("member"));
        },
        watch:{
            AnnounceParams: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                    handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.loadAnnounce();
                }
            },
        }
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
