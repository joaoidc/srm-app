import type { FornecedorResponse } from "../types/fornecedores";

export const useFornecedorService = () => {
  const api = useMainApi(true);
  const authStore = useAuthStore();

  const fetchFornecedor = () => {
    return useAsyncData<FornecedorResponse>("fornecedor", () =>
      api("/sygecom/chameleon-mode/SRM_GET_FORNECEDORES", {
        method: "POST",
      })
    );
  };

  return {
    fetchFornecedor,
  };
};
