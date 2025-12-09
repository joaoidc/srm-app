/**
 * Composable usePermissoes - Verificação de Permissões
 */

import { useAuthStore } from "~/layers/login/stores/auth";
import type { Permissao } from "@/types/auth";

export const usePermissoes = () => {
  const authStore = useAuthStore();

  /**
   * Lista de permissões do usuário
   */
  const permissoes = computed<Permissao[]>(() => {
    return (authStore.user?.permissoes as Permissao[]) ?? [];
  });

  /**
   * Verifica se o usuário tem uma permissão pelo alias
   */
  const temPermissao = (alias: string): boolean => {
    const permissao = permissoes.value.find((p) => p.alias === alias);
    return permissao?.acessoPermitido ?? false;
  };

  /**
   * Verifica se o usuário tem uma permissão pelo ID da função
   */
  const temPermissaoPorId = (idfuncao: number): boolean => {
    const permissao = permissoes.value.find((p) => p.idfuncao === idfuncao);
    return permissao?.acessoPermitido ?? false;
  };

  /**
   * Verifica se o usuário tem TODAS as permissões informadas
   */
  const temTodasPermissoes = (aliases: string[]): boolean => {
    return aliases.every((alias) => temPermissao(alias));
  };

  /**
   * Verifica se o usuário tem ALGUMA das permissões informadas
   */
  const temAlgumaPermissao = (aliases: string[]): boolean => {
    return aliases.some((alias) => temPermissao(alias));
  };

  return {
    permissoes,
    temPermissao,
    temPermissaoPorId,
    temTodasPermissoes,
    temAlgumaPermissao,
  };
};
