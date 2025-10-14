module.exports = {
  apps: [{
    name: 'servidor-email',
    script: './server.js',
    instances: 1, // ou 'max' para usar todos os cores
    exec_mode: 'cluster', // ou 'fork'
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    max_memory_restart: '500M',
    watch: false,
    ignore_watch: ['node_modules', 'logs', '.git'],
    // Auto restart se CPU > 80%
    max_restarts: 10,
    min_uptime: '10s'
  }]
};