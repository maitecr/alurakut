import { SiteClient } from 'datocms-client';

export default async function recebedorDeResquests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = 'cc64c61ae0cd452faa05bba8c64ff6';
        const client = new SiteClient(TOKEN);
        
        const registroCriado = await client.items.create({
            itemType: "968041",
            ...request.body,
          //  title: "Comunidade de teste",
          //  creatorSlug: "maitecr",
          //  imageUrl: "https://github.com/maitecr.png"
        })

        console.log(registroCriado)
        
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem.'
    })
    
}