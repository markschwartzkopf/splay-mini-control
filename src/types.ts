export enum Setting {
  IS_SPARE = 0,
  SYSTEM_NAME = 1,
  PLAYBACK_CONFIG = 2,
  PASSWORD = 3,
  HELP_HINTS = 4,
  SERIALNO = 5,
  ENABLE_PASSWORD = 6,
  SMTP = 7,
  EMAIL = 8,
  INPUT = 9,
  OUTPUT = 10,
  DMX = 11,
  ARTNET = 12,
  SACN = 13,
  LOCATION = 14,
  NTP = 15,
  BASE_PATH = 16,
  CUE_PATH = 17,
  HOME_INTERFACE = 18,
  UDP = 19,
  TCP = 20,
  RS232C = 21,
  OSC = 22,
  IEEE1588_CONFIG = 23,
  IEEE1588_ACTIVE = 24,
  LOCK_STATUS = 25,
  DB_VERSION = 26,
}

export enum PlaylistStatus {
  IDLE,
  PLAYING,
  PAUSED,
  STOPPED,
  STOPPING,
  ERROR,
}

export enum TriggerType {
  NONE,
  OSC,
  RS232,
  IO,
  ARTNET,
  DMX,
  SACN,
  POWERUP,
  UDP,
  BUTTON,
}

export enum EventType {
  NONE,
  RS232,
  IO,
  ARTNET,
  DMX,
  SACN,
  OSC,
  UDP,
}

export enum CueType {
  STATIC,
  DYNAMIC,
  EFFECT,
}

export enum UniverseType {
  DMX,
  ARTNET,
  SACN,
  NONE,
}

export type NetType = 'unicast' | 'broadcast';

export type NoneEvent = {
  event_id?: -1;
  type?: EventType.NONE;
  value: null;
};

export type NoneTrigger =
  | {
      name?: '';
      trigger_id: -1;
      type?: TriggerType.NONE;
      value: null;
    }
  | {
      type: TriggerType.NONE;
    };

export type OscEvent = {
  type: EventType.OSC;
  value: {
    address: string;
    ip: string;
    data: string;
    data_type: 'string' | 'int' | 'float';
    net_type: NetType;
    port: number;
  };
};

export type OscTrigger = {
  type: TriggerType.OSC;
  value: {
    address: string;
    data_type: 'string';
    net_type: NetType;
    port: number;
  };
};

export type RS232Event = {
  type: EventType.RS232;
  value: {
    data: string;
  };
};

export type RS232Trigger = {
  type: TriggerType.RS232;
  value: {
    data: string;
  };
};

export type IOEvent = {
  type: EventType.IO;
  value: {
    output: 0 | 1;
    value: 0 | 1;
  };
};

export type IOTrigger = {
  type: TriggerType.IO;
  value: {
    data: 0 | 1;
    port: number;
  };
};

export type ArtNetEvent = {
  type: EventType.ARTNET;
  value: {
    channel: number;
    ip: string;
    universe: number;
    value: number;
    net_type: NetType;
  };
};

export type ArtNetTrigger = {
  type: TriggerType.ARTNET;
  value: {
    channel: number;
    universe: number;
    value: number; //Trigger level
    net_type: NetType;
  };
};

export type DmxEvent = {
  type: EventType.DMX;
  value: {
    channel: number;
    universe: number;
    value: number;
  };
};

export type DmxTrigger = {
  type: TriggerType.DMX;
  value: {
    channel: number;
    universe: number;
    value: number; //Trigger level
  };
};

export type SacnEvent = {
  type: EventType.SACN;
  value: {
    channel: number;
    ip: string;
    universe: number;
    value: number;
  };
};

export type SacnTrigger = {
  type: TriggerType.SACN;
  value: {
    channel: number;
    universe: number;
    value: number; //Trigger level
  };
};

export type PowerupTrigger = {
  type: TriggerType.POWERUP;
  value: null; //No idea, since S-Play Mini does not have a powerup trigger
};

export type UdpEvent = {
  type: EventType.UDP;
  value: {
    ip: string;
    port: number;
    value: string;
  };
};

export type UdpTrigger = {
  type: TriggerType.UDP;
  value: {
    ip: string;
    value: string;
  };
};

export type ButtonTrigger = {
  type: TriggerType.BUTTON;
  value: {
    data: 0 | 1;
  };
};

export type AnonymousTrigger =
  | NoneTrigger
  | OscTrigger
  | RS232Trigger
  | IOTrigger
  | ArtNetTrigger
  | DmxTrigger
  | SacnTrigger
  | PowerupTrigger
  | UdpTrigger
  | ButtonTrigger;

export type Trigger = AnonymousTrigger & {
  start?: number;
  active?: boolean;
  trigger_id: number;
  name: string;
};

export type AnonymousEvent =
  | NoneEvent
  | OscEvent
  | RS232Event
  | IOEvent
  | ArtNetEvent
  | DmxEvent
  | SacnEvent
  | UdpEvent;

export type Event = AnonymousEvent & {
  event_id: number;
  name: string;
  active?: boolean;
  start?: number;
};

export type TrackCue = {
  cue_id: number;
  duration: number;
  fade: { in: number; out: number };
  start: number;
  name?: string;
  type?: CueType;
};

export type PartialPlaylist = {
  playlist_id: number;
  name: string;
  current_time?: number;
  duration: number;
  group: number;
  hide_from_home?: boolean;
  intensity: number;
  order: number;
  status?: PlaylistStatus;
  waiting_triggers?: boolean;
};

export type Playlist = PartialPlaylist & {
  fade_in: number;
  fade_out: number;
  loop: number;
  priority: number;
  start_trigger: Trigger | { trigger_id: -1 };
  stop_trigger: Trigger | { trigger_id: -1 };
  timeline: {
    trigger: { triggers: Trigger[] };
    event: { events: Event[] };
    track1: { cues: TrackCue[]; intensity: number };
    track2: { cues: TrackCue[]; intensity: number };
    track3?: { cues: TrackCue[]; intensity: number };
    track4?: { cues: TrackCue[]; intensity: number };
  };
};

/* type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : Tuple<T, N, [T, ...R]>;

type Frame = Tuple<number, 512>; */

export type Frame = number[];

export type PartialCue = {
  config: {
    ch_start: number;
    ch_stop: number;
    source: number;
    universes: number[];
    trigger?: AnonymousTrigger;
  };
  cue_id: number;
  duration: number;
  name: string;
  type: CueType;
};

export type Cue = PartialCue & {
  frames: Frame[];
};

export type AnonymousCue = Omit<Cue, 'cue_id'> & { cue_id: 0 };

export type Interface = {
  config: string;
  interface_id: number;
  name: string;
  url: string;
  widgets: string;
};

export type Network = {
  dhcp: boolean;
  gateway: string;
  ip: string;
  mac: string;
  mask: string;
};

export type Storage = {
  free: number;
  storage: string;
  total: number;
};

export enum CommandType {
  Play = 0, // Play playlist on the device
  Pause = 1, // Pause the playing playlist
  Stop = 2, // Stop the playlist is in PAUSE or PLAY status.
  GetPlaylist = 3, // Get full information about playlist with Tracks, Triggers & Events
  UpdatePlaylistsOrder = 4, // Update playlists by ids with given orders
  PlayAllPlaylists = 5, // Play all playlists on the device
  PauseAllPlaylists = 6, // Pause all playing playlists
  StopAllPlaylists = 7, // Stop all playlists is in PAUSE or PLAY status.
  GetAllPlaylists = 8, // Get status of all currently playing playlists
  SetPlaylistIntensity = 9, // Output intensity (Master Fader) of the given playlist, persists until power cycle
  //GetPlaylistIntensity = 10, //Not implemented in S-Play Mini API
  //SetTrackIntensity = 11, //Not implemented in S-Play Mini API
  //GetTrackIntensity = 12, //Not implemented in S-Play Mini API
  CaptureDmxFrame = 13, // Static frame recording
  RecordDmxFrame = 14, // Dynamic frame recording
  StopRecord = 15, // Stop any recording
  SaveCue = 16, // Save cue state
  DeleteCue = 17, // Delete Cue by id
  UpdatePlaylist = 18, // Update/Create Playlist with json struct as gets from GET_PLAYLIST
  DeletePlaylist = 19, // Delete Playlist by id
  UpdateSetting = 20, // Update Setting by id
  GetSetting = 21, // Get Setting by id
  SetPlaylistTimePosition = 22, // Set playback position of a playlist
  //No idea how to test this, so I'm not going to implement it at present
  //SetWebsocketInput = 23, // Sets universe to monitor in Cue recording, use Universe number or WEBSOCKET_OUTPUT:NOTHING/ALL

  PlayCue = 25, // Play cue with given id
  PauseCue = 26, // Pause cue with given id
  StopCue = 27, // Stop playback of playing cue by given id
  GetCue = 28,
  GetAllCues = 29, // Get list of all cues
  ExitCueEdit = 30, // Frontend notifies on Cue editing finished
  DuplicateCue = 31, // Duplicate cue by given id
  //No idea how to test this, so I'm not going to implement it at present
  //UpdateStoragePath = 34, // Update storage path using internal DB check for BASE_PATH setting
  GetEvent = 36, // Get Event by id
  GetAllEvents = 37, // Get all existing Events
  UpdateEvent = 38, // Update/Create Event
  DeleteEvent = 39, // Delete Event by id
  GetTrigger = 40, // Get Trigger by id
  GetAllTriggers = 41, // Get all existing Triggers
  UpdateTrigger = 42, // Update/Create Trigger
  DeleteTrigger = 43, // Delete Trigger by id
  SendEvent = 44, // Send given event
  WaitTrigger = 45, // Add trigger to check
  CheckTrigger = 46, // Check if added trigger happen

  //UdpMessage = 50, // Not implemented in S-Play Mini API
  //OscMessage = 51, // Not implemented in S-Play Mini API

  GetMasterIntensity = 55, // Get overall S-Play output intensity (Master Fader), persists until power cycle
  SetMasterIntensity = 56, // Set overall S-Play output intensity (Master Fader), persists until power cycle
  //GetSchedules = 60, //Not implemented in S-Play Mini API
  //UpdateSchedule = 61, //Not implemented in S-Play Mini API
  //DeleteSchedule = 62, //Not implemented in S-Play Mini API
  //EnableSchedule = 63, //Not implemented in S-Play Mini API

  GetInterface = 70, // Get Iterface page by id or URL
  GetAllInterfaces = 71, // Get all created Interfaces
  UpdateInterface = 72, // Update/Create Interface page
  DeleteInterface = 73, // Delete Interface by id
  GetVersion = 80, // Get Engine version
  GetNetwork = 81, // Get network settings
  SetNetwork = 82, // Set network settings
  GetTime = 83, // Get system time, timezone and custom NTP server if used
  SetTime = 84, // Set system time, timezone and custom NTP server
  GetStorages = 85, // Get available storages (internal, sd, etc.)
  SetStorage = 86, // Set current storage from available
  //FactoryReset = 87, // Execute factory reset logic ..Not ready to test this, so not implemented :)
  //RefreshSetting = 254, //No idea what this is or how to test it, so I'm not going to implement it at present
}

export type CommandDefinitions = {
  [CommandType.Play]: { command: CommandType.Play; playlist_id: number };
  [CommandType.Pause]: { command: CommandType.Pause; playlist_id: number };
  [CommandType.Stop]: { command: CommandType.Stop; playlist_id: number };
  [CommandType.GetPlaylist]: {
    command: CommandType.GetPlaylist;
    playlist_id: number;
  };
  [CommandType.UpdatePlaylistsOrder]: {
    command: CommandType.UpdatePlaylistsOrder;
    orders: { playlist_id: number; order: number }[];
  };
  [CommandType.PlayAllPlaylists]: { command: CommandType.PlayAllPlaylists };
  [CommandType.PauseAllPlaylists]: { command: CommandType.PauseAllPlaylists };
  [CommandType.StopAllPlaylists]: { command: CommandType.StopAllPlaylists };
  [CommandType.GetAllPlaylists]: { command: CommandType.GetAllPlaylists };
  [CommandType.SetPlaylistIntensity]: {
    command: CommandType.SetPlaylistIntensity;
    playlist_id: number;
    intensity: number;
  };
  /* [CommandType.GetPlaylistIntensity]: {
    command: CommandType.GetPlaylistIntensity;
    playlist_id: number;
  };
  [CommandType.SetTrackIntensity]: {
    command: CommandType.SetTrackIntensity;
  };
  [CommandType.GetTrackIntensity]: {
    command: CommandType.GetTrackIntensity;
  }; */
  [CommandType.CaptureDmxFrame]: {
    command: CommandType.CaptureDmxFrame;
    cue_id: number;
    universe_type: UniverseType;
    universes: number[];
  };
  [CommandType.RecordDmxFrame]: {
    command: CommandType.RecordDmxFrame;
    cue_id: number;
    live_preview: boolean;
    loop: boolean;
    trigger: AnonymousTrigger;
    universe_type: UniverseType;
    universes: number[];
  };
  [CommandType.StopRecord]: { command: CommandType.StopRecord };
  [CommandType.SaveCue]: { command: CommandType.SaveCue; cue: Cue };
  [CommandType.DeleteCue]: { command: CommandType.DeleteCue; cue_id: number };
  [CommandType.UpdatePlaylist]: {
    command: CommandType.UpdatePlaylist;
    playlist: Omit<Playlist, 'playlist_id'> & { playlist_id?: number };
  };
  [CommandType.DeletePlaylist]: {
    command: CommandType.DeletePlaylist;
    playlist_id: number;
  };
  [CommandType.UpdateSetting]: {
    command: CommandType.UpdateSetting;
    setting: {
      setting_id: Setting;
      value: any; //Should be typed, but it's a pain. Use with caution
    };
  };
  [CommandType.GetSetting]: {
    command: CommandType.GetSetting;
    setting_id: Setting;
  };
  [CommandType.SetPlaylistTimePosition]: {
    command: CommandType.SetPlaylistTimePosition;
    playlist_id: number;
    position: number;
  };
  [CommandType.PlayCue]: {
    command: CommandType.PlayCue;
    cue: { cue_id: number } | AnonymousCue;
  };
  [CommandType.PauseCue]: { command: CommandType.PauseCue; cue_id: number };
  [CommandType.StopCue]: { command: CommandType.StopCue; cue_id: number };
  [CommandType.GetCue]: { command: CommandType.GetCue; cue_id: number };
  [CommandType.GetAllCues]: { command: CommandType.GetAllCues };
  [CommandType.ExitCueEdit]: { command: CommandType.ExitCueEdit };
  [CommandType.DuplicateCue]: {
    command: CommandType.DuplicateCue;
    cue_id: number;
  };
  [CommandType.GetEvent]: { command: CommandType.GetEvent; event_id: number };
  [CommandType.GetAllEvents]: { command: CommandType.GetAllEvents };
  [CommandType.UpdateEvent]: { command: CommandType.UpdateEvent; event: Event };
  [CommandType.DeleteEvent]: {
    command: CommandType.DeleteEvent;
    event_id: number;
  };
  [CommandType.GetTrigger]: {
    command: CommandType.GetTrigger;
    trigger_id: number;
  };
  [CommandType.GetAllTriggers]: { command: CommandType.GetAllTriggers };
  [CommandType.UpdateTrigger]: {
    command: CommandType.UpdateTrigger;
    trigger: Trigger;
  };
  [CommandType.DeleteTrigger]: {
    command: CommandType.DeleteTrigger;
    trigger_id: number;
  };
  [CommandType.SendEvent]: { command: CommandType.SendEvent; event: Event };
  [CommandType.WaitTrigger]: {
    command: CommandType.WaitTrigger;
    trigger: Trigger;
  };
  [CommandType.CheckTrigger]: { command: CommandType.CheckTrigger };
  /* [CommandType.UdpMessage]: {
    command: CommandType.UdpMessage;
    message: string;
  };
  [CommandType.OscMessage]: {
    command: CommandType.OscMessage;
    message: string;
  }; */
  [CommandType.GetMasterIntensity]: { command: CommandType.GetMasterIntensity };
  [CommandType.SetMasterIntensity]: {
    command: CommandType.SetMasterIntensity;
    intensity: number;
  };
  /* [CommandType.GetSchedules]: { command: CommandType.GetSchedules };  //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.UpdateSchedule]: {
    command: CommandType.UpdateSchedule;
    schedule: any;
  };  //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.DeleteSchedule]: {
    command: CommandType.DeleteSchedule;
    schedule_id: number;
  };  //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.EnableSchedule]: {
    command: CommandType.EnableSchedule;
    schedule_id: number;
    enable: boolean;
  };  //This command is not implemeted (in the S-Play Mini API, at least)*/
  [CommandType.GetInterface]: {
    command: CommandType.GetInterface;
    interface_id: number;
  };
  [CommandType.GetAllInterfaces]: { command: CommandType.GetAllInterfaces };
  [CommandType.UpdateInterface]: {
    command: CommandType.UpdateInterface;
    interface: Interface;
  };
  [CommandType.DeleteInterface]: {
    command: CommandType.DeleteInterface;
    interface_id: number;
  };
  [CommandType.GetVersion]: { command: CommandType.GetVersion };
  [CommandType.GetNetwork]: { command: CommandType.GetNetwork };
  [CommandType.SetNetwork]: { command: CommandType.SetNetwork; network: Network };
  [CommandType.GetTime]: { command: CommandType.GetTime };
  [CommandType.SetTime]: { command: CommandType.SetTime; time: any };
  [CommandType.GetStorages]: { command: CommandType.GetStorages };
  [CommandType.SetStorage]: { command: CommandType.SetStorage; storage: string };
  //[CommandType.FactoryReset]: { command: CommandType.FactoryReset };
  //[CommandType.RefreshSetting]: { command: CommandType.RefreshSetting }; //No idea what this is or how to test it, so I'm not going to implement it at present
};

type SplayCommand = CommandDefinitions[CommandType]; //This will create an error when there is not a definition for a command type

export type CommandResponses = {
  [CommandType.Play]: { result: true };
  [CommandType.Pause]: { result: true };
  [CommandType.Stop]: { result: true };
  [CommandType.GetPlaylist]: { playlist: Playlist };
  [CommandType.UpdatePlaylistsOrder]: { result: true };
  [CommandType.PlayAllPlaylists]: { result: true };
  [CommandType.PauseAllPlaylists]: { result: true };
  [CommandType.StopAllPlaylists]: { result: true };
  [CommandType.GetAllPlaylists]: { playlists: PartialPlaylist[] };
  [CommandType.SetPlaylistIntensity]: { result: true };
  //[CommandType.GetPlaylistIntensity]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.SetTrackIntensity]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.GetTrackIntensity]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.CaptureDmxFrame]: { result: true };
  [CommandType.RecordDmxFrame]: { result: true };
  [CommandType.StopRecord]: { result: true };
  [CommandType.SaveCue]: { cue: PartialCue; result: true };
  [CommandType.DeleteCue]: { result: true };
  [CommandType.UpdatePlaylist]: Playlist;
  [CommandType.DeletePlaylist]: { result: true };
  [CommandType.UpdateSetting]: { result: true };
  [CommandType.GetSetting]: { result: true; setting: string };
  [CommandType.SetPlaylistTimePosition]: { result: true };
  [CommandType.PlayCue]: { result: true };
  [CommandType.PauseCue]: { result: true };
  [CommandType.StopCue]: { result: true };
  [CommandType.GetCue]: { result: true; cue: Cue };
  [CommandType.GetAllCues]: {
    cues: { cue_id: number; duration: number; name: number; type: CueType }[];
    result: true;
  };
  [CommandType.ExitCueEdit]: { result: true };
  [CommandType.DuplicateCue]: { cue: PartialCue; result: true };
  [CommandType.GetEvent]: { event: Event };
  [CommandType.GetAllEvents]: { events: Event[] };
  [CommandType.UpdateEvent]: { result: true; event: Event };
  [CommandType.DeleteEvent]: { result: true };
  [CommandType.GetAllTriggers]: { triggers: Trigger[] };
  [CommandType.GetTrigger]: { trigger: Trigger };
  [CommandType.UpdateTrigger]: { result: true; trigger: Trigger };
  [CommandType.DeleteTrigger]: { result: true };
  [CommandType.SendEvent]: { result: true };
  [CommandType.WaitTrigger]: { result: true };
  [CommandType.CheckTrigger]: { result: boolean };
  //[CommandType.UdpMessage]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.OscMessage]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.GetMasterIntensity]: { intensity: number; result: true };
  [CommandType.SetMasterIntensity]: { result: true };
  //[CommandType.GetSchedules]: { schedules: any[] }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.UpdateSchedule]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.DeleteSchedule]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.EnableSchedule]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  [CommandType.GetInterface]: { interface: Interface };
  [CommandType.GetAllInterfaces]: { interfaces: Interface[]; result: true };
  [CommandType.UpdateInterface]: { result: true; interface: Interface };
  [CommandType.DeleteInterface]: { result: true };
  [CommandType.GetVersion]: { result: true; version: string };
  [CommandType.GetNetwork]: { network: Network; result: true };
  [CommandType.SetNetwork]: { result: true };
  [CommandType.GetTime]: { time: [null] };
  [CommandType.SetTime]: { result: true };
  [CommandType.GetStorages]: {
    result: true;
    storages: { available: Storage[]; selected: string };
  };
  [CommandType.SetStorage]: { result: true };
  //[CommandType.FactoryReset]: { result: true }; //This command is not implemeted (in the S-Play Mini API, at least)
  //[CommandType.RefreshSetting]: { result: true }; //No idea what this is or how to test it, so I'm not going to implement it at present
};

type SplayResponse = CommandResponses[CommandType]; //This will create an error when there is not a definition for a command response