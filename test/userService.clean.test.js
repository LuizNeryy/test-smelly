const { UserService } = require('../src/userService');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  describe('createUser', () => {
    test('deve criar um usuário com dados válidos', () => {
      const nome = 'Fulano de Tal';
      const email = 'fulano@teste.com';
      const idade = 25;

      const usuario = userService.createUser(nome, email, idade);

      expect(usuario).toBeDefined();
      expect(usuario.id).toBeDefined();
      expect(usuario.nome).toBe(nome);
      expect(usuario.email).toBe(email);
      expect(usuario.idade).toBe(idade);
      expect(usuario.status).toBe('ativo');
      expect(usuario.isAdmin).toBe(false);
    });

    test('deve lançar erro quando nome não é fornecido', () => {
      expect(() => {
        userService.createUser(null, 'email@teste.com', 25);
      }).toThrow('Nome, email e idade são obrigatórios.');
    });

    test('deve lançar erro quando email não é fornecido', () => {
      expect(() => {
        userService.createUser('Nome', null, 25);
      }).toThrow('Nome, email e idade são obrigatórios.');
    });

    test('deve lançar erro quando idade não é fornecida', () => {
      expect(() => {
        userService.createUser('Nome', 'email@teste.com', null);
      }).toThrow('Nome, email e idade são obrigatórios.');
    });

    test('deve lançar erro quando usuário é menor de idade', () => {
      expect(() => {
        userService.createUser('Menor', 'menor@email.com', 17);
      }).toThrow('O usuário deve ser maior de idade.');
    });

    test('deve criar usuário admin quando especificado', () => {
      const usuario = userService.createUser('Admin', 'admin@teste.com', 30, true);

      expect(usuario.isAdmin).toBe(true);
    });
  });

  describe('getUserById', () => {
    test('deve retornar usuário quando ID existe', () => {
      const usuarioCriado = userService.createUser('Fulano', 'fulano@teste.com', 25);

      const usuarioBuscado = userService.getUserById(usuarioCriado.id);

      expect(usuarioBuscado).toBeDefined();
      expect(usuarioBuscado.nome).toBe('Fulano');
      expect(usuarioBuscado.email).toBe('fulano@teste.com');
    });

    test('deve retornar null quando ID não existe', () => {
      const usuario = userService.getUserById('id-inexistente');

      expect(usuario).toBeNull();
    });
  });

  describe('deactivateUser', () => {
    test('deve desativar usuário comum', () => {
      const usuario = userService.createUser('Comum', 'comum@teste.com', 30);

      const resultado = userService.deactivateUser(usuario.id);

      expect(resultado).toBe(true);
      const usuarioAtualizado = userService.getUserById(usuario.id);
      expect(usuarioAtualizado.status).toBe('inativo');
    });

    test('não deve desativar usuário admin', () => {
      const admin = userService.createUser('Admin', 'admin@teste.com', 40, true);

      const resultado = userService.deactivateUser(admin.id);

      expect(resultado).toBe(false);
      const adminAtualizado = userService.getUserById(admin.id);
      expect(adminAtualizado.status).toBe('ativo');
    });

    test('deve retornar false quando usuário não existe', () => {
      const resultado = userService.deactivateUser('id-inexistente');

      expect(resultado).toBe(false);
    });
  });

  describe('generateUserReport', () => {
    test('deve gerar relatório vazio quando não há usuários', () => {
      const relatorio = userService.generateUserReport();

      expect(relatorio).toContain('Relatório de Usuários');
      expect(relatorio).toContain('Nenhum usuário cadastrado');
    });

    test('deve gerar relatório com informações dos usuários', () => {
      const alice = userService.createUser('Alice', 'alice@email.com', 28);
      const bob = userService.createUser('Bob', 'bob@email.com', 32);

      const relatorio = userService.generateUserReport();

      expect(relatorio).toContain('Relatório de Usuários');
      expect(relatorio).toContain(alice.id);
      expect(relatorio).toContain('Alice');
      expect(relatorio).toContain('ativo');
      expect(relatorio).toContain(bob.id);
      expect(relatorio).toContain('Bob');
    });

    test('deve incluir usuários inativos no relatório', () => {
      const usuario = userService.createUser('Maria', 'maria@email.com', 25);
      userService.deactivateUser(usuario.id);

      const relatorio = userService.generateUserReport();

      expect(relatorio).toContain('Maria');
      expect(relatorio).toContain('inativo');
    });
  });
});
