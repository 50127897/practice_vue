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
                            v-model="day1"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    学生第一次选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>

            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第一志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day3"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第二志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day4"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第三志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day5"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    学生第二次选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day6"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第二次第一志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第二次第二志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day8"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第二次第三志愿选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day9"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    老师第三次选择时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day10"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>


            <el-row style="padding: 10px;" >
                <td width="250px" align="center">
                    项目最终提交时间
                </td>
                <td >
                    <el-date-picker
                            v-model="day11"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>&emsp;
                </td>
                <td><el-button type="primary">更改</el-button></td>
            </el-row>





        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            day1:'',
            day2:'',
            day3:'',
            day4:'',
            day5:'',
            day6:'',
            day7:'',
            day8:'',
            day9:'',
            day10:'',
            day11:'',

            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: []
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>
