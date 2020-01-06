<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 文档上传
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-upload"
                    class="handle-del mr10"
                    @click="uploadVisible = true"
                >上传</el-button>

            </div>
            <el-table
                :data="fileList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="pdId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="pdName" label="文档名"></el-table-column>
                <el-table-column prop="type" label="文档类型"></el-table-column>
                <el-table-column prop="studentName" label="上传者"></el-table-column>
                <el-table-column prop="createTime" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
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

        <!-- 编辑弹出框 -->
        <el-dialog title="文档上传" :visible.sync="uploadVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="文档类型" >
                    <el-select placeholder="请选择" v-model="fileReq.type">
                        <el-option label="项目分工说明书" value="1"></el-option>
                        <el-option label="项目规划说明书" value="2"></el-option>
                        <el-option label="需求分析说明书" value="3"></el-option>
                        <el-option label="概要设计说明书" value="4"></el-option>
                        <el-option label="详细设计说明书" value="5"></el-option>
                        <el-option label="系统测试报告" value="6"></el-option>
                        <el-option label="推广实施说明书" value="7"></el-option>
                        <el-option label="资金预算表" value="8"></el-option>
                        <el-option label="资金执行计划表" value="9"></el-option>
                        <el-option label="用户手册" value="10"></el-option>
                        <el-option label="工作周志" value="11"></el-option>
                        <el-option label="项目工程实践报告" value="12"></el-option>
                        <el-option label="项目工程实践成果登记表" value="13"></el-option>
                        <el-option label="讲座听后感" value="14"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <input type="file" ref="myfile" >
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="uploadData">确 定</el-button>
                <el-button @click="editVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            getFileReq:{
                type:'',
                studentId:'',
            },
            fileListReq:{
                studentId:'',
            },
            fileReq: {
                type: "1",
                file:'',
            },
            fileList: [],
            uploadHistry:[{
                id:'2',
                name:'第三周周记',
                type:'项目周报',
                person:'我爱学习',
                teacher:'李教授',
                date:'2019-10-26',
            },
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
            uploadVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
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

        uploadData(){
            let myFile = this.$refs.myfile;
            let files = myFile.files;
            let file = files[0];
            let formData = new FormData();
            formData.append("file", file);
            formData.append("type", this.fileReq.type);
            formData.append("studentId", this.$cookies.get("mid"));
            this.$upload("/file",formData).then(resp=>{
                this.$message.success(resp.message)
                this.uploadVisible = false;
                this.getData()
            })
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            this.fileListReq.studentId = this.$cookies.get("mid")
            this.$fetch("/file/lists",this.fileListReq).then(res=>{
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

            })
        },
    }
};
</script>

<style scoped>
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
