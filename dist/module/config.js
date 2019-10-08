/* 
 * 2018-11 WQ添加
 * config.js主要是定义一些基础变量，提供获取缓存数据的一些方法
 */
layui.define(function (exports) {

    var config = {
		//生产环境
		// serverUrl: '/cardlogoff',
		
		//测试环境
		//卡注销-陈帅电脑
        // serverUrl: 'http://10.7.4.20:6060',
		
		//卡注销-测试服务器
        serverUrl: 'http://10.237.5.11:6021',
		
		
		
		
        tableName: 'sbweb', // 存储表名
        autoRender: false, // 窗口大小改变后是否自动重新渲染表格，解决layui数据表格非响应式的问题
        cacheTab: false, //是否缓存tab页
        tabAutoRefresh: false, //是否点击自动刷新
        openFooter: false, // 是否开启底部
        // 获取缓存的token
        getToken: function () {
            var t = layui.data(config.tableName).token;
            if (t) {
                return JSON.parse(t);
            }
        },
        // 清除token
        removeToken: function () {
            layui.data(config.tableName, {
                key: 'token',
                remove: true
            });
        },
        // 缓存token
        putToken: function (token) {
            layui.data(config.tableName, {
                key: 'token',
                value: JSON.stringify(token)
            });
        },
        // ***导航菜单JSON格式参考***
        menus: [{
            "title": '主页',
            "icon": 'layui-icon-home', //取自阿里巴巴矢量图标库，需下载字体文件
            "children": [{
                "title": '主页一',
                "href": 'console.html',
                "spread": false // 代表展开或选中，默认选中时需设为true
            }]
        }, {
            "title": "项目管理",
            "icon": "icon-xiangmuguanli",
            "spread": false,
            "children": [{
                "title": "全部项目",
                "href": "pages/all_items/All_items.html",
                "spread": false,
                // "children":[]  //有三级菜单继续添加
            },
                {
                    "title": "项目发起",
                    "href": "pages/item_launch/item_launch.html",
                    "spread": false
                }
            ]
        }],
        // 当前登录的用户
        getUser: function () {
            var u = layui.data(config.tableName).login_user;
            if (u) {
                return JSON.parse(u);
            }
        },
        // 清除User
        removeUser: function () {
            layui.data(config.tableName, {
                key: 'login_user',
                remove: true
            });
        },
        // 缓存user
        putUser: function (user) {
            layui.data(config.tableName, {
                key: 'login_user',
                value: JSON.stringify(user)
            });
        },
        // 设置请求头，添加token等
        getAjaxHeaders: function () {
            var a = [],
                // c = config.getToken();
                siteTempData = JSON.parse(sessionStorage.getItem("tempData")),
                c = siteTempData.tokenSite;
            if (!c) return sessionStorage.removeItem("tempData"),
                layer.msg("登录过期,请重新登录", {
                        icon: 2,
                        time: 1500
                    },
                    function () {
                        top.location.replace('login.html')
                    });
            a.push({
                name: "token",
                value: c
            });
            return a
        },
        // 请求结束后  进行预处理 返回错误代码需与后台约定
        ajaxSuccessBefore: function (a) {
            if (401 == a.code) {
                return sessionStorage.removeItem("tempData"),
                    layer.msg("登录过期", {
                            icon: 2,
                            time: 1500
                        },
                        function () {
                            top.location.replace('login.html')
                        }),
                    !1;
            }
            if (402 == a.code) {
                return layer.msg("没有访问权限", {
                    icon: 2
                }), !1;
            }
            403 == a.code ? layer.msg("没有访问权限", {
                icon: 2
            }) : 404 == a.code && layer.msg("404目标不存在", {
                icon: 2
            });
            return !0
        }
    };
    exports('config', config);
});