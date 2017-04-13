/**
 * Created by yulucui on 16/8/22.
 */
system = {
    users: [{
        userGrop: 1,
        username: 'datauser',
        password: '123456',
        describe: '数据管理员',
        resources: [1,2],
        status: 1
    },{
        userGrop: 2,
        username: 'reportuser',
        password: '123456',
        describe: '报表管理员',
        resources: [1,3,4,5,6],
        status: 1
    }],
    resources: [{
        id: 1,
        name: '全部报表',
        url: '/chart/list',
        describe: '',
        status: 1
    },{
        id: 2,
        name: '创建报表',
        url: '/chart/creat',
        describe: '',
        status: 1
    },{
        id: 3,
        name: '创建报告',
        url: '/report/creat',
        describe: '',
        status: 1
    },{
        id: 4,
        name: '全部报告',
        url: '/report/list',
        describe: '',
        status: 1
    },{
        id: 5,
        name: '用户列表',
        url: '/user/list',
        describe: '',
        status: 1
    },{
        id: 5,
        name: '创建用户',
        url: '/user/creat',
        describe: '',
        status: 1
    },{
        id: 6,
        name: '查看报告',
        url: '/watch/reports',
        describe: '',
        status: 1
    }],
    collections: {
        sys_user_info: 'sys_user_info',
        sys_resource: 'sys_resource',
        charts: 'charts',
        reports: 'reports'
    }
}

module.exports = system;