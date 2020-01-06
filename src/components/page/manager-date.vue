<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>工程实践时间设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 100%;padding: 40px" >

            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师发布项目时间
                </td>
                <td >
                    <el-date-picker

                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.publishStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="publishChange"
                            v-model="dateReq.publishEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    学生第一次选择时间
                </td>
                <td >
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            readonly
                            v-model="dateReq.stuFirstChoiceStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="stuFirstChoiceChange"
                            v-model="dateReq.stuFirstChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>

            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第一次选择时间
                </td>
                <td >
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            readonly
                            v-model="dateReq.teacherFirstChoiceStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="teacherFirstChoiceChange"
                            v-model="dateReq.teacherFirstChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>




            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    学生第二次选择时间
                </td>
                <td >
                    <el-date-picker
                            readonly
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.stuSecondChoiceStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="stuSecondChoiceChange"
                            v-model="dateReq.stuSecondChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第二次选择时间
                </td>
                <td >
                    <el-date-picker
                            readonly
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.teacherSecondChoiceStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="teacherSecondChoiceChange"
                            v-model="dateReq.teacherSecondChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>




            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第三次选择时间
                </td>
                <td >
                    <el-date-picker
                            readonly
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.teacherThirdChoiceStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="teacherThirdChoiceChange"
                            v-model="dateReq.teacherThirdChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    项目最终提交时间
                </td>
                <td >
                    <el-date-picker
                            readonly
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.projectFinalStart"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.projectFinalEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>

            <el-row style="padding: 10px;" >
                <td width="440px" align="center">

                </td>
                <td><el-button type="primary" @click="onSubmit">提交更改</el-button></td>
            </el-row>




        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            dateReq: {
                publishStart: '',
                stuFirstChoiceStart: '',
                teacherFirstChoiceStart: '',
                stuSecondChoiceStart: '',
                teacherSecondChoiceStart: '',
                teacherThirdChoiceStart: '',
                projectFinalStart: '',

                publishEnd: '',
                stuFirstChoiceEnd: '',
                teacherFirstChoiceEnd: '',
                stuSecondChoiceEnd: '',
                teacherSecondChoiceEnd: '',
                teacherThirdChoiceEnd: '',
                projectFinalEnd: '',
            },


        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData(){
            this.$fetch("/time").then(
                res=>{
                    this.dateReq = res;
                }
            )
        },
        teacherThirdChoiceChange(){
            this.dateReq.projectFinalStart = this.dateReq.teacherThirdChoiceEnd
        },
        teacherSecondChoiceChange(){
            this.dateReq.teacherThirdChoiceStart = this.dateReq.teacherSecondChoiceEnd
        },
        stuSecondChoiceChange(){
            this.dateReq.teacherSecondChoiceStart = this.dateReq.stuSecondChoiceEnd
        },

        teacherFirstChoiceChange(){
            this.dateReq.stuSecondChoiceStart = this.dateReq.teacherFirstChoiceEnd
        },
        stuFirstChoiceChange(){
            this.dateReq.teacherFirstChoiceStart = this.dateReq.stuFirstChoiceEnd
        },

        publishChange(){
            this.dateReq.stuFirstChoiceStart = this.dateReq.publishEnd
        },
        onSubmit() {
            this.$post("/time",this.dateReq).then(
                res=>{
                    this.$message.success('更新时间成功！');
                }
            )

        }

    }
};
</script>
