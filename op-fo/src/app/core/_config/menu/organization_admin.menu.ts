export const organizationAdminMenuModule = {
    title: 'ORGANIZATION_ADMIN',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.ORGANIZATION_ADMIN',
    page: '/organization-admin',
    submenu: [
          {
                title: 'DATE_BASED_STATEMENT',
                page: '/generate-date-based-statement',
                translate: "MENU.DATE_BASED_STATEMENT"
            },

          {
              title: 'REVENUE_REPORT',
              page: '/revenue-report',
              translate: "MENU.REVENUE_REPORT"
          },
           {
                title: 'RECONCILIATION',
                page: '/store-nid-process-docs',
                translate: "MENU.RECONCILIATION"
            },
            {
              title: 'STATEMENT',
              page: '/store-nid-process-docs',
              translate: "MENU.STATEMENT"
            },
            {
              title: 'MONITORING',
              page: '/find-nid-process-docs',
              translate: "MENU.BALANCE_SHEET"
            },
            {
                title: 'CENTER_USER_RELATION',
                page: '/find-nid-process-docs',
                translate: "MENU.CENTER_USER_RELATION"
            },
            {
                title: 'CENTER',
                page: '/find-nid-process-docs',
                translate: "MENU.CENTER"
            }
       
    ]
}