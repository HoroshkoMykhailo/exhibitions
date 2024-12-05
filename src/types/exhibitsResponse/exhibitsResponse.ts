import { Exhibit } from "../types";

export interface ExhibitsResponse {
  exhibits: Exhibit[];
  total: number;
  page: number;
  lastPage: number;
}
