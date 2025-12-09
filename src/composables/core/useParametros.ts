/**
 * Composable useParametros - Verificação de Parâmetros do Sistema
 *
 * Fornece API simples para verificar parâmetros do sistema.
 *
 * Uso nos componentes:
 * ```ts
 * const { parametro, parametros } = useParametros()
 *
 * // Verificar se parâmetro está ativo
 * if (parametro('fretebal')) { ... }
 *
 * // Obter valor numérico
 * const inicio = parametro('comp_ini') // retorna number
 * ```
 */

import { useAuthStore } from "~/layers/login/stores/auth";
import type { Parametros } from "@/types/auth";

export const useParametros = () => {
  const authStore = useAuthStore();

  /**
   * Objeto com todos os parâmetros do usuário
   */
  const parametros = computed<Partial<Parametros>>(() => {
    return (authStore.user?.parametros as Partial<Parametros>) ?? {};
  });

  /**
   * Obtém o valor de um parâmetro específico
   * Retorna undefined se o parâmetro não existir
   */
  const parametro = <K extends keyof Parametros>(
    nome: K
  ): Parametros[K] | undefined => {
    return parametros.value[nome];
  };

  /**
   * Verifica se um parâmetro booleano está ativo (true)
   * Retorna false se o parâmetro não existir ou for false
   */
  const parametroAtivo = (nome: keyof Parametros): boolean => {
    const valor = parametros.value[nome];
    return valor === true;
  };

  /**
   * Verifica se TODOS os parâmetros informados estão ativos
   */
  const todosParametrosAtivos = (nomes: (keyof Parametros)[]): boolean => {
    return nomes.every((nome) => parametroAtivo(nome));
  };

  /**
   * Verifica se ALGUM dos parâmetros informados está ativo
   */
  const algumParametroAtivo = (nomes: (keyof Parametros)[]): boolean => {
    return nomes.some((nome) => parametroAtivo(nome));
  };

  return {
    parametros,
    parametro,
    parametroAtivo,
    todosParametrosAtivos,
    algumParametroAtivo,
  };
};
