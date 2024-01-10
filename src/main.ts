import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar uma nova loja
  const newLoja = await prisma.loja.create({
    data: {
      nome: 'Happy Car Rent Loja A',
      endereco: 'Endereço da Loja A',
    },
  });
  console.log('Created new loja: ', newLoja);

  // Criar um novo carro na frota
  const newCarro = await prisma.carro.create({
    data: {
      modelo: 'Carro A',
      categoria: 'Utilitário',
      preco: 50,
      lojaId: newLoja.id,
    },
  });
  console.log('Created new carro: ', newCarro);

  // Obter todas as lojas
  const allLojas = await prisma.loja.findMany();
  console.log('All lojas: ');
  console.dir(allLojas, { depth: null });

  // Obter todos os carros na frota
  const allCarros = await prisma.carro.findMany({
    include: { loja: true },
  });
  console.log('All carros in frota: ');
  console.dir(allCarros, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
