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
              page: '/organization',
              translate: "MENU.ORGANIZATION",
              alignment: "center",
              toggle: "click",
              submenu: [
                {
                    title: "CREDIT_ORGANIZATION",
                    page: "/credit",
                    translate: "MENU.CREDIT_ORGANIZATION",
                },
                {
                    title: "DEBIT_ORGANIZATION",
                    page: "/debit",
                    translate: "MENU.DEBIT_ORGANIZATION",
                },
                {
                    title: 'ORGANIZATION_REVENUE_REPORT',
                    page: '/organization-revenue-report',
                    translate: "MENU.ORGANIZATION_REVENUE_REPORT"
                },
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
                                      
                  ],            
            },
            {
                title: 'OUR_REVENUE_REPORT',
                page: '/our-revenue-report',
                translate: "MENU.OUR_REVENUE_REPORT"
            },
                   
    ]
}