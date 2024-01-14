import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const loja = await prisma.loja.createMany({
    data: [{
      name: 'Happy Car Rent',
      address: 'Endereço A',
      imagem: 'https://www.cm-viana-castelo.pt/wp-content/uploads/2023/07/DJI_0529-scaled.jpg',
      descricao: 'Loja localizada no centro de Viana do Castelo',
      email: 'happycarrent@gmail.com',
      telefone: 258800700,
      carrosLoja: {
        create: [
          {
            carro: {
              create: {
                marca: 'Toyota Corolla',
                modelo: 'Jetta',
                descricao: 'O Jetta é um carro sedan médio da Volkswagen. Ele possui um motor 1.4 TSI de 150 cv, uma transmissão automática de 6 velocidades e um consumo médio de 6,0 litros por 100 km.',
                informacao: 'O Jetta está disponível na loja de Viana do Castelo',
                precodiario: 106,
                imagem: 'https://kong-proxy-intranet.toyota-europe.com/c1-images/resize/ccis/1280x1280/zip/pt/configurationtype/visual-for-grade-selector/product-token/ebadee5e-5ac7-4501-9b41-7786432cb0c1/grade/93e19bae-b1c0-4535-9917-e7021b6a763d/body/7b77d85b-8f26-4645-82ac-22154a7d6293/fallback/true/padding/50,50,50,50/image-quality/70/day-exterior-4.png',
              },
            },
          },
          {
            carro: {
              create: {
                marca: 'Fiat',
                modelo: 'Cronos',
                descricao: 'O Cronos é um carro sedan compacto da Fiat. Ele possui um motor 1.3 Firefly de 109 cv, uma transmissão manual de 5 velocidades ou automática de 6 velocidades e um consumo médio de 5,5 litros por 100 km.',
                informacao: 'O Cronos está disponível nas loja de Viana do Castelo.',
                precodiario: 117,
                imagem: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Fiat_Cronos_1.8_16V_E.Torq_Precision.jpg',
              },
            },
          },
        ],
      },
    },
        ],
    include: {
      carrosLoja: {
        include: {
          carro: true,
        },
      },
    },

  });
  console.log('Lojas criadas');
}

main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
      process.exit(1)
    });
