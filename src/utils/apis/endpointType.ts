export type OS_TYPE = 'ios' | 'android' | 'windows' | 'macos' | 'web';

export type VERSION_CHECK_TYPE = {
  appVersion: string;
  os: OS_TYPE;
};

export type LOGIN_TYPE = {
  notifyToken: string;
  os: OS_TYPE;
  appVersion: string;
  deviceId: string;
};
