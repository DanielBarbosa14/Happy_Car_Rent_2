import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const loja = await prisma.loja.createMany({
    data: [{
      name: 'Viana do Castelo',
      descricao: 'Morada: Rua do Bairro do Mirante, 25 r/c , 4900-642 Areosa',
      technicalData: 'Empresa de aluguer de carros desde 2013',
      imagem: 'https://www.cm-viana-castelo.pt/wp-content/uploads/2023/07/DJI_0529-scaled.jpg',
      carrosLoja: {
        create: [
          {
            carro: {
              create: {
                nome: 'Toyota Corolla',
                descricao: 'Estilo clássico e atemporal, com ênfase na eficiência aerodinâmica, Linhas elegantes e detalhes modernos, Possíveis opções de pintura e acabamento',
                technicalData: 'Motores eficientes para economia de combustível, Opções de transmissão manual ou automática, Desempenho equilibrado para atender às necessidades do dia a dia',
                imagem: 'https://kong-proxy-intranet.toyota-europe.com/c1-images/resize/ccis/1280x1280/zip/pt/configurationtype/visual-for-grade-selector/product-token/ebadee5e-5ac7-4501-9b41-7786432cb0c1/grade/93e19bae-b1c0-4535-9917-e7021b6a763d/body/7b77d85b-8f26-4645-82ac-22154a7d6293/fallback/true/padding/50,50,50,50/image-quality/70/day-exterior-4.png',
              },
            },
          },
          {
            carro: {
              create: {
                nome: '2023 Honda Civic Type R',
                descricao: 'Estilo arrojado e esportivo, com elementos distintivos do Type R, Acentos agressivos, grade frontal distinta e detalhes aerodinâmicos, Possíveis opções de pintura e acabamentos esportivos',
                technicalData: 'Sistema de infoentretenimento com foco na conectividade, Recursos de assistência ao motorista, como alerta de colisão e sistema de frenagem automática, Cluster de instrumentos digital personalizável',
                imagem: 'https://paultan.org/image/2023/09/2023_Honda_Civic_TypeR_Launch_Malaysia-2.jpg',
              },
            },
          },
        ],
      },
    },
        ],
        data: [{
          name: 'Braga',
          descricao: 'Morada: Edifício Só Barroso Av. da Independência, nº 3, 4705-162 - Nogueira | Braga',
          technicalData: 'Empresa de aluguer de carros desde 2009',
          imagem: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-149519944_super%20copy.jpg',
          carrosLoja: {
            create: [
              {
                carro: {
                  create: {
                    nome: '2024 Acura Integra',
                    descricao: 'Estilo inspirado nas linhas modernas e elegantes da Acura, Detalhes aerodinâmicos e distintivos, Possíveis opções de pintura e acabamento premium',
                    technicalData: 'Motor eficiente e potente para desempenho equilibrado, Opções de transmissão automática ou manual, Tecnologias voltadas para uma condução dinâmica',
                    imagem: 'https://www.motortrend.com/uploads/2023/04/2024-Acura-Integra-Type-S-21.jpg',
                  },
                },
              },
              {
                carro: {
                  create: {
                    nome: '2024 Honda Civic',
                    descricao: 'Estilo moderno e inovador que reflete a evolução do design Honda, Linhas aerodinâmicas e detalhes distintos para uma presença visual marcante, Ambiente interno projetado para oferecer amplo espaço e conforto aos ocupantes',
                    technicalData: 'Motor: 2.0L, 4 cilindros, Potência: 143 hp @ 6,000 rpm, Transmissão: Automática, Consumo de Combustível: 18.3L/100 (cidade) / 15.9L/100 (estrada)',
                    imagem: 'https://vehicle-images.dealerinspire.com/3066-11001513/19XFL2G85RE005045/cae208ebd38e028c6db3e3e3f8de3961.jpg',
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
