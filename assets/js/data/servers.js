/*
 * WinTools — data/servers.js
 * Command & tool reference for server administration: web servers, databases,
 * Windows Server roles, containers, services, monitoring and backups.
 * Loaded by servers.html; exposed as WT.data.servers.
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};
  WT.data = WT.data || {};

  WT.data.serverCats = [
    { key: 'web', label: 'Web Servers' },
    { key: 'db', label: 'Databases' },
    { key: 'win', label: 'Windows Server' },
    { key: 'docker', label: 'Containers (Docker)' },
    { key: 'svc', label: 'Services & Processes' },
    { key: 'monitor', label: 'Monitoring & Logs' },
    { key: 'backup', label: 'Backup & Cron' }
  ];

  WT.data.servers = [

    /* ---------------- web servers ---------------- */
    {
      cmd: 'nginx', cat: 'web',
      desc: 'The Nginx web server / reverse proxy — test config, reload and manage sites.',
      syntax: 'nginx [-t] [-s reload|stop|quit]',
      opts: [
        ['nginx -t', 'validate the configuration syntax before reloading'],
        ['nginx -s reload', 'gracefully reload without dropping connections'],
        ['nginx -s stop', 'fast shutdown'],
        ['nginx -s quit', 'graceful shutdown (finish current requests)'],
        ['sites-available / sites-enabled', 'Debian/Ubuntu layout: enable a site with a symlink'],
        ['systemctl reload nginx', 'the service-based way to reload']
      ],
      examples: [
        'sudo nginx -t',
        'sudo systemctl reload nginx',
        'sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/',
        'sudo systemctl status nginx'
      ]
    },
    {
      cmd: 'nginx site config', cat: 'web',
      desc: 'The basic server block for a virtual host (site) in Nginx.',
      syntax: '/etc/nginx/sites-available/ME  →  server { ... }',
      opts: [
        ['listen 80; / listen 443 ssl;', 'the ports; 443 needs TLS enabled'],
        ['server_name', 'the domain(s) this vhost answers for'],
        ['root', 'the directory holding the site files'],
        ['index', 'the default directory index file'],
        ['location /', 'how to handle matching request paths'],
        ['include snippets/ssl', 'reuse shared TLS settings']
      ],
      examples: [
        'server {',
        '  listen 80;',
        '  server_name example.com;',
        '  root /var/www/example;',
        '  index index.html;',
        '  location / { try_files $uri $uri/ =404; }',
        '}'
      ]
    },
    {
      cmd: 'apache2 / httpd', cat: 'web',
      desc: 'The Apache HTTP server — enable modules/sites and manage the service.',
      syntax: 'apache2ctl [configtest|status|restart]   |   httpd [-t|-k reload]',
      opts: [
        ['apache2ctl configtest', 'check the configuration for errors'],
        ['a2ensite', 'enable a site (Debian/Ubuntu)'],
        ['a2dissite', 'disable a site'],
        ['a2enmod / a2dismod', 'enable / disable a module (e.g. ssl, rewrite)'],
        ['systemctl reload apache2', 'reload without dropping connections'],
        ['apachectl -S', 'show the parsed virtual hosts']
      ],
      examples: [
        'sudo apache2ctl configtest',
        'sudo a2ensite mysite.conf',
        'sudo a2enmod ssl rewrite',
        'sudo systemctl reload apache2'
      ]
    },
    {
      cmd: 'certbot (Let\'s Encrypt)', cat: 'web',
      desc: 'Obtain and renew free TLS certificates for your sites automatically.',
      syntax: 'certbot [--nginx | --apache | --standalone] -d DOMAIN',
      opts: [
        ['certbot --nginx -d example.com', 'get a cert and configure Nginx for you'],
        ['certbot --apache -d example.com', 'same, for Apache'],
        ['certbot certonly', 'just obtain the cert without touching the web server'],
        ['certbot renew', 'renew every certificate that is near expiry'],
        ['--dry-run', 'test renewal without really renewing'],
        ['certbot certificates', 'list the certificates you hold']
      ],
      examples: [
        'sudo certbot --nginx -d example.com -d www.example.com',
        'sudo certbot renew --dry-run',
        'sudo certbot certificates'
      ]
    },
    {
      cmd: 'openssl (TLS check)', cat: 'web',
      desc: "Inspect a live TLS handshake and a site's certificate from the command line.",
      syntax: 'openssl s_client -connect HOST:443 -servername HOST',
      opts: [
        ['-connect', 'the host and port to reach'],
        ['-servername', 'send SNI so the right certificate is returned'],
        ['-showcerts', 'print the whole chain'],
        ['quit', 'type "quit" then Enter to close the session'],
        ['verify return code: 0', 'means the certificate chain verified OK']
      ],
      examples: [
        'openssl s_client -connect example.com:443 -servername example.com',
        'openssl s_client -connect example.com:443 -showcerts'
      ]
    },

    /* ---------------- databases ---------------- */
    {
      cmd: 'mysql / mariadb', cat: 'db',
      desc: 'Enter the MySQL/MariaDB monitor and run SQL against a database server.',
      syntax: 'mysql -u USER -p [-h HOST] [DATABASE]',
      opts: [
        ['mysql -u root -p', 'log in as root and prompt for the password'],
        ['mysql -u app -p -h 10.0.0.5 db', 'connect to a remote host and database'],
        ['SHOW DATABASES;', 'list every database'],
        ['USE dbname;', 'select a database to work in'],
        ['SHOW TABLES;', 'list tables in the current database'],
        ['\\q or exit', 'leave the monitor']
      ],
      examples: [
        'mysql -u root -p',
        'SHOW DATABASES;',
        'USE appdb;',
        'SHOW TABLES;',
        'exit'
      ]
    },
    {
      cmd: 'mysql secure operations', cat: 'db',
      desc: 'Create users, grant privileges and back up a database safely.',
      syntax: "CREATE USER / GRANT / mysqldump",
      opts: [
        ["CREATE USER 'app'@'%' IDENTIFIED BY 'pass';", 'create a remote-capable user'],
        ["GRANT ALL PRIVILEGES ON db.* TO 'app'@'%';", 'grant rights on one database'],
        ['FLUSH PRIVILEGES;', 'reload the privilege tables after changes'],
        ['mysqldump', 'export a database to a SQL file'],
        ['CREATE DATABASE', 'make a new empty database']
      ],
      examples: [
        "CREATE USER 'app'@'localhost' IDENTIFIED BY 'S3cret!';",
        "GRANT ALL PRIVILEGES ON appdb.* TO 'app'@'localhost';",
        'FLUSH PRIVILEGES;',
        'mysqldump -u root -p appdb > appdb_backup.sql'
      ]
    },
    {
      cmd: 'psql (PostgreSQL)', cat: 'db',
      desc: 'Enter the PostgreSQL interactive terminal and manage a Postgres server.',
      syntax: 'psql [-U USER] [-h HOST] [-d DATABASE]',
      opts: [
        ['psql -U postgres', 'connect as the postgres superuser'],
        ['\\l', 'list databases'],
        ['\\c dbname', 'connect to another database'],
        ['\\dt', 'list tables in the current database'],
        ['\\du', 'list roles/users'],
        ['\\q', 'quit'],
        ['createdb / dropdb', 'create or drop a database from the shell']
      ],
      examples: [
        'psql -U postgres',
        '\\l',
        '\\c appdb',
        '\\dt',
        '\\q'
      ]
    },
    {
      cmd: 'pg_dump', cat: 'db',
      desc: 'Back up a PostgreSQL database to a file (plain SQL or compressed custom format).',
      syntax: 'pg_dump [-U USER] [-Fc] DBNAME > FILE',
      opts: [
        ['pg_dump -U postgres appdb > appdb.sql', 'plain-SQL backup'],
        ['pg_dump -Fc appdb -f appdb.dump', 'compressed custom format (recommended)'],
        ['pg_dumpall', 'back up ALL databases and roles'],
        ['-Fc vs plain', 'custom format is compressed and restorable with pg_restore'],
        ['pg_restore', 'restore from a custom-format dump']
      ],
      examples: [
        'pg_dump -U postgres -Fc appdb -f appdb.dump',
        'pg_restore -U postgres -d appdb appdb.dump',
        'pg_dumpall -U postgres > all.sql'
      ]
    },

    /* ---------------- windows server ---------------- */
    {
      cmd: 'Install-WindowsFeature', cat: 'win',
      desc: 'Install Windows Server roles and features from PowerShell (Server Manager).',
      syntax: 'Install-WindowsFeature -Name ROLE [-IncludeManagementTools]',
      opts: [
        ['Web-Server', 'install IIS (the web server role)'],
        ['DNS', 'install the DNS server role'],
        ['DHCP', 'install the DHCP server role'],
        ['AD-Domain-Services', 'install Active Directory Domain Services'],
        ['-IncludeManagementTools', 'also install the GUI management tools'],
        ['Get-WindowsFeature', 'list every available role and whether it is installed']
      ],
      examples: [
        'Install-WindowsFeature -Name Web-Server -IncludeManagementTools',
        'Install-WindowsFeature -Name DNS,DHCP -IncludeManagementTools',
        'Get-WindowsFeature | Where-Object Installed -eq $true'
      ]
    },
    {
      cmd: 'Active Directory (AD DS)', cat: 'win',
      desc: 'Promote a server to a domain controller and manage AD objects.',
      syntax: 'Install-ADDSForest / Get-ADUser / New-ADUser',
      opts: [
        ['Install-ADDSForest', 'promote this server into a new AD forest (reboot follows)'],
        ['-DomainName', 'the forest root domain name'],
        ['Get-ADUser -Filter *', 'list every AD user'],
        ['New-ADUser', 'create a new domain user'],
        ['Enable-ADAccount / Disable-ADAccount', 'enable or disable an account'],
        ['Get-ADGroupMember', 'list the members of a group']
      ],
      examples: [
        'Install-ADDSForest -DomainName corp.example.com',
        'Get-ADUser -Filter * | Select-Object Name,Enabled',
        'New-ADUser -Name "Jane Doe" -SamAccountName jdoe -Enabled $true'
      ]
    },
    {
      cmd: 'DNS server management', cat: 'win',
      desc: 'Create and test DNS records on a Windows DNS server.',
      syntax: 'Add-DnsServerResourceRecord / Resolve-DnsName / nslookup',
      opts: [
        ['Add-DnsServerResourceRecordA', 'create an A record (name → IPv4)'],
        ['Add-DnsServerResourceRecordCNAME', 'create an alias (CNAME) record'],
        ['Resolve-DnsName', 'query a name from PowerShell'],
        ['nslookup', 'query DNS from the command line'],
        ['dnscmd', 'legacy CLI for DNS administration']
      ],
      examples: [
        'Add-DnsServerResourceRecordA -ZoneName example.com -Name www -IPv4Address 10.0.0.10',
        'Resolve-DnsName www.example.com',
        'nslookup -type=any example.com'
      ]
    },
    {
      cmd: 'DHCP server management', cat: 'win',
      desc: 'Create DHCP scopes and address pools on a Windows DHCP server.',
      syntax: 'Add-DhcpServerv4Scope / Set-DhcpServerv4OptionValue',
      opts: [
        ['Add-DhcpServerv4Scope', 'create a new IPv4 scope'],
        ['-StartRange / -EndRange', 'the range of addresses to lease'],
        ['-subnetMask', 'the subnet mask for the scope'],
        ['Set-DhcpServerv4OptionValue', 'set options such as gateway and DNS'],
        ['Get-DhcpServerv4Scope', 'list scopes'],
        ['Get-DhcpServerv4Lease', 'show current leases']
      ],
      examples: [
        'Add-DhcpServerv4Scope -Name "LAN" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0',
        'Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -Router 192.168.1.1 -DnsServer 192.168.1.10',
        'Get-DhcpServerv4Lease'
      ]
    },
    {
      cmd: 'IIS management', cat: 'win',
      desc: 'Manage Internet Information Services (IIS) — sites, app pools and certificates.',
      syntax: 'Import-Module WebAdministration   →   Get-Website / New-Website',
      opts: [
        ['Import-Module WebAdministration', 'load the IIS PowerShell module'],
        ['Get-Website', 'list all IIS sites'],
        ['New-Website', 'create a new site'],
        ['Start-Website / Stop-Website', 'start or stop a site'],
        ['Restart-WebAppPool', 'recycle an application pool'],
        ['iisreset', 'restart the whole IIS service']
      ],
      examples: [
        'Import-Module WebAdministration',
        'Get-Website | Select-Object Name,State',
        'Restart-WebAppPool -Name "DefaultAppPool"',
        'iisreset'
      ]
    },
    {
      cmd: 'Server Manager & sconfig', cat: 'win',
      desc: 'Open the GUI Server Manager, or use the text-based sconfig on Server Core.',
      syntax: 'ServerManager.exe   |   sconfig',
      opts: [
        ['ServerManager', 'launch the full Server Manager GUI'],
        ['sconfig', 'the text menu on Server Core (hostname, network, updates)'],
        ['sconfig option 6', 'the menu item to download updates'],
        ['Get-ComputerInfo', 'a broad summary of the machine and OS'],
        ['Rename-Computer', 'change the server hostname']
      ],
      examples: ['ServerManager.exe', 'sconfig', 'Rename-Computer -NewName "WEB01" -Restart']
    },

    /* ---------------- containers ---------------- */
    {
      cmd: 'docker run / ps', cat: 'docker',
      desc: 'Start containers and see what is currently running.',
      syntax: 'docker run [OPTIONS] IMAGE [CMD]    |    docker ps [-a]',
      opts: [
        ['docker run -d -p 8080:80 nginx', 'run detached, mapping host 8080 → container 80'],
        ['--name', 'give the container a friendly name'],
        ['-e VAR=value', 'pass an environment variable into the container'],
        ['-v /host:/container', 'mount a host directory as a volume'],
        ['--rm', 'auto-remove the container when it exits'],
        ['docker ps', 'list running containers'],
        ['docker ps -a', 'include stopped containers']
      ],
      examples: [
        'docker run -d --name web -p 8080:80 nginx',
        'docker ps',
        'docker ps -a',
        'docker run -it --rm ubuntu bash'
      ]
    },
    {
      cmd: 'docker images / build', cat: 'docker',
      desc: 'List local images and build a custom image from a Dockerfile.',
      syntax: 'docker images    |    docker build -t NAME:TAG .',
      opts: [
        ['docker images', 'list the images stored locally'],
        ['docker build -t myapp:1.0 .', 'build from the Dockerfile in the current folder'],
        ['-f Dockerfile.prod', 'use a specific Dockerfile'],
        ['--no-cache', 'build without reusing cached layers'],
        ['docker pull', 'download an image from a registry'],
        ['docker push', 'upload an image to a registry']
      ],
      examples: [
        'docker images',
        'docker build -t myapp:1.0 .',
        'docker pull postgres:16',
        'docker push myrepo/myapp:1.0'
      ]
    },
    {
      cmd: 'docker exec / logs / stop', cat: 'docker',
      desc: 'Interact with a running container — open a shell, read logs, stop and remove.',
      syntax: 'docker exec -it ID CMD    |    docker logs ID    |    docker stop ID',
      opts: [
        ['docker exec -it web bash', 'open an interactive shell inside the container'],
        ['docker logs web', 'print the container output'],
        ['docker logs -f', 'follow live output'],
        ['docker stop / start / restart', 'control a container lifecycle'],
        ['docker rm', 'remove a stopped container'],
        ['docker stats', 'live CPU / memory usage of containers']
      ],
      examples: [
        'docker exec -it web bash',
        'docker logs -f web',
        'docker stop web && docker rm web',
        'docker stats'
      ]
    },
    {
      cmd: 'docker compose', cat: 'docker',
      desc: 'Define and run multi-container applications from a docker-compose.yml file.',
      syntax: 'docker compose [up -d | down | ps | logs | pull]',
      opts: [
        ['docker compose up -d', 'create and start all services in the background'],
        ['docker compose down', 'stop and remove the containers and network'],
        ['docker compose ps', 'list the services and their state'],
        ['docker compose logs -f', 'follow the logs of every service'],
        ['docker compose pull', 'refresh the images used by the services'],
        ['docker compose up --build', 'rebuild images then start']
      ],
      examples: [
        'docker compose up -d',
        'docker compose ps',
        'docker compose logs -f',
        'docker compose down'
      ]
    },

    /* ---------------- services & processes ---------------- */
    {
      cmd: 'systemctl (server services)', cat: 'svc',
      desc: 'Manage the long-running services (daemons) that a server depends on.',
      syntax: 'systemctl [start|stop|restart|reload|status|enable|disable] UNIT',
      opts: [
        ['status', 'the current state plus the last log lines'],
        ['restart', 'bounce the service'],
        ['reload', 're-read config without dropping connections'],
        ['enable --now', 'start now and at every boot'],
        ['disable', 'stop starting at boot'],
        ['is-active / is-enabled', 'check the current / boot state'],
        ['list-units --failed', 'see which units failed to start']
      ],
      examples: [
        'sudo systemctl status nginx',
        'sudo systemctl enable --now nginx',
        'sudo systemctl restart php8.3-fpm',
        'systemctl list-units --failed'
      ]
    },
    {
      cmd: 'cron jobs', cat: 'svc',
      desc: 'Schedule recurring tasks on a Linux server with cron.',
      syntax: 'crontab -e    then:  MIN HOUR DAY MONTH DAYOFWEEK COMMAND',
      opts: [
        ['crontab -e', 'edit your crontab (the schedule table)'],
        ['crontab -l', 'list your current cron entries'],
        ['crontab -r', 'remove your crontab (careful!)'],
        ['*/5 * * * *', 'run every 5 minutes'],
        ['0 2 * * *', 'run daily at 02:00'],
        ['0 3 * * 0', 'run every Sunday at 03:00'],
        ['MAILTO / > / 2>&1', 'email alerts and log/output redirection']
      ],
      examples: [
        'crontab -e',
        '0 2 * * * /opt/backup.sh >> /var/log/backup.log 2>&1',
        '*/5 * * * * /usr/local/bin/healthcheck.sh',
        'crontab -l'
      ]
    },
    {
      cmd: 'systemd timers', cat: 'svc',
      desc: 'The modern replacement for cron — schedule services with systemd timers.',
      syntax: 'systemctl list-timers    |    OnCalendar= in a .timer unit',
      opts: [
        ['systemctl list-timers', 'see every timer and when it next fires'],
        ['OnCalendar=daily', 'the schedule directive (daily, weekly, hourly…)'],
        ['OnCalendar=*-*-* 02:00:00', 'an exact date/time expression'],
        ['Persistent=true', 'run missed jobs after the machine was off'],
        ['systemctl enable --now mytimer.timer', 'activate a timer'],
        ['systemctl start myservice.service', 'run the paired service manually']
      ],
      examples: [
        'systemctl list-timers --all',
        'sudo systemctl enable --now backup.timer',
        'systemctl status backup.timer'
      ]
    },
    {
      cmd: 'user / group for services', cat: 'svc',
      desc: 'Run services under dedicated unprivileged accounts to limit blast radius.',
      syntax: 'useradd -r -s /usr/sbin/nologin NAME',
      opts: [
        ['-r', 'create a system account (no home, low UID)'],
        ['-s /usr/sbin/nologin', 'the account cannot log in interactively'],
        ['-g', 'set the primary group'],
        ['systemctl status', 'check the user a service runs as (via "ps")'],
        ['ps -o user=', 'see which user owns a process']
      ],
      examples: [
        'sudo useradd -r -s /usr/sbin/nologin appuser',
        'ps -eo user,pid,cmd | grep nginx',
        'sudo chown -R appuser:appuser /opt/app'
      ]
    },

    /* ---------------- monitoring & logs ---------------- */
    {
      cmd: 'top / htop (server)', cat: 'monitor',
      desc: 'Watch live CPU, memory and process usage to find a runaway service.',
      syntax: 'top    |    htop',
      opts: [
        ['load average', 'the 1/5/15-minute averages — over the core count means busy'],
        ['%Cpu(s) us/sy/wa', 'user / system / I-O-wait breakdown'],
        ['%Mem / RES', 'memory in use / resident size'],
        ['P / M', 'sort by CPU / memory in htop'],
        ['k', 'kill a process from htop'],
        ['vmstat 1', 'a lightweight alternative showing CPU, swap and I-O']
      ],
      examples: ['top', 'htop', 'vmstat 1 5', 'uptime']
    },
    {
      cmd: 'df / du (capacity)', cat: 'monitor',
      desc: 'Track disk space so a server never fills up and starts failing.',
      syntax: 'df -h    |    du -sh *',
      opts: [
        ['df -h', 'human-readable free space per filesystem'],
        ['df -i', 'inode usage — a filesystem can be full of inodes too'],
        ['du -sh *', 'size of each item in the current folder'],
        ['du -xh --max-depth=1 /', 'largest top-level folders on the root filesystem'],
        ['ncdu', 'an interactive disk-usage explorer (install it)']
      ],
      examples: ['df -h', 'df -i', 'du -sh /var/*', 'df -h | sort -k5 -h']
    },
    {
      cmd: 'journalctl / logs', cat: 'monitor',
      desc: "Read the system journal and service logs to investigate failures.",
      syntax: 'journalctl -u SERVICE [-f] [-p err] [--since]',
      opts: [
        ['-u', 'logs for one service/unit'],
        ['-f', 'follow new lines live'],
        ['-p err', 'only errors (and more severe)'],
        ['--since "1 hour ago"', 'limit by time'],
        ['-b', 'logs since the last boot'],
        ['tail -f /var/log/FILE', 'follow a plain log file'],
        ['grep', 'search inside logs']
      ],
      examples: [
        'journalctl -u nginx -f',
        'journalctl -b -p err',
        'journalctl --since "2026-01-01" --until "2026-01-02"',
        'sudo tail -f /var/log/nginx/error.log'
      ]
    },
    {
      cmd: 'ss / netstat (ports)', cat: 'monitor',
      desc: 'See which ports a server is listening on and what is connected.',
      syntax: 'ss -tulpn    |    netstat -tulpn',
      opts: [
        ['-t / -u / -l', 'TCP / UDP / listening sockets'],
        ['-p', 'show the owning process (needs root)'],
        ['-n', 'numeric ports (no service-name lookup)'],
        ['LISTEN', 'a socket waiting for incoming connections'],
        ['ESTABLISHED', 'an active, connected session'],
        ['curl -s localhost:PORT', 'probe a local port to confirm it answers']
      ],
      examples: [
        'sudo ss -tulpn',
        'sudo netstat -tulpn | grep :80',
        'ss -s',
        'curl -sI http://localhost:80'
      ]
    },
    {
      cmd: 'cert / uptime / health checks', cat: 'monitor',
      desc: 'Simple health checks a server can run on a schedule or on demand.',
      syntax: 'uptime   |   curl -fsS URL   |   systemctl is-active',
      opts: [
        ['uptime', 'how long the server has been up and the load average'],
        ['curl -fsS -o /dev/null -w "%{http_code}"', 'print just the HTTP status of a URL'],
        ['systemctl is-active SERVICE', 'exit 0 only if the service is running'],
        ['free -h', 'available memory'],
        ['ping -c 4 GATEWAY', 'basic network reachability']
      ],
      examples: [
        'uptime',
        'curl -fsS -o /dev/null -w "%{http_code}\\n" https://example.com/health',
        'systemctl is-active nginx && echo OK'
      ]
    },

    /* ---------------- backup & cron ---------------- */
    {
      cmd: 'rsync (backup)', cat: 'backup',
      desc: 'Back up or mirror directories efficiently, sending only the changed data.',
      syntax: 'rsync -avhP --delete SRC DEST',
      opts: [
        ['-a', 'archive: recursive and preserves permissions, times, symlinks'],
        ['-v', 'verbose'],
        ['-h', 'human-readable sizes'],
        ['-P', 'show progress and allow resume'],
        ['--delete', 'make the destination an exact mirror of the source'],
        ['-e ssh', 'sync over SSH to a remote host'],
        ['--exclude', 'skip paths matching a pattern (e.g. node_modules)']
      ],
      examples: [
        'rsync -avhP /data/ /mnt/backup/data/',
        'rsync -avz -e ssh /data/ user@backupserver:/backups/data/',
        'rsync -av --delete --exclude "cache" /app/ /mnt/app-mirror/'
      ]
    },
    {
      cmd: 'tar (incremental backup)', cat: 'backup',
      desc: 'Create compressed archive snapshots, optionally incremental between them.',
      syntax: 'tar -czf BACKUP.tar.gz DIR    |    tar --listed-incremental=FILE',
      opts: [
        ['-czf', 'create a gzip-compressed archive'],
        ['-xzf', 'extract a gzip-compressed archive'],
        ['-tzf', 'list the contents without extracting'],
        ['--listed-incremental', 'snapshot-based incremental backup'],
        ['-g', 'with an incremental file (GNU tar)'],
        ['--exclude', 'leave out noisy paths'],
        ['-C', 'change to a directory before archiving']
      ],
      examples: [
        'tar -czf /mnt/backup/www-$(date +%F).tar.gz /var/www',
        'tar -xzf www-2026-01-01.tar.gz -C /restore',
        'tar --listed-incremental=/tmp/snap.log -czf full.tar.gz /data'
      ]
    },
    {
      cmd: 'mysqldump / pg_dump (scheduled)', cat: 'backup',
      desc: 'Combine database dumps with cron for automatic, dated backups.',
      syntax: 'mysqldump -u USER -p DB > FILE  +  a cron entry',
      opts: [
        ['mysqldump -u root -p DB > file.sql', 'MySQL/MariaDB dump to a SQL file'],
        ['pg_dump -Fc DB -f file.dump', 'PostgreSQL compressed dump'],
        ['$(date +%F)', 'embed today\'s date in the filename'],
        ['gzip', 'compress the dump to save space'],
        ['prune old files', 'use find -mtime +N -delete to keep a rolling window']
      ],
      examples: [
        'mysqldump -u root -p appdb | gzip > /backup/appdb-$(date +%F).sql.gz',
        '0 2 * * * mysqldump -u root -p"PASS" appdb | gzip > /backup/appdb-$(date +\\%F).sql.gz',
        'find /backup -name "*.sql.gz" -mtime +7 -delete'
      ]
    },
    {
      cmd: 'backup verification', cat: 'backup',
      desc: 'A backup is only real once it has been restored and verified — test regularly.',
      syntax: 'tar -tzf / mysql -e "SHOW DATABASES" / pg_restore --list',
      opts: [
        ['tar -tzf FILE', 'confirm the archive is readable and complete'],
        ['gzip -t FILE', 'verify gzip integrity without extracting'],
        ['mysql < dump.sql', 'restore into a scratch server to prove it works'],
        ['pg_restore --list', 'inspect the contents of a custom dump'],
        ['checksums', 'store a hash of each backup and compare after restore'],
        ['schedule drills', 'practise a restore so it is proven before you need it']
      ],
      examples: [
        'tar -tzf backup.tar.gz | head',
        'gzip -t backup.sql.gz && echo "archive OK"',
        'mysql -u root -p scratchdb < appdb.sql',
        'sha256sum backup.tar.gz > backup.sha256'
      ]
    }
  ];
})(typeof self !== 'undefined' ? self : this);
