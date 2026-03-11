import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroTitle: 'Conoce a Vale Sánchez',
      heroSubtitle: 'Conoce mi historia y pasión por el fitness',
      mainContent: {
        heading: 'Mi Historia',
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Mi viaje en el mundo del fitness comenzó hace más de 8 años, cuando descubrí el poder transformador del ejercicio no solo en el cuerpo, sino en la mente y el espíritu.',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Como personal trainer certificada, he tenido el privilegio de acompañar a cientos de personas en su camino hacia una vida más saludable. Cada cliente es único, y por eso desarrollo programas personalizados que se adaptan a sus objetivos, estilo de vida y nivel de condición física.',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Mi filosofía se basa en que el fitness debe ser sostenible y disfrutable. No creo en dietas extremas ni entrenamientos que te hacen odiar el ejercicio. Creo en encontrar el equilibrio perfecto que te permita alcanzar tus metas mientras disfrutas del proceso.',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Como atleta competidora, entiendo los desafíos y las recompensas de empujar los límites. Esa experiencia me permite guiarte de manera efectiva, ya sea que estés dando tus primeros pasos o preparándote para una competencia.',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                  },
                ],
              },
            ],
          },
        },
      },
      credentials: {
        heading: 'Credenciales y Certificaciones',
        subtitle: 'Formación continua para ofrecerte el mejor servicio.',
        items: [
          { title: 'Certificación Personal Trainer', institution: 'ACE Fitness', year: 2018 },
          { title: 'Especialización en Entrenamiento Funcional', institution: 'CrossFit Level 1', year: 2019 },
          { title: 'Certificación en Nutrición Deportiva', institution: 'ISSA', year: 2020 },
          { title: 'Competidora Nacional de Fitness', institution: 'IFBB', year: 2021 },
        ],
      },
      missionValues: {
        missionHeading: 'Mi Misión',
        missionContent: 'Inspirar y guiar a cada persona hacia una vida más saludable, activa y plena a través del entrenamiento personalizado.',
        valuesHeading: 'Mis Valores',
        valuesSubtitle: 'Los principios que guían mi trabajo y mi relación con cada cliente.',
        values: [
          { icon: 'heart', title: 'Pasión', description: 'El fitness es mi vida y mi misión es compartir esa pasión contigo.' },
          { icon: 'shield', title: 'Compromiso', description: 'Me comprometo con tu éxito como si fuera el mío propio.' },
          { icon: 'target', title: 'Resultados', description: 'Enfoque en metas claras y medibles para tu transformación.' },
          { icon: 'users', title: 'Comunidad', description: 'Formas parte de una comunidad que te apoya en cada paso.' },
        ],
      },
      seo: {
        metaTitle: 'Sobre Vale Sánchez - Personal Trainer',
        metaDescription: 'Conoce a Vale Sánchez, personal trainer certificada dedicada a transformar vidas a través del fitness personalizado.',
      },
    },
  })

  console.log('Done seeding about page.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
