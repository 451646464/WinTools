/*
 * WinTools — data/windows.js
 * Command & tool reference for Windows (CMD, PowerShell, Run dialog, GUI tools).
 * Loaded by windows.html; exposed as WT.data.windows.
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};
  WT.data = WT.data || {};

  WT.data.winCats = [
    { key: 'run', label: 'Run Dialog (Win+R)' },
    { key: 'cmd', label: 'Command Prompt (CMD)' },
    { key: 'ps', label: 'PowerShell' },
    { key: 'net', label: 'Networking' },
    { key: 'files', label: 'Files & Disk' },
    { key: 'sys', label: 'System & Troubleshooting' },
    { key: 'admin', label: 'Admin & Services' }
  ];

  WT.data.windows = [

    /* ---------------- Run dialog ---------------- */
    {
      cmd: 'Run dialog basics', cat: 'run',
      desc: 'Press Win+R to open the Run dialog, type a command and press Enter to launch a program or open a location instantly.',
      syntax: 'Win + R  →  type command  →  Enter',
      opts: [
        ['Win + R', 'open the Run dialog box'],
        ['Enter', 'run the typed command'],
        ['Esc', 'cancel and close the dialog'],
        ['Browsing', 'use ... button to pick a file path']
      ],
      examples: ['Win+R then type:  cmd', 'Win+R then type:  notepad', 'Win+R then type:  shell:startup']
    },
    {
      cmd: 'cmd', cat: 'run',
      desc: 'Open the Windows Command Prompt interpreter.',
      syntax: 'cmd',
      opts: [
        ['/k', 'run a command and keep the window open'],
        ['/c', 'run a command and then close'],
        ['/s', 'treat the rest as a quoted string']
      ],
      examples: ['cmd', 'cmd /k echo done', 'cmd /c "ipconfig /all"']
    },
    {
      cmd: 'powershell', cat: 'run',
      desc: 'Open the PowerShell command-line shell and script environment.',
      syntax: 'powershell [OPTION]...',
      opts: [
        ['-NoExit', 'keep the console open after running a command'],
        ['-Command', 'run the given command and exit'],
        ['-File', 'run the given script file'],
        ['-ExecutionPolicy', 'set the script execution policy for this session'],
        ['-EncodedCommand', 'run a Base64-encoded command']
      ],
      examples: [
        'powershell -NoExit -Command "Get-Location"',
        'powershell -Command "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10"'
      ]
    },
    {
      cmd: 'notepad', cat: 'run',
      desc: 'Open the Notepad text editor, optionally with a specific file.',
      syntax: 'notepad [filename]',
      opts: [],
      examples: ['notepad', 'notepad C:\\notes.txt', 'notepad newfile.txt']
    },
    {
      cmd: 'calc', cat: 'run',
      desc: 'Open the built-in Calculator app.',
      syntax: 'calc',
      opts: [],
      examples: ['calc', 'calc.exe']
    },
    {
      cmd: 'explorer', cat: 'run',
      desc: 'Open File Explorer, optionally at a specific folder.',
      syntax: 'explorer [path]',
      opts: [
        ['/e', 'open in Explorer view'],
        ['/select,', 'open the parent folder with the given item selected']
      ],
      examples: ['explorer', 'explorer C:\\Users', 'explorer /select,C:\\notes.txt']
    },
    {
      cmd: 'taskmgr', cat: 'run',
      desc: 'Open Task Manager to view and end running processes and monitor performance.',
      syntax: 'taskmgr',
      opts: [
        ['/7', 'open in the legacy Windows 7 interface']
      ],
      examples: ['taskmgr', 'taskmgr /7']
    },
    {
      cmd: 'regedit', cat: 'run',
      desc: 'Open the Registry Editor for viewing and editing the Windows registry.',
      syntax: 'regedit',
      opts: [
        ['/s', 'silent import when used with a .reg file']
      ],
      examples: ['regedit', 'regedit /s backup.reg']
    },
    {
      cmd: 'services.msc', cat: 'run',
      desc: 'Open the Services console to start, stop and configure system services.',
      syntax: 'services.msc',
      opts: [],
      examples: ['services.msc', 'services.msc /computer=localhost']
    },
    {
      cmd: 'devmgmt.msc', cat: 'run',
      desc: 'Open Device Manager to view and manage hardware devices and drivers.',
      syntax: 'devmgmt.msc',
      opts: [],
      examples: ['devmgmt.msc']
    },
    {
      cmd: 'diskmgmt.msc', cat: 'run',
      desc: 'Open Disk Management to partition, format and manage drives.',
      syntax: 'diskmgmt.msc',
      opts: [],
      examples: ['diskmgmt.msc']
    },
    {
      cmd: 'msconfig', cat: 'run',
      desc: 'Open System Configuration to manage startup options, services and boot settings.',
      syntax: 'msconfig',
      opts: [
        ['/startup', 'open the Startup tab directly']
      ],
      examples: ['msconfig', 'msconfig /startup']
    },
    {
      cmd: 'control', cat: 'run',
      desc: 'Open the classic Control Panel.',
      syntax: 'control [item]',
      opts: [
        ['/name', 'open a specific Control Panel applet by name']
      ],
      examples: ['control', 'control /name Microsoft.NetworkAndSharingCenter']
    },
    {
      cmd: 'appwiz.cpl', cat: 'run',
      desc: 'Open "Programs and Features" to uninstall or change installed software.',
      syntax: 'appwiz.cpl',
      opts: [],
      examples: ['appwiz.cpl', 'control appwiz.cpl']
    },
    {
      cmd: 'ncpa.cpl', cat: 'run',
      desc: 'Open Network Connections to view and configure network adapters.',
      syntax: 'ncpa.cpl',
      opts: [],
      examples: ['ncpa.cpl']
    },
    {
      cmd: 'firewall.cpl', cat: 'run',
      desc: 'Open Windows Defender Firewall settings.',
      syntax: 'firewall.cpl',
      opts: [],
      examples: ['firewall.cpl']
    },
    {
      cmd: 'sysdm.cpl', cat: 'run',
      desc: 'Open System Properties (hostname, hardware, performance and environment variables).',
      syntax: 'sysdm.cpl',
      opts: [],
      examples: ['sysdm.cpl']
    },
    {
      cmd: 'timedate.cpl', cat: 'run',
      desc: 'Open Date and Time settings.',
      syntax: 'timedate.cpl',
      opts: [],
      examples: ['timedate.cpl']
    },
    {
      cmd: 'main.cpl', cat: 'run',
      desc: 'Open Mouse properties settings.',
      syntax: 'main.cpl',
      opts: [],
      examples: ['main.cpl']
    },
    {
      cmd: 'desk.cpl', cat: 'run',
      desc: 'Open Display settings (resolution, scaling, multiple monitors).',
      syntax: 'desk.cpl',
      opts: [],
      examples: ['desk.cpl']
    },
    {
      cmd: 'mmsys.cpl', cat: 'run',
      desc: 'Open Sound settings to manage playback and recording devices.',
      syntax: 'mmsys.cpl',
      opts: [],
      examples: ['mmsys.cpl']
    },
    {
      cmd: 'powercfg.cpl', cat: 'run',
      desc: 'Open Power Options to choose or edit a power plan.',
      syntax: 'powercfg.cpl',
      opts: [],
      examples: ['powercfg.cpl']
    },
    {
      cmd: 'optionalfeatures', cat: 'run',
      desc: 'Open Windows Features to turn built-in components on or off.',
      syntax: 'optionalfeatures',
      opts: [],
      examples: ['optionalfeatures']
    },
    {
      cmd: 'msinfo32', cat: 'run',
      desc: 'Open System Information for a detailed hardware and software summary.',
      syntax: 'msinfo32',
      opts: [
        ['/nfo', 'export the report to an .nfo file']
      ],
      examples: ['msinfo32', 'msinfo32 /nfo sysinfo.nfo']
    },
    {
      cmd: 'winver', cat: 'run',
      desc: 'Show the Windows version and build number in a small dialog.',
      syntax: 'winver',
      opts: [],
      examples: ['winver']
    },
    {
      cmd: 'dxdiag', cat: 'run',
      desc: 'Open the DirectX Diagnostic Tool to inspect display, sound and input devices.',
      syntax: 'dxdiag',
      opts: [
        ['/x', 'save the report to a DxDiag text file']
      ],
      examples: ['dxdiag', 'dxdiag /x dxreport.txt']
    },
    {
      cmd: 'perfmon', cat: 'run',
      desc: 'Open Performance Monitor for real-time and logged system performance counters.',
      syntax: 'perfmon',
      opts: [
        ['/sys', 'open only the System Summary view']
      ],
      examples: ['perfmon', 'perfmon /sys']
    },
    {
      cmd: 'resmon', cat: 'run',
      desc: 'Open Resource Monitor to see CPU, memory, disk and network usage per process.',
      syntax: 'resmon',
      opts: [],
      examples: ['resmon']
    },
    {
      cmd: 'eventvwr', cat: 'run',
      desc: 'Open Event Viewer to read system, security and application event logs.',
      syntax: 'eventvwr',
      opts: [
        ['/c:', 'open a specific custom event log']
      ],
      examples: ['eventvwr', 'eventvwr.msc']
    },
    {
      cmd: 'gpedit.msc', cat: 'run',
      desc: 'Open the Local Group Policy Editor (Pro/Enterprise editions only).',
      syntax: 'gpedit.msc',
      opts: [],
      examples: ['gpedit.msc']
    },
    {
      cmd: 'secpol.msc', cat: 'run',
      desc: 'Open Local Security Policy to configure account and audit policies.',
      syntax: 'secpol.msc',
      opts: [],
      examples: ['secpol.msc']
    },
    {
      cmd: 'lusrmgr.msc', cat: 'run',
      desc: 'Open Local Users and Groups to manage user accounts and groups.',
      syntax: 'lusrmgr.msc',
      opts: [],
      examples: ['lusrmgr.msc']
    },
    {
      cmd: 'compmgmt.msc', cat: 'run',
      desc: 'Open Computer Management console (Task Scheduler, Event Viewer, Disk, Services).',
      syntax: 'compmgmt.msc',
      opts: [],
      examples: ['compmgmt.msc']
    },
    {
      cmd: 'taskschd.msc', cat: 'run',
      desc: 'Open Task Scheduler to automate tasks and scripts on a schedule.',
      syntax: 'taskschd.msc',
      opts: [],
      examples: ['taskschd.msc']
    },
    {
      cmd: 'charmap', cat: 'run',
      desc: 'Open the Character Map tool to find and copy special characters.',
      syntax: 'charmap',
      opts: [],
      examples: ['charmap']
    },
    {
      cmd: 'mstsc', cat: 'run',
      desc: 'Open Remote Desktop Connection to connect to another computer.',
      syntax: 'mstsc [file] [/v:server] [/f] [/w:width /h:height]',
      opts: [
        ['/v:', 'specify the target computer name or IP'],
        ['/f', 'start full-screen mode'],
        ['/w: /h:', 'set the window width and height'],
        ['/admin', 'connect to the admin session']
      ],
      examples: ['mstsc', 'mstsc /v:192.168.1.50 /f', 'mstsc /v:server:3390']
    },
    {
      cmd: 'shutdown', cat: 'run',
      desc: 'Shut down, restart, sign out or lock the computer, locally or on a remote machine.',
      syntax: 'shutdown [/s | /r | /l | /h] [/t time] [/f] [/m computer]',
      opts: [
        ['/s', 'shut down the computer'],
        ['/r', 'restart the computer'],
        ['/l', 'sign out the current user'],
        ['/h', 'hibernate the computer'],
        ['/t', 'set a delay in seconds before acting'],
        ['/f', 'force close running applications without warning'],
        ['/m', 'apply to a remote computer'],
        ['/c', 'add a comment displayed to the user'],
        ['/a', 'abort a pending shutdown']
      ],
      examples: [
        'shutdown /s /t 60',
        'shutdown /r /t 0',
        'shutdown /l',
        'shutdown /a'
      ]
    },
    {
      cmd: 'shell: commands', cat: 'run',
      desc: 'Special shell folders that open directly from the Run dialog.',
      syntax: 'shell:NAME',
      opts: [
        ['shell:startup', 'the folder of programs that run at logon'],
        ['shell:appdata', 'the roaming AppData folder'],
        ['shell:localappdata', 'the local AppData folder'],
        ['shell:documents', 'the Documents folder'],
        ['shell:downloads', 'the Downloads folder'],
        ['shell:fonts', 'the system Fonts folder'],
        ['shell:tasks', 'the Scheduled Tasks folder']
      ],
      examples: ['shell:startup', 'shell:appdata', 'shell:localappdata', 'shell:downloads']
    },

    /* ---------------- Command Prompt ---------------- */
    {
      cmd: 'dir', cat: 'cmd',
      desc: 'List the files and folders in the current directory.',
      syntax: 'dir [path] [/a] [/b] [/s] [/o:order]',
      opts: [
        ['/a', 'show all files including hidden and system'],
        ['/b', 'bare format: names only'],
        ['/s', 'list files recursively in sub-directories'],
        ['/o', 'sort order by name, size, date or extension'],
        ['/w', 'wide, multi-column layout'],
        ['/q', 'show the owner of each file']
      ],
      examples: ['dir', 'dir /a /s', 'dir C:\\Windows\\System32 /b', 'dir /o:d']
    },
    {
      cmd: 'cd / chdir', cat: 'cmd',
      desc: 'Display or change the current working directory.',
      syntax: 'cd [/d] [path]',
      opts: [
        ['/d', 'change the drive as well as the directory'],
        ['..', 'go up one level'],
        ['\\', 'go to the root of the current drive']
      ],
      examples: ['cd', 'cd C:\\Users', 'cd /d D:\\data', 'cd ..']
    },
    {
      cmd: 'copy', cat: 'cmd',
      desc: 'Copy one or more files to another location.',
      syntax: 'copy source destination [/v] [/y] [/z]',
      opts: [
        ['/v', 'verify that new files are written correctly'],
        ['/y', 'suppress the confirmation prompt when overwriting'],
        ['/z', 'copy in restartable mode for large files'],
        ['+', 'concatenate multiple files together']
      ],
      examples: [
        'copy notes.txt backup\\notes.bak',
        'copy *.jpg D:\\photos',
        'copy part1.txt+part2.txt full.txt'
      ]
    },
    {
      cmd: 'xcopy', cat: 'cmd',
      desc: 'Copy files and directory trees, with rich filtering options.',
      syntax: 'xcopy source destination [/e] [/h] [/y] [/exclude:file]',
      opts: [
        ['/e', 'copy directories and sub-directories, including empty ones'],
        ['/s', 'copy directories and sub-directories but skip empty ones'],
        ['/h', 'include hidden and system files'],
        ['/y', 'suppress overwrite confirmation'],
        ['/d', 'copy only files that are newer or missing'],
        ['/exclude', 'skip files matching a pattern list'],
        ['/i', 'assume the destination is a directory if in doubt']
      ],
      examples: [
        'xcopy C:\\data D:\\backup /e /h /y',
        'xcopy *.log D:\\logs /d'
      ]
    },
    {
      cmd: 'robocopy', cat: 'cmd',
      desc: 'Robust file copy — the advanced successor to xcopy, resilient to interruptions.',
      syntax: 'robocopy source destination [file [/option]]',
      opts: [
        ['/e', 'copy sub-directories, including empty ones'],
        ['/mir', 'mirror: copy and purge files that no longer exist in the source'],
        ['/z', 'restartable mode: resume after a network drop'],
        ['/mt', 'multi-threaded copy with N threads (8 default)'],
        ['/r', 'number of retries on a failed copy'],
        ['/w', 'wait time in seconds between retries'],
        ['/log', 'write a detailed log to a file'],
        ['/xo', 'exclude older files']
      ],
      examples: [
        'robocopy C:\\data D:\\backup /mir /z /r:3 /w:5',
        'robocopy C:\\src D:\\dst /e /mt:16 /log:copy.log'
      ]
    },
    {
      cmd: 'move', cat: 'cmd',
      desc: 'Move files and folders from one location to another, or rename them.',
      syntax: 'move source destination [/y]',
      opts: [
        ['/y', 'suppress overwrite confirmation'],
        ['*', 'wildcards to match multiple files']
      ],
      examples: ['move report.txt D:\\reports', 'move *.tmp %TEMP%', 'move old.txt new.txt']
    },
    {
      cmd: 'del / erase', cat: 'cmd',
      desc: 'Delete one or more files (not directories).',
      syntax: 'del [/p] [/f] [/s] [/q] file',
      opts: [
        ['/p', 'prompt for confirmation before deleting'],
        ['/f', 'force delete of read-only files'],
        ['/s', 'delete matching files in all sub-directories'],
        ['/q', 'quiet mode: do not ask for confirmation']
      ],
      examples: ['del temp.txt', 'del /f /q *.tmp', 'del /s /q C:\\logs\\*.log']
    },
    {
      cmd: 'rd / rmdir', cat: 'cmd',
      desc: 'Remove (delete) a directory and optionally all of its contents.',
      syntax: 'rd [/s] [/q] directory',
      opts: [
        ['/s', 'remove the directory and everything inside it'],
        ['/q', 'quiet: do not prompt for each file'],
        ['/f', 'force removal of read-only files']
      ],
      examples: ['rd emptyfolder', 'rd /s /q build', 'rd /s /q /f C:\\temp\\junk']
    },
    {
      cmd: 'md / mkdir', cat: 'cmd',
      desc: 'Create one or more directories.',
      syntax: 'md directory...',
      opts: [],
      examples: ['md projects', 'md C:\\a\\b\\c']
    },
    {
      cmd: 'type', cat: 'cmd',
      desc: 'Display the contents of a text file.',
      syntax: 'type filename',
      opts: [],
      examples: ['type notes.txt', 'type C:\\config\\app.ini']
    },
    {
      cmd: 'find / findstr', cat: 'cmd',
      desc: 'Search for text in files or in the output of other commands.',
      syntax: 'find "string" file    |    findstr /i /n "text" file',
      opts: [
        ['find /i', 'ignore case when searching'],
        ['find /c', 'count the matching lines'],
        ['find /n', 'show line numbers'],
        ['findstr /r', 'use regular expressions'],
        ['findstr /s', 'search recursively through sub-directories'],
        ['findstr /m', 'print only the file names that match'],
        ['findstr /v', 'print lines that do NOT match']
      ],
      examples: [
        'find "error" log.txt',
        'findstr /i "warning" *.log',
        'findstr /s /i "connection" C:\\logs\\*.txt',
        'type app.log | findstr /n "fail"'
      ]
    },
    {
      cmd: 'echo', cat: 'cmd',
      desc: 'Display a message, or turn command echoing on and off; also used to write to files.',
      syntax: 'echo [message]    |    echo text > file    |    echo text >> file',
      opts: [
        ['>', 'overwrite a file with the given text'],
        ['>>', 'append text to the end of a file'],
        ['%variable%', 'expand an environment variable'],
        ['off', 'suppress command echoing in batch scripts']
      ],
      examples: [
        'echo Hello World',
        'echo %USERNAME%',
        'echo This line >> notes.txt',
        '@echo off'
      ]
    },
    {
      cmd: 'cls', cat: 'cmd',
      desc: 'Clear the Command Prompt screen.',
      syntax: 'cls',
      opts: [],
      examples: ['cls']
    },
    {
      cmd: 'pause', cat: 'cmd',
      desc: 'Suspend execution and display a "Press any key" prompt (used in batch files).',
      syntax: 'pause',
      opts: [],
      examples: ['pause', 'echo Done & pause']
    },
    {
      cmd: 'tasklist', cat: 'cmd',
      desc: 'List all currently running processes with their memory usage and IDs.',
      syntax: 'tasklist [/fi "filter"] [/svc] [/fo format]',
      opts: [
        ['/fi', 'filter, e.g. "IMAGENAME eq chrome.exe"'],
        ['/svc', 'show the services hosted in each process'],
        ['/fo', 'output format: TABLE, LIST, CSV'],
        ['/m', 'show which modules are loaded in a process']
      ],
      examples: [
        'tasklist',
        'tasklist /fi "IMAGENAME eq chrome.exe"',
        'tasklist /svc /fo csv'
      ]
    },
    {
      cmd: 'taskkill', cat: 'cmd',
      desc: 'Terminate one or more running processes by image name or process ID.',
      syntax: 'taskkill [/im name | /pid id] [/f] [/t]',
      opts: [
        ['/im', 'terminate by process image name'],
        ['/pid', 'terminate by process ID'],
        ['/f', 'force termination'],
        ['/t', 'terminate the process and any child processes'],
        ['/fi', 'apply a filter to select the processes']
      ],
      examples: [
        'taskkill /im notepad.exe',
        'taskkill /pid 1234 /f',
        'taskkill /im chrome.exe /t /f'
      ]
    },
    {
      cmd: 'set / setx', cat: 'cmd',
      desc: 'Display, set or remove environment variables; setx makes the change permanent.',
      syntax: 'set [variable]    |    setx NAME value',
      opts: [
        ['set NAME=', 'set a variable for the current session only'],
        ['setx NAME value', 'write a variable permanently to the user environment'],
        ['/m', 'setx: write to the system (machine) environment'],
        ['%NAME%', 'reference a variable inside a command']
      ],
      examples: [
        'set PATH',
        'set JAVA_HOME=C:\\Program Files\\Java\\jdk-21',
        'setx MY_APP_KEY "value123"',
        'setx PATH "%PATH%;C:\\tools" /m'
      ]
    },
    {
      cmd: 'assoc / ftype', cat: 'cmd',
      desc: 'View or change file extension associations and the command used to open them.',
      syntax: 'assoc .ext[=type]    |    ftype type[=command]',
      opts: [
        ['assoc .txt', 'show the file type for a .txt extension'],
        ['assoc .txt=', 'change the mapping for an extension'],
        ['ftype', 'list all file types and their open commands']
      ],
      examples: ['assoc .txt', 'ftype txtfile', 'assoc .log=txtfile']
    },
    {
      cmd: 'systeminfo', cat: 'cmd',
      desc: 'Display a detailed summary of the operating system, hardware and hotfixes.',
      syntax: 'systeminfo [/s computer] [/fo format]',
      opts: [
        ['/s', 'query a remote computer'],
        ['/fo', 'output format: TABLE, LIST, CSV'],
        ['/nh', 'suppress the column header row']
      ],
      examples: ['systeminfo', 'systeminfo /fo list', 'systeminfo /s SERVER01']
    },
    {
      cmd: 'wmic', cat: 'cmd',
      desc: 'Windows Management Instrumentation command-line (legacy) for querying system data.',
      syntax: 'wmic [alias] get [property] [switches]',
      opts: [
        ['process', 'query running processes'],
        ['cpu', 'query processor information'],
        ['logicaldisk', 'query drives and free space'],
        ['os', 'query operating system details'],
        ['get /format', 'choose the output format, e.g. list, csv']
      ],
      examples: [
        'wmic process get name,processid',
        'wmic logicaldisk get name,size,freespace',
        'wmic os get caption,version'
      ]
    },

    /* ---------------- PowerShell ---------------- */
    {
      cmd: 'Get-Command', cat: 'ps',
      desc: 'List all available commands, or find commands matching a name or noun.',
      syntax: 'Get-Command [-Name pattern] [-Module name]',
      opts: [
        ['-Name', 'filter commands by a name or wildcard'],
        ['-Module', 'list commands from a specific module'],
        ['-Verb', 'filter by the action verb, e.g. Get, Set'],
        ['| Format-Table', 'render the results as a tidy table']
      ],
      examples: [
        'Get-Command',
        'Get-Command -Name *process*',
        'Get-Command -Module Microsoft.PowerShell.Management'
      ]
    },
    {
      cmd: 'Get-Help', cat: 'ps',
      desc: 'Show documentation for any PowerShell command, with examples.',
      syntax: 'Get-Help COMMAND [-Examples] [-Detailed] [-Online]',
      opts: [
        ['-Examples', 'show only usage examples'],
        ['-Detailed', 'show the full parameter descriptions'],
        ['-Online', 'open the online help page in a browser'],
        ['-Full', 'show everything including parameter attributes']
      ],
      examples: [
        'Get-Help Get-Process -Examples',
        'Get-Help Get-Service -Detailed',
        'Get-Help *network*'
      ]
    },
    {
      cmd: 'Get-Process', cat: 'ps',
      desc: 'Get the list of running processes with rich filtering and sorting.',
      syntax: 'Get-Process [[-Name] name] [-SortBy property]',
      opts: [
        ['-Name', 'filter by process name'],
        ['-Id', 'filter by process ID'],
        ['-IncludeUserName', 'show which user owns each process'],
        ['| Sort-Object', 'sort by a property such as CPU or WS'],
        ['| Select-Object -First', 'limit the number of results']
      ],
      examples: [
        'Get-Process | Sort-Object CPU -Descending | Select-Object -First 10',
        'Get-Process -Name chrome',
        'Get-Process | Where-Object { $_.CPU -gt 100 }'
      ]
    },
    {
      cmd: 'Get-Service', cat: 'ps',
      desc: 'List Windows services and their status; start, stop and restart them.',
      syntax: 'Get-Service [-Name name] [-DisplayName name]',
      opts: [
        ['-Name', 'filter by the short service name'],
        ['-DisplayName', 'filter by the friendly display name'],
        ['Where-Object', 'filter by status, e.g. Running, Stopped'],
        ['Start-Service / Stop-Service', 'change the service state'],
        ['Restart-Service', 'restart the service']
      ],
      examples: [
        'Get-Service | Where-Object Status -eq "Running"',
        'Get-Service -Name wuauserv',
        'Restart-Service -Name Spooler'
      ]
    },
    {
      cmd: 'Get-ChildItem', cat: 'ps',
      desc: 'List files and folders (alias: dir, ls, gci); the entry point for the pipeline.',
      syntax: 'Get-ChildItem [-Path path] [-Recurse] [-Filter pattern]',
      opts: [
        ['-Path', 'the location to list'],
        ['-Recurse', 'recurse into sub-directories'],
        ['-Filter', 'filter by a wildcard such as *.log'],
        ['-Force', 'include hidden and system items'],
        ['-File / -Directory', 'show only files or only directories'],
        ['-Exclude / -Include', 'include or exclude patterns']
      ],
      examples: [
        'Get-ChildItem C:\\Windows -Filter *.log -Recurse',
        'Get-ChildItem | Where-Object Length -gt 1MB',
        'Get-ChildItem -File -Recurse | Measure-Object -Property Length -Sum'
      ]
    },
    {
      cmd: 'Get-Content', cat: 'ps',
      desc: 'Read the contents of a file into the pipeline, line by line.',
      syntax: 'Get-Content [-Path path] [-TotalCount n] [-Tail n]',
      opts: [
        ['-Path', 'the file or files to read'],
        ['-TotalCount', 'read only the first N lines'],
        ['-Tail', 'read only the last N lines (great for logs)'],
        ['-Raw', 'read the entire file as a single string'],
        ['-Encoding', 'specify the character encoding']
      ],
      examples: [
        'Get-Content app.log -Tail 50',
        'Get-Content config.json -Raw | ConvertFrom-Json',
        'Get-Content *.txt | Select-String "error"'
      ]
    },
    {
      cmd: 'Set-Content / Add-Content', cat: 'ps',
      desc: 'Write text to a file, either replacing (Set) or appending (Add) its contents.',
      syntax: 'Set-Content [-Path path] -Value text    |    Add-Content -Path path -Value text',
      opts: [
        ['-Path', 'the target file'],
        ['-Value', 'the text to write'],
        ['-Encoding', 'the character encoding to use'],
        ['-Append', 'Add-Content appends by default']
      ],
      examples: [
        'Set-Content -Path note.txt -Value "Hello"',
        'Add-Content -Path app.log -Value "$(Get-Date): started"',
        'Add-Content -Path log.txt -Value "line" -Encoding UTF8'
      ]
    },
    {
      cmd: 'Select-String', cat: 'ps',
      desc: 'Search text in the pipeline or in files for a pattern (the grep of PowerShell).',
      syntax: 'Select-String [-Path file] [-Pattern regex]',
      opts: [
        ['-Pattern', 'the text or regular expression to find'],
        ['-Path', 'the files to search'],
        ['-AllMatches', 'return every match, not just the first per line'],
        ['-Context', 'show surrounding lines before and after'],
        ['-CaseSensitive', 'match case exactly'],
        ['-NotMatch', 'return lines that do not match']
      ],
      examples: [
        'Get-Content app.log | Select-String "error"',
        'Select-String -Path *.ps1 -Pattern "TODO"',
        'Select-String -Path system.log -Pattern "fail" -Context 2,2'
      ]
    },
    {
      cmd: 'Where-Object', cat: 'ps',
      desc: 'Filter objects in the pipeline by a condition.',
      syntax: 'Where-Object { $_.Property -operator value }',
      opts: [
        ['-Property', 'short-form comparison syntax'],
        ['-eq / -ne', 'equals / not equals'],
        ['-gt / -lt', 'greater than / less than'],
        ['-like', 'wildcard string comparison'],
        ['-match', 'regular expression match'],
        ['-contains', 'test if an array contains a value']
      ],
      examples: [
        'Get-Process | Where-Object { $_.CPU -gt 500 }',
        'Get-Service | Where-Object Status -eq "Running"',
        'Get-ChildItem | Where-Object Name -like "*.log"'
      ]
    },
    {
      cmd: 'ForEach-Object', cat: 'ps',
      desc: 'Run a block of code for each object that flows through the pipeline.',
      syntax: 'ForEach-Object { $_ }    |    1..5 | % { $_ * 2 }',
      opts: [
        ['$_', 'the current object in the pipeline'],
        ['%', 'the alias for ForEach-Object'],
        ['-Process', 'the script block to run']
      ],
      examples: [
        '1..5 | ForEach-Object { $_ * 2 }',
        'Get-Service | ForEach-Object { "{0} -> {1}" -f $_.Name, $_.Status }'
      ]
    },
    {
      cmd: 'Sort-Object', cat: 'ps',
      desc: 'Sort objects by one or more properties, ascending or descending.',
      syntax: 'Sort-Object [-Property prop] [-Descending] [-Unique]',
      opts: [
        ['-Property', 'the property to sort on'],
        ['-Descending', 'sort from highest to lowest'],
        ['-Unique', 'return only unique values'],
        ['-Top / -Bottom', 'return only the first or last N items']
      ],
      examples: [
        'Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 10',
        'Get-Process | Sort-Object -Property Name'
      ]
    },
    {
      cmd: 'Measure-Object', cat: 'ps',
      desc: 'Compute statistical values (count, sum, average, min, max) for objects.',
      syntax: 'Measure-Object [-Property prop] [-Sum] [-Average]',
      opts: [
        ['-Property', 'the numeric property to measure'],
        ['-Sum', 'add up the values'],
        ['-Average', 'compute the mean'],
        ['-Maximum / -Minimum', 'find the largest or smallest value'],
        ['-Line / -Word / -Character', 'count lines, words or characters of text']
      ],
      examples: [
        'Get-ChildItem -Recurse -File | Measure-Object -Property Length -Sum',
        'Get-Process | Measure-Object -Property CPU -Average',
        'Get-Content essay.txt | Measure-Object -Word'
      ]
    },
    {
      cmd: 'ConvertTo-Json / ConvertFrom-Json', cat: 'ps',
      desc: 'Convert objects to JSON and parse JSON back into PowerShell objects.',
      syntax: 'OBJECT | ConvertTo-Json [-Depth n]    |    "json" | ConvertFrom-Json',
      opts: [
        ['-Depth', 'how many levels of the object graph to serialize'],
        ['-Compress', 'output without extra whitespace']
      ],
      examples: [
        'Get-Process | Select-Object -First 3 | ConvertTo-Json -Depth 3',
        'Get-Content config.json -Raw | ConvertFrom-Json'
      ]
    },
    {
      cmd: 'Invoke-WebRequest', cat: 'ps',
      desc: 'Send HTTP requests and download content from web APIs and sites.',
      syntax: 'Invoke-WebRequest [-Uri url] [-Method verb] [-Body data]',
      opts: [
        ['-Uri', 'the target URL'],
        ['-Method', 'GET, POST, PUT, DELETE, etc.'],
        ['-Headers', 'a hashtable of request headers'],
        ['-Body', 'the request payload'],
        ['-ContentType', 'the content type, e.g. application/json'],
        ['-OutFile', 'save the response body to a file']
      ],
      examples: [
        'Invoke-WebRequest https://api.example.com/health',
        '$r = Invoke-RestMethod https://api.example.com/data',
        'Invoke-WebRequest -Uri https://x/file.zip -OutFile file.zip'
      ]
    },
    {
      cmd: 'Invoke-RestMethod', cat: 'ps',
      desc: 'Call a REST API and automatically parse the JSON response into objects.',
      syntax: 'Invoke-RestMethod [-Uri url] [-Method verb] [-Body json]',
      opts: [
        ['-Uri', 'the API endpoint'],
        ['-Method', 'the HTTP verb'],
        ['-Headers', 'request headers, often used for an auth token'],
        ['-Body', 'a hashtable or JSON string to send'],
        ['-ContentType', 'the content type of the body']
      ],
      examples: [
        'Invoke-RestMethod https://api.example.com/users',
        'Invoke-RestMethod -Method Post -Uri https://api/x -Body (@{a=1} | ConvertTo-Json) -ContentType "application/json"'
      ]
    },
    {
      cmd: 'Start-Process', cat: 'ps',
      desc: 'Start one or more processes, optionally elevated or with specific window styles.',
      syntax: 'Start-Process [-FilePath path] [-ArgumentList args] [-Verb RunAs]',
      opts: [
        ['-FilePath', 'the program to launch'],
        ['-ArgumentList', 'the arguments to pass to it'],
        ['-Verb RunAs', 'launch elevated, triggering a UAC prompt'],
        ['-WindowStyle', 'Hidden, Minimized, Maximized or Normal'],
        ['-Wait', 'wait for the process to finish before continuing'],
        ['-PassThru', 'return the process object so you can interact with it']
      ],
      examples: [
        'Start-Process notepad',
        'Start-Process powershell -Verb RunAs',
        'Start-Process -FilePath "robocopy.exe" -ArgumentList "C:\\a D:\\b /mir" -Wait'
      ]
    },

    /* ---------------- Networking ---------------- */
    {
      cmd: 'ipconfig', cat: 'net',
      desc: 'Display the IP configuration of all adapters, and manage the DHCP client.',
      syntax: 'ipconfig [/all] [/release] [/renew] [/flushdns]',
      opts: [
        ['/all', 'show full details: MAC address, DHCP servers, DNS servers'],
        ['/release', 'release the DHCP-assigned address for all adapters'],
        ['/renew', 'request a new DHCP address'],
        ['/flushdns', 'clear the local DNS resolver cache'],
        ['/displaydns', 'show the entries in the DNS cache'],
        ['/registerdns', 'force re-registration of DNS records']
      ],
      examples: [
        'ipconfig',
        'ipconfig /all',
        'ipconfig /flushdns',
        'ipconfig /release && ipconfig /renew'
      ]
    },
    {
      cmd: 'ping', cat: 'net',
      desc: 'Test whether a host is reachable and measure the round-trip latency.',
      syntax: 'ping [-t] [-n count] [-l size] host',
      opts: [
        ['-t', 'ping continuously until stopped (Ctrl+C)'],
        ['-n', 'the number of echo requests to send (default 4)'],
        ['-l', 'the size of the send buffer in bytes'],
        ['-a', 'resolve the address to a hostname'],
        ['-i', 'set the TTL value'],
        ['-w', 'wait time in milliseconds for each reply']
      ],
      examples: [
        'ping google.com',
        'ping -n 10 8.8.8.8',
        'ping -t 192.168.1.1'
      ]
    },
    {
      cmd: 'tracert', cat: 'net',
      desc: 'Trace the route packets take to a destination, listing each hop and latency.',
      syntax: 'tracert [-d] [-h maxhops] [-w timeout] host',
      opts: [
        ['-d', 'do not resolve hostnames for faster output'],
        ['-h', 'the maximum number of hops to probe'],
        ['-w', 'timeout in milliseconds for each reply'],
        ['-j', 'loose source route: follow the given host list']
      ],
      examples: ['tracert google.com', 'tracert -d -h 15 example.com']
    },
    {
      cmd: 'pathping', cat: 'net',
      desc: 'Combines tracert and ping: traces the route then measures packet loss per hop.',
      syntax: 'pathping [-n] [-h maxhops] [-q queries] host',
      opts: [
        ['-n', 'do not resolve hostnames'],
        ['-h', 'maximum number of hops'],
        ['-q', 'number of queries per hop'],
        ['-w', 'wait time in milliseconds']
      ],
      examples: ['pathping google.com', 'pathping -n -q 10 8.8.8.8']
    },
    {
      cmd: 'netstat', cat: 'net',
      desc: 'Display active network connections, listening ports and protocol statistics.',
      syntax: 'netstat [-a] [-n] [-o] [-b] [-p proto]',
      opts: [
        ['-a', 'show all connections and listening ports'],
        ['-n', 'show addresses and ports numerically (no name resolution)'],
        ['-o', 'show the owning process ID for each connection'],
        ['-b', 'show the executable that created the connection'],
        ['-p', 'filter by protocol: tcp, udp'],
        ['-r', 'show the routing table'],
        ['-e', 'show ethernet statistics']
      ],
      examples: [
        'netstat -ano',
        'netstat -abno',
        'netstat -an | findstr :443',
        'netstat -r'
      ]
    },
    {
      cmd: 'nslookup', cat: 'net',
      desc: 'Query DNS records to resolve names and diagnose name-resolution problems.',
      syntax: 'nslookup [name] [server]',
      opts: [
        ['set type=', 'choose the record type: A, MX, TXT, NS, CNAME, ANY'],
        ['set timeout=', 'set the query timeout'],
        ['set type=PTR', 'reverse lookup from an IP to a hostname']
      ],
      examples: [
        'nslookup example.com',
        'nslookup example.com 8.8.8.8',
        'nslookup -type=MX example.com',
        'nslookup 8.8.8.8'
      ]
    },
    {
      cmd: 'getmac', cat: 'net',
      desc: 'Display the MAC (hardware) address of every network adapter.',
      syntax: 'getmac [/v] [/fo format]',
      opts: [
        ['/v', 'verbose: show the adapter name and transport'],
        ['/fo', 'output format: TABLE, LIST, CSV'],
        ['/nh', 'suppress the header row']
      ],
      examples: ['getmac', 'getmac /v /fo list', 'getmac /fo csv > macs.csv']
    },
    {
      cmd: 'arp', cat: 'net',
      desc: 'View and modify the ARP cache that maps IP addresses to MAC addresses.',
      syntax: 'arp -a | arp -d | arp -s inetaddr ethaddr',
      opts: [
        ['-a', 'show all current ARP entries'],
        ['-d', 'delete an entry for the given host'],
        ['-s', 'add a static entry binding an IP to a MAC'],
        ['-g', 'same as -a']
      ],
      examples: ['arp -a', 'arp -d *', 'arp -s 192.168.1.50 aa-bb-cc-dd-ee-ff']
    },
    {
      cmd: 'nbtstat', cat: 'net',
      desc: 'Display NetBIOS over TCP/IP information and refresh the name cache.',
      syntax: 'nbtstat [-n] [-a name] [-c] [-r]',
      opts: [
        ['-n', 'list the local NetBIOS names'],
        ['-a', 'show the remote machine name table by name'],
        ['-c', 'show the NetBIOS name cache'],
        ['-r', 'refresh and query the NetBIOS name service']
      ],
      examples: ['nbtstat -n', 'nbtstat -a 192.168.1.10', 'nbtstat -c']
    },
    {
      cmd: 'route', cat: 'net',
      desc: 'Display and modify the IP routing table used by the machine.',
      syntax: 'route [-p] [print | add | delete | change] destination',
      opts: [
        ['print', 'display the routing table'],
        ['add', 'add a route (use -p to make it persistent)'],
        ['delete', 'remove a route'],
        ['change', 'modify an existing route'],
        ['-p', 'make a route persistent across reboots']
      ],
      examples: [
        'route print',
        'route -p add 10.10.0.0 mask 255.255.0.0 192.168.1.1',
        'route delete 10.10.0.0'
      ]
    },
    {
      cmd: 'netsh', cat: 'net',
      desc: 'Network shell — configure almost every aspect of networking from the CLI.',
      syntax: 'netsh [context] [command]',
      opts: [
        ['interface show', 'list network interfaces'],
        ['interface ip show config', 'show the IP configuration of an interface'],
        ['wlan show profile', 'list saved Wi-Fi profiles'],
        ['wlan show profile name=X key=clear', 'show a Wi-Fi password in clear text'],
        ['wlan connect name=X', 'connect to a saved Wi-Fi network'],
        ['advfirewall', 'manage Windows Firewall rules'],
        ['interface set interface "Name" disabled', 'disable an adapter']
      ],
      examples: [
        'netsh interface show interface',
        'netsh wlan show profile',
        'netsh wlan show profile name="MyWifi" key=clear',
        'netsh advfirewall set allprofiles state on'
      ]
    },
    {
      cmd: 'net', cat: 'net',
      desc: 'Legacy command for viewing and managing shares, sessions and user accounts.',
      syntax: 'net [view | share | use | user | start | stop]',
      opts: [
        ['net view', 'list computers and shared resources on the network'],
        ['net share', 'list and manage shared folders'],
        ['net use', 'map or disconnect a network drive'],
        ['net user', 'manage user accounts'],
        ['net start / stop', 'start or stop a service']
      ],
      examples: [
        'net view',
        'net share',
        'net use Z: \\\\server\\share',
        'net user administrator /active:yes'
      ]
    },
    {
      cmd: 'telnet', cat: 'net',
      desc: 'Open an interactive Telnet session to test plain-text services such as SMTP or IMAP.',
      syntax: 'telnet [host] [port]',
      opts: [
        ['/?', 'show usage help'],
        ['-a', 'attempt automatic login']
      ],
      examples: ['telnet smtp.example.com 25', 'telnet 192.168.1.10 3389']
    },

    /* ---------------- Files & disk ---------------- */
    {
      cmd: 'chkdsk', cat: 'files',
      desc: 'Check a disk for file-system errors and bad sectors, and optionally repair them.',
      syntax: 'chkdsk [drive:] [/f] [/r] [/x]',
      opts: [
        ['/f', 'fix errors found on the disk'],
        ['/r', 'locate bad sectors and recover readable information (implies /f)'],
        ['/x', 'force the volume to dismount first (implies /f)'],
        ['/v', 'display the full path of every file']
      ],
      examples: [
        'chkdsk D:',
        'chkdsk C: /f',
        'chkdsk E: /r'
      ]
    },
    {
      cmd: 'diskpart', cat: 'files',
      desc: 'Interactive disk, partition and volume management utility (run with care).',
      syntax: 'diskpart    then    list disk | select disk n | ...',
      opts: [
        ['list disk', 'show all physical disks'],
        ['select disk n', 'focus subsequent commands on disk n'],
        ['clean', 'erase the partition table of the selected disk'],
        ['create partition primary', 'create a primary partition'],
        ['format fs=ntfs quick', 'format the selected volume'],
        ['assign', 'assign a drive letter to the selected volume'],
        ['detail disk', 'show details about the focused disk']
      ],
      examples: [
        'diskpart',
        'list disk',
        'select disk 1',
        'clean',
        'create partition primary',
        'format fs=ntfs quick label="Data"'
      ]
    },
    {
      cmd: 'format', cat: 'files',
      desc: 'Format a volume with a given file system (erases all data on it).',
      syntax: 'format volume [/fs:fs] [/q] [/v:label] [/x]',
      opts: [
        ['/fs', 'the file system: ntfs, fat32, exfat'],
        ['/q', 'quick format: skip the bad-sector scan'],
        ['/v', 'set a volume label'],
        ['/x', 'force the volume to dismount first'],
        ['/a:size', 'override the default allocation unit size']
      ],
      examples: [
        'format E: /fs:exfat /q /x',
        'format D: /fs:ntfs /v:Backup'
      ]
    },
    {
      cmd: 'sfc', cat: 'files',
      desc: 'System File Checker — scan and repair protected Windows system files.',
      syntax: 'sfc [/scannow] [/verifyonly] [/scanfile=path]',
      opts: [
        ['/scannow', 'scan all protected system files and repair problems'],
        ['/verifyonly', 'scan only, without repairing'],
        ['/scanfile', 'scan and repair a specific file'],
        ['/offbootdir /offwinddir', 'repair an offline Windows installation']
      ],
      examples: ['sfc /scannow', 'sfc /verifyonly', 'sfc /scanfile=C:\\Windows\\System32\\notepad.exe']
    },
    {
      cmd: 'DISM', cat: 'files',
      desc: 'Deployment Image Servicing and Management — repair a Windows image when sfc cannot.',
      syntax: 'DISM /Online /Cleanup-Image /CheckHealth | /RestoreHealth',
      opts: [
        ['/Online', 'work on the currently running Windows installation'],
        ['/Cleanup-Image', 'select the image cleanup actions'],
        ['/CheckHealth', 'quickly check for corruption flags'],
        ['/ScanHealth', 'scan the image for corruption'],
        ['/RestoreHealth', 'scan and automatically repair the image'],
        ['/Source', 'provide a repair source such as install media']
      ],
      examples: [
        'DISM /Online /Cleanup-Image /CheckHealth',
        'DISM /Online /Cleanup-Image /ScanHealth',
        'DISM /Online /Cleanup-Image /RestoreHealth'
      ]
    },
    {
      cmd: 'powercfg', cat: 'files',
      desc: 'Configure power settings, analyse battery drain and manage power plans.',
      syntax: 'powercfg [/list | /setactive guid | /query | /energy]',
      opts: [
        ['/list', 'list all available power plans'],
        ['/setactive', 'make a power plan the active one'],
        ['/query', 'show the settings of the active plan'],
        ['/energy', 'run a 60-second energy-efficiency analysis'],
        ['/batteryreport', 'generate a detailed battery usage report'],
        ['/h on|off', 'enable or disable hibernation'],
        ['/timeout', 'set the display or sleep timeout in seconds']
      ],
      examples: [
        'powercfg /list',
        'powercfg /energy',
        'powercfg /batteryreport',
        'powercfg /h off'
      ]
    },
    {
      cmd: 'robocopy vs xcopy', cat: 'files',
      desc: 'Choosing a copy tool: use robocopy for reliability and mirrors, xcopy for simple trees.',
      syntax: 'compare syntax and strengths',
      opts: [
        ['robocopy', 'resumable, multi-threaded, logging, /mir mirror mode'],
        ['xcopy', 'simpler, good for one-off directory copies'],
        ['copy / move', 'single files only'],
        ['PowerShell Copy-Item', 'pipeline-friendly, works with filters']
      ],
      examples: [
        'robocopy C:\\src D:\\dst /mir /z',
        'xcopy C:\\src D:\\dst /e /i /y'
      ]
    },

    /* ---------------- System & troubleshooting ---------------- */
    {
      cmd: 'Task Manager overview', cat: 'sys',
      desc: 'Task Manager (Ctrl+Shift+Esc) shows running apps, startup programs, services and real-time performance.',
      syntax: 'Ctrl + Shift + Esc    (or Ctrl+Alt+Del → Task Manager)',
      opts: [
        ['Processes tab', 'see CPU, memory, disk and network use per process; end tasks'],
        ['Performance tab', 'live graphs for CPU, memory, disk, GPU and network'],
        ['App history', 'resource usage of Store apps over time'],
        ['Startup apps', 'control which programs launch at logon — disable what you do not need'],
        ['Users tab', 'per-user resource usage and sign-out options'],
        ['Details tab', 'full process details with PIDs and priority control'],
        ['Services tab', 'view and manage Windows services']
      ],
      examples: ['Ctrl+Shift+Esc', 'Ctrl+Shift+Esc → Startup apps → Disable']
    },
    {
      cmd: 'Event Viewer basics', cat: 'sys',
      desc: 'Event Viewer (eventvwr) records system, security and application events you can filter by level and time.',
      syntax: 'eventvwr    →    Windows Logs / Application and Services Logs',
      opts: [
        ['Windows Logs → System', 'hardware, drivers and Windows component events'],
        ['Windows Logs → Application', 'events logged by installed programs'],
        ['Windows Logs → Security', 'logon, privilege and audit events'],
        ['Filter Current Log', 'narrow by level (Error, Warning) and time range'],
        ['Event ID', 'a stable number identifying the event type'],
        ['Create Custom View', 'save a reusable filter across logs']
      ],
      examples: ['eventvwr', 'eventvwr → System → Filter Current Log → Error']
    },
    {
      cmd: 'msconfig troubleshooting', cat: 'sys',
      desc: 'Use System Configuration to perform a clean boot and isolate software conflicts.',
      syntax: 'msconfig → Services / Startup / Boot',
      opts: [
        ['Services tab', 'hide Microsoft services then disable the rest for a clean boot'],
        ['Startup tab', 'redirects to Task Manager Startup apps'],
        ['Boot tab', 'set Safe boot, timeout and other boot options'],
        ['General tab', 'selective startup to load only required services']
      ],
      examples: [
        'msconfig',
        'msconfig → Services → Hide all Microsoft services → Disable all → Restart'
      ]
    },
    {
      cmd: 'Safe Mode', cat: 'sys',
      desc: 'Boot Windows with minimal drivers to troubleshoot problems caused by software or drivers.',
      syntax: 'Shift + Restart  →  Troubleshoot  →  Advanced  →  Startup Settings  →  Restart',
      opts: [
        ['F4', 'enable Safe Mode'],
        ['F5', 'enable Safe Mode with Networking'],
        ['F6', 'enable Safe Mode with Command Prompt'],
        ['msconfig', 'alternatively set "Safe boot" on the Boot tab'],
        ['Advanced options', 'also offers System Restore and Startup Repair']
      ],
      examples: ['Shift+Restart → Startup Settings → F4', 'msconfig → Boot → Safe boot']
    },
    {
      cmd: 'System Restore', cat: 'sys',
      desc: 'Roll back system files, registry and settings to an earlier restore point.',
      syntax: 'rstrui.exe    or    Control Panel → Recovery → Open System Restore',
      opts: [
        ['rstrui', 'launch the System Restore wizard directly'],
        ['Restore point', 'a snapshot of system state created automatically or manually'],
        ['Undo', 'reverse the last restore if it did not help'],
        ['Create a restore point', 'do this before making major system changes']
      ],
      examples: ['rstrui', 'sysdm.cpl → System Protection → Create']
    },
    {
      cmd: 'Windows Update troubleshooting', cat: 'sys',
      desc: 'Fix stuck or failing updates by clearing caches and resetting the update components.',
      syntax: 'wuauclt /detectnow   |   net stop wuauserv   ...',
      opts: [
        ['Settings → Update', 'the normal way to check for and install updates'],
        ['Troubleshoot', 'Settings → Troubleshoot → Other → Windows Update'],
        ['Reset components', 'stop the update services, clear SoftwareDistribution, restart'],
        ['DISM / RestoreHealth', 'repair the component store if updates keep failing']
      ],
      examples: [
        'net stop wuauserv && net stop bits',
        'Remove-Item C:\\Windows\\SoftwareDistribution\\Download -Recurse -Force',
        'net start wuauserv && net start bits'
      ]
    },
    {
      cmd: 'bcdedit', cat: 'sys',
      desc: 'Edit the Boot Configuration Data — boot entries, timeout and debug options.',
      syntax: 'bcdedit [/set {entry} property value]',
      opts: [
        ['/enum', 'list all boot entries and their settings'],
        ['/set', 'change a property of a boot entry'],
        ['/deletevalue', 'remove a property'],
        ['/copy', 'duplicate an entry'],
        ['{default}', 'the default operating system entry']
      ],
      examples: [
        'bcdedit /enum',
        'bcdedit /set {default} timeout 10',
        'bcdedit /set {default} safeboot minimal'
      ]
    },

    /* ---------------- Admin & services ---------------- */
    {
      cmd: 'sc', cat: 'admin',
      desc: 'Service Control — query, configure, start and stop Windows services from the CLI.',
      syntax: 'sc [query | start | stop | config] servicename',
      opts: [
        ['query', 'list services or show the state of one service'],
        ['queryex', 'extended query including the PID and exit code'],
        ['start', 'start a service'],
        ['stop', 'stop a service'],
        ['config', 'change settings such as start type'],
        ['create', 'register a new service'],
        ['failure', 'configure what happens when the service fails']
      ],
      examples: [
        'sc query Spooler',
        'sc start Spooler',
        'sc stop Spooler',
        'sc config Spooler start= disabled'
      ]
    },
    {
      cmd: 'schtasks', cat: 'admin',
      desc: 'Create, query, change and run scheduled tasks from the command line.',
      syntax: 'schtasks [/create | /query | /run | /delete] ...',
      opts: [
        ['/create', 'create a new scheduled task'],
        ['/query', 'list scheduled tasks'],
        ['/run', 'run a task immediately'],
        ['/change', 'modify an existing task'],
        ['/delete', 'remove a task'],
        ['/tn', 'the task name'],
        ['/tr', 'the program or script to run'],
        ['/sc', 'the schedule frequency: daily, weekly, onstart']
      ],
      examples: [
        'schtasks /query /fo list',
        'schtasks /create /tn "Backup" /tr "C:\\backup.bat" /sc daily /st 02:00',
        'schtasks /run /tn "Backup"',
        'schtasks /delete /tn "Backup" /f'
      ]
    },
    {
      cmd: 'icacls', cat: 'admin',
      desc: 'View and modify file system access control lists (NTFS permissions).',
      syntax: 'icacls file [/grant user:perm] [/deny user:perm] [/reset]',
      opts: [
        ['/grant', 'grant the specified permissions to the user'],
        ['/deny', 'explicitly deny the specified permissions'],
        ['/remove', 'remove the named ACE for the user'],
        ['/reset', 'replace the ACLs with default inherited ones'],
        ['/T', 'recurse into sub-directories'],
        ['/save', 'save the ACLs to a file for later restore']
      ],
      examples: [
        'icacls C:\\data',
        'icacls C:\\data /grant "Users:(OI)(CI)RX"',
        'icacls C:\\data /remove "Everyone"',
        'icacls C:\\data /reset /T'
      ]
    },
    {
      cmd: 'takeown', cat: 'admin',
      desc: 'Take ownership of a file or folder that you cannot access due to permission problems.',
      syntax: 'takeown /f path [/r] [/d y]',
      opts: [
        ['/f', 'the file or folder to take ownership of'],
        ['/r', 'recurse into sub-directories'],
        ['/d', 'default answer, y to take ownership automatically'],
        ['/a', 'give ownership to the Administrators group']
      ],
      examples: [
        'takeown /f C:\\locked',
        'takeown /f C:\\locked /r /d y',
        'takeown /f C:\\file.txt /a'
      ]
    },
    {
      cmd: 'net user / local users', cat: 'admin',
      desc: 'Manage local user accounts and groups from the command line.',
      syntax: 'net user [username [password | *] [/add] [/delete] [/active]]',
      opts: [
        ['net user', 'list all local user accounts'],
        ['net user name', 'show details for one account'],
        ['/add', 'create a new user'],
        ['/delete', 'remove a user'],
        ['/active:no', 'disable the account'],
        ['net localgroup', 'manage local groups'],
        ['net localgroup Administrators name /add', 'add a user to the Administrators group']
      ],
      examples: [
        'net user',
        'net user alice P@ssw0rd /add',
        'net localgroup Administrators alice /add',
        'net user alice /active:no'
      ]
    },
    {
      cmd: 'gpupdate / gpresult', cat: 'admin',
      desc: 'Refresh Group Policy settings and see which policies are actually applied.',
      syntax: 'gpupdate [/force]    |    gpresult [/r | /h report.html]',
      opts: [
        ['/force', 'reapply all policies, not just changed ones'],
        ['/boot', 'apply computer policy at the next boot'],
        ['/logoff', 'apply user policy at the next logon'],
        ['/r', 'summarize the Resultant Set of Policy'],
        ['/h', 'save the full report as an HTML file'],
        ['/scope', 'limit to User or Computer policy']
      ],
      examples: [
        'gpupdate /force',
        'gpresult /r',
        'gpresult /h rsop.html'
      ]
    },
    {
      cmd: 'winrm', cat: 'admin',
      desc: 'Manage Windows Remote Management for remote administration and PowerShell remoting.',
      syntax: 'winrm [quickconfig | enumerate | invoke | set]',
      opts: [
        ['quickconfig', 'enable WinRM listening and firewall rules interactively'],
        ['enumerate', 'list listeners and configurations'],
        ['invoke', 'call a method on a remote resource'],
        ['set', 'change a configuration property such as a timeout']
      ],
      examples: [
        'winrm quickconfig',
        'winrm enumerate winrm/config/listener',
        'Enter-PsSession -ComputerName SERVER01'
      ]
    },
    {
      cmd: 'Windows security quick checks', cat: 'admin',
      desc: 'Handy commands to review the security posture of a Windows machine.',
      syntax: 'combined one-liners for auditing',
      opts: [
        ['Firewall', 'netsh advfirewall show allprofiles'],
        ['Listening ports', 'netstat -ano | findstr LISTENING'],
        ['Local users', 'net user'],
        ['Administrators', 'net localgroup Administrators'],
        ['Open shares', 'net share'],
        ['Logged-on sessions', 'query user'],
        ['Antivirus status', 'Get-MpComputerStatus (PowerShell)']
      ],
      examples: [
        'netsh advfirewall show allprofiles',
        'net localgroup Administrators',
        'query user',
        'Get-MpComputerStatus | Select-Object RealTimeProtectionEnabled'
      ]
    }
  ];
})(typeof self !== 'undefined' ? self : this);
