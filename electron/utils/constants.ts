export const IPC = {
  // Authentication & GitHub API
  GITHUB_VALIDATE_TOKEN: 'kura:github:validate-token',
  GITHUB_FETCH_REPOS: 'kura:github:fetch-repos',

  // Git Core
  GIT_CLONE: 'kura:git:clone',
  GIT_PULL: 'kura:git:pull',

  // Cloud Storage
  CLOUD_TEST_CONNECTION: 'kura:cloud:test-connection',
  CLOUD_UPLOAD: 'kura:cloud:upload',

  // Vault Synchronization Pipeline
  BACKUP_START: 'kura:backup:start',
  BACKUP_CANCEL: 'kura:backup:cancel',
  BACKUP_PROGRESS: 'kura:backup:progress',
  BACKUP_LOG: 'kura:backup:log',
  BACKUP_COMPLETE: 'kura:backup:complete',

  // Archives & History
  ARCHIVES_LIST: 'kura:archives:list',
  ARCHIVES_OPEN_FOLDER: 'kura:archives:open-folder',

  // Preferences & Store
  SETTINGS_GET: 'kura:settings:get',
  SETTINGS_SET: 'kura:settings:set',
  SETTINGS_GET_CACHE_STATS: 'kura:settings:get-cache-stats',
  SETTINGS_CLEAR_CACHE: 'kura:settings:clear-cache',

  // Automated Scheduler
  SCHEDULE_SET: 'kura:schedule:set',
  SCHEDULE_GET: 'kura:schedule:get',

  // Native Dialogs
  DIALOG_SELECT_FOLDER: 'kura:dialog:select-folder',
} as const

export const ALLOWED_SEND_CHANNELS = [
  IPC.BACKUP_PROGRESS,
  IPC.BACKUP_LOG,
  IPC.BACKUP_COMPLETE,
] as const

export const ALLOWED_INVOKE_CHANNELS = [
  IPC.GITHUB_VALIDATE_TOKEN,
  IPC.GITHUB_FETCH_REPOS,
  IPC.GIT_CLONE,
  IPC.GIT_PULL,
  IPC.CLOUD_TEST_CONNECTION,
  IPC.CLOUD_UPLOAD,
  IPC.BACKUP_START,
  IPC.BACKUP_CANCEL,
  IPC.ARCHIVES_LIST,
  IPC.ARCHIVES_OPEN_FOLDER,
  IPC.SETTINGS_GET,
  IPC.SETTINGS_SET,
  IPC.SETTINGS_GET_CACHE_STATS,
  IPC.SETTINGS_CLEAR_CACHE,
  IPC.SCHEDULE_SET,
  IPC.SCHEDULE_GET,
  IPC.DIALOG_SELECT_FOLDER,
] as const

export const DEFAULTS = {
  CONCURRENCY_LIMIT: 5,
  BACKUP_PATH: '',
  ARCHIVE_FORMAT: 'tar.gz',
  APP_NAME: 'GitKura',
  APP_KANJI: '蔵',
} as const
