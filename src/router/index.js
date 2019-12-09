import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/fileUpload-manager',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/fileUpload-manager.vue'),
                    meta: { title: '文档管理-管理员' }
                },
                {
                    path: '/fileUpload-teacher',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/fileUpload-teacher.vue'),
                    meta: { title: '文档管理-教师' }
                },
                {
                    path: '/manager-date',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/manager-date.vue'),
                    meta: { title: '时间设置-管理员' }
                },
                {
                    path: '/DashboardManager',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/DashboardManager.vue'),
                    meta: { title: '系统首页-管理员' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/examine',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/examine.vue'),
                    meta: { title: '课题审核' }
                },
                {
                    path: '/project',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/project.vue'),
                    meta: { title: '查看课程' }
                },
                {
                    path: '/manage_student',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/manage_student.vue'),
                    meta: { title: '学生情况' }
                },
                {
                    path: '/MyProjectTeacher',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/MyProjectTeacher.vue'),
                    meta: { title: '课题选择' }
                },
                {
                    path: '/dashboardTeacher',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/DashboardTeacher.vue'),
                    meta: { title: '系统首页-教师' }
                },
                {
                    path: '/chooseProject',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/chooseProject.vue'),
                    meta: { title: '课题选择' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/result',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/result.vue'),
                    meta: { title: '课题结果' }
                },
                {
                    path: '/fileUpload',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/fileUpload.vue'),
                    meta: { title: '文档管理' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登陆' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
