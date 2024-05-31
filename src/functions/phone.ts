
export const insertMaskPhone = (cpf: string) => {
  return cpf.replace(/\(\d{2}\)\s*\d{5}-\d{4}/g, '($1) $2-$3');
}