export const financialManagerMenuModule = {
    title: 'FINANCE',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.FINANCE',
    page: '',
    submenu: [

            {
              title: 'Organization',
              page: '',
              translate: "MENU.ORGANIZATION",
              alignment: "center",
              toggle: "click",
              submenu: [
                {
                    title: "CREDIT_ORGANIZATION",
                    page: "/organization/credit",
                    translate: "MENU.CREDIT_ORGANIZATION",
                },
                {
                    title: "DEBIT_ORGANIZATION",
                    page: "/organization/debit",
                    translate: "MENU.DEBIT_ORGANIZATION",
                },
                {
                  title: "ORGANIZATION_BALANCE_SHEET",
                  page: "/organization/balance-sheet",
                  translate: "MENU.ORGANIZATION_BALANCE_SHEET",
                },
                {
                    title: 'ORGANIZATION_REVENUE_REPORT',
                    page: '/organization-admin/generate-date-based-statement',
                    translate: "MENU.ORGANIZATION_REVENUE_REPORT"
                }
              ]
            },
            {
              title: 'AGENT',
              page: '/agent',
              translate: "MENU.AGENT",
              alignment: "center",
              toggle: "click",
              submenu: [
                    {
                      title: "CREDIT_AGENT",
                      page: "/credit",
                      translate: "MENU.CREDIT_AGENT",
                    },
                    {
                      title: "DEBIT_AGENT",
                      page: "/debit",
                      translate: "MENU.DEBIT_AGENT",
                    },
                    {
                        title: 'AGENT_REVENUE_REPORT',
                        page: '/agent-revenue-report',
                        translate: "MENU.AGENT_REVENUE_REPORT"
                    },
                    {
                      title: 'AGENT_BALANCE_SHEET',
                      page: '/agent-balance-sheet',
                      translate: "MENU.AGENT_BALANCE_SHEET"
                    },

                    {
                      title: 'AGENT_MAKE_PAYMENT',
                      page: '/agent-make-payment',
                      translate: "MENU.AGENT_MAKE_PAYMENT"
                    },
                                      
                  ],            
            },
            {
                title: 'OUR_REVENUE_REPORT',
                page: '/our-revenue-report',
                translate: "MENU.OUR_REVENUE_REPORT"
            },
                   
    ]
}