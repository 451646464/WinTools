/*
 * WinTools — data/linux.js
 * Command & tool reference for Linux (incl. Kali).
 * Loaded by linux.html; exposed as WT.data.linux.
 *
 * Each entry:
 *   cmd      command / tool name
 *   cat      category key (see CATS)
 *   desc     one-line description
 *   syntax   canonical usage line
 *   opts     [ [flag, meaning], ... ]
 *   examples [ "copy-paste ready line", ... ]
 *   kali     true when especially relevant on Kali / security workflows
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};
  WT.data = WT.data || {};

  WT.data.linuxCats = [
    { key: 'files', label: 'Files & Directories' },
    { key: 'text', label: 'Text & Search' },
    { key: 'system', label: 'System & Processes' },
    { key: 'net', label: 'Networking' },
    { key: 'pkg', label: 'Packages' },
    { key: 'disk', label: 'Disk & Filesystems' },
    { key: 'perm', label: 'Permissions & Users' },
    { key: 'archive', label: 'Archives & Compression' },
    { key: 'sec', label: 'Security (Kali)', kali: true }
  ];

  WT.data.linux = [
    /* ---------------- files & directories ---------------- */
    {
      cmd: 'ls', cat: 'files',
      desc: 'List the contents of a directory (files, sub-directories, attributes).',
      syntax: 'ls [OPTION]... [FILE]...',
      opts: [
        ['-l', 'long format: permissions, owner, size, modification time'],
        ['-a', 'include hidden entries whose name starts with a dot'],
        ['-A', 'like -a but omit the implied . and .. entries'],
        ['-h', 'human-readable sizes (K, M, G) — combine with -l'],
        ['-R', 'recursively list all sub-directories'],
        ['-t', 'sort by modification time, newest first'],
        ['-S', 'sort by file size, largest first'],
        ['-r', 'reverse the sort order'],
        ['-d', 'list directories themselves, not their contents'],
        ['-i', 'show the inode number of each entry'],
        ['-n', 'like -l but show numeric UID/GID instead of names'],
        ['-F', 'append a type indicator (/ dir, @ symlink, * executable)']
      ],
      examples: [
        'ls -la',
        'ls -lh /var/log',
        'ls -R ~/Projects',
        'ls -lt | head -20'
      ]
    },
    {
      cmd: 'cd', cat: 'files',
      desc: 'Change the current working directory of the shell.',
      syntax: 'cd [DIRECTORY]',
      opts: [
        ['-', 'return to the previous working directory (OLDPWD)'],
        ['~', 'expand to the current user home directory'],
        ['..', 'move up one directory level'],
        ['.', 'stay in the current directory (no-op)']
      ],
      examples: [
        'cd /etc/nginx',
        'cd ~/Downloads',
        'cd ..',
        'cd -'
      ]
    },
    {
      cmd: 'pwd', cat: 'files',
      desc: 'Print the full path of the current working directory.',
      syntax: 'pwd [-LP]',
      opts: [
        ['-L', 'use the logical path (default, follows symlinks)'],
        ['-P', 'use the physical path, resolving all symlinks']
      ],
      examples: ['pwd', 'pwd -P']
    },
    {
      cmd: 'cp', cat: 'files',
      desc: 'Copy files and directories from source to destination.',
      syntax: 'cp [OPTION]... SOURCE... DEST',
      opts: [
        ['-r', 'copy directories recursively'],
        ['-a', 'archive mode: preserve mode, ownership, timestamps, symlinks'],
        ['-v', 'verbose: print each file as it is copied'],
        ['-i', 'prompt before overwriting an existing file'],
        ['-n', 'do not overwrite an existing file'],
        ['-p', 'preserve mode, ownership and timestamp attributes'],
        ['-u', 'copy only when the source is newer than the destination'],
        ['-d', 'preserve symlinks rather than following them'],
        ['-l', 'create hard links instead of copying'],
        ['-s', 'create symbolic links instead of copying']
      ],
      examples: [
        'cp report.txt backup/report.bak',
        'cp -a /etc/nginx ./nginx-backup',
        'cp -rv src/* /opt/app/',
        'cp -i file.txt /mnt/usb/'
      ]
    },
    {
      cmd: 'mv', cat: 'files',
      desc: 'Move or rename files and directories.',
      syntax: 'mv [OPTION]... SOURCE... DEST',
      opts: [
        ['-i', 'prompt before overwriting an existing file'],
        ['-n', 'never overwrite an existing file'],
        ['-v', 'verbose: explain what is being done'],
        ['-u', 'move only when the source is newer than the destination'],
        ['-t', 'move all source arguments into the given directory']
      ],
      examples: [
        'mv old.txt new.txt',
        'mv photos.tar.gz /tmp/',
        'mv -v *.log /var/log/app/'
      ]
    },
    {
      cmd: 'rm', cat: 'files',
      desc: 'Remove files or directories. Irreversible — there is no trash bin.',
      syntax: 'rm [OPTION]... FILE...',
      opts: [
        ['-r', 'remove directories and their contents recursively'],
        ['-f', 'force: never prompt, ignore missing files'],
        ['-rf', 'force recursive removal (use with extreme caution)'],
        ['-i', 'prompt before every removal'],
        ['-v', 'verbose: explain what is being removed'],
        ['-d', 'remove empty directories'],
        ['--', 'end of options, treat the rest as file names']
      ],
      examples: [
        'rm file.txt',
        'rm -i old.log',
        'rm -rf build/',
        'rm -- *.tmp'
      ]
    },
    {
      cmd: 'mkdir', cat: 'files',
      desc: 'Create one or more directories.',
      syntax: 'mkdir [OPTION]... DIRECTORY...',
      opts: [
        ['-p', 'create parent directories as needed; no error if it exists'],
        ['-v', 'verbose: print a message for each created directory'],
        ['-m', 'set the file mode (permissions) for the new directory']
      ],
      examples: [
        'mkdir projects',
        'mkdir -p ~/work/2026/january',
        'mkdir -m 700 private'
      ]
    },
    {
      cmd: 'rmdir', cat: 'files',
      desc: 'Remove empty directories only.',
      syntax: 'rmdir [OPTION]... DIRECTORY...',
      opts: [
        ['-p', 'remove the directory and its empty parents'],
        ['-v', 'verbose: explain what is being done'],
        ['--ignore-fail-on-non-empty', 'do not report an error for non-empty directories']
      ],
      examples: ['rmdir empty_dir', 'rmdir -p a/b/c']
    },
    {
      cmd: 'touch', cat: 'files',
      desc: 'Create an empty file, or update an existing file access/modification time.',
      syntax: 'touch [OPTION]... FILE...',
      opts: [
        ['-a', 'change only the access time'],
        ['-m', 'change only the modification time'],
        ['-c', 'do not create any file'],
        ['-d', 'set the timestamp from a given date string'],
        ['-r', 'use the timestamp of another reference file']
      ],
      examples: [
        'touch newfile.txt',
        'touch -d "2026-01-01 09:00" log.txt',
        'touch -r template.txt output.txt'
      ]
    },
    {
      cmd: 'ln', cat: 'files',
      desc: 'Create links between files — hard links and symbolic (soft) links.',
      syntax: 'ln [OPTION]... TARGET... [DIR]',
      opts: [
        ['-s', 'create a symbolic link instead of a hard link'],
        ['-f', 'remove an existing destination file'],
        ['-v', 'verbose: print the name of each linked file'],
        ['-n', 'treat the destination symlink as a normal file'],
        ['-b', 'create a backup of the destination before replacing it']
      ],
      examples: [
        'ln -s /opt/app/current app',
        'ln -sf /usr/bin/python3 /usr/local/bin/python',
        'ln original.txt hardlink.txt'
      ]
    },
    {
      cmd: 'tree', cat: 'files',
      desc: 'Display the directory structure as an indented tree.',
      syntax: 'tree [OPTION]... [PATH]',
      opts: [
        ['-a', 'show all files, including hidden ones'],
        ['-L', 'limit the maximum depth of the tree'],
        ['-d', 'list directories only'],
        ['-I', 'ignore files matching the given pattern'],
        ['-f', 'print the full path prefix for each entry'],
        ['-h', 'human-readable file sizes']
      ],
      examples: ['tree', 'tree -L 2 /var/www', 'tree -d -I node_modules']
    },
    {
      cmd: 'stat', cat: 'files',
      desc: 'Show detailed status information about a file or filesystem.',
      syntax: 'stat [OPTION]... FILE...',
      opts: [
        ['-c', 'use a custom output format'],
        ['-f', 'show filesystem status instead of a file'],
        ['-t', 'show information in a terse, machine-readable form']
      ],
      examples: [
        'stat file.txt',
        'stat -c "%n %s bytes" report.pdf',
        'stat -f .'
      ]
    },
    {
      cmd: 'file', cat: 'files',
      desc: 'Determine a file type by inspecting its content (magic bytes).',
      syntax: 'file [OPTION]... FILE...',
      opts: [
        ['-i', 'output the MIME type instead of the human description'],
        ['-b', 'brief: do not prepend the filename'],
        ['-z', 'look inside compressed files'],
        ['-L', 'follow symlinks']
      ],
      examples: ['file image.png', 'file -i backup.tar.gz', 'file *']
    },
    {
      cmd: 'du', cat: 'files',
      desc: 'Estimate and display disk usage of files and directories.',
      syntax: 'du [OPTION]... [PATH]...',
      opts: [
        ['-s', 'summarize: print only a total for each argument'],
        ['-h', 'human-readable sizes'],
        ['-a', 'show sizes for individual files, not just directories'],
        ['-d', 'output for directories up to a given depth'],
        ['-c', 'produce a grand total at the end'],
        ['-x', 'skip directories on different filesystems']
      ],
      examples: [
        'du -sh *',
        'du -h --max-depth=1 /var',
        'du -ah . | sort -rh | head -20'
      ]
    },
    {
      cmd: 'head', cat: 'files',
      desc: 'Output the first part (lines or bytes) of a file.',
      syntax: 'head [OPTION]... [FILE]...',
      opts: [
        ['-n', 'print the first N lines'],
        ['-c', 'print the first N bytes'],
        ['-q', 'quiet: never print file name headers'],
        ['-v', 'always print file name headers']
      ],
      examples: ['head -n 20 access.log', 'head -c 512 boot.bin', 'head -5 *.txt']
    },
    {
      cmd: 'tail', cat: 'files',
      desc: 'Output the last part of a file; can follow a file as it grows.',
      syntax: 'tail [OPTION]... [FILE]...',
      opts: [
        ['-n', 'print the last N lines'],
        ['-c', 'print the last N bytes'],
        ['-f', 'follow: keep the file open and print new lines as they appear'],
        ['-F', 'follow by name, retrying even if the file is rotated/recreated'],
        ['-s', 'with -f, sleep between checks (default 1s)']
      ],
      examples: [
        'tail -n 50 error.log',
        'tail -f /var/log/syslog',
        'tail -F /var/log/nginx/access.log'
      ]
    },
    {
      cmd: 'clear', cat: 'files',
      desc: 'Clear the terminal screen.',
      syntax: 'clear',
      opts: [],
      examples: ['clear', 'Ctrl + L']
    },

    /* ---------------- text & search ---------------- */
    {
      cmd: 'cat', cat: 'text',
      desc: 'Concatenate and print file contents; also used to join files.',
      syntax: 'cat [OPTION]... [FILE]...',
      opts: [
        ['-n', 'number all output lines'],
        ['-b', 'number only non-empty output lines'],
        ['-A', 'show non-printing characters, tabs and line endings'],
        ['-E', 'display $ at the end of each line'],
        ['-T', 'display TAB characters as ^I']
      ],
      examples: [
        'cat notes.txt',
        'cat -n script.sh',
        'cat part1.txt part2.txt > full.txt',
        'cat /etc/os-release'
      ]
    },
    {
      cmd: 'less', cat: 'text',
      desc: 'Page through a file interactively (scroll forward and backward).',
      syntax: 'less [OPTION]... FILE',
      opts: [
        ['-N', 'display line numbers'],
        ['-S', 'chop long lines instead of wrapping them'],
        ['-i', 'case-insensitive searches'],
        ['-F', 'quit automatically if the output fits on one screen']
      ],
      examples: [
        'less /var/log/syslog',
        'journalctl | less',
        'less -N app.py'
      ],
      keys: [
        ['Space', 'scroll one page forward'],
        ['b', 'scroll one page backward'],
        ['/pattern', 'search forward for pattern'],
        ['?pattern', 'search backward'],
        ['g / G', 'jump to start / end'],
        ['q', 'quit']
      ]
    },
    {
      cmd: 'grep', cat: 'text',
      desc: 'Search input (files or stdin) for lines matching a pattern.',
      syntax: 'grep [OPTION]... PATTERN [FILE]...',
      opts: [
        ['-i', 'ignore case distinctions'],
        ['-r', 'search directories recursively'],
        ['-R', 'like -r but follow symlinks'],
        ['-n', 'prefix each match with its line number'],
        ['-v', 'select non-matching lines (invert)'],
        ['-l', 'print only the names of files with matches'],
        ['-c', 'print only a count of matching lines'],
        ['-w', 'match whole words only'],
        ['-E', 'use extended regular expressions'],
        ['-F', 'treat PATTERN as a fixed string (fast)'],
        ['-o', 'print only the matched part of the line'],
        ['-A', 'print N lines after each match'],
        ['-B', 'print N lines before each match'],
        ['-C', 'print N lines of context around each match'],
        ['--color', 'highlight the matching text']
      ],
      examples: [
        'grep -rn "TODO" src/',
        'grep -i "error" /var/log/syslog',
        'grep -E "^[0-9]{3}-[0-9]{4}" contacts.txt',
        'ps aux | grep -v grep | grep nginx'
      ]
    },
    {
      cmd: 'find', cat: 'text',
      desc: 'Search the directory tree for files matching many different criteria.',
      syntax: 'find [PATH] [CRITERIA] [ACTION]',
      opts: [
        ['-name', 'match a file name glob (case-sensitive)'],
        ['-iname', 'match a file name glob, ignoring case'],
        ['-type', 'f=file, d=directory, l=symlink'],
        ['-size', 'match by size, e.g. +10M, -1k'],
        ['-mtime', 'modified n days ago; +n older, -n newer'],
        ['-user / -group', 'match by owning user / group'],
        ['-perm', 'match by permission bits'],
        ['-maxdepth', 'limit how deep the search descends'],
        ['-exec', 'run a command on each result'],
        ['-delete', 'delete every matching file'],
        ['-print', 'print the path (default action)'],
        ['-empty', 'match empty files or directories']
      ],
      examples: [
        'find . -name "*.log" -type f',
        'find /var -size +100M -exec ls -lh {} \\;',
        'find ~ -mtime -1 -type f',
        'find . -type d -empty -delete',
        'find / -iname "config*" -maxdepth 4'
      ]
    },
    {
      cmd: 'sed', cat: 'text',
      desc: 'Stream editor for filtering and transforming text (substitution, deletion).',
      syntax: 'sed [OPTION]... "script" [FILE]...',
      opts: [
        ['-i', 'edit files in place (add a suffix to back up)'],
        ['-e', 'add another editing command to the script'],
        ['-n', 'suppress automatic printing; use p to output'],
        ['-E', 'use extended regular expressions'],
        ['-r', 'same as -E on GNU sed']
      ],
      examples: [
        'sed "s/old/new/g" file.txt',
        'sed -i "s/DEBUG/INFO/g" app.log',
        'sed -n "10,20p" file.txt',
        'sed "/^#/d" config.conf'
      ]
    },
    {
      cmd: 'awk', cat: 'text',
      desc: 'Pattern-scanning and processing language — split, filter and reformat columns.',
      syntax: 'awk "pattern { action }" [FILE]...',
      opts: [
        ['-F', 'set the input field separator'],
        ['-v', 'assign a variable before execution'],
        ['NR', 'current record (line) number'],
        ['NF', 'number of fields in the current record'],
        ['$0 / $n', 'the whole line / the nth field']
      ],
      examples: [
        'awk "{print $1, $3}" access.log',
        'awk -F: "{print $1}" /etc/passwd',
        'awk "{sum+=$1} END {print sum}" numbers.txt',
        'df -h | awk "\$5 > 80 {print \$1, \$5}"'
      ]
    },
    {
      cmd: 'sort', cat: 'text',
      desc: 'Sort lines of text from files or standard input.',
      syntax: 'sort [OPTION]... [FILE]...',
      opts: [
        ['-n', 'numeric sort'],
        ['-r', 'reverse the result'],
        ['-u', 'output only the first of equal lines (unique)'],
        ['-f', 'fold case: ignore differences in case'],
        ['-k', 'sort via a specific key field'],
        ['-t', 'set the field separator character'],
        ['-h', 'sort human-readable numbers'],
        ['-o', 'write the result to the given output file']
      ],
      examples: [
        'sort names.txt',
        'sort -rn -k2 data.txt',
        'sort -u -t: -k1,1 /etc/passwd',
        'ls -lh | sort -k5 -h'
      ]
    },
    {
      cmd: 'uniq', cat: 'text',
      desc: 'Report or omit repeated adjacent lines (usually after sort).',
      syntax: 'uniq [OPTION]... [INPUT [OUTPUT]]',
      opts: [
        ['-c', 'prefix each line with its count of occurrences'],
        ['-d', 'print only repeated lines'],
        ['-u', 'print only unique lines'],
        ['-i', 'ignore differences in case'],
        ['-f', 'skip the first N fields'],
        ['-s', 'skip the first N characters']
      ],
      examples: [
        'sort file.txt | uniq',
        'sort file.txt | uniq -c | sort -rn',
        'uniq -u sorted.txt'
      ]
    },
    {
      cmd: 'wc', cat: 'text',
      desc: 'Count lines, words, bytes or characters of input.',
      syntax: 'wc [OPTION]... [FILE]...',
      opts: [
        ['-l', 'count lines'],
        ['-w', 'count words'],
        ['-c', 'count bytes'],
        ['-m', 'count characters'],
        ['-L', 'print the length of the longest line']
      ],
      examples: [
        'wc -l access.log',
        'wc -w essay.txt',
        'ls | wc -l'
      ]
    },
    {
      cmd: 'cut', cat: 'text',
      desc: 'Remove sections (columns/characters) from each line of input.',
      syntax: 'cut [OPTION]... [FILE]...',
      opts: [
        ['-d', 'set the field delimiter (default: TAB)'],
        ['-f', 'select a list of fields'],
        ['-c', 'select a list of character ranges'],
        ['-b', 'select a list of byte ranges'],
        ['--output-delimiter', 'use a different separator for the output']
      ],
      examples: [
        'cut -d: -f1 /etc/passwd',
        'cut -c1-10 file.txt',
        'echo "a,b,c" | cut -d, -f2'
      ]
    },
    {
      cmd: 'tr', cat: 'text',
      desc: 'Translate, squeeze or delete characters from standard input.',
      syntax: 'tr [OPTION]... SET1 [SET2]',
      opts: [
        ['-d', 'delete characters in SET1'],
        ['-s', 'squeeze repeated characters into one'],
        ['-c', 'complement: use the inverse of SET1']
      ],
      examples: [
        'echo "hello" | tr "a-z" "A-Z"',
        'cat file.txt | tr -d "\\r"',
        'echo "a,,b" | tr -s ","'
      ]
    },
    {
      cmd: 'diff', cat: 'text',
      desc: 'Compare two files line by line and show the differences.',
      syntax: 'diff [OPTION]... FILE1 FILE2',
      opts: [
        ['-u', 'unified context format (used by patch/git)'],
        ['-y', 'side-by-side comparison'],
        ['-w', 'ignore all white space'],
        ['-r', 'compare directories recursively'],
        ['-q', 'report only whether the files differ']
      ],
      examples: [
        'diff old.conf new.conf',
        'diff -u a.txt b.txt',
        'diff -r dir1 dir2'
      ]
    },
    {
      cmd: 'tee', cat: 'text',
      desc: 'Read from stdin and write to both stdout and one or more files.',
      syntax: 'tee [OPTION]... [FILE]...',
      opts: [
        ['-a', 'append to the given files rather than overwriting'],
        ['-i', 'ignore interrupt signals']
      ],
      examples: [
        'make 2>&1 | tee build.log',
        'echo "hello" | tee out.txt',
        'sudo cmd | tee -a /var/log/admin.log'
      ]
    },
    {
      cmd: 'xargs', cat: 'text',
      desc: 'Build and execute command lines from standard input arguments.',
      syntax: 'xargs [OPTION]... [COMMAND [ARG]...]',
      opts: [
        ['-n', 'use at most N arguments per command run'],
        ['-P', 'run up to N processes in parallel'],
        ['-0', 'split input on NUL, safe for find -print0'],
        ['-I', 'replace occurrences of a placeholder with each argument'],
        ['-t', 'print each command on stderr before running it'],
        ['-r', 'do not run the command if the input is empty']
      ],
      examples: [
        'find . -name "*.tmp" -print0 | xargs -0 rm -f',
        'cat urls.txt | xargs -n1 curl -O',
        'ps aux | awk "{print \$2}" | xargs kill -9'
      ]
    },
    {
      cmd: 'echo', cat: 'text',
      desc: 'Print a line of text, and expand variables or escape sequences.',
      syntax: 'echo [OPTION]... [STRING]...',
      opts: [
        ['-n', 'do not output a trailing newline'],
        ['-e', 'enable interpretation of backslash escapes (\\n, \\t)'],
        ['\\n / \\t', 'newline / tab when -e is used']
      ],
      examples: [
        'echo "Hello World"',
        'echo -e "line1\\nline2"',
        'echo -n "no newline"',
        'echo $PATH'
      ]
    },

    /* ---------------- system & processes ---------------- */
    {
      cmd: 'ps', cat: 'system',
      desc: 'Report a snapshot of the currently running processes.',
      syntax: 'ps [OPTION]...',
      opts: [
        ['aux', 'BSD style: all processes for all users, with user and resource columns'],
        ['-ef', 'UNIX style: full format, every process'],
        ['-u', 'show the effective user name and start time'],
        ['-p', 'select by process ID'],
        ['-o', 'custom output format, e.g. pid,cmd,%mem'],
        ['--sort', 'sort the output, e.g. --sort=-%mem']
      ],
      examples: [
        'ps aux',
        'ps -ef | grep nginx',
        'ps -eo pid,ppid,%mem,cmd --sort=-%mem | head'
      ]
    },
    {
      cmd: 'top', cat: 'system',
      desc: 'Interactive, real-time view of running processes and system load.',
      syntax: 'top [OPTION]...',
      opts: [
        ['-d', 'set the refresh delay in seconds'],
        ['-u', 'filter by a specific user'],
        ['-o', 'sort by a named column'],
        ['-b', 'batch mode, suitable for scripting (non-interactive)']
      ],
      examples: ['top', 'top -u www-data', 'top -bn1 > snapshot.txt'],
      keys: [
        ['P', 'sort by CPU usage'],
        ['M', 'sort by memory usage'],
        ['k', 'kill a process by PID'],
        ['r', 'renice a process'],
        ['1', 'show per-core CPU breakdown'],
        ['q', 'quit']
      ]
    },
    {
      cmd: 'htop', cat: 'system',
      desc: 'Modern, colour, interactive process viewer (improved top).',
      syntax: 'htop [OPTION]... [PID]',
      opts: [
        ['-d', 'set the update delay'],
        ['-u', 'show only processes owned by a user'],
        ['-p', 'show only the given PIDs'],
        ['-s', 'sort by a column']
      ],
      examples: ['htop', 'htop -u postgres'],
      keys: [
        ['F5 / F6', 'tree view / sort menu'],
        ['F9', 'kill a process'],
        ['F4', 'filter processes'],
        ['F3', 'search'],
        ['q', 'quit']
      ]
    },
    {
      cmd: 'kill', cat: 'system',
      desc: 'Send a signal to a process, by default requesting it to terminate.',
      syntax: 'kill [-SIGNAL] PID...',
      opts: [
        ['-15 / -TERM', 'graceful termination (default, allows cleanup)'],
        ['-9 / -KILL', 'forceful, immediate termination (cannot be caught)'],
        ['-1 / -HUP', 'reload: often used to make a daemon re-read config'],
        ['-l', 'list all available signal names and numbers']
      ],
      examples: [
        'kill 1234',
        'kill -9 1234',
        'kill -HUP $(cat /var/run/nginx.pid)',
        'kill -l'
      ]
    },
    {
      cmd: 'killall', cat: 'system',
      desc: 'Send a signal to all processes matching a name.',
      syntax: 'killall [-SIGNAL] NAME...',
      opts: [
        ['-9', 'force kill'],
        ['-u', 'kill only processes owned by a given user'],
        ['-i', 'prompt before killing each process'],
        ['-w', 'wait until the processes are dead']
      ],
      examples: ['killall firefox', 'killall -9 node', 'killall -u www-data php-fpm']
    },
    {
      cmd: 'jobs', cat: 'system',
      desc: 'List the job statuses of the current shell session.',
      syntax: 'jobs [OPTION]... [JOBSPEC]...',
      opts: [
        ['-l', 'list the PID alongside each job'],
        ['-p', 'list process group IDs only'],
        ['-r', 'list only running jobs'],
        ['-s', 'list only stopped jobs']
      ],
      examples: ['jobs', 'jobs -l', 'fg %1']
    },
    {
      cmd: 'bg', cat: 'system',
      desc: 'Resume a suspended job and run it in the background.',
      syntax: 'bg [JOBSPEC]...',
      opts: [],
      examples: ['bg', 'bg %2']
    },
    {
      cmd: 'fg', cat: 'system',
      desc: 'Bring a background or suspended job into the foreground.',
      syntax: 'fg [JOBSPEC]',
      opts: [],
      examples: ['fg', 'fg %1']
    },
    {
      cmd: 'nohup', cat: 'system',
      desc: 'Run a command that survives logout by ignoring the hangup signal.',
      syntax: 'nohup COMMAND [ARG]... [&]',
      opts: [
        ['&', 'run the command in the background'],
        ['>', 'redirect output, usually > out.log 2>&1']
      ],
      examples: [
        'nohup ./backup.sh > backup.log 2>&1 &',
        'nohup python server.py &'
      ]
    },
    {
      cmd: 'systemctl', cat: 'system',
      desc: 'Control the systemd system and service manager (start, stop, enable).',
      syntax: 'systemctl [COMMAND] [UNIT...]',
      opts: [
        ['start', 'start one or more units now'],
        ['stop', 'stop running units'],
        ['restart', 'restart a unit'],
        ['reload', 'ask a unit to re-read its configuration'],
        ['enable', 'start automatically at boot'],
        ['disable', 'do not start automatically at boot'],
        ['status', 'show the current state and recent log lines'],
        ['list-units', 'list loaded units'],
        ['list-unit-files', 'list all unit files and their enabled state'],
        ['mask / unmask', 'permanently block / unblock a unit']
      ],
      examples: [
        'systemctl status nginx',
        'sudo systemctl restart nginx',
        'sudo systemctl enable --now ssh',
        'systemctl list-units --type=service --state=running'
      ]
    },
    {
      cmd: 'journalctl', cat: 'system',
      desc: 'Query the systemd journal (central log store).',
      syntax: 'journalctl [OPTION]... [MATCHES]',
      opts: [
        ['-u', 'show logs for a specific unit'],
        ['-f', 'follow new entries as they are written'],
        ['-n', 'show the last N entries'],
        ['-b', 'show entries from the current boot'],
        ['-p', 'filter by priority, e.g. err, warning'],
        ['--since / --until', 'limit to a time range'],
        ['-xe', 'full entries plus an explanation line']
      ],
      examples: [
        'journalctl -u nginx',
        'journalctl -f',
        'journalctl -b -p err',
        'journalctl --since "1 hour ago"'
      ]
    },
    {
      cmd: 'uname', cat: 'system',
      desc: 'Print system and kernel information.',
      syntax: 'uname [OPTION]...',
      opts: [
        ['-a', 'print all available information'],
        ['-r', 'print the kernel release'],
        ['-m', 'print the machine hardware name (architecture)'],
        ['-n', 'print the network node hostname'],
        ['-s', 'print the kernel name (Linux)']
      ],
      examples: ['uname -a', 'uname -r', 'uname -m']
    },
    {
      cmd: 'uptime', cat: 'system',
      desc: 'Show how long the system has been running, plus load averages.',
      syntax: 'uptime [OPTION]...',
      opts: [
        ['-p', 'pretty, human-readable uptime'],
        ['-s', 'print the date and time the system started']
      ],
      examples: ['uptime', 'uptime -p']
    },
    {
      cmd: 'free', cat: 'system',
      desc: 'Display the amount of free and used memory (RAM and swap).',
      syntax: 'free [OPTION]...',
      opts: [
        ['-h', 'human-readable units (MiB, GiB)'],
        ['-m', 'display amounts in mebibytes'],
        ['-g', 'display amounts in gibibytes'],
        ['-t', 'add a line showing the total of RAM and swap'],
        ['-s', 'continuously display with a delay of N seconds']
      ],
      examples: ['free -h', 'free -ht', 'free -m']
    },
    {
      cmd: 'lscpu', cat: 'system',
      desc: 'Display detailed information about the CPU architecture.',
      syntax: 'lscpu [OPTION]...',
      opts: [
        ['-e', 'print an extended format table'],
        ['-p', 'print a parsable format'],
        ['-J', 'output as JSON']
      ],
      examples: ['lscpu', 'lscpu | grep "Model name"']
    },
    {
      cmd: 'env', cat: 'system',
      desc: 'Print the current environment variables, or run a program in a modified environment.',
      syntax: 'env [OPTION]... [NAME=VALUE]... [COMMAND [ARG]...]',
      opts: [
        ['-i', 'start with an empty environment'],
        ['-u', 'remove a variable from the environment'],
        ['-0', 'output NUL terminated lines']
      ],
      examples: ['env', 'env -i ./script.sh', 'env MY_VAR=1 ./app']
    },
    {
      cmd: 'export', cat: 'system',
      desc: 'Set an environment variable for the current shell and its children.',
      syntax: 'export [NAME[=VALUE]...] [-n NAME]...',
      opts: [
        ['-p', 'list all exported variables'],
        ['-n', 'remove the export attribute from a name']
      ],
      examples: [
        'export PATH="$PATH:/opt/bin"',
        'export EDITOR=vim',
        'export -p'
      ]
    },
    {
      cmd: 'alias', cat: 'system',
      desc: 'Create a shorthand name for a longer command.',
      syntax: 'alias [NAME[=VALUE]]...',
      opts: [
        ['unalias', 'remove one or more aliases']
      ],
      examples: [
        'alias ll="ls -la"',
        'alias update="sudo apt update && sudo apt upgrade -y"',
        'alias',
        'unalias ll'
      ]
    },
    {
      cmd: 'history', cat: 'system',
      desc: 'Show the command history of the current shell.',
      syntax: 'history [n] [-c] [-d offset]',
      opts: [
        ['n', 'show the last n commands'],
        ['-c', 'clear the entire history list'],
        ['-d', 'delete the history entry at a given offset'],
        ['!n', 're-run command number n'],
        ['!!', 're-run the previous command']
      ],
      examples: ['history', 'history | grep docker', '!1024', '!!']
    },
    {
      cmd: 'dmesg', cat: 'system',
      desc: 'Print or control the kernel ring buffer (boot and hardware messages).',
      syntax: 'dmesg [OPTION]...',
      opts: [
        ['-T', 'print human-readable timestamps'],
        ['-w', 'continuously watch new messages'],
        ['-l', 'filter by level, e.g. err, warn'],
        ['-e', 'print the human-readable message and the facility']
      ],
      examples: ['sudo dmesg -T', 'sudo dmesg -w', 'sudo dmesg | grep usb']
    },

    /* ---------------- networking ---------------- */
    {
      cmd: 'ip', cat: 'net',
      desc: 'Show or manipulate routing, devices, interfaces and tunnels (modern ifconfig replacement).',
      syntax: 'ip OBJECT { COMMAND | help }',
      opts: [
        ['ip a / addr', 'list all network interfaces and their addresses'],
        ['ip r / route', 'show or change the routing table'],
        ['ip link', 'manage network interfaces (up, down, set)'],
        ['ip -br', 'brief, one-line-per-interface output'],
        ['ip neigh', 'show or manage the ARP/NDP neighbour cache'],
        ['ip -s link', 'show interface statistics (errors, packets)']
      ],
      examples: [
        'ip a',
        'ip r',
        'sudo ip link set eth0 down',
        'ip -br a',
        'ip neigh'
      ]
    },
    {
      cmd: 'ping', cat: 'net',
      desc: 'Test reachability of a host and measure round-trip time using ICMP.',
      syntax: 'ping [OPTION]... DESTINATION',
      opts: [
        ['-c', 'stop after sending N packets'],
        ['-i', 'set the interval between packets'],
        ['-s', 'set the packet payload size in bytes'],
        ['-t', 'set the TTL (time to live)'],
        ['-f', 'flood ping (root only, for stress testing)'],
        ['-6', 'force IPv6']
      ],
      examples: [
        'ping google.com',
        'ping -c 4 8.8.8.8',
        'ping -i 0.2 -c 20 10.0.0.1'
      ]
    },
    {
      cmd: 'ss', cat: 'net',
      desc: 'Inspect socket statistics — connections, ports, processes (modern netstat).',
      syntax: 'ss [OPTION]... [FILTER]',
      opts: [
        ['-t', 'show TCP sockets'],
        ['-u', 'show UDP sockets'],
        ['-l', 'show listening sockets only'],
        ['-p', 'show the process using each socket'],
        ['-n', 'show numeric ports instead of service names'],
        ['-a', 'show both listening and non-listening sockets'],
        ['-i', 'show internal TCP information']
      ],
      examples: [
        'ss -tuln',
        'ss -tulpn',
        'ss -s',
        'ss -tn state established'
      ]
    },
    {
      cmd: 'netstat', cat: 'net',
      desc: 'Display network connections, routing tables and interface statistics (legacy, use ss).',
      syntax: 'netstat [OPTION]...',
      opts: [
        ['-t', 'show TCP connections'],
        ['-u', 'show UDP connections'],
        ['-l', 'show listening ports'],
        ['-p', 'show the owning process'],
        ['-n', 'show numeric addresses and ports'],
        ['-r', 'show the routing table'],
        ['-i', 'show interface statistics']
      ],
      examples: [
        'netstat -tuln',
        'netstat -tulpn',
        'netstat -rn'
      ]
    },
    {
      cmd: 'curl', cat: 'net',
      desc: 'Transfer data to or from a server using many protocols (HTTP, FTP, and more).',
      syntax: 'curl [OPTION]... URL...',
      opts: [
        ['-O', 'write output to a remote-named local file'],
        ['-o', 'write output to the given local file'],
        ['-L', 'follow HTTP redirects'],
        ['-I / --head', 'fetch only the response headers'],
        ['-H', 'add a custom request header'],
        ['-d', 'send data in a POST body'],
        ['-X', 'override the request method (GET, POST, DELETE)'],
        ['-u', 'send user:password for authentication'],
        ['-v', 'verbose output for debugging'],
        ['-A', 'set the User-Agent string'],
        ['-k', 'allow insecure TLS connections (self-signed)'],
        ['-w', 'print transfer metrics after completion']
      ],
      examples: [
        'curl https://api.example.com/health',
        'curl -O https://example.com/file.zip',
        'curl -X POST -H "Content-Type: application/json" -d \'{"a":1}\' https://api/x',
        'curl -I https://example.com'
      ]
    },
    {
      cmd: 'wget', cat: 'net',
      desc: 'Non-interactive network downloader — fetch files over HTTP, HTTPS and FTP.',
      syntax: 'wget [OPTION]... [URL]...',
      opts: [
        ['-O', 'write to the specified output file'],
        ['-c', 'resume an interrupted download'],
        ['-r', 'download recursively'],
        ['-q', 'quiet mode, no output'],
        ['-b', 'run in the background'],
        ['-P', 'save into the specified directory'],
        ['--limit-rate', 'throttle the download speed'],
        ['-U', 'set the User-Agent string'],
        ['-np', 'do not ascend to the parent directory (recursive)']
      ],
      examples: [
        'wget https://example.com/file.zip',
        'wget -c -P ~/Downloads https://example.com/big.iso',
        'wget -r -np -nH --cut-dirs=2 https://example.com/docs/'
      ]
    },
    {
      cmd: 'ssh', cat: 'net',
      desc: 'Securely log in to and run commands on a remote machine over an encrypted channel.',
      syntax: 'ssh [OPTION]... [USER@]HOST [COMMAND]',
      opts: [
        ['-p', 'connect to a non-default SSH port'],
        ['-i', 'specify a private key file for authentication'],
        ['-l', 'specify the remote user to log in as'],
        ['-L', 'local port forward: [local:]port:host:hostport'],
        ['-R', 'remote port forward'],
        ['-D', 'dynamic port forward (SOCKS proxy)'],
        ['-C', 'enable compression'],
        ['-t', 'force allocation of a pseudo-terminal'],
        ['-o', 'pass an option in the config-file format']
      ],
      examples: [
        'ssh user@192.168.1.10',
        'ssh -p 2222 -i ~/.ssh/id_ed25519 root@server.com',
        'ssh -L 8080:localhost:80 user@server',
        'ssh user@host "df -h"'
      ]
    },
    {
      cmd: 'scp', cat: 'net',
      desc: 'Copy files securely between hosts over the SSH protocol.',
      syntax: 'scp [OPTION]... [USER@]HOST:PATH... [USER@]HOST:PATH',
      opts: [
        ['-r', 'copy directories recursively'],
        ['-P', 'use a non-default SSH port (capital P)'],
        ['-i', 'specify a private key file'],
        ['-C', 'enable compression during transfer'],
        ['-p', 'preserve modification times and modes'],
        ['-v', 'verbose mode for debugging']
      ],
      examples: [
        'scp report.pdf user@server:/tmp/',
        'scp -r user@server:/var/log ./logs',
        'scp -P 2222 file.txt user@server:~/'
      ]
    },
    {
      cmd: 'rsync', cat: 'net',
      desc: 'Efficiently synchronize files locally or over SSH, sending only the differences.',
      syntax: 'rsync [OPTION]... SRC... [DEST]',
      opts: [
        ['-a', 'archive mode: recursive and preserves links, perms, times'],
        ['-v', 'verbose'],
        ['-z', 'compress data during transfer'],
        ['-n', 'dry run: show what would happen without doing it'],
        ['--delete', 'delete files in the destination that no longer exist in the source'],
        ['-e', 'specify the remote shell, e.g. -e ssh'],
        ['-P', 'show progress and allow resume'],
        ['-h', 'human-readable numbers'],
        ['--exclude', 'exclude files matching a pattern']
      ],
      examples: [
        'rsync -avz ./src/ user@server:/opt/app/',
        'rsync -avzn --delete ./src/ ./backup/',
        'rsync -avz -e ssh /data/ user@server:/backup/data/'
      ]
    },
    {
      cmd: 'dig', cat: 'net',
      desc: 'Query DNS servers and inspect DNS records in detail.',
      syntax: 'dig [@SERVER] NAME [TYPE] [OPTION]...',
      opts: [
        ['+short', 'terse output, just the answer'],
        ['+noall +answer', 'print only the answer section'],
        ['A / AAAA / MX / TXT', 'query type: address, mail exchanger, text'],
        ['+trace', 'trace the full resolution path from the root'],
        ['-x', 'reverse lookup from an IP to a hostname']
      ],
      examples: [
        'dig example.com',
        'dig +short example.com A',
        'dig example.com MX',
        'dig -x 8.8.8.8'
      ]
    },
    {
      cmd: 'traceroute', cat: 'net',
      desc: 'Trace the network path packets take to a destination, hop by hop.',
      syntax: 'traceroute [OPTION]... HOST',
      opts: [
        ['-n', 'do not resolve hostnames (faster)'],
        ['-m', 'set the maximum number of hops'],
        ['-q', 'set probes per hop'],
        ['-w', 'set the wait time for each reply']
      ],
      examples: ['traceroute google.com', 'traceroute -n -m 20 8.8.8.8']
    },
    {
      cmd: 'nmap', cat: 'sec',
      desc: 'Network mapper — discover hosts, open ports and services on a network.',
      syntax: 'nmap [OPTION]... TARGET...',
      opts: [
        ['-sS', 'TCP SYN stealth scan (half-open, requires root)'],
        ['-sT', 'TCP connect scan (full handshake)'],
        ['-sU', 'UDP scan'],
        ['-sn', 'ping scan only: discover hosts without port scanning'],
        ['-p', 'specify ports, e.g. -p 80,443 or -p- for all 65535'],
        ['-O', 'enable OS detection'],
        ['-A', 'aggressive: OS, version, script and traceroute'],
        ['-T4', 'timing template: faster (0-5, paranoid to insane)'],
        ['-oN', 'save normal output to a file'],
        ['--script', 'run NSE scripts, e.g. vuln, default']
      ],
      examples: [
        'nmap -sn 192.168.1.0/24',
        'nmap -sS -T4 -p 1-1000 target',
        'nmap -A -T4 example.com',
        'sudo nmap -sU --top-ports 20 target'
      ]
    },

    /* ---------------- packages ---------------- */
    {
      cmd: 'apt', cat: 'pkg',
      desc: 'Debian/Ubuntu package manager — install, update and remove software.',
      syntax: 'apt [COMMAND] [PACKAGE...]',
      opts: [
        ['update', 'refresh the local package index from the repos'],
        ['upgrade', 'upgrade all installed packages to newer versions'],
        ['install', 'install a package (and its dependencies)'],
        ['remove', 'remove a package but keep its config files'],
        ['purge', 'remove a package including its configuration files'],
        ['search', 'search the package index for a keyword'],
        ['show', 'show detailed info about a package'],
        ['list --installed', 'list installed packages'],
        ['autoremove', 'remove automatically installed unused dependencies'],
        ['-y', 'assume yes to all prompts']
      ],
      examples: [
        'sudo apt update',
        'sudo apt install -y nginx',
        'sudo apt upgrade -y',
        'apt search text editor',
        'sudo apt remove --purge firefox'
      ]
    },
    {
      cmd: 'dpkg', cat: 'pkg',
      desc: 'Low-level Debian package tool that apt uses underneath.',
      syntax: 'dpkg [OPTION]... PACKAGE...',
      opts: [
        ['-i', 'install from a local .deb file'],
        ['-r', 'remove a package, keeping config files'],
        ['-P', 'purge: remove including config files'],
        ['-l', 'list packages matching a pattern'],
        ['-L', 'list files owned by an installed package'],
        ['-s', 'show the status of a package'],
        ['-S', 'find which package owns a given file']
      ],
      examples: [
        'sudo dpkg -i package.deb',
        'dpkg -l | grep nginx',
        'dpkg -L nginx',
        'dpkg -S /usr/bin/python3'
      ]
    },
    {
      cmd: 'snap', cat: 'pkg',
      desc: 'Manage snap packages — self-contained applications with automatic updates.',
      syntax: 'snap [COMMAND] [PACKAGE...]',
      opts: [
        ['install', 'install a snap'],
        ['remove', 'uninstall a snap'],
        ['list', 'list installed snaps with versions and channels'],
        ['refresh', 'update all snaps to their latest version'],
        ['info', 'show details about a snap'],
        ['find', 'search the snap store'],
        ['switch', 'change the installed revision'],
        ['connections', 'show the snap interfaces and their connections']
      ],
      examples: [
        'sudo snap install code --classic',
        'snap list',
        'sudo snap refresh',
        'snap info firefox'
      ]
    },
    {
      cmd: 'yum / dnf', cat: 'pkg',
      desc: 'Package manager for RHEL/CentOS/Fedora (dnf is the modern replacement for yum).',
      syntax: 'dnf [COMMAND] [PACKAGE...]',
      opts: [
        ['install', 'install a package'],
        ['remove', 'uninstall a package'],
        ['update / upgrade', 'update all installed packages'],
        ['search', 'search for a package'],
        ['info', 'show package details'],
        ['list installed', 'list installed packages'],
        ['clean all', 'clear the local package cache'],
        ['-y', 'assume yes to all prompts']
      ],
      examples: [
        'sudo dnf install httpd',
        'sudo dnf update -y',
        'dnf search vim',
        'sudo dnf remove httpd'
      ]
    },
    {
      cmd: 'pacman', cat: 'pkg',
      desc: 'Package manager for Arch Linux.',
      syntax: 'pacman [OPTION]... [PACKAGE...]',
      opts: [
        ['-S', 'sync/install a package from the repositories'],
        ['-Ss', 'search for a package in the repositories'],
        ['-Si', 'show info about a repository package'],
        ['-Syu', 'refresh the database and fully upgrade the system'],
        ['-R', 'remove a package'],
        ['-Rs', 'remove a package and its unused dependencies'],
        ['-Q', 'query installed packages'],
        ['-Ql', 'list the files owned by an installed package'],
        ['-Sw', 'download a package without installing it']
      ],
      examples: [
        'sudo pacman -S nginx',
        'pacman -Ss editor',
        'sudo pacman -Syu',
        'sudo pacman -Rns firefox'
      ]
    },

    /* ---------------- disk & filesystems ---------------- */
    {
      cmd: 'df', cat: 'disk',
      desc: 'Report filesystem disk space usage.',
      syntax: 'df [OPTION]... [FILE]...',
      opts: [
        ['-h', 'human-readable sizes'],
        ['-T', 'show the filesystem type'],
        ['-a', 'include all filesystems, including pseudo ones'],
        ['-i', 'show inode usage instead of block usage'],
        ['-x', 'exclude filesystems of the given type']
      ],
      examples: ['df -h', 'df -hT', 'df -i', 'df -h --total']
    },
    {
      cmd: 'mount', cat: 'disk',
      desc: 'Attach a filesystem, or list currently mounted filesystems.',
      syntax: 'mount [OPTION]... [DEVICE] [DIR]',
      opts: [
        ['-a', 'mount all filesystems listed in /etc/fstab'],
        ['-t', 'specify the filesystem type, e.g. ext4, ntfs'],
        ['-o', 'comma-separated mount options, e.g. ro, rw, noexec'],
        ['--bind', 'bind mount: expose an existing directory at another path'],
        ['-r', 'mount read-only']
      ],
      examples: [
        'mount /dev/sdb1 /mnt/usb',
        'sudo mount -o ro /dev/sdb1 /mnt/ro',
        'sudo mount --bind /var/www /srv/www',
        'mount'
      ]
    },
    {
      cmd: 'umount', cat: 'disk',
      desc: 'Detach a mounted filesystem safely.',
      syntax: 'umount [OPTION]... TARGET...',
      opts: [
        ['-l', 'lazy: detach now, finish when it becomes free'],
        ['-f', 'force an unmount (for NFS)'],
        ['-a', 'unmount all filesystems in /etc/fstab except the root'],
        ['-r', 'remount read-only if the unmount fails']
      ],
      examples: ['sudo umount /mnt/usb', 'sudo umount -l /mnt/stuck', 'umount -a']
    },
    {
      cmd: 'fdisk', cat: 'disk',
      desc: 'Manipulate disk partition tables from the command line.',
      syntax: 'fdisk [OPTION]... DEVICE',
      opts: [
        ['-l', 'list the partition tables for the specified devices'],
        ['-u', 'display sizes in sectors instead of cylinders'],
        ['n', 'interactive: create a new partition'],
        ['d', 'interactive: delete a partition'],
        ['p', 'interactive: print the partition table'],
        ['w', 'interactive: write changes and exit'],
        ['q', 'interactive: quit without saving']
      ],
      examples: ['sudo fdisk -l', 'sudo fdisk /dev/sdb']
    },
    {
      cmd: 'lsblk', cat: 'disk',
      desc: 'List block devices (disks and partitions) in a tree.',
      syntax: 'lsblk [OPTION]...',
      opts: [
        ['-f', 'show filesystem type, label and UUID'],
        ['-o', 'choose custom output columns'],
        ['-p', 'print full device paths'],
        ['-d', 'do not show partitions, only the disk'],
        ['-e', 'exclude devices by major number']
      ],
      examples: ['lsblk', 'lsblk -f', 'lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT']
    },
    {
      cmd: 'mkfs', cat: 'disk',
      desc: 'Build a filesystem on a device (format it).',
      syntax: 'mkfs [OPTION]... DEVICE',
      opts: [
        ['-t', 'filesystem type, e.g. ext4, xfs, vfat'],
        ['-f', 'force: overwrite any existing filesystem'],
        ['-L', 'set a volume label']
      ],
      examples: [
        'sudo mkfs -t ext4 /dev/sdb1',
        'sudo mkfs -t vfat -L BACKUP /dev/sdb1'
      ]
    },
    {
      cmd: 'sync', cat: 'disk',
      desc: 'Flush pending filesystem writes to disk.',
      syntax: 'sync [OPTION]... [FILE]...',
      opts: [
        ['-f', 'sync the given file systems'],
        ['-d', 'use fdatasync instead of sync']
      ],
      examples: ['sync', 'sync /mnt/usb']
    },

    /* ---------------- permissions & users ---------------- */
    {
      cmd: 'chmod', cat: 'perm',
      desc: 'Change the permission mode of files and directories.',
      syntax: 'chmod [OPTION]... MODE[,MODE]... FILE...',
      opts: [
        ['u / g / o / a', 'user class: owner, group, others, all'],
        ['+ / - / =', 'add, remove or set the permission'],
        ['r / w / x', 'read, write, execute bits'],
        ['755', 'numeric: rwx owner, r-x group/others'],
        ['644', 'numeric: rw owner, r others'],
        ['-R', 'apply recursively to directories and contents'],
        ['-c', 'report only when a change is made']
      ],
      examples: [
        'chmod +x script.sh',
        'chmod 755 script.sh',
        'chmod -R 644 ./public',
        'chmod u+x,g-w file.txt'
      ],
      numbers: [
        ['4', 'read (r)'],
        ['2', 'write (w)'],
        ['1', 'execute (x)'],
        ['7', 'rwx (4+2+1)'],
        ['5', 'r-x (4+1)'],
        ['6', 'rw- (4+2)']
      ]
    },
    {
      cmd: 'chown', cat: 'perm',
      desc: 'Change the owner and/or group of files and directories.',
      syntax: 'chown [OPTION]... [USER][:GROUP] FILE...',
      opts: [
        ['-R', 'apply recursively'],
        ['-h', 'affect each symlink itself, not its target'],
        ['--reference', 'use the owner/group of a reference file']
      ],
      examples: [
        'sudo chown www-data:www-data /var/www/html',
        'sudo chown -R $USER:$USER ~/project',
        'sudo chown :developers report.txt'
      ]
    },
    {
      cmd: 'useradd', cat: 'perm',
      desc: 'Create a new user account or update defaults for new users.',
      syntax: 'useradd [OPTION]... USERNAME',
      opts: [
        ['-m', 'create the home directory'],
        ['-d', 'set the home directory path'],
        ['-s', 'set the login shell, e.g. /bin/bash'],
        ['-G', 'add to supplementary groups (comma-separated)'],
        ['-g', 'set the primary group'],
        ['-e', 'set an account expiry date (YYYY-MM-DD)'],
        ['-p', 'set an encrypted password'],
        ['-M', 'do not create a home directory']
      ],
      examples: [
        'sudo useradd -m -s /bin/bash alice',
        'sudo useradd -m -G sudo,docker bob',
        'sudo useradd -M -s /usr/sbin/nologin svc'
      ]
    },
    {
      cmd: 'usermod', cat: 'perm',
      desc: 'Modify an existing user account.',
      syntax: 'usermod [OPTION]... USERNAME',
      opts: [
        ['-aG', 'append the user to supplementary groups (keep existing)'],
        ['-G', 'set supplementary groups (replaces the current list)'],
        ['-l', 'change the login name'],
        ['-d', 'change the home directory'],
        ['-s', 'change the login shell'],
        ['-L', 'lock the account'],
        ['-U', 'unlock the account']
      ],
      examples: [
        'sudo usermod -aG sudo alice',
        'sudo usermod -s /bin/zsh alice',
        'sudo usermod -L compromised_user'
      ]
    },
    {
      cmd: 'passwd', cat: 'perm',
      desc: 'Change a user password (yours or, as root, another user).',
      syntax: 'passwd [OPTION]... [USERNAME]',
      opts: [
        ['-l', 'lock a password (root only)'],
        ['-u', 'unlock a password (root only)'],
        ['-d', 'delete a password, making the account passwordless'],
        ['-S', 'show the account password status'],
        ['-e', 'force the password to expire immediately']
      ],
      examples: ['passwd', 'sudo passwd alice', 'sudo passwd -S alice']
    },
    {
      cmd: 'sudo', cat: 'perm',
      desc: 'Execute a command as another user, by default the superuser, with logging.',
      syntax: 'sudo [OPTION]... COMMAND',
      opts: [
        ['-u', 'run as a specific user instead of root'],
        ['-i', 'run the target user default shell as a login shell'],
        ['-s', 'run a command with the target shell'],
        ['-l', 'list what the current user is allowed to run'],
        ['-E', 'preserve the user environment variables'],
        ['-b', 'run the command in the background'],
        ['-k', 'invalidate the cached credentials (force re-auth)']
      ],
      examples: [
        'sudo apt update',
        'sudo -u www-data whoami',
        'sudo -l',
        'sudo -i'
      ]
    },
    {
      cmd: 'su', cat: 'perm',
      desc: 'Substitute user identity — switch to another account, opening its shell.',
      syntax: 'su [OPTION]... [-] [USER [ARG]...]',
      opts: [
        ['-', 'login shell: load the target user environment'],
        ['-c', 'run a single command and exit'],
        ['-s', 'specify the shell to use']
      ],
      examples: ['su - alice', 'su -c "whoami" root', 'su -']
    },
    {
      cmd: 'groups', cat: 'perm',
      desc: 'Show the groups a user belongs to.',
      syntax: 'groups [USERNAME]...',
      opts: [],
      examples: ['groups', 'groups alice']
    },
    {
      cmd: 'id', cat: 'perm',
      desc: 'Print the real and effective user and group IDs of the current or given user.',
      syntax: 'id [OPTION]... [USER]',
      opts: [
        ['-u', 'print the effective user ID only'],
        ['-g', 'print the effective group ID only'],
        ['-G', 'print all group IDs'],
        ['-n', 'print names instead of numeric IDs']
      ],
      examples: ['id', 'id alice', 'id -Gn']
    },
    {
      cmd: 'visudo', cat: 'perm',
      desc: 'Safely edit the /etc/sudoers file with syntax checking.',
      syntax: 'visudo [-c] [-f file]',
      opts: [
        ['-c', 'check the file syntax without editing'],
        ['-f', 'edit an alternate sudoers file']
      ],
      examples: ['sudo visudo', 'sudo visudo -c']
    },

    /* ---------------- archives & compression ---------------- */
    {
      cmd: 'tar', cat: 'archive',
      desc: 'Create and extract archive files (tarballs), optionally compressed.',
      syntax: 'tar [OPTION]... FILE... [ARCHIVE]',
      opts: [
        ['-c', 'create a new archive'],
        ['-x', 'extract files from an archive'],
        ['-t', 'list the contents of an archive'],
        ['-f', 'specify the archive file name (always used)'],
        ['-z', 'filter through gzip compression'],
        ['-j', 'filter through bzip2 compression'],
        ['-J', 'filter through xz compression'],
        ['-v', 'verbose: list processed files'],
        ['-C', 'change to the given directory before performing'],
        ['-r', 'append files to the end of an archive'],
        ['--exclude', 'exclude files matching a pattern'],
        ['-p', 'preserve permissions when extracting']
      ],
      examples: [
        'tar -czf backup.tar.gz /var/www',
        'tar -xzf backup.tar.gz',
        'tar -tzf backup.tar.gz',
        'tar -xJf archive.tar.xz -C /opt/app'
      ]
    },
    {
      cmd: 'gzip', cat: 'archive',
      desc: 'Compress or decompress files using GNU zip.',
      syntax: 'gzip [OPTION]... [FILE]...',
      opts: [
        ['-d', 'decompress the file'],
        ['-k', 'keep the original file (do not delete it)'],
        ['-f', 'force compression even if the output exists'],
        ['-9', 'best compression (slowest)'],
        ['-1', 'fastest compression'],
        ['-c', 'write to standard output, keeping the original']
      ],
      examples: [
        'gzip file.txt',
        'gzip -dk archive.gz',
        'gzip -9 -c big.iso > big.iso.gz',
        'gunzip file.gz'
      ]
    },
    {
      cmd: 'zip / unzip', cat: 'archive',
      desc: 'Create (.zip) and extract (.zip) archives, common for cross-platform sharing.',
      syntax: 'zip [OPTION]... ARCHIVE FILE...   |   unzip [OPTION]... ARCHIVE [FILE...]',
      opts: [
        ['-r', 'zip: recurse into directories'],
        ['-e', 'zip: encrypt the archive with a password'],
        ['-d', 'zip: delete files from the archive'],
        ['-u', 'zip: update: add newer versions of existing files'],
        ['-l', 'unzip: list the archive contents'],
        ['-o', 'unzip: overwrite existing files without prompting'],
        ['-d', 'unzip: extract to the given directory']
      ],
      examples: [
        'zip -r project.zip ./project',
        'zip -e secret.zip data.txt',
        'unzip -l project.zip',
        'unzip -o project.zip -d /tmp/out'
      ]
    },
    {
      cmd: 'zcat', cat: 'archive',
      desc: 'Decompress a gzipped file to standard output without creating the file.',
      syntax: 'zcat [OPTION]... [FILE]...',
      opts: [
        ['-f', 'continue even if some input is corrupt'],
        ['-n', 'do not treat numbers literally']
      ],
      examples: ['zcat app.log.gz | grep ERROR', 'zcat file.gz > file']
    },

    /* ---------------- security (Kali) ---------------- */
    {
      cmd: 'hydra', cat: 'sec',
      desc: 'Fast network logon cracker supporting many protocols (login brute-force testing).',
      syntax: 'hydra [OPTION]... TARGET [SERVICE]',
      opts: [
        ['-l / -L', 'single login / file of logins'],
        ['-p / -P', 'single password / file of passwords'],
        ['-s', 'use a non-default port'],
        ['-t', 'number of parallel connections per target'],
        ['-f', 'stop after the first valid pair is found'],
        ['-o', 'write the found credentials to a file'],
        ['-V', 'verbose: show each attempt']
      ],
      examples: [
        'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10',
        'hydra -L users.txt -P pass.txt http-get://target/login'
      ]
    },
    {
      cmd: 'john', cat: 'sec',
      desc: 'John the Ripper — offline password hash cracker.',
      syntax: 'john [OPTION]... [PASSWORDFILE]',
      opts: [
        ['--wordlist', 'use a specific wordlist for dictionary attacks'],
        ['--rules', 'apply mutation rules to wordlist entries'],
        ['--show', 'show cracked passwords for a hash file'],
        ['--format', 'force a hash format'],
        ['--incremental', 'brute-force mode with increasing length']
      ],
      examples: [
        'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
        'john --show hashes.txt',
        'john hashes.txt'
      ]
    },
    {
      cmd: 'hashcat', cat: 'sec',
      desc: 'GPU-accelerated password recovery supporting hundreds of hash types.',
      syntax: 'hashcat [OPTION]... HASHFILE HASHFILE|HASH',
      opts: [
        ['-m', 'hash mode number, e.g. 0=MD5, 1000=NTLM, 1800=sha512crypt'],
        ['-a', 'attack mode: 0=dict, 1=combination, 3=brute-force, 6=mask'],
        ['-o', 'output file for cracked hashes'],
        ['-w', 'workload profile (1-4)'],
        ['--show', 'show cracked results'],
        ['-D', 'device type: 1=CPU, 2=GPU']
      ],
      examples: [
        'hashcat -m 0 -a 0 hashes.txt rockyou.txt',
        'hashcat -m 1800 -a 3 hashes.txt ?a?a?a?a?a?a',
        'hashcat --show -m 0 hashes.txt'
      ]
    },
    {
      cmd: 'nikto', cat: 'sec',
      desc: 'Web server scanner that looks for dangerous files, outdated software and issues.',
      syntax: 'nikto [OPTION]... -h HOST',
      opts: [
        ['-h', 'target host, URL or IP'],
        ['-p', 'port(s) to scan (default 80, 443)'],
        ['-ssl', 'force SSL mode'],
        ['-o', 'output the report to a file'],
        ['-Format', 'output format, e.g. html, csv, json'],
        ['-Tuning', 'tuning tests 0-9 to include or exclude'],
        ['-C', 'specify a config file']
      ],
      examples: [
        'nikto -h http://target.com',
        'nikto -h https://target.com -ssl -o report.html -Format html'
      ]
    },
    {
      cmd: 'sqlmap', cat: 'sec',
      desc: 'Automatically detects and exploits SQL injection flaws in web applications.',
      syntax: 'sqlmap [OPTION]... -u URL',
      opts: [
        ['-u', 'target URL containing the vulnerable parameter'],
        ['--dbs', 'enumerate the available databases'],
        ['--tables', 'enumerate tables in the current database'],
        ['--dump', 'dump the contents of a table'],
        ['--batch', 'run non-interactively with default answers'],
        ['--os-shell', 'attempt to get an operating system shell'],
        ['--level / --risk', 'raise the detection depth and risk'],
        ['-r', 'load a raw HTTP request from a file']
      ],
      examples: [
        'sqlmap -u "http://target.com/view?id=1" --batch --dbs',
        'sqlmap -u "http://target.com/view?id=1" --batch --tables -D mydb'
      ]
    },
    {
      cmd: 'aircrack-ng', cat: 'sec',
      desc: 'Suite for auditing wireless networks: capture, crack and test Wi-Fi encryption.',
      syntax: 'aircrack-ng [OPTION]... CAPTUREFILE',
      opts: [
        ['-w', 'wordlist to use for key testing'],
        ['-b', 'target the access point by BSSID'],
        ['-e', 'target the access point by ESSID'],
        ['-a2', 'force WPA2 analysis mode'],
        ['-J', 'export to a hccapx file for external crackers']
      ],
      examples: [
        'aircrack-ng -w rockyou.txt capture-01.cap',
        'aircrack-ng -b AA:BB:CC:DD:EE:FF -w rockyou.txt capture.cap'
      ]
    },
    {
      cmd: 'metasploit', cat: 'sec',
      desc: 'Penetration testing framework with exploits, payloads and post-exploitation modules.',
      syntax: 'msfconsole [OPTION]...',
      opts: [
        ['-q', 'start quietly, without the banner'],
        ['-x', 'execute a list of commands then exit'],
        ['use MODULE', 'select an exploit or auxiliary module'],
        ['show options', 'list the configurable options of the module'],
        ['set RHOSTS', 'set the target host(s)'],
        ['run / exploit', 'execute the selected module'],
        ['sessions -l', 'list active sessions']
      ],
      examples: [
        'msfconsole -q',
        'msfconsole -x "use exploit/multi/handler; set PAYLOAD linux/x64/meterpreter/reverse_tcp; run"'
      ]
    },
    {
      cmd: 'wireshark / tshark', cat: 'sec',
      desc: 'Capture and analyse live network traffic (GUI and terminal variants).',
      syntax: 'tshark [OPTION]... -i INTERFACE',
      opts: [
        ['-i', 'capture on the given interface'],
        ['-f', 'BPF capture filter, e.g. "port 80"'],
        ['-Y', 'display filter, e.g. http.request'],
        ['-w', 'write the capture to a pcap file'],
        ['-c', 'stop after capturing N packets'],
        ['-D', 'list the available capture interfaces']
      ],
      examples: [
        'sudo tshark -i eth0 -f "port 80"',
        'tshark -r capture.pcap -Y http.request',
        'tshark -D'
      ]
    },
    {
      cmd: 'openssl', cat: 'sec',
      desc: 'Toolkit for TLS/SSL and general-purpose cryptography (certs, keys, digests).',
      syntax: 'openssl COMMAND [OPTION]...',
      opts: [
        ['genrsa / genpkey', 'generate a private key'],
        ['req -new -x509', 'create a self-signed certificate'],
        ['x509 -text', 'inspect certificate details'],
        ['dgst', 'compute a message digest, e.g. -sha256'],
        ['enc', 'encrypt or decrypt with a cipher'],
        ['s_client', 'a TLS client for testing connections'],
        ['rand', 'generate pseudo-random bytes']
      ],
      examples: [
        'openssl genrsa -out key.pem 2048',
        'openssl req -new -x509 -key key.pem -out cert.pem -days 365',
        'openssl dgst -sha256 file.txt',
        'openssl rand -hex 16'
      ]
    },
    {
      cmd: 'ssh-keygen', cat: 'sec',
      desc: 'Generate, manage and convert SSH key pairs for key-based authentication.',
      syntax: 'ssh-keygen [OPTION]... [-f output]',
      opts: [
        ['-t', 'key type: rsa, ed25519, ecdsa'],
        ['-b', 'number of bits in the key'],
        ['-C', 'a comment, usually your email'],
        ['-f', 'the output filename for the key'],
        ['-N', 'a new passphrase for the key'],
        ['-p', 'change the passphrase of an existing key'],
        ['-y', 'print the public key of a private key file']
      ],
      examples: [
        'ssh-keygen -t ed25519 -C "you@example.com"',
        'ssh-keygen -t rsa -b 4096 -f ~/.ssh/server_key',
        'ssh-keygen -y -f ~/.ssh/id_ed25519'
      ]
    },
    {
      cmd: 'ufw', cat: 'sec',
      desc: 'Uncomplicated Firewall — a friendly front-end for managing iptables rules.',
      syntax: 'ufw [COMMAND] [RULE]',
      opts: [
        ['enable / disable', 'turn the firewall on or off'],
        ['status', 'list the active rules'],
        ['allow', 'allow traffic on a port or from an address'],
        ['deny', 'drop traffic on a port or from an address'],
        ['delete', 'remove a previously added rule'],
        ['default', 'set the default policy: deny incoming, allow outgoing']
      ],
      examples: [
        'sudo ufw enable',
        'sudo ufw allow 22/tcp',
        'sudo ufw allow from 192.168.1.0/24',
        'sudo ufw status verbose'
      ]
    },
    {
      cmd: 'iptables', cat: 'sec',
      desc: 'Low-level netfilter firewall rule manager (what ufw wraps).',
      syntax: 'iptables [-t table] {-A|-D|-I|-P} chain RULE',
      opts: [
        ['-A', 'append a rule to the end of a chain'],
        ['-I', 'insert a rule at the top (or at a given position)'],
        ['-D', 'delete a matching rule'],
        ['-P', 'set the default policy of a chain'],
        ['-L', 'list the rules in a chain'],
        ['-t', 'select the table: filter, nat, mangle'],
        ['-p', 'protocol: tcp, udp, icmp'],
        ['-j', 'jump target: ACCEPT, DROP, LOG'],
        ['--dport', 'match the destination port'],
        ['-s / -d', 'match a source / destination address']
      ],
      examples: [
        'sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT',
        'sudo iptables -A INPUT -s 10.0.0.5 -j DROP',
        'sudo iptables -L -n -v'
      ]
    }
  ];
})(typeof self !== 'undefined' ? self : this);
