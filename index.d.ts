// export interface Config

interface Config {
  host: string;
  port: number;
  nick: string;
  username: string;
  password: string;
  tls: boolean;
  auto_reconnect?: boolean;
  auto_reconnect_wait?: number;
  auto_reconnect_max_retries?: number;
}

interface Channel {
  join(): void;
}

interface Message {
  type: 'notice' | 'privmsg' | 'action';
  nick: string;
  hostname: string;
  group: any;
  tags: any;
  time: undefined | string;
  account: any;
  message: string;
  target: string;
  host: string;
  reply(text: string): void;
}

declare module 'irc-framework' {
  class Client {
    connect(config: Config): void;
    channel(name: string): Channel;
    on(event: 'message', cb: (event: Message) => void): void;
    on(event: 'registered', cb: () => void): void;
    on(event: 'connected', cb: () => void): void;
  }
}
