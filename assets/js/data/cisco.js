/*
 * WinTools — data/cisco.js
 * Command & tool reference for Cisco networking (Cisco IOS on routers & switches).
 * Loaded by cisco.html; exposed as WT.data.cisco.
 *
 * Cisco IOS has no "help" flag like Linux — options are context-sensitive per
 * mode, so each entry documents the mode(s) it runs in and the exact syntax.
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};
  WT.data = WT.data || {};

  WT.data.ciscoCats = [
    { key: 'modes', label: 'Modes & Navigation' },
    { key: 'show', label: 'Show / Verify' },
    { key: 'iface', label: 'Interfaces' },
    { key: 'vlan', label: 'VLANs & Trunking' },
    { key: 'routing', label: 'Routing' },
    { key: 'acl', label: 'Access Lists (ACL)' },
    { key: 'security', label: 'Device Security' },
    { key: 'nat', label: 'NAT & DHCP' },
    { key: 'trouble', label: 'Troubleshooting' }
  ];

  WT.data.cisco = [

    /* ---------------- modes & navigation ---------------- */
    {
      cmd: 'enable', cat: 'modes', kali: false,
      desc: 'Enter privileged EXEC mode from user EXEC mode — required for most configuration and "show" commands.',
      syntax: 'enable',
      opts: [
        ['user EXEC (>)', 'the default, limited mode after login'],
        ['privileged EXEC (#)', 'full access to show and configure commands'],
        ['exit', 'drop back one level'],
        ['disable', 'return from privileged (#) to user (>) mode']
      ],
      examples: ['enable', 'disable', 'exit']
    },
    {
      cmd: 'configure terminal', cat: 'modes',
      desc: 'Enter global configuration mode — where you change the device running-config.',
      syntax: 'configure terminal',
      opts: [
        ['configure terminal', 'from privileged (#) into global config (config)#'],
        ['end', 'jump straight back to privileged (#) mode'],
        ['exit', 'step back one configuration level'],
        ['Ctrl+Z', 'immediately return to privileged (#) mode']
      ],
      examples: ['configure terminal', 'configure memory', 'configure network']
    },
    {
      cmd: 'interface', cat: 'modes',
      desc: 'Enter interface configuration mode for a specific port.',
      syntax: 'interface TYPE NUMBER',
      opts: [
        ['interface GigabitEthernet0/1', 'select a specific Gigabit port'],
        ['interface Vlan1', 'select a switched virtual interface (SVI)'],
        ['interface range Fa0/1-24', 'configure several ports at once'],
        ['interface Loopback0', 'select a logical loopback interface'],
        ['exit', 'leave interface mode']
      ],
      examples: [
        'interface GigabitEthernet0/0',
        'interface range FastEthernet0/1 - 12',
        'interface Vlan10'
      ]
    },
    {
      cmd: 'line', cat: 'modes',
      desc: 'Enter line configuration mode to set console, Telnet/SSH or AUX access.',
      syntax: 'line CON 0 | line VTY 0 15 | line AUX 0',
      opts: [
        ['line con 0', 'the physical console port'],
        ['line vty 0 15', 'the virtual lines used for Telnet/SSH (0–15)'],
        ['line aux 0', 'the auxiliary port'],
        ['exit', 'leave line mode']
      ],
      examples: ['line vty 0 15', 'line con 0']
    },
    {
      cmd: 'write / copy running-config', cat: 'modes',
      desc: "Save the running configuration into startup-config so it survives a reload.",
      syntax: 'write memory   |   copy running-config startup-config',
      opts: [
        ['write memory', 'legacy shortcut to save (same as copy run start)'],
        ['copy running-config startup-config', 'the explicit, modern form'],
        ['write erase', 'delete the startup-config (device boots with no config)'],
        ['reload', 'restart the device']
      ],
      examples: [
        'write memory',
        'copy running-config startup-config',
        'copy running-config tftp:',
        'reload'
      ]
    },
    {
      cmd: '? (context help)', cat: 'modes',
      desc: "Cisco IOS has built-in context help — use '?' at any point to see the next valid options.",
      syntax: 'COMMAND ?    |    ?',
      opts: [
        ['?', 'show every command available in the current mode'],
        ['co?', 'show commands starting with "co"'],
        ['show ?', 'show the arguments "show" accepts'],
        ['Tab', 'auto-complete the command you are typing'],
        ['Ctrl+C', 'abort the current command'],
        ['Up / Down', 'scroll through command history']
      ],
      examples: ['?', 'show ip ?', 'conf?', 'show ?']
    },

    /* ---------------- show / verify ---------------- */
    {
      cmd: 'show running-config', cat: 'show',
      desc: 'Display the entire configuration currently running in memory.',
      syntax: 'show running-config',
      opts: [
        ['show running-config', 'print the full active configuration'],
        ['show running-config | begin', 'start printing from a matching line'],
        ['show running-config | include', 'only lines matching a pattern'],
        ['show running-config | section', 'print a whole section (e.g. line vty)'],
        ['show running-config interface', 'show config for one interface']
      ],
      examples: [
        'show running-config',
        'show run | include ip address',
        'show run | section router ospf'
      ]
    },
    {
      cmd: 'show startup-config', cat: 'show',
      desc: 'Display the saved configuration stored in NVRAM that loads on boot.',
      syntax: 'show startup-config',
      opts: [
        ['show startup-config', 'print the saved configuration'],
        ['vs running-config', 'compare with "show running-config" to spot unsaved changes']
      ],
      examples: ['show startup-config', 'diff running-config startup-config']
    },
    {
      cmd: 'show ip interface brief', cat: 'show',
      desc: 'Summarise every interface with its IP, status and protocol state — the fastest health check.',
      syntax: 'show ip interface brief',
      opts: [
        ['IP-Address', 'the address assigned to the interface'],
        ['Status', 'administrative status: up / down / administratively down'],
        ['Protocol', 'Layer-2 protocol status: up / down'],
        ['up/up', 'both layers healthy and forwarding'],
        ['administratively down', 'the port has a "shutdown" command applied']
      ],
      examples: ['show ip int brief', 'show ip interface brief']
    },
    {
      cmd: 'show version', cat: 'show',
      desc: 'Show the IOS version, uptime, configuration register and hardware details.',
      syntax: 'show version',
      opts: [
        ['IOS version', 'the exact software release running'],
        ['uptime', 'how long the device has been up'],
        ['configuration-register', 'the boot-time setting (e.g. 0x2102)'],
        ['Processor board ID', 'the serial number of the hardware'],
        ['Cisco IOS Software', 'the image name and feature set']
      ],
      examples: ['show version', 'show ver']
    },
    {
      cmd: 'show interfaces', cat: 'show',
      desc: 'Detailed per-interface statistics — errors, counters, encapsulation and MTU.',
      syntax: 'show interfaces [TYPE NUMBER]',
      opts: [
        ['show interfaces', 'detailed stats for every interface'],
        ['show interfaces gi0/1', 'details for one interface'],
        ['show interfaces counters', 'just the traffic/error counters'],
        ['input errors', 'receive-side errors (CRC, frame, overrun)'],
        ['output errors', 'transmit-side collisions and errors']
      ],
      examples: [
        'show interfaces',
        'show interfaces gigabitEthernet 0/1',
        'show interfaces counters errors'
      ]
    },
    {
      cmd: 'show ip route', cat: 'show',
      desc: 'Display the IP routing table — every known network and how it is reached.',
      syntax: 'show ip route [NETWORK]',
      opts: [
        ['C', 'connected network (directly on an interface)'],
        ['S', 'static route you configured'],
        ['O', 'learned via OSPF'],
        ['D', 'learned via EIGRP'],
        ['R', 'learned via RIP'],
        ['S*', 'a default route (0.0.0.0/0)'],
        ['show ip route 0.0.0.0', 'show only the default route']
      ],
      examples: [
        'show ip route',
        'show ip route ospf',
        'show ip route 192.168.10.0'
      ]
    },
    {
      cmd: 'show cdp neighbors', cat: 'show',
      desc: 'List directly connected Cisco devices discovered via CDP, with ports and platform.',
      syntax: 'show cdp neighbors [detail]',
      opts: [
        ['show cdp neighbors', 'table of adjacent Cisco devices'],
        ['show cdp neighbors detail', 'full info: IP, IOS version, platform, native VLAN'],
        ['Device ID', 'the neighbour hostname'],
        ['Local Interface', 'the port on this device facing the neighbour'],
        ['Port ID', 'the neighbour port connected to us']
      ],
      examples: [
        'show cdp neighbors',
        'show cdp neighbors detail',
        'show cdp'
      ]
    },
    {
      cmd: 'show mac address-table', cat: 'show',
      desc: "Show the switch's MAC address table — which MAC lives on which port.",
      syntax: 'show mac address-table [dynamic | static]',
      opts: [
        ['show mac address-table', 'all learned and static entries'],
        ['show mac address-table dynamic', 'only dynamically learned entries'],
        ['show mac address-table static', 'manually pinned entries'],
        ['show mac address-table address', 'look up a single MAC'],
        ['show mac address-table vlan', 'filter by VLAN']
      ],
      examples: [
        'show mac address-table',
        'show mac address-table dynamic vlan 10',
        'show mac address-table address aabb.cc00.1200'
      ]
    },
    {
      cmd: 'show vlan brief', cat: 'show',
      desc: 'List every VLAN and which ports belong to it.',
      syntax: 'show vlan brief',
      opts: [
        ['show vlan brief', 'compact table of VLANs and their ports'],
        ['show vlan id', 'show one specific VLAN'],
        ['show vlan summary', 'how many VLANs exist by type'],
        ['VLAN 1', 'the default VLAN all ports start on']
      ],
      examples: ['show vlan brief', 'show vlan id 10']
    },
    {
      cmd: 'show arp', cat: 'show',
      desc: 'Display the ARP table mapping IP addresses to MAC addresses.',
      syntax: 'show arp',
      opts: [
        ['show arp', 'list IP-to-MAC bindings the device knows'],
        ['Age', 'how long ago the entry was learned'],
        ['Hardware Addr', 'the MAC address'],
        ['Interface', 'the interface the host is reachable on']
      ],
      examples: ['show arp', 'show ip arp']
    },
    {
      cmd: 'show protocols', cat: 'show',
      desc: 'Show the status of configured protocols on each interface.',
      syntax: 'show protocols [interface]',
      opts: [
        ['show protocols', 'line-protocol status for all interfaces'],
        ['show protocols gi0/1', 'protocol status for one interface'],
        ['line protocol is up', 'Layer-2 is healthy'],
        ['Internet address is', 'the configured IP and mask']
      ],
      examples: ['show protocols', 'show ip protocols']
    },
    {
      cmd: 'show spanning-tree', cat: 'show',
      desc: 'Display Spanning-Tree state — root bridge, port roles and loop protection.',
      syntax: 'show spanning-tree [vlan VLAN]',
      opts: [
        ['show spanning-tree', 'STP state for all VLANs'],
        ['show spanning-tree vlan 10', 'STP for one VLAN'],
        ['Root bridge', 'which switch is the STP root'],
        ['Forwarding / Blocking / Listening', 'the STP port states'],
        ['show spanning-tree summary', 'a compact overview of STP mode and timers']
      ],
      examples: [
        'show spanning-tree',
        'show spanning-tree vlan 10',
        'show spanning-tree summary'
      ]
    },

    /* ---------------- interfaces ---------------- */
    {
      cmd: 'ip address', cat: 'iface',
      desc: 'Assign an IPv4 address and subnet mask to an interface.',
      syntax: 'ip address IP_ADDRESS SUBNET_MASK',
      opts: [
        ['ip address 192.168.1.1 255.255.255.0', 'set a primary IPv4 address'],
        ['ip address 10.0.0.1 255.0.0.0 secondary', 'add a secondary address'],
        ['no ip address', 'remove the address from the interface'],
        ['ipv6 address', 'assign an IPv6 address instead']
      ],
      examples: [
        'interface gi0/0',
        'ip address 192.168.1.1 255.255.255.0',
        'no ip address'
      ]
    },
    {
      cmd: 'shutdown / no shutdown', cat: 'iface',
      desc: 'Administratively disable (shutdown) or enable (no shutdown) an interface.',
      syntax: 'shutdown    |    no shutdown',
      opts: [
        ['shutdown', 'disable the port (state becomes administratively down)'],
        ['no shutdown', 'enable the port — required before it will pass traffic'],
        ['description', 'add a human-readable label to the interface']
      ],
      examples: [
        'interface gi0/0',
        'no shutdown',
        'description Link to Core Switch'
      ]
    },
    {
      cmd: 'description', cat: 'iface',
      desc: 'Attach a descriptive label to an interface so the topology is documented.',
      syntax: 'description TEXT',
      opts: [
        ['description', 'set a label shown in "show run" and "show interfaces"'],
        ['no description', 'remove the label']
      ],
      examples: ['description Uplink to ISP router', 'description Server farm link']
    },
    {
      cmd: 'speed / duplex', cat: 'iface',
      desc: 'Set the link speed and duplex mode of an interface (or leave them auto).',
      syntax: 'speed 10|100|1000|auto    |    duplex full|half|auto',
      opts: [
        ['speed auto', 'auto-negotiate speed (default, recommended)'],
        ['speed 100', 'force 100 Mbps'],
        ['speed 1000', 'force 1000 Mbps (Gigabit)'],
        ['duplex full', 'force full-duplex'],
        ['duplex auto', 'auto-negotiate duplex']
      ],
      examples: ['speed auto', 'duplex full', 'speed 100 duplex half']
    },
    {
      cmd: 'switchport mode access', cat: 'iface',
      desc: 'Set a switch port to access mode (single VLAN, for end devices).',
      syntax: 'switchport mode access    |    switchport access vlan VLAN_ID',
      opts: [
        ['switchport mode access', 'make the port an access (access-port) port'],
        ['switchport access vlan', 'assign the access port to a VLAN'],
        ['switchport mode trunk', 'make the port a trunk (multi-VLAN) port'],
        ['switchport mode dynamic auto', 'DTP auto (avoid on trunks; set explicitly)'],
        ['switchport nonegotiate', 'disable DTP on the port']
      ],
      examples: [
        'interface fa0/1',
        'switchport mode access',
        'switchport access vlan 10'
      ]
    },
    {
      cmd: 'switchport trunk', cat: 'iface',
      desc: 'Configure a trunk port that carries multiple VLANs between switches.',
      syntax: 'switchport trunk allowed vlan LIST    |    switchport trunk native vlan ID',
      opts: [
        ['switchport mode trunk', 'set the port to trunk mode'],
        ['switchport trunk allowed vlan', 'which VLANs are permitted on the trunk'],
        ['switchport trunk native vlan', 'the untagged (native) VLAN on the trunk'],
        ['switchport trunk encapsulation', 'choose dot1Q (802.1Q) or isl'],
        ['switchport trunk allowed vlan add', 'add VLANs without replacing the list']
      ],
      examples: [
        'interface gi0/1',
        'switchport mode trunk',
        'switchport trunk allowed vlan 10,20,30',
        'switchport trunk native vlan 999'
      ]
    },

    /* ---------------- VLANs & trunking ---------------- */
    {
      cmd: 'vlan', cat: 'vlan',
      desc: 'Create or delete a VLAN and optionally give it a name.',
      syntax: 'vlan VLAN_ID    |    name VLAN_NAME',
      opts: [
        ['vlan 10', 'create (or enter) VLAN 10'],
        ['name Sales', 'label the VLAN for readability'],
        ['no vlan 10', 'delete VLAN 10'],
        ['show vlan brief', 'verify which VLANs exist']
      ],
      examples: ['vlan 10', 'name Sales', 'vlan 20', 'name Engineering']
    },
    {
      cmd: 'interface vlan (SVI)', cat: 'vlan',
      desc: 'Create a Switched Virtual Interface — a Layer-3 interface for a VLAN.',
      syntax: 'interface vlan VLAN_ID',
      opts: [
        ['interface vlan 10', 'create the SVI for VLAN 10'],
        ['ip address', 'give the SVI an IP so the switch can be managed / route'],
        ['no shutdown', 'the SVI is shut by default — enable it'],
        ['ip helper-address', 'forward DHCP requests to a DHCP server']
      ],
      examples: [
        'interface vlan 10',
        'ip address 192.168.10.1 255.255.255.0',
        'no shutdown'
      ]
    },
    {
      cmd: 'vtp domain / mode', cat: 'vlan',
      desc: 'Configure VTP so VLAN changes propagate across multiple switches.',
      syntax: 'vtp domain NAME    |    vtp mode server|client|transparent',
      opts: [
        ['vtp domain', 'set the shared VTP domain name'],
        ['vtp mode server', 'create/delete VLANs and advertise them (default)'],
        ['vtp mode client', 'learn VLANs from the server; cannot create them'],
        ['vtp mode transparent', 'ignore VTP; only forwards advertisements'],
        ['vtp password', 'authenticate VTP updates'],
        ['vtp version 2', 'enable VTP version 2 features']
      ],
      examples: [
        'vtp domain CORP',
        'vtp mode client',
        'vtp password MySecret'
      ]
    },
    {
      cmd: 'etherchannel / port-channel', cat: 'vlan',
      desc: 'Bundle several physical links into one logical link for bandwidth and redundancy.',
      syntax: 'channel-group N mode active|on    |    interface port-channel N',
      opts: [
        ['channel-group 1 mode active', 'LACP active (sends negotiation packets)'],
        ['channel-group 1 mode passive', 'LACP passive (responds only)'],
        ['channel-group 1 mode on', 'static on (no negotiation — both ends must match)'],
        ['interface port-channel 1', 'configure the logical bundle interface'],
        ['show etherchannel summary', 'verify the bundle status']
      ],
      examples: [
        'interface range gi0/1 - 2',
        'channel-group 1 mode active',
        'interface port-channel 1',
        'switchport mode trunk'
      ]
    },

    /* ---------------- routing ---------------- */
    {
      cmd: 'ip route (static)', cat: 'routing',
      desc: 'Add a static route telling the router how to reach a remote network.',
      syntax: 'ip route NETWORK MASK NEXT_HOP | ip route NETWORK MASK INTERFACE',
      opts: [
        ['ip route 10.0.0.0 255.0.0.0 192.168.1.2', 'reach 10.x via the next-hop IP'],
        ['ip route 0.0.0.0 0.0.0.0 gi0/0', 'default route out of an interface'],
        ['ip route 0.0.0.0 0.0.0.0 203.0.113.1', 'default route via a next-hop IP'],
        ['AD', 'the administrative distance at the end (1 default, lower is preferred)'],
        ['no ip route', 'remove a static route']
      ],
      examples: [
        'ip route 10.1.0.0 255.255.0.0 192.168.1.2',
        'ip route 0.0.0.0 0.0.0.0 203.0.113.1',
        'ip route 0.0.0.0 0.0.0.0 gi0/0 10'
      ]
    },
    {
      cmd: 'router ospf', cat: 'routing',
      desc: 'Enable OSPF routing and advertise networks with a wildcard mask and area.',
      syntax: 'router ospf PROCESS_ID    |    network IP WILDCARD AREA',
      opts: [
        ['router ospf 1', 'start OSPF with process ID 1 (local significance)'],
        ['network 192.168.1.0 0.0.0.255 area 0', 'advertise this network in area 0'],
        ['wildcard mask', 'the inverse of the subnet mask (0.0.0.255 = /24)'],
        ['area 0', 'the backbone area all other areas connect to'],
        ['router-id', 'manually set the OSPF router ID'],
        ['show ip ospf neighbor', 'verify OSPF adjacencies']
      ],
      examples: [
        'router ospf 1',
        'network 192.168.1.0 0.0.0.255 area 0',
        'network 10.0.0.0 0.0.255.255 area 1',
        'router-id 1.1.1.1'
      ]
    },
    {
      cmd: 'router eigrp', cat: 'routing',
      desc: 'Enable EIGRP routing (an advanced distance-vector / hybrid protocol).',
      syntax: 'router eigrp AS_NUMBER    |    network IP [WILDCARD]',
      opts: [
        ['router eigrp 100', 'start EIGRP with autonomous system 100'],
        ['network 192.168.1.0', 'advertise directly connected matching networks'],
        ['network 10.0.0.0 0.0.255.255', 'use a wildcard to be precise'],
        ['auto-summary', 'legacy auto summarisation (off by default now)'],
        ['no auto-summary', 'disable summarisation for modern networks'],
        ['show ip eigrp neighbors', 'verify EIGRP neighbours']
      ],
      examples: [
        'router eigrp 100',
        'network 192.168.1.0',
        'network 10.0.0.0 0.0.255.255',
        'no auto-summary'
      ]
    },
    {
      cmd: 'router rip', cat: 'routing',
      desc: 'Enable RIP routing (a simple distance-vector protocol, hops up to 15).',
      syntax: 'router rip    |    network NETWORK    |    version 2',
      opts: [
        ['router rip', 'enable the RIP process'],
        ['network', 'advertise a directly connected network'],
        ['version 2', 'use RIPv2 (supports VLSM and classless routes)'],
        ['default-information originate', 'advertise a default route via RIP'],
        ['show ip rip database', 'inspect the RIP routing database']
      ],
      examples: ['router rip', 'version 2', 'network 192.168.1.0', 'network 10.0.0.0']
    },

    /* ---------------- ACLs ---------------- */
    {
      cmd: 'access-list (standard)', cat: 'acl',
      desc: 'Create a standard ACL that filters traffic by source IP only (numbers 1–99).',
      syntax: 'access-list 1-99 permit|deny SOURCE [WILDCARD]',
      opts: [
        ['access-list 10 permit 192.168.1.0 0.0.0.255', 'allow a source network'],
        ['access-list 10 deny any', 'block everything else'],
        ['access-list 10 deny host', 'block one specific host'],
        ['wildcard mask', '0.0.0.0 = exact host, 255.255.255.255 = any'],
        ['numbering', 'standard ACLs use 1–99 and 1300–1999']
      ],
      examples: [
        'access-list 10 permit 192.168.1.0 0.0.0.255',
        'access-list 10 deny any',
        'interface gi0/0',
        'ip access-group 10 in'
      ]
    },
    {
      cmd: 'access-list (extended)', cat: 'acl',
      desc: 'Create an extended ACL that filters by source, destination, protocol and port (numbers 100–199).',
      syntax: 'access-list 100-199 permit|deny PROTO SRC WILDCARD DST WILDCARD [eq PORT]',
      opts: [
        ['access-list 101 deny tcp host 10.0.0.5 any eq 23', 'block Telnet from one host'],
        ['access-list 101 permit tcp any any eq 443', 'allow HTTPS from anywhere'],
        ['access-list 101 permit ip any any', 'permit all remaining IP traffic'],
        ['eq / lt / gt / range', 'match equal / less / greater / a port range'],
        ['tcp / udp / ip / icmp', 'the protocol to match'],
        ['numbering', 'extended ACLs use 100–199 and 2000–2699']
      ],
      examples: [
        'access-list 110 deny tcp any any eq 23',
        'access-list 110 permit ip any any',
        'interface gi0/0',
        'ip access-group 110 in'
      ]
    },
    {
      cmd: 'named ACL', cat: 'acl',
      desc: 'Create an ACL with a descriptive name and per-line numbered entries — easier to edit.',
      syntax: 'ip access-list standard|extended NAME',
      opts: [
        ['ip access-list extended BLOCK-TELNET', 'create a named extended ACL'],
        ['permit / deny', 'the action inside the named ACL'],
        ['no 10', 'delete a single numbered line inside the named ACL'],
        ['show ip access-lists', 'list and verify configured ACLs']
      ],
      examples: [
        'ip access-list extended BLOCK-TELNET',
        'deny tcp any any eq 23',
        'permit ip any any',
        'interface gi0/0',
        'ip access-group BLOCK-TELNET in'
      ]
    },
    {
      cmd: 'apply an ACL to an interface', cat: 'acl',
      desc: 'Attach an ACL to an interface in a direction so it actually filters traffic.',
      syntax: 'ip access-group NAME|NUMBER in|out',
      opts: [
        ['ip access-group 10 in', 'filter traffic entering the interface'],
        ['ip access-group 10 out', 'filter traffic leaving the interface'],
        ['console / vty', 'use "access-class" instead for line (console/vty) access'],
        ['no ip access-group', 'detach the ACL from the interface']
      ],
      examples: [
        'interface gi0/0',
        'ip access-group BLOCK-TELNET in',
        'line vty 0 15',
        'access-class 10 in'
      ]
    },

    /* ---------------- device security ---------------- */
    {
      cmd: 'enable secret', cat: 'security',
      desc: 'Set an encrypted password required to enter privileged EXEC mode.',
      syntax: 'enable secret PASSWORD',
      opts: [
        ['enable secret', 'an MD5-encrypted privileged-mode password (recommended)'],
        ['enable password', 'a weaker, plain-stored password (avoid)'],
        ['enable secret 0 PASSWORD', 'store the given text encrypted'],
        ['no enable secret', 'remove the secret']
      ],
      examples: [
        'enable secret MyStr0ngPass!',
        'service password-encryption',
        'no enable secret'
      ]
    },
    {
      cmd: 'line vty password & login', cat: 'security',
      desc: 'Secure remote access (SSH/Telnet) lines with a password and login requirement.',
      syntax: 'line vty 0 15  →  password X  →  login  →  transport input ssh',
      opts: [
        ['password', 'set the password for the VTY lines'],
        ['login', 'require the password on connection'],
        ['login local', 'authenticate against the local username database'],
        ['transport input ssh', 'allow SSH only (disable Telnet — recommended)'],
        ['access-class', 'apply an ACL to restrict which hosts may connect'],
        ['exec-timeout', 'auto-logout after inactivity (minutes seconds)']
      ],
      examples: [
        'line vty 0 15',
        'password MyVtyPass',
        'login local',
        'transport input ssh',
        'exec-timeout 10 0'
      ]
    },
    {
      cmd: 'username', cat: 'security',
      desc: "Create local user accounts on the device (used by 'login local').",
      syntax: 'username NAME privilege LEVEL secret PASSWORD',
      opts: [
        ['username admin secret Pass', 'create a user with an encrypted password'],
        ['privilege 15', 'give the user full privileged access'],
        ['username admin privilege 15 secret Pass', 'a full-admin local account'],
        ['no username', 'delete a local account']
      ],
      examples: [
        'username admin privilege 15 secret Str0ngPass!',
        'username operator privilege 1 secret OpsPass',
        'line vty 0 15',
        'login local'
      ]
    },
    {
      cmd: 'port-security', cat: 'security',
      desc: "Lock a switch port to a set number of MAC addresses and act on violations.",
      syntax: 'switchport port-security [maximum N] [violation protect|restrict|shutdown]',
      opts: [
        ['switchport port-security', 'enable port security on an access port'],
        ['maximum N', 'allow at most N MAC addresses'],
        ['mac-address sticky', 'dynamically learn and retain the current MAC'],
        ['violation shutdown', 'err-disable the port on violation (default)'],
        ['violation restrict', 'drop violating frames and log, keep the port up'],
        ['violation protect', 'drop violating frames silently'],
        ['show port-security', 'verify port-security status and violations']
      ],
      examples: [
        'interface fa0/1',
        'switchport mode access',
        'switchport port-security',
        'switchport port-security maximum 2',
        'switchport port-security mac-address sticky',
        'switchport port-security violation shutdown'
      ]
    },
    {
      cmd: 'banner', cat: 'security',
      desc: 'Show a legal or warning banner before login (often required for compliance).',
      syntax: 'banner motd #TEXT#',
      opts: [
        ['banner motd', 'message of the day, shown before login'],
        ['banner login', 'shown just before the login prompt'],
        ['delimiters', 'wrap the text in matching delimiter characters'],
        ['no banner motd', 'remove the banner']
      ],
      examples: [
        'banner motd #Unauthorized access prohibited!#',
        'banner login #WARNING: activity is monitored#'
      ]
    },
    {
      cmd: 'service password-encryption', cat: 'security',
      desc: 'Encrypt stored passwords in the configuration so they are not plain text.',
      syntax: 'service password-encryption',
      opts: [
        ['service password-encryption', 'apply weak (Type 7) encryption to plain passwords'],
        ['enable secret', 'use this instead — strong MD5 hashing'],
        ['no service password-encryption', 'disable the feature (does not decrypt existing)'],
        ['note', 'Type 7 is weak; prefer "enable secret" and SSH']
      ],
      examples: ['service password-encryption', 'no service password-encryption']
    },

    /* ---------------- NAT & DHCP ---------------- */
    {
      cmd: 'NAT (network address translation)', cat: 'nat',
      desc: 'Translate private internal addresses to a public address for internet access.',
      syntax: 'ip nat inside source list ACL INTERFACE overload',
      opts: [
        ['ip nat inside', 'mark an interface as the inside (private) interface'],
        ['ip nat outside', 'mark an interface as the outside (public) interface'],
        ['ip nat inside source list 1 interface gi0/1 overload', 'PAT: many hosts share one public IP'],
        ['access-list 1 permit', 'define which internal sources may be translated'],
        ['ip nat inside source static', 'a permanent 1:1 mapping (e.g. publish a server)'],
        ['show ip nat translations', 'view active NAT mappings']
      ],
      examples: [
        'access-list 1 permit 192.168.0.0 0.0.255.255',
        'ip nat inside source list 1 interface gi0/1 overload',
        'interface gi0/0',
        'ip nat inside',
        'interface gi0/1',
        'ip nat outside'
      ]
    },
    {
      cmd: 'ip dhcp excluded-address', cat: 'nat',
      desc: 'Reserve a range of addresses that the DHCP pool must not hand out.',
      syntax: 'ip dhcp excluded-address LOW HIGH',
      opts: [
        ['ip dhcp excluded-address 192.168.1.1', 'exclude a single address (the router)'],
        ['ip dhcp excluded-address 192.168.1.1 192.168.1.10', 'exclude a range'],
        ['no ip dhcp excluded-address', 'remove the exclusion']
      ],
      examples: [
        'ip dhcp excluded-address 192.168.1.1 192.168.1.10'
      ]
    },
    {
      cmd: 'ip dhcp pool', cat: 'nat',
      desc: 'Create a DHCP pool so the router automatically addresses clients.',
      syntax: 'ip dhcp pool NAME  →  network / default-router / dns-server',
      opts: [
        ['ip dhcp pool LAN', 'create (or enter) the DHCP pool'],
        ['network', 'the subnet to lease addresses from'],
        ['default-router', 'the default gateway handed to clients'],
        ['dns-server', 'the DNS server(s) handed to clients'],
        ['lease', 'how long an address is leased (days hours minutes)'],
        ['show ip dhcp binding', 'see which addresses are currently leased']
      ],
      examples: [
        'ip dhcp pool LAN',
        'network 192.168.1.0 255.255.255.0',
        'default-router 192.168.1.1',
        'dns-server 8.8.8.8 8.8.4.4'
      ]
    },

    /* ---------------- troubleshooting ---------------- */
    {
      cmd: 'ping / traceroute', cat: 'trouble',
      desc: 'Test reachability and trace the path to a destination from the device itself.',
      syntax: 'ping IP [repeat N]    |    traceroute IP',
      opts: [
        ['ping 192.168.1.2', 'send ICMP echo requests'],
        ['ping repeat 100', 'send 100 packets for a more reliable test'],
        ['traceroute 8.8.8.8', 'show each hop toward the destination'],
        ['extended ping', 'type just "ping" for options (size, count, DF bit)'],
        ['success rate', 'the percentage of replies received (aim for 100%)']
      ],
      examples: [
        'ping 192.168.1.1',
        'ping repeat 20 10.0.0.1',
        'traceroute 8.8.8.8'
      ]
    },
    {
      cmd: 'debug', cat: 'trouble',
      desc: "Turn on live event debugging — powerful but noisy; always 'no debug all' afterwards.",
      syntax: 'debug TOPIC    |    no debug all',
      opts: [
        ['debug ip packet', 'trace each packet (very verbose)'],
        ['debug ospf events', 'show OSPF adjacency events'],
        ['debug cdp packets', 'trace CDP discovery'],
        ['no debug all', 'turn ALL debugging off (alias: u all)'],
        ['undebug all', 'the same as "no debug all"'],
        ['caution', 'debug can overload the CPU and drop traffic — use sparingly']
      ],
      examples: [
        'debug ip ospf events',
        'no debug all',
        'undebug all'
      ]
    },
    {
      cmd: 'ping extended / extended traceroute', cat: 'trouble',
      desc: 'Use the interactive extended ping for detailed control over the test parameters.',
      syntax: 'ping  →  then answer the prompted options',
      opts: [
        ['Protocol', 'choose IP (default)'],
        ['Target address', 'the host to ping'],
        ['Repeat count', 'how many packets (default 5)'],
        ['Datagram size', 'payload size in bytes'],
        ['Timeout', 'seconds to wait for each reply'],
        ['Set DF bit', 'Do Not Fragment — test path MTU'],
        ['Source address', 'which interface/IP to originate from']
      ],
      examples: [
        'ping',
        '  Target address: 8.8.8.8',
        '  Repeat count: 100',
        '  Datagram size: 1400',
        '  Set DF bit in packet: yes'
      ]
    },
    {
      cmd: 'show processes cpu / memory', cat: 'trouble',
      desc: 'Check device resource utilisation to spot a busy or misbehaving control plane.',
      syntax: 'show processes cpu    |    show processes memory',
      opts: [
        ['show processes cpu', 'CPU load and the top CPU-consuming processes'],
        ['five-seconds CPU', 'the recent CPU utilisation percentage'],
        ['show processes memory', 'memory pools and free memory'],
        ['show memory summary', 'a summary of memory usage'],
        ['show logging', 'recent log messages and buffer contents']
      ],
      examples: [
        'show processes cpu',
        'show processes memory',
        'show logging'
      ]
    }
  ];
})(typeof self !== 'undefined' ? self : this);
