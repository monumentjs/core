export interface ResourceConfiguration {
  baseUrl: string;
  get?: {
    path: string
  };
  delete?: {
    path: string
  };
}
