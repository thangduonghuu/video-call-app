export type RoomMeeting = {
  socketId: any;
  username: string;
  avatarUrl: string;
  MemberInRoom: Array<Members>;
  video: boolean;
  audio: boolean;
  loadding: boolean;
};
export type Members = {
  RoomJoin: string;
  idUser: string;
  peerId: string;
};
