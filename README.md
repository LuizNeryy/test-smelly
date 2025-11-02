# Test Smells - Refatoração de Testes# Laboratório de Test Smells - Gerenciador de Usuários



Projeto para demonstrar a identificação e correção de Test Smells utilizando análise estática com ESLint.Este repositório serve como base para o trabalho prático sobre **Test Smells** na disciplina de Teste de Software. Ele contém uma suíte de testes que, apesar de passar, está repleta de "maus cheiros" (smells) que comprometem sua qualidade, manutenibilidade e eficácia.



## Estrutura do Projeto## Contexto do Projeto



```Imagine que você foi contratado(a) como Engenheiro(a) de Qualidade de Software em uma equipe que está desenvolvendo um serviço de gerenciamento de usuários (`UserService`).

test-smelly/

├── src/A suíte de testes em `__tests__/userService.smelly.test.js` foi escrita por um desenvolvedor que se concentrou apenas em fazer os testes passarem, sem se preocupar com boas práticas. O resultado é um código de teste frágil, obscuro e difícil de manter.

│   └── userService.js               # Serviço de gerenciamento de usuários

├── test/Sua missão é analisar, diagnosticar e refatorar essa suíte de testes, transformando-a em um exemplo de código de teste limpo e robusto.

│   ├── userService.smelly.test.js   # Testes com smells (original)

│   └── userService.clean.test.js    # Testes refatorados (limpos)## Sua Missão

├── eslint.config.js                 # Configuração do ESLint

├── package.jsonSeu trabalho será dividido em três etapas principais:

└── ANALISE_TEST_SMELLS.md           # Análise detalhada dos smells

```1.  **Analisar:** Identificar manualmente e com a ajuda de ferramentas de análise estática (ESLint) os diferentes Test Smells presentes no código.

2.  **Refatorar:** Reescrever os testes em um novo arquivo (`userService.clean.test.js`), corrigindo os problemas encontrados e aplicando as melhores práticas, como o padrão **Arrange, Act, Assert (AAA)**.

## Como Executar3.  **Validar:** Provar que a refatoração foi bem-sucedida, garantindo que os novos testes passem, estejam livres de avisos do linter e sejam mais claros e eficazes.



### Instalação## Como Começar (Setup)

```bash

npm installSiga os passos abaixo para preparar seu ambiente de trabalho.

```

**1. Clone o repositório:**

### Executar Testes

```bash```bash

npm testgit clone [URL_DO_SEU_FORK_DO_REPOSITORIO]

```cd test-smelly

```

### Executar ESLint
```bash
# Analisar todos os arquivos
npx eslint .

# Analisar apenas o arquivo com smells
npx eslint test/userService.smelly.test.js

# Analisar apenas o arquivo refatorado
npx eslint test/userService.clean.test.js
```

## Test Smells Identificados e Corrigidos

1. **Eager Test** - Testes que verificam múltiplas funcionalidades
2. **Conditional Test Logic** - Uso de if/for em testes
3. **Sensitive Equality** - Verificações muito acopladas à implementação
4. **Exception Handling** - Uso incorreto de try-catch
5. **Disabled Test** - Testes desabilitados com skip

## Resultados

- **Arquivo Original (smelly):** 6 problemas detectados pelo ESLint (4 errors, 2 warnings)
- **Arquivo Refatorado (clean):** 0 problemas, todos os testes passando
- **Total de Testes:** 19 testes (18 passando, 1 skipped no arquivo original)

## Padrão AAA Aplicado

Todos os testes refatorados seguem o padrão:
- **Arrange:** Preparação dos dados e contexto
- **Act:** Execução da ação que está sendo testada
- **Assert:** Verificação dos resultados esperados
