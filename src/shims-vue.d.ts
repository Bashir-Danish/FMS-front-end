declare module "*.vue";


  declare interface ImportMeta {
    env: {
      BASE_URL: string;
   
    };
  }
  

  declare module 'epic-spinners' {
    export const RadarSpinner: {
      new (props: {
        size?: number;
        color?: string;
        animationDuration?: number;
      }): any; 
    };
  }
  