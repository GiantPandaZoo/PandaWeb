function getTheme({buildConfig}) {
    try {
        if (buildConfig && buildConfig.theme) {
            return buildConfig.theme;
        }
        return null;
    } catch (e) {
        console.error(e);
        console.log(
            `need config:
            "buildConfig":{
                "theme": {                   
                    "alifd": "@alifd/xxx",    
                }
            }`
        );
    }
}

module.exports = getTheme;
