import http from "http";
import { WebSocket } from "ws";
import { ByteBuffer } from "flatbuffers";
import { SPlayControl } from "./flatbuffers/token";
import {
  AnonymousCue,
  AnonymousTrigger,
  CommandDefinitions,
  CommandResponses,
  CommandType,
  Cue,
  Playlist,
  Setting,
  UniverseType,
  Event,
  Trigger,
  Interface,
  Network,
} from "./types";

const TIMEOUT = 2000;

type updatePlaylist = Omit<Playlist, "playlist_id"> & { playlist_id?: number };

export default class Splay {
  constructor(readonly url: string, readonly verbose?: boolean) {
    const x = CommandType.Play;
  }

  play(playlist_id: number) {
    return this._sendCommand({
      command: CommandType.Play,
      playlist_id,
    }) as Promise<CommandResponses[CommandType.Play]>;
  }

  pause(playlist_id: number) {
    return this._sendCommand({
      command: CommandType.Pause,
      playlist_id,
    }) as Promise<CommandResponses[CommandType.Pause]>;
  }

  stop(playlist_id: number) {
    return this._sendCommand({
      command: CommandType.Stop,
      playlist_id,
    }) as Promise<CommandResponses[CommandType.Stop]>;
  }

  getPlaylist(playlist_id: number) {
    return this._sendCommand({
      command: CommandType.GetPlaylist,
      playlist_id,
    }) as Promise<CommandResponses[CommandType.GetPlaylist]>;
  }

  updatePlaylistsOrder(orders: { playlist_id: number; order: number }[]) {
    return this._sendCommand({
      command: CommandType.UpdatePlaylistsOrder,
      orders,
    }) as Promise<CommandResponses[CommandType.UpdatePlaylist]>;
  }

  playAllPlaylists() {
    return this._sendCommand({
      command: CommandType.PlayAllPlaylists,
    }) as Promise<CommandResponses[CommandType.PlayAllPlaylists]>;
  }

  pauseAllPlaylists() {
    return this._sendCommand({
      command: CommandType.PauseAllPlaylists,
    }) as Promise<CommandResponses[CommandType.PauseAllPlaylists]>;
  }

  stopAllPlaylists() {
    return this._sendCommand({
      command: CommandType.StopAllPlaylists,
    }) as Promise<CommandResponses[CommandType.StopAllPlaylists]>;
  }

  getAllPlaylists() {
    return this._sendCommand({
      command: CommandType.GetAllPlaylists,
    }) as Promise<CommandResponses[CommandType.GetAllPlaylists]>;
  }

  setPlaylistIntensity(playlist_id: number, intensity: number) {
    return this._sendCommand({
      command: CommandType.SetPlaylistIntensity,
      playlist_id,
      intensity,
    }) as Promise<CommandResponses[CommandType.SetPlaylistIntensity]>;
  }

  captureDmxFrame(
    cue_id: number,
    universe_type: UniverseType,
    universes: number[]
  ) {
    return this._sendCommand({
      command: CommandType.CaptureDmxFrame,
      cue_id,
      universe_type,
      universes,
    }) as Promise<CommandResponses[CommandType.CaptureDmxFrame]>;
  }

  recordDmxFrame(
    cue_id: number,
    live_preview: boolean,
    loop: boolean,
    trigger: AnonymousTrigger,
    universe_type: UniverseType,
    universes: number[]
  ) {
    return this._sendCommand({
      command: CommandType.RecordDmxFrame,
      cue_id,
      live_preview,
      loop,
      trigger,
      universe_type,
      universes,
    }) as Promise<CommandResponses[CommandType.RecordDmxFrame]>;
  }

  stopRecord() {
    return this._sendCommand({
      command: CommandType.StopRecord,
    }) as Promise<CommandResponses[CommandType.StopRecord]>;
  }

  saveCue(cue: Cue) {
    return this._sendCommand({
      command: CommandType.SaveCue,
      cue,
    }) as Promise<CommandResponses[CommandType.SaveCue]>;
  }

  deleteCue(cue_id: number) {
    return this._sendCommand({
      command: CommandType.DeleteCue,
      cue_id,
    }) as Promise<CommandResponses[CommandType.DeleteCue]>;
  }

  updatePlaylist(playlist: updatePlaylist) {
    return this._sendCommand({
      command: CommandType.UpdatePlaylist,
      playlist,
    }) as Promise<CommandResponses[CommandType.UpdatePlaylist]>;
  }

  deletePlaylist(playlist_id: number) {
    return this._sendCommand({
      command: CommandType.DeletePlaylist,
      playlist_id,
    }) as Promise<CommandResponses[CommandType.DeletePlaylist]>;
  }

  /**
   * Updates a specific setting in the S-Play
   *
   * @param {enum} setting - The setting to update.
   * @param {Setting} setting.setting_id - The ID of the setting to update.
   * @param {any} setting.value - The new value for the setting. Be careful with the type. (And with everything here)
   * @returns {Promise<CommandResponses[CommandType.UpdateSetting]>} - A promise that resolves with the response of the update setting command.
   */
  updateSetting(setting: { setting_id: Setting; value: any /* be careful */ }) {
    return this._sendCommand({
      command: CommandType.UpdateSetting,
      setting,
    }) as Promise<CommandResponses[CommandType.UpdateSetting]>;
  }

  getSetting(setting_id: Setting) {
    return this._sendCommand({
      command: CommandType.GetSetting,
      setting_id,
    }) as Promise<CommandResponses[CommandType.GetSetting]>;
  }

  setPlaylistTimePosition(playlist_id: number, position: number) {
    return this._sendCommand({
      command: CommandType.SetPlaylistTimePosition,
      playlist_id,
      position,
    }) as Promise<CommandResponses[CommandType.SetPlaylistTimePosition]>;
  }

  playCue(cue: { cue_id: number } | AnonymousCue) {
    return this._sendCommand({
      command: CommandType.PlayCue,
      cue,
    }) as Promise<CommandResponses[CommandType.PlayCue]>;
  }

  pauseCue(cue_id: number) {
    return this._sendCommand({
      command: CommandType.PauseCue,
      cue_id,
    }) as Promise<CommandResponses[CommandType.PauseCue]>;
  }

  stopCue(cue_id: number) {
    return this._sendCommand({
      command: CommandType.StopCue,
      cue_id,
    }) as Promise<CommandResponses[CommandType.StopCue]>;
  }

  getCue(cue_id: number) {
    return this._sendCommand({
      command: CommandType.GetCue,
      cue_id,
    }) as Promise<CommandResponses[CommandType.GetCue]>;
  }

  getAllCues() {
    return this._sendCommand({
      command: CommandType.GetAllCues,
    }) as Promise<CommandResponses[CommandType.GetAllCues]>;
  }

  exitCueEdit() {
    return this._sendCommand({
      command: CommandType.ExitCueEdit,
    }) as Promise<CommandResponses[CommandType.ExitCueEdit]>;
  }

  duplicateCue(cue_id: number) {
    return this._sendCommand({
      command: CommandType.DuplicateCue,
      cue_id,
    }) as Promise<CommandResponses[CommandType.DuplicateCue]>;
  }

  getEvent(event_id: number) {
    return this._sendCommand({
      command: CommandType.GetEvent,
      event_id,
    }) as Promise<CommandResponses[CommandType.GetEvent]>;
  }

  getAllEvents() {
    return this._sendCommand({
      command: CommandType.GetAllEvents,
    }) as Promise<CommandResponses[CommandType.GetAllEvents]>;
  }

  updateEvent(event: Event) {
    return this._sendCommand({
      command: CommandType.UpdateEvent,
      event,
    }) as Promise<CommandResponses[CommandType.UpdateEvent]>;
  }

  deleteEvent(event_id: number) {
    return this._sendCommand({
      command: CommandType.DeleteEvent,
      event_id,
    }) as Promise<CommandResponses[CommandType.DeleteEvent]>;
  }

  getTrigger(trigger_id: number) {
    return this._sendCommand({
      command: CommandType.GetTrigger,
      trigger_id,
    }) as Promise<CommandResponses[CommandType.GetTrigger]>;
  }

  getAllTriggers() {
    return this._sendCommand({
      command: CommandType.GetAllTriggers,
    }) as Promise<CommandResponses[CommandType.GetAllTriggers]>;
  }

  updateTrigger(trigger: Trigger) {
    return this._sendCommand({
      command: CommandType.UpdateTrigger,
      trigger,
    }) as Promise<CommandResponses[CommandType.UpdateTrigger]>;
  }

  deleteTrigger(trigger_id: number) {
    return this._sendCommand({
      command: CommandType.DeleteTrigger,
      trigger_id,
    }) as Promise<CommandResponses[CommandType.DeleteTrigger]>;
  }

  sendEvent(event: Event) {
    return this._sendCommand({
      command: CommandType.SendEvent,
      event,
    }) as Promise<CommandResponses[CommandType.SendEvent]>;
  }

  waitTrigger(trigger: Trigger) {
    return this._sendCommand({
      command: CommandType.WaitTrigger,
      trigger,
    }) as Promise<CommandResponses[CommandType.WaitTrigger]>;
  }

  checkTrigger() {
    return this._sendCommand({
      command: CommandType.CheckTrigger,
    }) as Promise<CommandResponses[CommandType.CheckTrigger]>;
  }

  getMasterIntensity() {
    return this._sendCommand({
      command: CommandType.GetMasterIntensity,
    }) as Promise<CommandResponses[CommandType.GetMasterIntensity]>;
  }

  setMasterIntensity(intensity: number) {
    return this._sendCommand({
      command: CommandType.SetMasterIntensity,
      intensity,
    }) as Promise<CommandResponses[CommandType.SetMasterIntensity]>;
  }

  getInterface(interface_id: number) {
    return this._sendCommand({
      command: CommandType.GetInterface,
      interface_id,
    }) as Promise<CommandResponses[CommandType.GetInterface]>;
  }

  getAllInterfaces() {
    return this._sendCommand({
      command: CommandType.GetAllInterfaces,
    }) as Promise<CommandResponses[CommandType.GetAllInterfaces]>;
  }

  updateInterface(splayInterface: Interface) {
    return this._sendCommand({
      command: CommandType.UpdateInterface,
      interface: splayInterface,
    }) as Promise<CommandResponses[CommandType.UpdateInterface]>;
  }

  deleteInterface(interface_id: number) {
    return this._sendCommand({
      command: CommandType.DeleteInterface,
      interface_id,
    }) as Promise<CommandResponses[CommandType.DeleteInterface]>;
  }

  getVersion() {
    return this._sendCommand({
      command: CommandType.GetVersion,
    }) as Promise<CommandResponses[CommandType.GetVersion]>;
  }

  getNetwork() {
    return this._sendCommand({
      command: CommandType.GetNetwork,
    }) as Promise<CommandResponses[CommandType.GetNetwork]>;
  }

  setNetwork(network: Network) {
    return this._sendCommand({
      command: CommandType.SetNetwork,
      network,
    }) as Promise<CommandResponses[CommandType.SetNetwork]>;
  }

  getTime() {
    return this._sendCommand({
      command: CommandType.GetTime,
    }) as Promise<CommandResponses[CommandType.GetTime]>;
  }

  setTime(time: any) {
    return this._sendCommand({
      command: CommandType.SetTime,
      time,
    }) as Promise<CommandResponses[CommandType.SetTime]>;
  }

  getStorages() {
    return this._sendCommand({
      command: CommandType.GetStorages,
    }) as Promise<CommandResponses[CommandType.GetStorages]>;
  }

  setStorage(storage: string) {
    return this._sendCommand({
      command: CommandType.SetStorage,
      storage,
    }) as Promise<CommandResponses[CommandType.SetStorage]>;
  }

  private _sendCommand<T extends CommandType>(
    command: CommandDefinitions[T],
    token?: string
  ): Promise<CommandResponses[T]> {
    if (!token) {
      return this._getToken().then((token) => {
        return this._sendCommand(command, token);
      });
    } else {
      return new Promise((res, rej) => {
        let timedOut = false;
        const to = setTimeout(() => {
          timedOut = true;
          rej("S-Play error: Http API server timed out");
        }, TIMEOUT);
        const data = JSON.stringify(command);
        const options = {
          hostname: this.url,
          port: 55555,
          path: "/api",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
            Authorization: token,
          },
        } as http.RequestOptions;
        if (this.verbose) {
          console.log("Opening http API request");
        }
        const req = http.request(options, (resp) => {
          resp.setEncoding("utf8");
          let responseData = "";

          resp.on("data", (chunk) => {
            if (this.verbose) {
              console.log(`Received http data chunk: ${chunk}`);
            }
            if (timedOut) return;
            responseData += chunk;
          });

          resp.on("end", () => {
            if (this.verbose) {
              console.log("Received end of http data");
            }
            if (timedOut) return;
            try {
              const parsed = JSON.parse(responseData);
              if (this.verbose)
                console.log(`Parsed: ${JSON.stringify(parsed)}`);
              if (parsed && typeof parsed === "object") {
                if (parsed.result === undefined || parsed.result === true) {
                  res(parsed as CommandResponses[T]);
                } else {
                  if (parsed.error) {
                    rej(`S-Play Error: ${parsed.error}`);
                  } else rej(`S-Play Error. Data: ${responseData}`);
                }
              } else {
                rej(`Bad data format from S-Play: ${responseData}`);
              }
            } catch (err) {
              rej(`Error parsing JSON from S-Play`);
            }
          });
        });

        req.on("error", (e) => {
          rej(`Problem with request: ${e.message}`);
        });

        if (this.verbose) {
          console.log("Writing data to http API request");
        }
        req.write(data);
        req.end();
      });
    }
  }

  private _getToken(): Promise<string> {
    return new Promise((res, rej) => {
      let ws: WebSocket | null = null;
      let timedOut = false;
      const to = setTimeout(() => {
        timedOut = true;
        if (ws) {
          try {
            ws.close();
          } catch (err) {}
        }
        rej("S-Play error: Websocket timed out");
      }, TIMEOUT);
      if (this.verbose) {
        console.log("Starting S-Play websocket");
      }
      ws = new WebSocket(`ws://${this.url}:55555`, {
        headers: {
          Connection: "Upgrade",
          Upgrade: "websocket",
          "Sec-WebSocket-Key": "dGhlIHNhbXBsZSBub25jZQ==",
          "Sec-WebSocket-Version": "13",
        },
      });

      ws.on("open", () => {
        if (this.verbose) {
          console.log(`WebSocket connection opened`);
        }
      });

      ws.on("message", (data) => {
        if (this.verbose) {
          console.log(`WebSocket message received: ${data}`);
        }
        if (timedOut) return;
        if (Buffer.isBuffer(data)) {
          if (this.verbose) {
            console.log(`WebSocket message is Buffer`);
          }
          const bytes = new Uint8Array(data);
          const bb = new ByteBuffer(bytes);
          const message = SPlayControl.Message.getRootAsMessage(bb);
          const token = message.header()?.token();

          //Assume uniform token messages:
          //const stringLength = data.readUInt32LE(40);
          //const token = data.subarray(44, 44 + stringLength).toString();
          //(It appears to be coincidence that the starting byte and the length are both 44)
          ws.close();
          clearTimeout(to);
          if (token) {
            if (this.verbose) {
              console.log(`Token received: ${token}`);
            }
            res(token);
          } else {
            rej(
              "Websocket message expected to be flatbuffer with token, but was not"
            );
          }
        } else {
          ws.close();
          clearTimeout(to);
          rej(
            "Websocket message expected to be buffer with token, but was not buffer"
          );
        }
      });

      ws.on("error", (error) => {
        ws.close();
        clearTimeout(to);
        rej(`WebSocket error: ${error.message}`);
      });

      ws.on("close", () => {
        if (this.verbose) console.log("WebSocket connection closed");
      });
    });
  }
}
