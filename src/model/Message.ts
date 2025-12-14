export default interface Message {
  text: string;
  sender: 'USER' | 'BOT';
  timestamp: Date;
}