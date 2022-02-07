export const organizationAdminMenuModule = {
    title: 'ORGANIZATION_ADMIN',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ORGANIZATION_ADMIN',
    page: '',
    submenu: [
          {
                title: 'DATE_BASED_STATEMENT',
                page: '/organization-admin/generate-date-based-statement',
                translate: "GENERATE_STATEMENT"
            },

          {
              title: 'REVENUE_REPORT',
              page: '/organization-admin/revenue-report',
              translate: "REVENUE_REPORT"
          },
        //    {
        //         title: 'RECONCILIATION',
        //         page: '/organization-admin/reconciliation',
        //         translate: "MENU.RECONCILIATION"
        //     },
            {
              title: 'BALANCE_SHEET',
              page: '/organization/balance-sheet',
              translate: "MENU.BALANCE_SHEET"
            },
          
            {
                title: 'CENTER',
                page: '/center',
                translate: "MENU.CENTER"
            }
       
    ]
}