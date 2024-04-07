module.exports = {
    "apps" : [{
        "name": "Chat",
        "script": "bin/www",
        "instances": "1",
        "exec_mode": "fork",
        "watch": true,
        "append_env_to_name": false,
        "env": {
            "NODE_ENV": "dev",
            "PORT": 3000
        }
    }],
    "deploy" : {
        "post-deploy" : "pm2 startOrReload ecosystem.json"
    }
}
