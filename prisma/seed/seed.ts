import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const ingredientes = await prisma.ingrediente.createMany({
    data: [
      { nome: 'Bacalhau' },
      { nome: 'Azeite' },
      { nome: 'Alho' },
    ],
  });

  const receitas = await prisma.receita.createMany({
    data: [
      {
        name: 'Bacalhau à Brás',
        instructions: 'Cozinhe o bacalhau e misture com batatas e ovos mexidos.',
        prepTime: '30 minutos',
        cookTime: '30 minutos',
        servings: 4,
        image: 'link_para_imagem',
        feito: false,
      },
    ],
  });

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1)
  });
