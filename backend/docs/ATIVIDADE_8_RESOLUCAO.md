# Resolução Técnica - Atividade 8: Modelagem de Dados

Este documento apresenta o diagnóstico e os artefatos de modelagem lógica resultantes do processo de normalização do banco de dados.

---

## Bloco 1 - Fundamentos de Normalização

### 1. Tabela de Matrículas (Diagnóstico 1FN)
* **Tarefa A (Identificação):** A tabela viola a **Primeira Forma Normal (1FN)** devido à presença de atributos multivalorados (as colunas `disciplinas` e `professores` armazenam listas de valores separados por vírgula em uma única célula).
* **Tarefa B (Atomicidade):** Um atributo é **atômico** quando representa a menor unidade indivisível de informação para o domínio do negócio. O modelo original falha porque misturar múltiplos dados impede que o SGDB realize buscas diretas, indexações eficientes ou filtros nativos por disciplina ou professor.
* **Tarefa C (Tabela Reconstruída em 1FN):**

| matricula_id | aluno_nome | disciplina | professor |
| :--- | :--- | :--- | :--- |
| 1 | Ana Lima | Cálculo | Prof. João |
| 1 | Ana Lima | Física | Prof. Marta |
| 1 | Ana Lima | Programação | Prof. Carlos |
| 2 | Pedro Souza | Cálculo | Prof. João |
| 2 | Pedro Souza | Química | Prof. Sara |

### 2. Tabela de Vendas (Diagnóstico 3FN)
* **Tarefa A (Cadeia de Dependência):** Configura-se uma dependência transitiva onde o atributo não-chave `gerente_depto` depende de outro atributo não-chave (`departamento`), que por sua vez depende da Chave Primária:
  $$\text{venda\_id (PK)} \rightarrow \text{departamento} \rightarrow \text{gerente\_depto}$$
* **Tarefa B (Anomalia Prática):** Caso o gerente de um departamento seja alterado, o banco precisará executar uma operação de `UPDATE` massiva em milhões de registros históricos de vendas. Isso causará travamento de tabelas (*table lock*), degradação de performance e alto risco de inconsistência de dados (registros antigos apontando para gerentes errados).
* **Tarefa C (Schema Final Normalizado):**
  * `tb_departamentos`: `id_depto` (PK) | `nome_depto` | `gerente_nome`
  * `tb_vendedores`: `id_vendedor` (PK) | `vendedor_nome` | `id_depto` (FK)
  * `tb_vendas`: `venda_id` (PK) | `id_vendedor` (FK) | `valor_venda`

---

## Bloco 2 - Normalização em Cadeia

### 3. Sistema de Restaurante
Após a aplicação sequencial das três formas normais, a estrutura foi decomposta para mitigar dependências parciais e transitivas:

* **`tb_garcons`**: `id_garcom` (PK), `garcom_nome`, `garcom_turno`
* **`tb_pedidos`**: `pedido_id` (PK), `mesa`, `id_garcom` (FK)
* **`tb_produtos`**: `id_produto` (PK), `nome_produto`, `preco`
* **`tb_itens_pedido`**: `pedido_id` (FK), `id_produto` (FK), `quantidade` *(Chave primária composta por ambas FKs)*

> #### 💡 Desafio Master: O Campo Total
> **Decisão de Engenharia:** O valor total do pedido **não deve ser armazenado**, devendo ser **calculado em tempo real via Query SQL** (utilizando `SUM(quantidade * preco)`).
> **Justificativa:** Armazenar este valor geraria um dado derivado redundante que violaria a 3FN. Se o preço de um produto mudar na tabela base, ou se itens forem removidos, o total estático ficaria defasado, gerando graves anomalias financeiras e contábeis.

---

## Bloco 3 - Diagnóstico de Engenharia

### 4. Gestão de Biblioteca (Conceito de 2FN)
* **Tarefa A (Dependências):** A tabela possui dependências parciais: `titulo_livro` e `isbn` dependem unicamente de `livro_id`, enquanto `usuario_email` depende apenas de `usuario_id`. Nenhum deles requer a composição total da chave `[livro_id, usuario_id]`.
* **Tarefa B (Anomalia de Inserção):** É impossível cadastrar um livro recém-adquirido pela biblioteca no sistema enquanto **nenhum usuário realizar o primeiro empréstimo dele**, pois as colunas da chave primária composta referentes ao usuário não aceitariam valores nulos (`NULL`).
* **Tarefa C (Schema Final):**
  * `tb_livros`: `livro_id` (PK), `titulo_livro`, `isbn`
  * `tb_usuarios`: `usuario_id` (PK), `usuario_email`
  * `tb_emprestimos`: `id_emprestimo` (PK), `livro_id` (FK), `usuario_id` (FK), `data_emprestimo`

### 5. DESAFIO MASTER: Sistema de Clínica
* **Tarefa 1 (Detecção de Violações):**
  * **1FN:** A coluna `procedimentos` possui dados multivalorados aglutinados.
  * **2FN:** Os campos `paciente_nome`, `plano_saude` e `plano_cobertura` dependem apenas de parte de uma chave conceitual do paciente, não da consulta.
  * **3FN:** `plano_cobertura` possui dependência transitiva com `plano_saude`. O mesmo ocorre com `especialidade`, que depende de `medico_crm`.
* **Tarefa 2 (Modelagem 3FN):**
  1. `tb_planos`: `id_plano` (PK), `plano_saude`, `plano_cobertura`
  2. `tb_pacientes`: `id_paciente` (PK), `paciente_nome`, `paciente_cpf`, `id_plano` (FK)
  3. `tb_especialidades`: `id_especialidade` (PK), `nome_especialidade`
  4. `tb_medicos`: `medico_crm` (PK), `medico_nome`, `id_especialidade` (FK)
  5. `tb_salas`: `sala_numero` (PK), `sala_andar`
  6. `tb_consultas`: `consulta_id` (PK), `id_paciente` (FK), `medico_crm` (FK), `sala_numero` (FK), `data_hora`
  7. `tb_procedimentos_consulta`: `consulta_id` (FK), `nome_procedimento` (PK/FK composta)
* **Tarefa 3 (Impacto Arquitetural):** Em caso de mudanças contratuais em um plano de saúde, a alteração é efetuada em **uma única linha** dentro da tabela `tb_planos`. No modelo desnormalizado anterior, seria necessária uma varredura custosa em todo o histórico de consultas da clínica, correndo o risco de corromper auditorias e dados passados.