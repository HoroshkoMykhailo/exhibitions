import { Exhibit } from "../types";

export interface ExhibitsResponse {
  data: Exhibit[];
  total: number;
  page: number;
  lastPage: number;
}
