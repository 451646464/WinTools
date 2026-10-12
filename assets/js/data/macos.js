/*
 * WinTools — data/macos.js
 * Command & tool reference for macOS (Terminal + built-in tools + Homebrew).
 * Loaded by macos.html; exposed as WT.data.macos.
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};
  WT.data = WT.data || {};

  WT.data.macCats = [
    { key: 'files', label: 'Files & Directories' },
    { key: 'text', label: 'Text & Search' },
    { key: 'system', label: 'System & Processes' },
    { key: 'net', label: 'Networking' },
    { key: 'pkg', label: 'Packages & Apps' },
    { key: 'mac', label: 'macOS Specific' },
    { key: 'dev', label: 'Developer' }
  ];

  WT.data.macos = [
    /* ---------------- files & directories ---------------- */
    {
      cmd: 'ls', cat: 'files',
      desc: 'List the contents of a directory on macOS.',
      syntax: 'ls [OPTION]... [FILE]...',
      opts: [
        ['-l', 'long format with permissions, owner and size'],
        ['-a', 'include hidden files starting with a dot'],
        ['-h', 'human-readable file sizes'],
        ['-R', 'recurse into sub-directories'],
        ['-t', 'sort by modification time, newest first'],
        ['-e', 'print the time of the last change'],
        ['-G', 'colorize the output']
      ],
      examples: ['ls -la', 'ls -lhG /Applications', 'ls -lt ~/Desktop | head']
    },
    {
      cmd: 'cd', cat: 'files',
      desc: 'Change the current working directory.',
      syntax: 'cd [DIRECTORY]',
      opts: [
        ['-', 'go back to the previous directory'],
        ['~', 'expand to your home directory'],
        ['..', 'up one level']
      ],
      examples: ['cd ~/Documents', 'cd /Applications', 'cd ..', 'cd -']
    },
    {
      cmd: 'pwd', cat: 'files',
      desc: 'Print the full path of the current working directory.',
      syntax: 'pwd [-LP]',
      opts: [
        ['-L', 'logical path, following symlinks'],
        ['-P', 'physical path, resolving symlinks']
      ],
      examples: ['pwd', 'pwd -P']
    },
    {
      cmd: 'cp', cat: 'files',
      desc: 'Copy files and directories.',
      syntax: 'cp [OPTION]... SOURCE... DEST',
      opts: [
        ['-R', 'copy directories recursively (capital R on macOS)'],
        ['-a', 'archive: preserve attributes and symlinks'],
        ['-v', 'verbose output'],
        ['-i', 'prompt before overwriting'],
        ['-n', 'never overwrite'],
        ['-p', 'preserve mode, ownership and timestamps']
      ],
      examples: ['cp notes.txt backup.bak', 'cp -R ~/Projects ./copy', 'cp -i photo.jpg /Volumes/USB/']
    },
    {
      cmd: 'mv', cat: 'files',
      desc: 'Move or rename files and directories.',
      syntax: 'mv [OPTION]... SOURCE... DEST',
      opts: [
        ['-i', 'prompt before overwriting'],
        ['-n', 'never overwrite'],
        ['-v', 'verbose output']
      ],
      examples: ['mv old.txt new.txt', 'mv photos /Volumes/Backup/']
    },
    {
      cmd: 'rm', cat: 'files',
      desc: 'Remove files or directories (permanent, no trash).',
      syntax: 'rm [OPTION]... FILE...',
      opts: [
        ['-r', 'remove recursively'],
        ['-f', 'force, no prompts'],
        ['-i', 'prompt before every removal'],
        ['-v', 'verbose output']
      ],
      examples: ['rm file.txt', 'rm -i old.log', 'rm -rf build/']
    },
    {
      cmd: 'mkdir', cat: 'files',
      desc: 'Create directories.',
      syntax: 'mkdir [OPTION]... DIRECTORY...',
      opts: [
        ['-p', 'create parents as needed without erroring'],
        ['-v', 'verbose output'],
        ['-m', 'set the mode of the new directory']
      ],
      examples: ['mkdir Projects', 'mkdir -p ~/work/2026', 'mkdir -m 700 private']
    },
    {
      cmd: 'touch', cat: 'files',
      desc: 'Create an empty file or update timestamps.',
      syntax: 'touch [OPTION]... FILE...',
      opts: [
        ['-a', 'change access time only'],
        ['-m', 'change modification time only'],
        ['-c', 'do not create the file if it does not exist'],
        ['-t', 'set an explicit timestamp']
      ],
      examples: ['touch new.txt', 'touch -t 202601011200 log.txt']
    },
    {
      cmd: 'ln', cat: 'files',
      desc: 'Create hard or symbolic links.',
      syntax: 'ln [OPTION]... TARGET [LINK_NAME]',
      opts: [
        ['-s', 'create a symbolic link'],
        ['-f', 'replace an existing link'],
        ['-h', 'affect the link itself rather than the target']
      ],
      examples: ['ln -s /Applications/Safari.app ~/Desktop/Safari', 'ln original.txt hard.txt']
    },
    {
      cmd: 'open', cat: 'files',
      desc: 'Open files, folders and URLs with the default macOS application; can launch apps.',
      syntax: 'open [-a app] [-e] [-t] [-R] file/url',
      opts: [
        ['-a', 'open with the named application'],
        ['-e', 'open with TextEdit'],
        ['-t', 'open with the default text editor'],
        ['-R', 'reveal the file in Finder'],
        ['-F', 'open the Finder application'],
        ['-n', 'open a new instance of the application'],
        ['-g', 'do not bring the app to the foreground']
      ],
      examples: [
        'open .',
        'open -a "Visual Studio Code" project',
        'open https://github.com',
        'open -R ~/Downloads/file.zip',
        'open -a Safari'
      ]
    },
    {
      cmd: 'tree', cat: 'files',
      desc: 'Show the directory tree (install via Homebrew if missing).',
      syntax: 'tree [OPTION]... [PATH]',
      opts: [
        ['-L', 'limit depth'],
        ['-a', 'show hidden files'],
        ['-d', 'directories only']
      ],
      examples: ['tree', 'tree -L 2 ~/Projects']
    },
    {
      cmd: 'stat', cat: 'files',
      desc: 'Show detailed file status information.',
      syntax: 'stat [OPTION]... FILE...',
      opts: [
        ['-f', 'show filesystem information'],
        ['-L', 'follow symlinks'],
        ['-x', 'display in an extended, readable format'],
        ['-s', 'display only a summary']
      ],
      examples: ['stat file.txt', 'stat -x ~/Desktop']
    },
    {
      cmd: 'file', cat: 'files',
      desc: 'Determine a file type from its content.',
      syntax: 'file [OPTION]... FILE...',
      opts: [
        ['-i', 'show the MIME type'],
        ['-b', 'brief output without the filename'],
        ['-z', 'inspect compressed files'],
        ['-I', 'show all MIME information']
      ],
      examples: ['file image.png', 'file -i backup.zip']
    },
    {
      cmd: 'du', cat: 'files',
      desc: 'Estimate disk usage of files and folders.',
      syntax: 'du [OPTION]... [PATH]...',
      opts: [
        ['-h', 'human-readable sizes'],
        ['-s', 'summarize each argument'],
        ['-d', 'limit depth'],
        ['-a', 'include individual files'],
        ['-x', 'skip other filesystems']
      ],
      examples: ['du -sh *', 'du -hd 1 ~/Library']
    },
    {
      cmd: 'head / tail', cat: 'files',
      desc: 'Show the first or last part of a file.',
      syntax: 'head [-n N] file    |    tail [-n N] [-f] file',
      opts: [
        ['-n', 'number of lines'],
        ['-c', 'number of bytes'],
        ['-f', 'follow the file as it grows (tail)'],
        ['-F', 'follow by name, surviving rotation']
      ],
      examples: ['head -20 access.log', 'tail -50 error.log', 'tail -f /var/log/system.log']
    },

    /* ---------------- text & search ---------------- */
    {
      cmd: 'cat', cat: 'text',
      desc: 'Print or concatenate file contents.',
      syntax: 'cat [OPTION]... [FILE]...',
      opts: [
        ['-n', 'number output lines'],
        ['-b', 'number only non-blank lines'],
        ['-A', 'show non-printing characters'],
        ['-v', 'show control characters']
      ],
      examples: ['cat notes.txt', 'cat -n script.sh', 'cat a.txt b.txt > full.txt']
    },
    {
      cmd: 'less', cat: 'text',
      desc: 'Page through a file interactively.',
      syntax: 'less [OPTION]... FILE',
      opts: [
        ['-N', 'show line numbers'],
        ['-S', 'chop long lines'],
        ['-i', 'case-insensitive search']
      ],
      examples: ['less /var/log/system.log'],
      keys: [
        ['Space', 'page forward'],
        ['b', 'page backward'],
        ['/pattern', 'search forward'],
        ['?pattern', 'search backward'],
        ['g / G', 'go to start / end'],
        ['q', 'quit']
      ]
    },
    {
      cmd: 'grep', cat: 'text',
      desc: 'Search for text matching a pattern in files or piped input.',
      syntax: 'grep [OPTION]... PATTERN [FILE]...',
      opts: [
        ['-i', 'ignore case'],
        ['-r', 'recursive search'],
        ['-n', 'show line numbers'],
        ['-v', 'invert, show non-matches'],
        ['-l', 'list matching file names'],
        ['-c', 'count matches'],
        ['-E', 'extended regular expressions'],
        ['-w', 'match whole words'],
        ['-o', 'print only the matched text'],
        ['-A/-B/-C', 'print context lines after/before/around'],
        ['--color', 'highlight matches']
      ],
      examples: [
        'grep -rn "TODO" ~/Projects',
        'grep -i "error" /var/log/system.log',
        'grep -E "[0-9]{3}-[0-9]{4}" contacts.txt'
      ]
    },
    {
      cmd: 'find', cat: 'text',
      desc: 'Search the filesystem for files matching many criteria.',
      syntax: 'find [PATH] [CRITERIA] [ACTION]',
      opts: [
        ['-name', 'match by file name glob'],
        ['-iname', 'case-insensitive name match'],
        ['-type', 'f=file, d=directory'],
        ['-size', 'match by size'],
        ['-mtime', 'modified n days ago'],
        ['-maxdepth', 'limit recursion depth'],
        ['-exec', 'run a command on results'],
        ['-delete', 'delete matches'],
        ['-iname / -empty', 'case-insensitive / empty files']
      ],
      examples: [
        'find ~/Desktop -name "*.png"',
        'find / -name "config.plist" -maxdepth 5',
        'find . -type f -size +100M'
      ]
    },
    {
      cmd: 'sed', cat: 'text',
      desc: 'Stream editor for text substitution and editing.',
      syntax: 'sed "s/pattern/replacement/g" file',
      opts: [
        ['-i', 'edit in place (add a suffix for backup)'],
        ['-E', 'extended regex'],
        ['-n', 'suppress automatic printing'],
        ['-e', 'add multiple commands']
      ],
      examples: [
        'sed "s/old/new/g" file.txt',
        'sed -i "" "s/DEBUG/INFO/g" app.log',
        'sed -n "10,20p" file.txt'
      ]
    },
    {
      cmd: 'awk', cat: 'text',
      desc: 'Process and reformat text by columns and patterns.',
      syntax: 'awk "{print $1}" file',
      opts: [
        ['-F', 'set the field separator'],
        ['$0 / $n', 'whole line / nth field'],
        ['NR / NF', 'line number / field count'],
        ['END', 'run a block after all input']
      ],
      examples: [
        'awk "{print $1, $3}" access.log',
        'awk -F: "{print $1}" /etc/passwd',
        'awk "{sum+=$1} END {print sum}" numbers.txt'
      ]
    },
    {
      cmd: 'sort / uniq / wc', cat: 'text',
      desc: 'Sort, deduplicate and count lines of text.',
      syntax: 'sort [opt] file    |    uniq [opt]    |    wc [-l|-w|-c]',
      opts: [
        ['sort -n', 'numeric sort'],
        ['sort -r', 'reverse'],
        ['sort -u', 'unique'],
        ['uniq -c', 'prefix counts'],
        ['uniq -d', 'only duplicates'],
        ['wc -l', 'count lines'],
        ['wc -w', 'count words']
      ],
      examples: [
        'sort names.txt',
        'sort file.txt | uniq -c | sort -rn',
        'wc -l essay.txt'
      ]
    },
    {
      cmd: 'cut / tr', cat: 'text',
      desc: 'Extract columns and translate or squeeze characters.',
      syntax: 'cut -d: -f1 file    |    tr "a-z" "A-Z"',
      opts: [
        ['cut -d', 'field delimiter'],
        ['cut -f', 'select fields'],
        ['cut -c', 'select characters'],
        ['tr -d', 'delete characters'],
        ['tr -s', 'squeeze repeats']
      ],
      examples: [
        'cut -d, -f2 data.csv',
        'echo hello | tr "a-z" "A-Z"',
        'cat file.txt | tr -d "\\r"'
      ]
    },
    {
      cmd: 'diff', cat: 'text',
      desc: 'Compare two files and show differences.',
      syntax: 'diff [OPTION]... FILE1 FILE2',
      opts: [
        ['-u', 'unified format'],
        ['-y', 'side-by-side'],
        ['-w', 'ignore whitespace'],
        ['-r', 'compare directories recursively']
      ],
      examples: ['diff old.conf new.conf', 'diff -u a.txt b.txt']
    },
    {
      cmd: 'tee', cat: 'text',
      desc: 'Write to stdout and to files at the same time.',
      syntax: 'tee [OPTION]... [FILE]...',
      opts: [
        ['-a', 'append instead of overwriting'],
        ['-i', 'ignore interrupts']
      ],
      examples: ['make 2>&1 | tee build.log', 'echo hi | tee out.txt']
    },
    {
      cmd: 'mdfind / mdfind', cat: 'text',
      desc: 'Spotlight search from the command line — find files by content or name instantly.',
      syntax: 'mdfind [-name query] [query]',
      opts: [
        ['-name', 'search only by file name'],
        ['-onlyin', 'limit the search to a directory'],
        ['-live', 'keep the results updated live']
      ],
      examples: [
        'mdfind -name "report.pdf"',
        'mdfind "invoice" -onlyin ~/Documents',
        'mdfind kMDItemContentType == "public.folder"'
      ]
    },
    {
      cmd: 'pbcopy / pbpaste', cat: 'text',
      desc: 'Send text to the macOS clipboard, and read it back out.',
      syntax: 'command | pbcopy    |    pbpaste | command',
      opts: [
        ['pbcopy', 'copy stdin into the clipboard'],
        ['pbpaste', 'paste the clipboard contents to stdout']
      ],
      examples: [
        'cat notes.txt | pbcopy',
        'pbpaste | grep error',
        'pbpaste > saved.txt'
      ]
    },

    /* ---------------- system & processes ---------------- */
    {
      cmd: 'ps', cat: 'system',
      desc: 'List running processes.',
      syntax: 'ps [OPTION]...',
      opts: [
        ['aux', 'BSD style: all processes, all users'],
        ['-ef', 'full listing, every process'],
        ['-p', 'select by PID'],
        ['-o', 'custom columns']
      ],
      examples: ['ps aux', 'ps aux | grep safari', 'ps -eo pid,%mem,command']
    },
    {
      cmd: 'top / activity monitor', cat: 'system',
      desc: 'Live view of CPU, memory and process activity (top in Terminal, Activity Monitor in GUI).',
      syntax: 'top [-o cpu] [-s delay]',
      opts: [
        ['-o', 'sort by a column such as cpu or mem'],
        ['-s', 'update interval in seconds'],
        ['-n', 'limit the number of iterations'],
        ['-u', 'show only one user processes']
      ],
      examples: ['top -o cpu', 'top -s 2 -n 1'],
      keys: [
        ['q', 'quit top'],
        ['M', 'sort by memory'],
        ['P', 'sort by CPU'],
        ['Space', 'show all processes']
      ]
    },
    {
      cmd: 'kill / killall', cat: 'system',
      desc: 'Send signals to processes to terminate or interrupt them.',
      syntax: 'kill [-signal] PID    |    killall [-signal] name',
      opts: [
        ['-15 / -TERM', 'graceful termination (default)'],
        ['-9 / -KILL', 'force kill, cannot be caught'],
        ['-HUP', 'hang up / reload, e.g. reload a config'],
        ['-l', 'list signals']
      ],
      examples: ['kill 1234', 'kill -9 1234', 'killall Safari', 'kill -l']
    },
    {
      cmd: 'uname', cat: 'system',
      desc: 'Print system and kernel information.',
      syntax: 'uname [OPTION]...',
      opts: [
        ['-a', 'all information'],
        ['-m', 'machine architecture (arm64 or x86_64)'],
        ['-r', 'kernel release'],
        ['-s', 'kernel name (Darwin)']
      ],
      examples: ['uname -a', 'uname -m']
    },
    {
      cmd: 'sw_vers', cat: 'system',
      desc: 'Show the macOS product name, version and build number.',
      syntax: 'sw_vers [-productVersion | -buildVersion]',
      opts: [
        ['-productName', 'the product name (macOS)'],
        ['-productVersion', 'the version number, e.g. 15.1'],
        ['-buildVersion', 'the build string']
      ],
      examples: ['sw_vers', 'sw_vers -productVersion']
    },
    {
      cmd: 'system_profiler', cat: 'system',
      desc: 'Report detailed hardware and software information about the Mac.',
      syntax: 'system_profiler [SPDataType...]',
      opts: [
        ['SPHardwareDataType', 'hardware summary: chip, memory, serial'],
        ['SPDisplaysDataType', 'graphics and displays'],
        ['SPStorageDataType', 'storage devices and capacity'],
        ['SPNetworkDataType', 'network configuration'],
        ['-detailLevel', 'full, mini or basic'],
        ['-json', 'output as JSON']
      ],
      examples: [
        'system_profiler SPHardwareDataType',
        'system_profiler SPDisplaysDataType -json',
        'system_profiler SPStorageDataType'
      ]
    },
    {
      cmd: 'df / du', cat: 'system',
      desc: 'Report free disk space and folder size usage.',
      syntax: 'df -h    |    du -sh path',
      opts: [
        ['df -h', 'human-readable disk free space'],
        ['df -H', 'SI units (powers of 1000)'],
        ['du -sh', 'total size of a folder, human-readable'],
        ['du -hd 1', 'folder sizes one level deep']
      ],
      examples: ['df -h', 'df -H /', 'du -sh ~/Movies', 'du -hd 1 ~']
    },
    {
      cmd: 'env / export', cat: 'system',
      desc: 'View environment variables and set them for the current shell.',
      syntax: 'env    |    export NAME=value',
      opts: [
        ['env', 'print all environment variables'],
        ['export NAME=', 'set a variable for this shell and children'],
        ['echo $NAME', 'print the value of a variable'],
        ['unset NAME', 'remove a variable']
      ],
      examples: ['env', 'export EDITOR=vim', 'echo $PATH', 'unset TEMP_VAR']
    },
    {
      cmd: 'history', cat: 'system',
      desc: 'Show the commands you have run in this shell.',
      syntax: 'history [n]',
      opts: [
        ['n', 'last n commands'],
        ['!n', 're-run command number n'],
        ['!!', 're-run the previous command'],
        ['-c', 'clear history (zsh: history -p)']
      ],
      examples: ['history', 'history | grep brew', '!!']
    },
    {
      cmd: 'lsof', cat: 'system',
      desc: 'List open files and the processes holding them (great for locked files and ports).',
      syntax: 'lsof [OPTION]...',
      opts: [
        ['-i', 'show network connections'],
        ['-p', 'filter by process ID'],
        ['-u', 'filter by user'],
        ['-n', 'do not resolve hostnames (faster)'],
        ['-P', 'do not resolve port names'],
        ['-c', 'filter by command name'],
        ['+D', 'list all open files in a directory']
      ],
      examples: [
        'lsof -i :8080',
        'lsof -nP -iTCP -sTCP:LISTEN',
        'lsof -u alice',
        'lsof +D ~/Downloads'
      ]
    },
    {
      cmd: 'launchctl', cat: 'system',
      desc: 'Manage launchd services (daemons and agents) — the macOS equivalent of systemctl.',
      syntax: 'launchctl [subcommand] [domain/target] [service]',
      opts: [
        ['list', 'list loaded services'],
        ['print system', 'show system service definitions'],
        ['bootstrap / bootout', 'load / unload a service in a domain'],
        ['start / stop', 'start or stop a loaded service'],
        ['kickstart', 'force a service to run now'],
        ['enable / disable', 'enable or disable a service']
      ],
      examples: [
        'launchctl list',
        'sudo launchctl kickstart -k system/com.apple.Dock.agent',
        'launchctl print system | grep ssh'
      ]
    },

    /* ---------------- networking ---------------- */
    {
      cmd: 'ping', cat: 'net',
      desc: 'Test host reachability and latency over ICMP.',
      syntax: 'ping [OPTION]... HOST',
      opts: [
        ['-c', 'stop after N packets'],
        ['-i', 'interval between packets'],
        ['-s', 'packet payload size'],
        ['-t', 'set the TTL (macOS-specific)']
      ],
      examples: ['ping google.com', 'ping -c 4 8.8.8.8']
    },
    {
      cmd: 'ifconfig', cat: 'net',
      desc: 'View and configure network interface addresses (macOS still uses ifconfig).',
      syntax: 'ifconfig [interface] [action]',
      opts: [
        ['ifconfig', 'show all interfaces and their addresses'],
        ['inet', 'show the IPv4 address of an interface'],
        ['up / down', 'enable or disable an interface'],
        ['alias', 'add an alias address to an interface']
      ],
      examples: ['ifconfig', 'ifconfig en0', 'ifconfig en0 inet 192.168.1.50 netmask 255.255.255.0 alias']
    },
    {
      cmd: 'netstat', cat: 'net',
      desc: 'Show network connections, routing tables and interface statistics.',
      syntax: 'netstat [OPTION]...',
      opts: [
        ['-a', 'show all sockets'],
        ['-n', 'numeric addresses and ports'],
        ['-r', 'show the routing table'],
        ['-i', 'interface statistics'],
        ['-p', 'show the protocol'],
        ['-l', 'show listening sockets']
      ],
      examples: ['netstat -an', 'netstat -rn', 'netstat -an | grep LISTEN']
    },
    {
      cmd: 'lsof -i (net)', cat: 'net',
      desc: 'See which process owns each network connection — the modern netstat -p.',
      syntax: 'lsof -i [-sTCP:LISTEN]',
      opts: [
        ['-i', 'all network files'],
        [':port', 'filter to a specific port'],
        ['-sTCP:LISTEN', 'only listening sockets'],
        ['-n -P', 'skip name resolution for speed']
      ],
      examples: [
        'lsof -i :443',
        'lsof -nP -iTCP -sTCP:LISTEN',
        'lsof -i TCP | grep ESTABLISHED'
      ]
    },
    {
      cmd: 'curl', cat: 'net',
      desc: 'Transfer data to or from a server (HTTP, HTTPS, FTP and more).',
      syntax: 'curl [OPTION]... URL',
      opts: [
        ['-O', 'save to a remote-named file'],
        ['-o', 'save to a specific file'],
        ['-L', 'follow redirects'],
        ['-I', 'headers only'],
        ['-H', 'custom header'],
        ['-X', 'override the HTTP method'],
        ['-d', 'send a POST body'],
        ['-A', 'set the User-Agent'],
        ['-k', 'allow insecure TLS'],
        ['-w', 'print transfer metrics']
      ],
      examples: [
        'curl https://api.example.com/health',
        'curl -O https://example.com/file.zip',
        'curl -X POST -H "Content-Type: application/json" -d \'{"a":1}\' https://api/x'
      ]
    },
    {
      cmd: 'dig', cat: 'net',
      desc: 'Query DNS records.',
      syntax: 'dig [@server] NAME [TYPE]',
      opts: [
        ['+short', 'terse answer only'],
        ['A / AAAA / MX / TXT', 'record types'],
        ['-x', 'reverse lookup'],
        ['+trace', 'full resolution trace']
      ],
      examples: ['dig example.com', 'dig +short example.com', 'dig example.com MX']
    },
    {
      cmd: 'host / nslookup', cat: 'net',
      desc: 'Quickly resolve hostnames and IP addresses.',
      syntax: 'host NAME    |    nslookup NAME [server]',
      opts: [
        ['host', 'simple DNS lookup'],
        ['nslookup', 'interactive DNS query tool'],
        ['set type=', 'choose the record type in nslookup']
      ],
      examples: ['host example.com', 'nslookup example.com 8.8.8.8']
    },
    {
      cmd: 'networksetup', cat: 'net',
      desc: 'Configure macOS network settings — Wi-Fi, proxies, DNS and network services.',
      syntax: 'networksetup -listallnetworkservices    |    networksetup -setdns',
      opts: [
        ['-listallnetworkservices', 'list the configured network services'],
        ['-listnetworkserviceorder', 'show the service priority order'],
        ['-getairportnetwork', 'show the current Wi-Fi network'],
        ['-setdnsservers', 'set DNS servers for a service'],
        ['-setwebproxy', 'enable and configure a web proxy'],
        ['-setnetworklocation', 'switch the network location']
      ],
      examples: [
        'networksetup -listallnetworkservices',
        'networksetup -getairportnetwork en0',
        'networksetup -setdnsservers Wi-Fi 8.8.8.8 8.8.4.4'
      ]
    },
    {
      cmd: 'ssh / scp', cat: 'net',
      desc: 'Securely access remote machines and copy files over SSH.',
      syntax: 'ssh [user@]host    |    scp [opt] src user@host:path',
      opts: [
        ['-i', 'specify a private key'],
        ['-p', 'port (ssh) / port (scp uses -P)'],
        ['-L', 'local port forwarding'],
        ['-C', 'enable compression'],
        ['-r', 'scp: copy recursively'],
        ['-v', 'verbose debugging']
      ],
      examples: [
        'ssh user@server.com',
        'ssh -i ~/.ssh/id_ed25519 -p 2222 user@server',
        'scp -r ./src user@server:/opt/app/'
      ]
    },
    {
      cmd: 'rsync', cat: 'net',
      desc: 'Efficiently sync files locally or over SSH, sending only differences.',
      syntax: 'rsync [OPTION]... SRC... DEST',
      opts: [
        ['-a', 'archive mode'],
        ['-v', 'verbose'],
        ['-z', 'compress during transfer'],
        ['-n', 'dry run'],
        ['--delete', 'remove files in dest missing from src'],
        ['-e', 'remote shell, e.g. -e ssh'],
        ['-P', 'progress and resume']
      ],
      examples: [
        'rsync -avz ./src/ user@server:/opt/app/',
        'rsync -avzn --delete ./src/ ./backup/'
      ]
    },

    /* ---------------- packages & apps ---------------- */
    {
      cmd: 'brew', cat: 'pkg',
      desc: 'Homebrew — the de-facto package manager for macOS. Install CLI tools and GUI apps.',
      syntax: 'brew [install | uninstall | update | upgrade | search] [formula]',
      opts: [
        ['install', 'install a package (formula or cask)'],
        ['uninstall', 'remove a package'],
        ['update', 'update Homebrew and its formula list'],
        ['upgrade', 'upgrade all installed packages'],
        ['search', 'search for a package'],
        ['info', 'show details about a package'],
        ['list', 'list installed packages'],
        ['cleanup', 'remove old downloads and stale versions'],
        ['install --cask', 'install a GUI application']
      ],
      examples: [
        'brew install wget',
        'brew install --cask firefox',
        'brew update && brew upgrade',
        'brew search editor',
        'brew list'
      ]
    },
    {
      cmd: 'mas', cat: 'pkg',
      desc: 'Mac App Store from the command line — install and update App Store apps.',
      syntax: 'mas [install | list | outdated | upgrade] [id]',
      opts: [
        ['install', 'install an app by its App Store ID'],
        ['list', 'list installed App Store apps'],
        ['outdated', 'show apps with pending updates'],
        ['upgrade', 'update all installed App Store apps'],
        ['search', 'search the App Store']
      ],
      examples: ['mas list', 'mas outdated', 'mas install 497799835']
    },
    {
      cmd: 'xcode-select / xcodebuild', cat: 'pkg',
      desc: 'Manage the Xcode command line tools and build projects from the terminal.',
      syntax: 'xcode-select -p    |    xcodebuild [-project] [action]',
      opts: [
        ['xcode-select -p', 'show the active developer directory'],
        ['--install', 'install the Command Line Tools prompt'],
        ['-s', 'switch the developer directory'],
        ['xcodebuild -list', 'show targets and configurations'],
        ['build', 'build the project'],
        ['clean', 'remove build products']
      ],
      examples: [
        'xcode-select --install',
        'xcode-select -p',
        'xcodebuild -project App.xcodeproj -scheme App build'
      ]
    },
    {
      cmd: 'softwareupdate', cat: 'pkg',
      desc: 'Check for and install macOS system updates from the terminal.',
      syntax: 'softwareupdate [-l | -i | -R] [label]',
      opts: [
        ['-l / --list', 'list available updates'],
        ['-i / --install', 'install an update by label'],
        ['-a / --all', 'install all available updates'],
        ['-R / --restart', 'restart immediately after installing'],
        ['-d / --download', 'download updates without installing'],
        ['--agree-to-license', 'accept the licence non-interactively']
      ],
      examples: [
        'softwareupdate --list',
        'softwareupdate --install --all',
        'softwareupdate -i "macOS Update" --restart'
      ]
    },

    /* ---------------- macOS specific ---------------- */
    {
      cmd: 'defaults', cat: 'mac',
      desc: 'Read and write macOS user preferences (the hidden settings behind the GUI).',
      syntax: 'defaults [read | write | delete] domain key [value]',
      opts: [
        ['read', 'show a preference value'],
        ['write', 'set a preference value'],
        ['delete', 'remove a preference'],
        ['domains', 'list all preference domains'],
        ['find', 'search all preferences for a key'],
        ['-currentHost', 'per-host preferences']
      ],
      examples: [
        'defaults read com.apple.dock autohide',
        'defaults write com.apple.dock autohide -bool true',
        'defaults write com.apple.finder ShowPathbar -bool true',
        'defaults delete com.apple.dock autohide',
        'killall Dock'
      ]
    },
    {
      cmd: 'screencapture', cat: 'mac',
      desc: 'Take screenshots and screen recordings from the command line.',
      syntax: 'screencapture [-i] [-c] [-v] [-o] file',
      opts: [
        ['-i', 'interactive selection of a region'],
        ['-c', 'capture to the clipboard instead of a file'],
        ['-v', 'record a video instead of a still'],
        ['-o', 'no shadow on window captures'],
        ['-W', 'start in window selection mode'],
        ['-m', 'capture the main monitor only']
      ],
      examples: [
        'screencapture ~/Desktop/shot.png',
        'screencapture -i -c shot.png',
        'screencapture -V ~/Desktop/demo.mov'
      ]
    },
    {
      cmd: 'say', cat: 'mac',
      desc: 'Have the Mac speak text aloud using any installed voice.',
      syntax: 'say [-v voice] [-r rate] "text"',
      opts: [
        ['-v', 'choose a voice, e.g. "Samantha"'],
        ['-r', 'words per minute'],
        ['-o', 'save the speech to an AIFF file'],
        ['-f', 'read the text from a file']
      ],
      examples: ['say "Hello from WinTools"', 'say -v Samantha -r 200 "faster"', 'say -o out.aiff "saved"']
    },
    {
      cmd: 'caffeinate', cat: 'mac',
      desc: 'Prevent the Mac from sleeping while a command runs.',
      syntax: 'caffeinate [-t seconds] [-i] [-d] command',
      opts: [
        ['-t', 'run for at most N seconds'],
        ['-i', 'prevent idle sleep'],
        ['-d', 'prevent display sleep'],
        ['-s', 'prevent system sleep while on AC power'],
        ['command', 'run the given command and stay awake until it exits']
      ],
      examples: [
        'caffeinate -t 3600',
        'caffeinate -i ./build.sh',
        'caffeinate -d'
      ]
    },
    {
      cmd: 'osascript', cat: 'mac',
      desc: 'Run AppleScript and JavaScript for Automation (JXA) to control macOS and apps.',
      syntax: 'osascript [-l language] [-e script] [file]',
      opts: [
        ['-e', 'run an inline script'],
        ['-l', 'language: AppleScript (default) or JavaScript'],
        ['-s', 'output format: o for objects, s for strings'],
        ['-i', 'print the result interactively']
      ],
      examples: [
        'osascript -e \'display dialog "Hello"\'',
        'osascript -e \'tell application "Safari" to make new document\'',
        'osascript -l JavaScript -e "Application(\'System Events\").name()"'
      ]
    },
    {
      cmd: 'tmutil', cat: 'mac',
      desc: 'Manage Time Machine backups — start, stop, list and restore.',
      syntax: 'tmutil [startbackup | stopbackup | listbackups | ...]',
      opts: [
        ['startbackup', 'start a backup now'],
        ['stopbackup', 'stop a running backup'],
        ['listbackups', 'list available local snapshots and backups'],
        ['latestbackup', 'show the most recent backup'],
        ['latestbackup --snapshot', 'the latest local snapshot'],
        ['enable / disable', 'turn Time Machine on or off'],
        ['uniquesnapshot', 'create a local snapshot']
      ],
      examples: [
        'tmutil startbackup',
        'tmutil latestbackup',
        'tmutil listbackups'
      ]
    },
    {
      cmd: 'diskutil', cat: 'mac',
      desc: 'Manage disks, volumes and partitions on macOS (the GUI Disk Utility in CLI form).',
      syntax: 'diskutil [list | info | eraseVolume | mount | unmount] [device]',
      opts: [
        ['list', 'list all disks and volumes'],
        ['info', 'show details about a disk or volume'],
        ['eraseVolume', 'erase and reformat a volume'],
        ['mount / unmount', 'attach or detach a volume'],
        ['repairDisk', 'verify and repair a filesystem'],
        ['apfs', 'manage APFS containers and snapshots']
      ],
      examples: [
        'diskutil list',
        'diskutil info /Volumes/USB',
        'diskutil eraseVolume ExFAT "USB" disk2s1'
      ]
    },
    {
      cmd: 'plutil', cat: 'mac',
      desc: 'Property list utility — inspect and convert .plist configuration files.',
      syntax: 'plutil [-lint | -convert | -p] file',
      opts: [
        ['-lint', 'check the syntax of a plist file'],
        ['-convert', 'convert between xml, binary and json'],
        ['-p', 'print the plist in a readable form'],
        ['-insert', 'add a key'],
        ['-remove', 'delete a key'],
        ['-replace', 'replace a value']
      ],
      examples: [
        'plutil -p ~/Library/Preferences/com.apple.dock.plist',
        'plutil -lint Info.plist',
        'plutil -convert json -o out.json app.plist'
      ]
    },
    {
      cmd: 'sips', cat: 'mac',
      desc: 'Scriptable image processing — resize, rotate, convert and inspect images.',
      syntax: 'sips [-g property | -z h w | -r deg] file',
      opts: [
        ['-g', 'get an image property such as pixelWidth'],
        ['-z', 'resize to the given height and width'],
        ['-r', 'rotate by degrees'],
        ['-s', 'set properties such as format'],
        ['-d', 'set the destination directory'],
        ['-m', 'resample the image quality']
      ],
      examples: [
        'sips -g pixelWidth -g pixelHeight photo.jpg',
        'sips -Z 1280 photo.jpg',
        'sips -s format png photo.jpg --out photo.png',
        'sips -r 90 photo.jpg'
      ]
    },
    {
      cmd: 'Quick Look (qlmanage)', cat: 'mac',
      desc: 'Generate previews and thumbnails from the command line using Quick Look.',
      syntax: 'qlmanage [-p | -t | -x] file',
      opts: [
        ['-p', 'preview the file'],
        ['-t', 'generate a thumbnail'],
        ['-x', 'use the QuickLook XPC generator'],
        ['-o', 'set an output directory for generated thumbnails']
      ],
      examples: ['qlmanage -p file.pdf', 'qlmanage -t -s 512 -o . image.png']
    },
    {
      cmd: 'Finder & Dock tweaks', cat: 'mac',
      desc: 'Common defaults commands to customise Finder, Dock and screenshots, then restart the process.',
      syntax: 'defaults write com.apple.<app> <key> <type> <value>  then  killall <app>',
      opts: [
        ['Show hidden files', 'defaults write com.apple.finder AppleShowAllFiles -bool true'],
        ['Show path bar', 'defaults write com.apple.finder ShowPathbar -bool true'],
        ['Dock autohide', 'defaults write com.apple.dock autohide -bool true'],
        ['Dock size', 'defaults write com.apple.dock tilesize -int 48'],
        ['Screenshot format', 'defaults write com.apple.screencapture type png'],
        ['Disable screenshot shadow', 'defaults write com.apple.screencapture disable-shadow -bool true']
      ],
      examples: [
        'defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder',
        'defaults write com.apple.dock autohide -bool true && killall Dock',
        'defaults write com.apple.screencapture type jpg && killall SystemUIServer'
      ]
    },

    /* ---------------- developer ---------------- */
    {
      cmd: 'git', cat: 'dev',
      desc: 'Distributed version control — the everyday toolkit for source code.',
      syntax: 'git [command] [options]',
      opts: [
        ['clone', 'copy a remote repository'],
        ['status', 'show changed, staged and untracked files'],
        ['add', 'stage changes for commit'],
        ['commit', 'record staged changes with a message'],
        ['push', 'upload local commits to the remote'],
        ['pull', 'fetch and merge remote changes'],
        ['branch / checkout', 'list, create and switch branches'],
        ['log', 'show the commit history'],
        ['diff', 'show changes between commits or the working tree'],
        ['stash', 'temporarily shelve uncommitted changes']
      ],
      examples: [
        'git clone https://github.com/user/repo.git',
        'git add . && git commit -m "message"',
        'git push -u origin main',
        'git log --oneline --graph'
      ]
    },
    {
      cmd: 'python3 / node', cat: 'dev',
      desc: 'Run Python and Node.js from the terminal; macOS ships python3, node comes via Homebrew.',
      syntax: 'python3 script.py    |    node script.js',
      opts: [
        ['python3 -V', 'show the Python version'],
        ['python3 -m venv', 'create a virtual environment'],
        ['python3 -m pip install', 'install a Python package'],
        ['node -v', 'show the Node version'],
        ['npm install', 'install Node dependencies'],
        ['npx', 'run a package binary without installing it globally']
      ],
      examples: [
        'python3 -V',
        'python3 -m venv .venv',
        'node -v && npm -v'
      ]
    },
    {
      cmd: 'xcrun', cat: 'dev',
      desc: 'Run developer tools from the Xcode toolchain and query SDKs.',
      syntax: 'xcrun [tool] [args]',
      opts: [
        ['--sdk', 'run with a specific SDK'],
        ['--show-sdk-path', 'print the SDK path'],
        ['--find', 'locate a tool in the toolchain'],
        ['clang / swift', 'the compilers you can invoke through xcrun']
      ],
      examples: [
        'xcrun --show-sdk-path',
        'xcrun --find clang',
        'xcrun simctl list devices'
      ]
    },
    {
      cmd: 'Homebrew best practices', cat: 'dev',
      desc: 'Handy maintenance commands to keep Homebrew healthy and fast.',
      syntax: 'brew [command]',
      opts: [
        ['brew doctor', 'check for problems with the installation'],
        ['brew cleanup', 'remove old downloads and stale versions'],
        ['brew deps', 'show a formula dependencies'],
        ['brew outdated', 'list packages that have updates'],
        ['brew services', 'manage background services (start, stop, list)'],
        ['brew --prefix', 'print the install prefix']
      ],
      examples: [
        'brew doctor',
        'brew outdated',
        'brew cleanup',
        'brew services list'
      ]
    }
  ];
})(typeof self !== 'undefined' ? self : this);
