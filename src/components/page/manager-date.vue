<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>工程实践时间设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width: 100%;padding: 40px">

            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    老师发布项目时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.publishStart"
                            @change="checkFirstTime"
                            type="date"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('publishEnd')"
                            v-model="dateReq.publishEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    学生第一次选择时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.stuFirstChoiceStart"
                            type="date"
                            @change="validateAndSetNextStart('stuFirstChoiceStart')"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('stuFirstChoiceEnd')"
                            v-model="dateReq.stuFirstChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>

            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    老师第一次选择时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.teacherFirstChoiceStart"
                            type="date"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('teacherFirstChoiceEnd')"
                            v-model="dateReq.teacherFirstChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    学生第二次选择时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.stuSecondChoiceStart"
                            type="date"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('stuSecondChoiceEnd')"
                            v-model="dateReq.stuSecondChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    老师第二次选择时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.teacherSecondChoiceStart"
                            type="date"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('teacherSecondChoiceEnd')"
                            v-model="dateReq.teacherSecondChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    老师第三次选择时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.teacherThirdChoiceStart"
                            type="date"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="validateAndSetNextStart('teacherThirdChoiceEnd')"
                            v-model="dateReq.teacherThirdChoiceEnd"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>


            <el-row style="padding: 10px;">
                <td width="250px" align="center">
                    项目最终提交时间
                </td>
                <td>
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.projectFinalStart"
                            type="date"
                            :readonly="true"
                            placeholder="开始日期">
                    </el-date-picker>
                    --
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="dateReq.projectFinalEnd"
                            @change="checkLastEndTime"
                            type="date"
                            placeholder="结束日期">
                    </el-date-picker>
                </td>
            </el-row>

            <el-row style="padding: 10px;">
                <td width="440px" align="center">

                </td>
                <td>
                    <el-button type="primary" @click="onSubmit">提交更改</el-button>
                </td>
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
                    publishEnd: '',

                    stuFirstChoiceStart: '',
                    stuFirstChoiceEnd: '',

                    teacherFirstChoiceStart: '',
                    teacherFirstChoiceEnd: '',

                    stuSecondChoiceStart: '',
                    stuSecondChoiceEnd: '',

                    teacherSecondChoiceStart: '',
                    teacherSecondChoiceEnd: '',

                    teacherThirdChoiceStart: '',
                    teacherThirdChoiceEnd: '',

                    projectFinalStart: '',
                    projectFinalEnd: '',

                },


            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.$fetch("/time").then(
                    res => {
                        this.dateReq = res;
                    }
                )
            },
            checkFirstTime(){
                if(this.dateReq['publishEnd'] === ''){
                    return;
                }
                if(!this.checkTime('publishStart', 'publishEnd')){
                    alert("结束时间不能早于开始时间");
                    this.dateReq['publishStart'] = '';
                }
            },
            checkLastEndTime(){
                if(!this.checkTime('projectFinalStart', 'projectFinalEnd')){
                    alert("结束时间不能早于开始时间");
                    this.dateReq['projectFinalEnd'] = '';
                }
            },
            validateAndSetNextStart(endName) {

                let startName = this.getStartName(endName);
                let nextStartName = this.getNextStartName(endName);

                if(this.checkTime(startName, endName)){
                    this.setStartValue(nextStartName, endName);
                }else{
                    alert("结束时间不能早于开始时间")
                    this.dateReq[endName] = ''
                    this.setEmptyValue();
                }
            },
            setStartValue(nextStartName, endName){
                this.dateReq[nextStartName] = this.dateReq[endName]
            },

            getNextStartName(endName){
                let nextStartName = '';
                let temp = '';
                Object.keys(this.dateReq).forEach(key => {
                    if (temp === endName) {
                        nextStartName = key;
                        temp = ''
                    }
                    if (key === endName) {
                        temp = key;
                    }
                });

                return nextStartName;
            },
            getStartName(endName) {
                let startName = '';
                let temp = '';
                Object.keys(this.dateReq).forEach(key => {
                    if (key === endName) {
                        startName = temp;
                    }
                    if (key !== endName) {
                        temp = key;
                    }
                });
                return startName;
            },
            checkTime(startName, endName) {
                return new Date(this.dateReq[startName]).getTime() < new Date(this.dateReq[endName]).getTime();
            },
            setEmptyValue() {
                let emptyFlag = false;
                Object.keys(this.dateReq).forEach((key) => {
                    if (emptyFlag) {
                        this.dateReq[key] = '';
                    }
                    if (!emptyFlag && this.dateReq[key] === '') {
                        emptyFlag = true;
                    }
                })
            },
            onSubmit() {
                this.$post("/time", this.dateReq).then(
                    res => {
                        this.$message.success('更新时间成功！');
                    }
                )

            }

        }
    };
</script>
