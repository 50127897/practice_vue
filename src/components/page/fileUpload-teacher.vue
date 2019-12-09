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
            文档类型：
            <el-select v-model="doctype" placeholder="请选择" style="padding: 10px">
                <el-option key="bbk" label="项目周报" value="bbk" ></el-option>
                <el-option key="xtc" label="规划说明书" value="xtc"></el-option>
                <el-option key="s" label="需求分析说明书" value="2"></el-option>
                <el-option key="as" label="项目概要设计说明书" value="3"></el-option>
                <el-option key="ww" label="软件测试说明书" value="4"></el-option>
                <el-option key="ee" label="推广实施说明书" value="5"></el-option>
                <el-option key="rr" label="资金预算表" value="6"></el-option>
                <el-option key="t" label="资金执行计划表" value="7"></el-option>
                <el-option key="y" label="用户手册" value="8"></el-option>

            </el-select>

            &nbsp;
            <el-input  placeholder="上传者名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

            <el-table
                :data="uploadHistry"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="文档名"></el-table-column>
                <el-table-column prop="type" label="文档类型"></el-table-column>
                <el-table-column prop="person" label="上传者"></el-table-column>
                <el-table-column prop="teacher" label="导师"></el-table-column>



                <el-table-column prop="date" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-document"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="文档上传" :visible.sync="uploadVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="文档类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="项目周报" value="1"></el-option>
                        <el-option label="规划说明书" value="2"></el-option>
                        <el-option label="需求分析说明书" value="3"></el-option>
                        <el-option label="项目概要设计说明书" value="4"></el-option>
                        <el-option label="软件测试说明书" value="5"></el-option>
                        <el-option label="推广实施说明书" value="6"></el-option>
                        <el-option label="资金预算表" value="7"></el-option>
                        <el-option label="资金执行计划表" value="8"></el-option>
                        <el-option label="用户手册" value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传pdf,zip,doc或docx文件，且不超过500kb</div>
                    </el-upload>
<!--                    <el-upload-->
<!--                            class="upload-demo"-->
<!--                            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                            :on-preview="handlePreview"-->
<!--                            :on-remove="handleRemove"-->
<!--                            :before-remove="beforeRemove"-->
<!--                            multiple-->
<!--                            :limit="3"-->
<!--                            :on-exceed="handleExceed"-->
<!--                            :file-list="fileList">-->
<!--                        <el-button size="small" type="primary">点击上传</el-button>-->
<!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                    </el-upload>-->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
            doctype:'',
            fileList: [{name: 'food.doc', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
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
        }
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
