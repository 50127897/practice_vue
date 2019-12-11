<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title"><span style="color: #222222">综合实践管理系统</span></div>

            <el-form :model="params" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <!--日期-->
                <el-form-item align="center">
                    <el-date-picker
                            v-model="gettime"
                            type="datetime"
                            readonly

                    >
                    </el-date-picker>
                </el-form-item>
                <!--单选框 -->
                <el-form-item align="center">
                    <el-radio-group v-model="params.type" >
                        <el-radio :label="1">管理员</el-radio>
                        <el-radio :label="2">教师</el-radio>
                        <el-radio :label="3" >学生</el-radio>
                    </el-radio-group>
                </el-form-item>



                <el-form-item prop="username">
                    <el-input v-model="params.username" placeholder="学号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="params.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="danger" @click="">忘记密码</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script>

export default {

    data: function() {
        return {
            gettime:'',
            params: {
                username: '',
                password: '',
                type: 3,

            },
            loginParams: {
                username: '',
                password: '',
                type: 3,

            },
            rules: {
                    username: [{ required: true, message: '请输入学号', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    beforeCreate(){
        this.getTime
    },
    created() {
        this.currentTime();
    },
    methods: {
        getTime:function(){
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        },
        currentTime(){
            setInterval(this.getTime,500)
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                let sha256 = require("js-sha256").sha256//这里用的是require方法
                this.loginParams.password = sha256(this.params.password)//使用sha256密码加密
                this.loginParams.username = this.params.username
                this.loginParams.type = this.params.type
                if (valid) {
                    this.$post("/member/login",this.loginParams).then(res=>{
                        if(res.resultCode ==='0000'){
                            this.$cookies.set('mid', res.data.mid); //登录成功后将token存储在cookie之中
                            this.$cookies.set('type', res.data.type); //登录成功后将token存储在cookie之中
                            this.$message.success(res.message);
                            if (res.data.type == 3) {
                                this.$router.push('/dashboard');
                            }else if (res.data.type == 2) {
                                this.$router.push('/dashboardTeacher');
                            }else if (res.data.type == 1) {
                                this.$router.push('/DashboardManager');
                            }
                        }else{
                            this.$message.error(res.message);
                        }

                        }
                    ).catch(()=>{
                            this.$message.error('未找到该用户名');
                         return false;
                        }

                    ),
                    localStorage.setItem('ms_username', this.member.username);

                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
