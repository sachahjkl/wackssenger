export default interface Message {
  uuid: string;
  userUUID: string;
  sentAt: Date;
  content: string;
}
