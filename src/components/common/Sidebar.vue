<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items" v-if="item.type == type">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            member: {
                type: '',
            },
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页',
                    type: '3',
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'chooseProject',
                    title: '课题游览',
                    type: '3',
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'result',
                    title: '课题结果',
                    type: '3',
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'fileUpload',
                    title: '文档上传',
                    type: '3',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboardTeacher',
                    title: '系统首页-教师',
                    type: '2',
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'MyProjectTeacher',
                    title: '我的课题-教师',
                    type: '2',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'fileUpload-teacher',
                    title: '文档管理-教师',
                    type: '2',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'DashboardManager',
                    title: '系统首页-管理员',
                    type: '1',
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '课程管理',
                    type: '1',
                    subs: [
                        {
                            index: 'examine',
                            title: '项目审核'
                        },
                        {
                            index: 'project',
                            title: '查看课程',

                        },
                        {
                            index: 'manage_student',
                            title: '学生情况'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'fileUpload-manager',
                    title: '文档管理-管理员',
                    type: '1',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'manager-date',
                    title: '时间设置-管理员',
                    type: '1',
                },





                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                //
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '3',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '3-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.type = this.$cookies.get("type");
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
