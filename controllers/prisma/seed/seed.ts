import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const inicio = await prisma.happycarrent.create({
    data: { nome: 'Inicio' },
  });

  const loja = await prisma.loja.create({
    data: {
      nome: 'Loja A', // Substitua com o nome real da loja
      endereco: 'Endereço da Loja A',
    },
  });

  const frota = await prisma.frota.create({
    data: {
      modelo: 'Carro A', // Substitua com o modelo real do carro
      categoria: 'Utilitário',
      preco: 50,
      lojaId: loja.id,
    },
  });

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
