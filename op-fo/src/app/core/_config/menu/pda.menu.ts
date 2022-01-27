export const pdaMenuModule = {
    title: 'PDA',
    root: true,
    alignment: 'left',
    toggle: 'click',
    translate: 'MENU.PDA',
    page: '/pda',
    submenu: [
            {
              title: 'Store Processed Docs',
              page: '/store-nid-process-docs',
              translate: "MENU.STORE_PROCESSED_DOCS"
            },
            {
              title: 'Find Processed Docs',
              page: '/find-nid-process-docs',
              translate: "MENU.SEARCH_PROCESSED_DOCS"
            },
            {
              title: 'Verify Processed Docs',
              page: '/verify-nid-process-docs',
              translate: "MENU.VERIFY_PROCESSED_DOCS"
            },
       
    ]
}