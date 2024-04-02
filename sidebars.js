module.exports = {
  mySidebar: [
    'index',
    'release-notes'
    {
      type: 'category', 
      label: 'Installation',
      collapsed: true,
      items: [
        'installation/introduction',
        'installation/preparing-the-installation',
        'installation/installation-upgrade',
        'installation/installation-parameters-worksheet',
      ], 
    },
    {
      type: 'category', 
      label: 'Configuration',
      collapsed: true,
      items: [
        'configuration/configuration-introduction',
        'configuration/configuration-settings',
        'configuration/page-one-settings',
        'configuration/page-two-settings',
        'configuration/console-message-display-level',
        'configuration/configure-bis',
        'configuration/configure-jors',
        'configuration/additional-settings',
      ], 
    },
    {
      type: 'category', 
      label: 'Operations',
      collapsed: true,
      items: [
        'operations/components',
        'operations/operating-the-lsam',
        'operations/commands',
      ], 
    },
      'additional-features',
      'file-transfer',
      'support-data-collector',
      'smamsc',
      'ftpapi',
      {
        type: 'category', 
        label: 'Reference',
        collapsed: true,
        items: [
          'reference/lsam-job-messages',
          'reference/lsam-system-console-messages',
          'reference/lmam-messages',
          'reference/bis-mam-messages',
          'reference/jors-messages',
          'reference/xfrtcp-messages',
          'reference/file-transfer-server-messages',
          'reference/file-transfer-agent-messages',
          'reference/known-issues',
        ], 
      },
  ],
};
