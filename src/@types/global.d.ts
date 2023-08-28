declare module '.jpg';
declare module '.svg';
declare module '.png';
declare module 'url:*' {
  export default string;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface NavListObject {
  label: string;
  route: string;
  shadow: string;
}

declare interface filterOptionListObject {
  label: string;
  value: string;
}
