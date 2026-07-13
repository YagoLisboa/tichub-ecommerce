# Atividade 8: Engenharia e Modelagem de Dados - Enunciado

## Objetivo
Análise, diagnóstico e aplicação prática das Formas Normais (1FN, 2FN e 3FN) para eliminação de redundâncias, anomalias de alteração e garantia da integridade referencial em sistemas de banco de dados relacionais.

---

## Bloco 1 - Fundamentos de Normalização

### 1. Tabela de Matrículas (Diagnóstico 1FN)
Dada a tabela original de matrículas contendo dados agrupados e strings separadas por vírgula nas colunas de disciplinas e professores:
* **Tarefa A:** Identificar qual regra da Primeira Forma Normal (1FN) está sendo violada.
* **Tarefa B:** Explicar o conceito de atributo atômico e o motivo de a tabela falhar nesse critério.
* **Tarefa C:** Apresentar a tabela reconstruída e normalizada na 1FN.

### 2. Tabela de Vendas (Diagnóstico 3FN)
Dada a tabela de vendas onde `venda_id` determina o `departamento`, e o `departamento` determina o `gerente_depto`:
* **Tarefa A:** Demonstrar a cadeia de dependência transitiva existente.
* **Tarefa B:** Explicar uma anomalia prática que aconteceria ao atualizar o gerente de um departamento com milhões de registros.
* **Tarefa C:** Projetar o schema final dividido em 3 tabelas normalizadas.

---

## Bloco 2 - Normalização em Cadeia

### 3. Sistema de Restaurante
Dada uma tabela "flat" de pedidos contendo dados misturados de mesas, garçons, turnos, itens e preços:
* **Tarefa:** Aplicar a normalização em cadeia (1FN -> 2FN -> 3FN) gerando o schema final de tabelas.
* **Desafio:** Resolver a questão do campo `total` do pedido (se deve ser armazenado ou calculado em tempo real).

---

## Bloco 3 - Diagnóstico de Engenharia

### 4. Gestão de Biblioteca (Conceito de 2FN)
Dada uma tabela de controle de empréstimos com chave primária composta `[livro_id, usuario_id]`:
* **Tarefa A:** Identificar as dependências parciais que violam a 2FN.
* **Tarefa B:** Descrever uma anomalia de inserção presente neste modelo.
* **Tarefa C:** Apresentar o schema final normalizado.

### 5. DESAFIO MASTER: Sistema de Clínica
Dada uma tabela desnormalizada contendo dados de consultas, pacientes, médicos, especialidades, salas e procedimentos:
* **Tarefa 1:** Listar detalhadamente todas as violações de 1FN, 2FN e 3FN.
* **Tarefa 2:** Projetar o ecossistema de tabelas final em 3FN.
* **Tarefa 3:** Explicar o impacto positivo na manutenção caso a cobertura de um plano de saúde mude.