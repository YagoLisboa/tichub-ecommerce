import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import axios from 'axios';

// 1. Passamos EXATAMENTE o que o runtime quer: o objeto com a URL
// 2. Apontamos para o arquivo correto na raiz: 'file:./dev.db'
//// @ts-expect-error - Tipagem do Prisma exige Database, mas o runtime exige objeto URL
const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
});

// 3. Inicialização
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando o Seeder do Banco de Dados...');

  try {
    // 2. Buscando dados reais da Fake Store API
    const { data: fakeProducts } = await axios.get('https://fakestoreapi.com/products');

    // 3. Extraindo categorias únicas da API
    const uniqueCategories = [...new Set(fakeProducts.map((p: any) => p.category))];

    // 4. Salvando as categorias no nosso banco
    for (const catName of uniqueCategories) {
      await prisma.category.upsert({
        where: { name: String(catName) },
        update: {},
        create: { name: String(catName) },
      });
    }

    // 5. Salvando os produtos reais vinculados às categorias
    for (const fakeProduct of fakeProducts) {
      const category = await prisma.category.findUnique({
        where: { name: fakeProduct.category }
      });

      if (category) {
        await prisma.product.create({
          data: {
            name: fakeProduct.title,
            price: fakeProduct.price,
            description: fakeProduct.description,
            image: fakeProduct.image,
            stock: Math.floor(Math.random() * 50) + 1, // Estoque aleatório entre 1 e 50
            categoryId: category.id
          }
        });
      }
    }

    console.log('✅ Banco de dados populado com sucesso com dados reais da Fake Store API!');
  } catch (error) {
    console.error('❌ Erro ao popular o banco de dados:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    // Desconecta o Prisma no final da operação
    await prisma.$disconnect();
  });