import type { ApiResponse } from "~/types";

export interface Fornecedor {
  codfor: string;
  fornecedor: string;
  fanta: string;
  status: string;
  cidade: string;
  uf: string;
  celular: string;
  tel3: string;
  data: string;
  fone: string;
  email: string;
  ende: string;
  categoria: string;
  oco2: string;
  tf: string;
  comp: string;
  ultima_carga: string;
  latitude: string;
  longitude: string;
  latlong: boolean;
}

export type FornecedorMapItem = Pick<
  Fornecedor,
  | "fornecedor"
  | "cidade"
  | "ultima_carga"
  | "status"
  | "latitude"
  | "longitude"
  | "latlong"
  | "fanta"
>;

export interface FornecedorResponse extends ApiResponse<Fornecedor[]> {
  data: Fornecedor[];
}
