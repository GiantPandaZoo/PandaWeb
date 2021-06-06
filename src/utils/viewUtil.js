export function getPageTitle({pathname}, routerData = []) {
    let title = '';
    const tItem = routerData.find((item) => {
        return item.path === pathname;
    });
    if (tItem) {
        return tItem.title;
    }
    return title;
}
