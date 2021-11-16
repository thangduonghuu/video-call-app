export type RoomMeeting = {
  socketId: any;
  username: string;
  MemberInRoom: Array<Members>;
  loadding: true;
};
export type Members = {
  RoomJoin: string;
  idUser: string;
  peerId: string;
};
