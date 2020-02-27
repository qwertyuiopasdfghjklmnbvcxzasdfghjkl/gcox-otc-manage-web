import Main from './views/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['./views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['./views/error_page/404.vue'], resolve);
    }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => {
        require(['./views/error_page/401.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => {
        require(['./views/error_page/500.vue'], resolve);
    }
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home', title: '首页', name: 'home_index', component: resolve => {
                require(['./views/home/home.vue'], resolve);
            }
        },
        {
            path: 'ownspace', title: 'login.xgmm', name: 'ownspace_index', component: resolve => {
                require(['./views/own-space/own-space.vue'], resolve);
            }
        },
        {
            path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
                require(['./views/message/message.vue'], resolve);
            }
        }
    ]
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['./views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['./views/main_components/locking-page.vue'], resolve);
    }
};

export const kycRouter = [
    {
        path: '/kycauditing',
        name: 'kycauditing',
        title: 'nav.kycsh',
        component: Main,
        icon: 'briefcase',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KYC_AUDIT', 'ROLE_KYC_RECHECK'],
        },
        children: [
            {
                path: 'index', title: 'nav.kycsh', name: 'kycauditing_index', component: resolve => {
                    require(['./views/manage_kyc/auditing.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/kyccheck',
        name: 'kyccheck',
        title: 'nav.kycfh',
        component: Main,
        icon: 'folder',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KYC_RECHECK'],
        },
        children: [
            {
                path: 'index', title: 'nav.kycfh', name: 'kyccheck_index', component: resolve => {
                    require(['./views/manage_kyc/check.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/kycmanage',
        name: 'kycmanage',
        title: 'nav.kycgl',
        component: Main,
        icon: 'clipboard',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KYC_RECHECK'],
        },
        children: [
            {
                path: 'index', title: 'nav.kycgl', name: 'kycmanage_index', component: resolve => {
                    require(['./views/manage_kyc/manage.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/cashDeposit',
        name: 'cashDeposit',
        title: 'nav.kycbzjgl',
        component: Main,
        icon: 'social-bitcoin',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_KYC_RECHECK'],
        },
        children: [
            {
                path: 'index', title: 'nav.kycbzjgl', name: 'cashDeposit_index', component: resolve => {
                    require(['./views/manage_kyc/cashDeposit.vue'], resolve);
                }
            }
        ]
    }
];

export const otcRouter = [
    {
        path: '/otc_data_statistics',
        name: 'otc_data_statistics',
        title: 'nav.sjtj',
        component: Main,
        icon: 'arrow-graph-up-right',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.sjtj', name: 'otc_data_statistics_index', component: resolve => {
                    require(['./views/manage_otc/data_statistics.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/otc_merchant_review',
    //     name: 'otc_merchant_review',
    //     title: '商家审核',
    //     component: Main,
    //     icon: 'lock-combination',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: '商家审核', name: 'otc_merchant_review_index', component: resolve => {
    //                 require(['./views/manage_otc/merchant_review.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/otc_users',
        name: 'otc_users',
        title: 'nav.yhgl',
        component: Main,
        icon: 'person-stalker',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.yhgl', name: 'otc_users_index', component: resolve => {
                    require(['./views/manage_otc/users.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_paymentTerm',
        name: 'otc_paymentTerm',
        title: 'otc.skfs',
        component: Main,
        icon: 'social-bitcoin',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'otc.skfs', name: 'otc_paymentTerm_index', component: resolve => {
                    require(['./views/manage_otc/paymentTerm.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_ads',
        name: 'otc_ads',
        title: 'nav.gggl',
        component: Main,
        icon: 'chatbox',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.gggl', name: 'otc_ads_index', component: resolve => {
                    require(['./views/manage_otc/ads.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_orders',
        name: 'otc_orders',
        title: 'nav.ddgl',
        component: Main,
        icon: 'clipboard',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.ddgl', name: 'otc_orders_index', component: resolve => {
                    require(['./views/manage_otc/orders.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_deal',
        name: 'otc_deal',
        title: 'nav.qxgl',
        component: Main,
        icon: 'android-settings',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.qxgl', name: 'otc_deal_index', component: resolve => {
                    require(['./views/manage_otc/deal.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_appeals',
        name: 'otc_appeals',
        title: 'nav.ssgl',
        component: Main,
        icon: 'mic-a',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.ssgl', name: 'otc_appeals_index', component: resolve => {
                    require(['./views/manage_otc/appeals.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_auditing',
        name: 'otc_auditing',
        title: 'nav.shgl',
        component: Main,
        icon: 'ios-cog',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.shgl', name: 'otc_auditing_index', component: resolve => {
                    require(['./views/manage_otc/auditing.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/otc_bank',
        name: 'otc_bank',
        title: 'nav.khhgk',
        component: Main,
        icon: 'cash',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OTC_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.khhgk', name: 'otc_bank_index', component: resolve => {
                    require(['./views/manage_otc/otc_bank.vue'], resolve);
                }
            }
        ]
    }
];

export const benchmarkRouter = [
    {
        path: '/flatCurrency',
        name: 'flatCurrency',
        title: 'benchmark.fbhllq',
        component: Main,
        icon: 'network',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'benchmark.fbhllq', name: 'flatCurrency_index', component: resolve => {
                    require(['./views/manage_benchmark/flatCurrency.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/benchmark',
        name: 'benchmark',
        title: 'benchmark.jysjzj',
        component: Main,
        icon: 'arrow-graph-up-right',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'benchmark.jysjzj', name: 'benchmark_index', component: resolve => {
                    require(['./views/manage_benchmark/benchmark.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/benchmarkExchange',
        name: 'benchmarkExchange',
        title: 'benchmark.jzjys',
        component: Main,
        icon: 'stats-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'benchmark.jzjys', name: 'benchmarkExchange_index', component: resolve => {
                    require(['./views/manage_benchmark/benchmarkExchange.vue'], resolve);
                }
            }
        ]
    }
]

export const communityRouter = [
    {
        path: '/community_users',
        name: 'community_users',
        title: '社区管理',
        component: Main,
        icon: 'ios-cog',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: '社区用户管理', name: 'community_users_index', component: resolve => {
                    require(['./views/community/users.vue'], resolve);
                }
            }
        ]
    }
];

export const voteRouter = [
    {
        path: '/vote_data_count',
        name: 'vote_data_count',
        title: 'nav.sjtj',
        component: Main,
        icon: 'ios-pie-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.sjtj', name: 'vote_data_count_index', component: resolve => {
                    require(['./views/vote/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/vote_miner_query',
        name: 'vote_miner_query',
        title: '用户投票挖矿查询',
        component: Main,
        icon: 'ios-box',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: '用户投票挖矿查询', name: 'vote_query_index', component: resolve => {
                    require(['./views/vote/query.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/vote_record',
        name: 'vote_record',
        title: '投票记录',
        component: Main,
        icon: 'ios-copy-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: '投票记录', name: 'vote_record_index', component: resolve => {
                    require(['./views/vote/vote.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/vote_miner_dispense',
        name: 'vote_miner_dispense',
        title: '挖矿分发记录',
        component: Main,
        icon: 'ios-list',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: '挖矿分发记录', name: 'vote_dispense_index', component: resolve => {
                    require(['./views/vote/dispense.vue'], resolve);
                }
            }
        ]
    },
];

export const exchangeRouter = [
    {
        path: '/exchange_data_statistics',
        name: 'exchange_data_statistics',
        title: 'nav.sjtj',
        component: Main,
        icon: 'ios-timer-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.sjtj', name: 'exchange_data_statistics_index', component: resolve => {
                    require(['./views/manage_exchange/data_statistics.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/exchange_users',
        name: 'exchange_users',
        title: 'nav.yhgl',
        component: Main,
        icon: 'person',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'nav.yhgl', name: 'exchange_users_index', component: resolve => {
                    require(['./views/manage_exchange/users.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/exchange_coins',
        name: 'exchange_coins',
        title: 'nav.bzgl',
        component: Main,
        icon: 'toggle-filled',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.bzgl', name: 'exchange_coins_index', component: resolve => {
                    require(['./views/manage_exchange/coins.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/exchange_markets',
        name: 'exchange_markets',
        title: 'nav.jyscgl',
        component: Main,
        icon: 'shuffle',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.jyscgl', name: 'exchange_markets_index', component: resolve => {
                    require(['./views/manage_exchange/markets.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/entrust',
    //     name: 'entrust',
    //     title: 'nav.wtgl',
    //     component: Main,
    //     icon: 'briefcase',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         { path: 'index', title: 'nav.wtgl', name: 'entrust_index',
    //             component: resolve => { require(['./views/manage_exchange/entrust.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/trade',
    //     name: 'trade',
    //     title: 'nav.jycx',
    //     component: Main,
    //     icon: 'ios-infinite',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         { path: 'index', title: 'nav.jycx', name: 'trade_index',
    //             component: resolve => { require(['./views/manage_exchange/trade.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/buy-sell',
    //     name: 'buy-sell',
    //     title: 'nav.m1m2',
    //     component: Main,
    //     icon: 'ios-cart',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         { path: 'index', title: 'nav.m1m2', name: 'buy-sell_index',
    //             component: resolve => { require(['./views/manage_exchange/buy-sell.vue'], resolve); } }
    //     ]
    // },
    {
        path: '/exchange_address',
        name: 'exchange_address',
        title: 'nav.dzgl',
        component: Main,
        icon: 'ionic',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'index', title: 'nav.dzgl', name: 'exchange_address_index', component: resolve => {
                    require(['./views/manage_exchange/exchange_address.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/public_link',
        name: 'public_link',
        title: 'nav.glgl',
        component: Main,
        icon: 'usb',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'public_link_index', title: 'nav.glgl', name: 'public_link_index', component: resolve => {
                    require(['./views/manage_exchange/public_link.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/section_price',
    //     name: 'section_price',
    //     title: 'nav.jgfpgl',
    //     component: Main,
    //     icon: 'pie-graph',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         {
    //             path: 'section_price_index', title: 'nav.jgfpgl', name: 'section_price_index', component: resolve => {
    //                 require(['./views/manage_exchange/section_price.vue'], resolve);
    //             }
    //         }
    //     ]
    // }
];
export const rankRouter = [
    {
        path: '/userRank',
        name: 'userRank',
        title: 'nav.yhjbgl',
        component: Main,
        icon: 'pie-graph',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_USER_LEVEL_MANAGER'],
        },
        children: [
            {
                path: 'userRank_index', title: 'nav.yhjbgl', name: 'userRank_index', component: resolve => {
                    require(['./views/manage_rank/userRank.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/dealVal',
        name: 'dealVal',
        title: 'nav.jylcx',
        component: Main,
        icon: 'stats-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_USER_LEVEL_MANAGER'],
        },
        children: [
            {
                path: 'dealVal_index', title: 'nav.jylcx', name: 'dealVal_index', component: resolve => {
                    require(['./views/manage_rank/dealVal.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/classRule',
        name: 'classRule',
        title: 'nav.fjgz',
        component: Main,
        icon: 'network',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_USER_LEVEL_MANAGER'],
        },
        children: [
            {
                path: 'classRule_index', title: 'nav.fjgz', name: 'classRule_index', component: resolve => {
                    require(['./views/manage_rank/classRule.vue'], resolve);
                }
            }
        ]
    }
];
export const inviteRouter = [
    {
        path: '/info',
        name: 'info',
        title: 'invite.yqxxcx',
        component: Main,
        icon: 'stats-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'info-list', title: 'invite.yqxxcx', name: 'info_index', component: resolve => {
                    require(['./views/manage_invite/info.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/relation',
        name: 'relation',
        title: 'invite.yqgxcx',
        component: Main,
        icon: 'network',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'relation-list', title: 'invite.yqgxcx', name: 'relation_index', component: resolve => {
                    require(['./views/manage_invite/relation.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/relation-update',
        name: 'relation-update',
        title: 'invite.yqgxxg',
        component: Main,
        icon: 'ios-paper-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'relation-update-list',
                title: 'invite.yqgxxg',
                name: 'relation-update_index',
                component: resolve => {
                    require(['./views/manage_invite/relation-update.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/rake-back',
        name: 'rake-back',
        title: 'invite.yqfycx',
        component: Main,
        icon: 'card',
        meta: {
            roles: ['ROLE_ADMIN','ROLE_OPERATION','ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'rake-back-list', title: 'invite.yqfycx', name: 'rake-back-list', component: resolve => {
                    require(['./views/manage_invite/rake-back.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/rake-record',
        name: 'rake-record',
        title: 'invite.yqfyjl',
        component: Main,
        icon: 'clipboard',
        meta: {
            roles: ['ROLE_ADMIN','ROLE_OPERATION','ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'rake-record-list', title: 'invite.yqfyjl', name: 'rake-record-list', component: resolve => {
                    require(['./views/manage_invite/rake-record.vue'], resolve);
                }
            },
        ]
    }
];
export const lockRouter = [
    {
        path: '/lock',
        name: 'lock',
        title: 'exchange.sjtj',
        component: Main,
        icon: 'stats-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'data-list', title: 'exchange.sjtj', name: 'data-list', component: resolve => {
                    require(['./views/manage_lock/data-list.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/lock-search',
        name: 'lockSearch',
        title: 'nav.yhsccx',
        component: Main,
        icon: 'eye',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'lock-search', title: 'nav.yhsccx', name: 'lock-search', component: resolve => {
                    require(['./views/manage_lock/lock-search.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/lock-list',
        name: 'lockList',
        title: 'exchange.scjl',
        component: Main,
        icon: 'ios-list',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'lock-list', title: 'exchange.scjl', name: 'lock-list', component: resolve => {
                    require(['./views/manage_lock/lock-list.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/lock-up',
        name: 'lock-up',
        title: 'exchange.scffjl',
        component: Main,
        icon: 'ios-barcode',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_CUSTOMER'],
        },
        children: [
            {
                path: 'lock-up-list', title: 'exchange.scffjl', name: 'lock-up-list', component: resolve => {
                    require(['./views/manage_lock/lock-up-list.vue'], resolve);
                }
            }
        ]
    },
];
export const ieoRouter = [
    {
        path: '/ieo',
        name: 'ieo_project',
        title: 'nav.xmgl',
        component: Main,
        icon: 'beaker',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'ieo_project', title: 'nav.xmgl', name: 'ieo_project_index', component: resolve => {
                    require(['./views/manage_ieo/ieo_project.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/ieo',
        name: 'record',
        title: 'nav.sgjl',
        component: Main,
        icon: 'ios-paper-outline',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'record', title: 'nav.sgjl', name: 'record_index', component: resolve => {
                    require(['./views/manage_ieo/record.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/ieo',
        name: 'new_project',
        title: 'nav.xjxm',
        component: Main,
        icon: 'android-add',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'new_project', title: 'nav.xjxm', name: 'new_project_index', component: resolve => {
                    require(['./views/manage_ieo/new_project.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/ieo',
        name: 'ieo_params',
        title: 'nav.ieocs',
        component: Main,
        icon: 'android-options',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'ieo_params', title: 'nav.ieocs', name: 'ieo_params_index', component: resolve => {
                    require(['./views/manage_ieo/ieo_params.vue'], resolve);
                }
            }
        ]
    }
];

export const financeRouter = [
    {
        path: '/finance_finance',
        name: 'finance_finance',
        title: 'nav.cwgl',
        component: Main,
        icon: 'connection-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'nav.cwgl', name: 'finance_finance_index', component: resolve => {
                    require(['./views/manage_finance/finance.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/recharge',
        name: 'recharge',
        title: 'nav.czgl',
        component: Main,
        icon: 'battery-charging',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'nav.czgl', name: 'recharge_index', component: resolve => {
                    require(['./views/manage_finance/recharge.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/thirdparty',
    //     name: 'thirdparty',
    //     title: 'nav.dsfczlb',
    //     component: Main,
    //     icon: 'android-exit',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
    //     },
    //     children: [
    //         {
    //             path: 'thirdparty_index', title: 'nav.dsfczlb', name: 'thirdparty_index', component: resolve => {
    //                 require(['./views/manage_finance/thirdparty.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/finance_withdraw',
        name: 'finance_withdraw',
        title: 'nav.tbsh',
        component: Main,
        icon: 'soup-can-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE', 'ROLE_WITHDRAW_AUDIT'],
        },
        children: [
            {
                path: 'index', title: 'nav.tbsh', name: 'finance_withdraw_index', component: resolve => {
                    require(['./views/manage_finance/withdraw.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/finance_withdraw_list',
        name: 'finance_withdraw_list',
        title: 'exchange.tbjl',
        component: Main,
        icon: 'ios-list-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'exchange.tbjl', name: 'finance_withdraw_list_index', component: resolve => {
                    require(['./views/manage_finance/withdraw/withdraw_list.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/finance_moneyLimit',
        name: 'finance_moneyLimit',
        title: 'nav.tbxe',
        component: Main,
        icon: 'ios-list-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'nav.tbxe', name: 'finance_moneyLimit_index', component: resolve => {
                    require(['./views/manage_finance/moneyLimit.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/bank_data',
    //     name: 'bank_data',
    //     title: 'nav.ussdyhzl',
    //     component: Main,
    //     icon: 'card',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.ussdyhzl', name: 'bank_data_index', component: resolve => {
    //                 require(['./views/manage_finance/bank_data.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/ussd_list',
    //     name: 'ussd_list',
    //     title: 'nav.ussdtxjl',
    //     component: Main,
    //     icon: 'document-text',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.ussdtxjl', name: 'ussd_list_index',
    //             component: resolve => {
    //                 require(['./views/manage_finance/ussd_list.vue'], resolve);
    //             }
    //         }
    //     ]
    // },{
    //     path: '/sato_list',
    //     name: 'sato_list',
    //     title: 'nav.satotxjl',
    //     component: Main,
    //     icon: 'shuffle',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.satotxjl', name: 'sato_list_index',
    //             component: resolve => {
    //                 require(['./views/manage_finance/sato_list.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/finance_user',
        name: 'finance_user',
        title: 'nav.yhzc',
        component: Main,
        icon: 'pie-graph',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'nav.yhzc', name: 'finance_user_index', component: resolve => {
                    require(['./views/manage_finance/user_finance.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/account_manage',
        name: 'account_manage',
        title: 'nav.pzgl',
        component: Main,
        icon: 'monitor',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_REBALANCE_ACCOUNT'],
        },
        children: [
            {
                path: 'index', title: 'nav.pzgl', name: 'account_manage_index', component: resolve => {
                    require(['./views/manage_finance/account_manage.vue'], resolve);
                }
            },
        ]
    },
    // {
    //     path: '/usds_recharge',
    //     name: 'usds_recharge',
    //     title: 'nav.ussdcz',
    //     component: Main,
    //     icon: 'radio-waves',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_USSD_RECHARGE'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.ussdcz', name: 'usds_recharge_index', component: resolve => {
    //                 require(['./views/manage_finance/usds_recharge.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/internal_transfer',
        name: 'internal_transfer',
        title: 'nav.nbzz',
        component: Main,
        icon: 'ios-loop-strong',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_TRANSFER_ADMIN']
        },
        children: [
            {
                path: 'index', title: 'nav.nbzz', name: 'internal_transfer_index', component: resolve => {
                    require(['./views/manage_finance/internal_transfer.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/change_sato_data',
    //     name: 'change_sato_data',
    //     title: 'nav.satoslxg',
    //     component: Main,
    //     icon: 'ios-compose',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_SATO_RECHARGE'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.satoslxg', name: 'change_sato_data_index', component: resolve => {
    //                 require(['./views/manage_finance/change_sato_data.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/virtual',
        name: 'virtual',
        title: 'nav.xnct',
        component: Main,
        icon: 'arrow-swap',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'index', title: 'nav.xnct', name: 'virtual_index', component: resolve => {
                    require(['./views/manage_finance/virtual.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/minersFee',
        name: 'minersFee',
        title: 'nav.kgfff',
        component: Main,
        icon: 'stats-bars',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_FINANCE'],
        },
        children: [
            {
                path: 'index', title: 'nav.kgfff', name: 'minersFee_index', component: resolve => {
                    require(['./views/manage_finance/minersFee.vue'], resolve);
                }
            }
        ]
    }
];

export const mallRouter = [
    {
        path: '/mall',
        name: 'mall',
        title: 'nav.spgl',
        component: Main,
        icon: 'ios-filing',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_SHOP_MANAGER'],
        },
        children: [
            {
                path: 'index', title: 'nav.spgl', name: 'mall_index', component: resolve => {
                    require(['./views/manage_mall/product.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/mall_list',
        name: 'mall_list',
        title: 'nav.ddgl',
        component: Main,
        icon: 'ios-paper-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_SHOP_MANAGER'],
        },
        children: [
            {
                path: 'mall_list_index', title: 'nav.ddgl', name: 'mall_list_index', component: resolve => {
                    require(['./views/manage_mall/list.vue'], resolve);
                }
            }
        ]
    },
];
export const riskRouter = [
    // {
    //     path: '/risk_exchange',
    //     name: 'risk_exchange',
    //     title: 'nav.bbycyj',
    //     component: Main,
    //     icon: 'ios-alarm',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_FINANCE', 'ROLE_RISK_CONTROL'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.bbycyj', name: 'risk_exchange_index', component: resolve => {
    //                 require(['./views/manage_risk/exchange.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/risk_otc',
        name: 'risk_otc',
        title: 'nav.tocycyj',
        component: Main,
        icon: 'ios-speedometer',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_FINANCE', 'ROLE_RISK_CONTROL'],
        },
        children: [
            {
                path: 'index', title: 'nav.tocycyj', name: 'risk_otc_index', component: resolve => {
                    require(['./views/manage_risk/otc.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/risk_urgent',
        name: 'risk_urgent',
        title: 'nav.jjycyj',
        component: Main,
        icon: 'ios-timer',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_FINANCE', 'ROLE_RISK_CONTROL'],
        },
        children: [
            {
                path: 'index', title: 'nav.jjycyj', name: 'risk_urgent_index', component: resolve => {
                    require(['./views/manage_risk/urgent.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/risk_node',
        name: 'risk_node',
        title: 'nav.jdyjgz',
        component: Main,
        icon: 'network',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_RISK_CONTROL'],
        },
        children: [
            {
                path: 'index', title: 'nav.jdyjgz', name: 'risk_node_index', component: resolve => {
                    require(['./views/manage_risk/node.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/risk_markt',
    //     name: 'risk_markt',
    //     title: 'nav.scyjgz',
    //     component: Main,
    //     icon: 'ios-bookmarks-outline',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_RISK_CONTROL'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.scyjgz', name: 'risk_markt_index', component: resolve => {
    //                 require(['./views/manage_risk/markt.vue'], resolve);
    //             }
    //         }
    //     ]
    // }
];

export const operationRouter = [
    {
        path: '/operation_cms',
        name: 'operation_cms',
        title: 'nav.cmsgl',
        component: Main,
        icon: 'ios-paper-outline',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.cmsgl', name: 'operation_cms_index', component: resolve => {
                    require(['./views/manage_operation/cms.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/operation_distribute',
        name: 'operation_distribute',
        title: 'nav.ff',
        component: Main,
        icon: 'ios-paper',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.ff', name: 'operation_distribute_index', component: resolve => {
                    require(['./views/manage_operation/distribute.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/operation_activity',
        name: 'operation_activity',
        title: 'nav.tghd',
        component: Main,
        icon: 'ios-bell',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.tghd', name: 'operation_activity_index', component: resolve => {
                    require(['./views/manage_operation/promotion_activities.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/app_activities',
    //     name: 'app_activities',
    //     title: 'nav.apptghd',
    //     component: Main,
    //     icon: 'ios-bell',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.apptghd', name: 'app_activities_index', component: resolve => {
    //                 require(['./views/manage_operation/app_activities.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/operation_market',
    //     name: 'operation_market',
    //     title: 'nav.tjsc',
    //     icon: 'social-dropbox',
    //     component: Main,
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
    //     },
    //     children: [
    //         {
    //             path: 'index', title: 'nav.tjsc', name: 'operation_market_index', component: resolve => {
    //                 require(['./views/manage_operation/operation_market.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/operation_placard',
        name: 'operation_placard',
        title: 'nav.gg',
        component: Main,
        icon: 'android-clipboard',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'index', title: 'nav.gg', name: 'operation_placard_index', component: resolve => {
                    require(['./views/manage_operation/operation_placard.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/operation_app',
        name: 'operation_app',
        title: 'nav.appfb',
        component: Main,
        icon: 'social-apple-outline',
        meta: {
            roles: ['ROLE_ADMIN']
        },
        children: [
            {
                path: 'operation_app_index',
                title: 'nav.appfb',
                name: 'operation_app_index',
                component: resolve => {
                    require(['./views/manage_operation/operation_app.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/operation_i18n',
        name: 'operation_i18n',
        title: 'nav.gjhgl',
        component: Main,
        icon: 'ios-world',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION']
        },
        children: [
            {
                path: 'operation_i18n_index',
                title: 'nav.gjhgl',
                name: 'operation_i18n_index',
                component: resolve => {
                    require(['./views/manage_operation/operation_i18n.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/operation_lang',
        name: 'operation_lang',
        title: 'nav.dyysz',
        component: Main,
        icon: 'ios-pulse-strong',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_OPERATION']
        },
        children: [
            {
                path: 'operation_lang_index',
                title: 'nav.dyysz',
                name: 'operation_lang_index',
                component: resolve => {
                    require(['./views/manage_operation/operation_lang.vue'], resolve);
                }
            }
        ]
    }
];

export const reportRouter = [
    // {
    //     path: '/report',
    //     name: 'report',
    //     title: 'nav.dsfdcsj',
    //     component: Main,
    //     icon: 'android-archive',
    //     meta: {
    //         roles: ['ROLE_ADMIN', 'ROLE_REPORT_MANAGER'],
    //     },
    //     children: [
    //         {
    //             path: 'report_index', title: 'nav.dsfdcsj', name: 'report_index', component: resolve => {
    //                 require(['./views/manage_report/export_data.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/report_daily',
        name: 'report_daily',
        title: 'nav.mrbb',
        component: Main,
        icon: 'archive',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_REPORT_MANAGER'],
        },
        children: [
            {
                path: 'report_daily_index', title: 'nav.mrbb', name: 'report_daily_index', component: resolve => {
                    require(['./views/manage_report/export_daily.vue'], resolve);
                }
            }
        ]
    },
     {
        path: '/report_history',
        name: 'report_history',
        title: 'nav.lsshcx',
        component: Main,
        icon: 'archive',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'report_history_index', title: 'nav.mrbb', name: 'report_history_index', component: resolve => {
                    require(['./views/manage_report/history.vue'], resolve);
                }
            }
        ]
    },
     {
        path: '/report_statistics',
        name: 'report_statistics',
        title: 'nav.tjzbgl',
        component: Main,
        icon: 'archive',
        meta: {
            roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_OPERATION'],
        },
        children: [
            {
                path: 'report_statistics_index', title: 'nav.mrbb', name: 'report_statistics_index', component: resolve => {
                    require(['./views/manage_report/statistics.vue'], resolve);
                }
            }
        ]
    },
    {
       path: '/fee_details',
       name: 'fee_details',
       title: 'report.sxfxqb',
       component: Main,
       icon: 'archive',
       meta: {
           roles: ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_OPERATION'],
       },
       children: [
           {
               path: 'fee_details_index', title: 'report.sxfxqb', name: 'fee_details_index', component: resolve => {
                   require(['./views/manage_report/fee_details.vue'], resolve);
               }
           }
       ]
   }
];

export const adminRouter = [
    {
        path: '/admin',
        name: 'admin',
        title: 'nav.glyqxgl',
        component: Main,
        icon: 'android-settings',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'index', title: 'nav.glyqxgl', name: 'admin_index', component: resolve => {
                    require(['./views/manage_admin/index.vue'], resolve);
                }
            }
        ]
    }
];

export const systemConfigRouter = [
    {
        path: '/systemconfig',
        name: 'systemconfig',
        title: 'nav.bbjycs',
        component: Main,
        icon: 'android-options',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'index', title: 'nav.bbjycs', name: 'systemconfig_index', component: resolve => {
                    require(['./views/manage_systemconfig/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'system',
        title: 'nav.otcjysz',
        component: Main,
        icon: 'ios-cog',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'otc_index', title: 'nav.otcjysz', name: 'otc_index', component: resolve => {
                    require(['./views/manage_systemconfig/otcTradeSet.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/legal',
        name: 'legal',
        title: 'nav.otcfbgl',
        component: Main,
        icon: 'ios-cog',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'legal_index', title: 'nav.otcfbgl', name: 'legal_index', component: resolve => {
                    require(['./views/manage_systemconfig/legalTenderSet.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/trade-rate',
        name: 'trade-rate',
        title: 'nav.otcjyfl',
        component: Main,
        icon: 'ios-pie-outline',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'trade-rate_index', title: 'nav.otcjyfl', name: 'trade-rate_index', component: resolve => {
                    require(['./views/manage_systemconfig/tradeRate.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/sys',
        name: 'sys',
        title: 'nav.xtcssz',
        component: Main,
        icon: 'ios-settings-strong',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'sys_index', title: 'nav.xtcssz', name: 'sys_index', component: resolve => {
                    require(['./views/manage_systemconfig/systemConfig.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/addwithdrawal',
        name: 'addwithdrawal',
        title: 'nav.sxfzhsz',
        component: Main,
        icon: 'ios-toggle',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'addwithdrawal_index',
                title: 'nav.sxfzhsz',
                name: 'addwithdrawal_index',
                component: resolve => {
                    require(['./views/manage_systemconfig/addWithdrawal.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     path: '/yollon',
    //     name: 'yollon',
    //     title: 'nav.scskzhsz',
    //     component: Main,
    //     icon: 'cash',
    //     meta: {
    //         roles: ['ROLE_ADMIN'],
    //     },
    //     children: [
    //         {
    //             path: 'yollon_index',
    //             title: 'nav.scskzhsz',
    //             name: 'yollon_index',
    //             component: resolve => {
    //                 require(['./views/manage_systemconfig/yollon.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    {
        path: '/addaddress',
        name: 'addaddress',
        title: 'nav.tbzdzsz',
        component: Main,
        icon: 'settings',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'addaddress_index',
                title: 'nav.tbzdzsz',
                name: 'addaddress_index',
                component: resolve => {
                    require(['./views/manage_systemconfig/addAddress.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/special_account',
        name: 'special_account',
        title: 'nav.tszhgl',
        component: Main,
        icon: 'person',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'special_account_index',
                title: 'nav.tszhgl',
                name: 'special_account_index',
                component: resolve => {
                    require(['./views/manage_systemconfig/special_account.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/poolwallet',
        name: 'poolwallet',
        title: 'nav.bcqbzlcs',
        component: Main,
        icon: 'ios-bookmarks',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'poolwallet_index',
                title: 'nav.bcqbzlcs',
                name: 'poolwallet_index',
                component: resolve => {
                    require(['./views/manage_systemconfig/poolWallet.vue'], resolve);
                }
            }
        ]
    }
];

export const systemLogsRouter = [
    {
        path: '/systemlogs',
        name: 'systemlogs',
        title: 'nav.xtrz',
        component: Main,
        icon: 'ios-list',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'index', title: 'nav.xtrz', name: 'systemlogs_index', component: resolve => {
                    require(['./views/manage_systemlogs/index.vue'], resolve);
                }
            }
        ]
    }
];

export const monitoringRouter = [
    {
        path: '/monitoring',
        name: 'monitoring',
        title: 'nav.txsblb',
        component: Main,
        icon: 'heart-broken',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'index', title: 'nav.txsblb', name: 'monitoring_index', component: resolve => {
                    require(['./views/manage_monitoring/index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/congestion',
        name: 'congestion',
        title: 'nav.txydlb',
        component: Main,
        icon: 'clipboard',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'congestion_index', title: 'nav.txydlb', name: 'congestion_index', component: resolve => {
                    require(['./views/manage_monitoring/congestion_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/withdraw',
        name: 'withdraw',
        title: 'nav.txjllb',
        component: Main,
        icon: 'ios-paper',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'withdraw_index', title: 'nav.txjllb', name: 'withdraw_index', component: resolve => {
                    require(['./views/manage_monitoring/withdraw_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/collection',
        name: 'collection',
        title: 'nav.gjjllb',
        component: Main,
        icon: 'arrow-shrink',
        meta: {
            roles: ['ROLE_DEVELOP']
        },
        children: [
            {
                path: 'collection_index',
                title: 'nav.gjjllb',
                name: 'collection_index',
                component: resolve => {
                    require(['./views/manage_monitoring/collection.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/block',
        name: 'block',
        title: 'nav.qkqrlb',
        component: Main,
        icon: 'ios-photos',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'block_index', title: 'nav.qkqrlb', name: 'block_index', component: resolve => {
                    require(['./views/manage_monitoring/block_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/account_msg',
        name: 'account_msg',
        title: 'nav.zzhxx',
        component: Main,
        icon: 'ios-person',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'account_msg_index', title: 'nav.zzhxx', name: 'account_msg_index', component: resolve => {
                    require(['./views/manage_monitoring/account_msg_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/accountInofo',
        name: 'accountInofo',
        title: 'nav.yhzhxx',
        component: Main,
        icon: 'ios-people',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'accountInofo_index', title: 'nav.yhzhxx', name: 'accountInofo_index', component: resolve => {
                    require(['./views/manage_monitoring/accountInofo_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/userPooledMining',
        name: 'userPooledMining',
        title: 'nav.yhbcxx',
        component: Main,
        icon: 'social-bitcoin',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'userPooledMining_index',
                title: 'nav.yhbcxx',
                name: 'userPooledMining_index',
                component: resolve => {
                    require(['./views/manage_monitoring/user_pooled_mining.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/ETHNounce',
        name: 'ETHNounce',
        title: 'nav.enz',
        component: Main,
        icon: 'android-locate',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'ETHNounce_index',
                title: 'nav.enz',
                name: 'ETHNounce_index',
                component: resolve => {
                    require(['./views/manage_monitoring/ETHNounce.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/node_msg',
        name: 'node_msg',
        title: 'nav.jdxx',
        component: Main,
        icon: 'network',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'node_msg_index', title: 'nav.jdxx', name: 'node_msg_index', component: resolve => {
                    require(['./views/manage_monitoring/node_msg_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/error_log',
        name: 'error_log',
        title: 'nav.cwrz',
        component: Main,
        icon: 'bug',
        meta: {
            roles: ['ROLE_DEVELOP'],
        },
        children: [
            {
                path: 'error_log_index', title: 'nav.cwrz', name: 'error_log_index', component: resolve => {
                    require(['./views/manage_monitoring/error_log_index.vue'], resolve);
                }
            }
        ]
    },
];

export const fundRouter = [
    {
        path: '/coldWalletSet',
        name: 'coldWalletSet',
        title: 'nav.lqbsz',
        component: Main,
        icon: 'steam',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'coldWalletSet_index', title: 'nav.lqbsz', name: 'coldWalletSet_index', component: resolve => {
                    require(['./views/manage_fund/coldWalletSet_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/addressSet',
        name: 'addressSet',
        title: 'nav.zdzzlqbsz',
        component: Main,
        icon: 'pull-request',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'addressSet_index', title: 'nav.zdzzlqbsz', name: 'addressSet_index', component: resolve => {
                    require(['./views/manage_fund/addressSet_index.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/transferRecord',
        name: 'transferRecord',
        title: 'nav.zzjl',
        component: Main,
        icon: 'ios-loop-strong',
        meta: {
            roles: ['ROLE_ADMIN'],
        },
        children: [
            {
                path: 'transferRecord_index', title: 'nav.zzjl', name: 'transferRecord_index', component: resolve => {
                    require(['./views/manage_fund/transferRecord_index.vue'], resolve);
                }
            }
        ]
    }
];

export const appRouter = [

];

export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...kycRouter,
    ...otcRouter,
    ...benchmarkRouter,
    ...exchangeRouter,
    ...communityRouter,
    ...voteRouter,
    ...rankRouter,
    ...inviteRouter,
    ...lockRouter,
    ...ieoRouter,
    ...financeRouter,
    ...riskRouter,
    ...mallRouter,
    ...operationRouter,
    ...adminRouter,
    ...reportRouter,
    ...systemConfigRouter,
    ...systemLogsRouter,
    ...appRouter,
    ...monitoringRouter,
    ...fundRouter,
    page500,
    page401,
    page404
];
