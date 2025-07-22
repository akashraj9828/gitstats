module.exports = {
  apps : [{
    name: 'gitstats_api',
    script: 'app/index.js',
    instances: "max",
    autorestart: true,
    watch: false,
    exec_mode  : "cluster",
    max_memory_restart: '500M',
  }],
};
