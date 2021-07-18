import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations'

function ProfileSidebar (propriedades){  
  return(
    <Box as="aside">
    <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}} />
    <hr />

    <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
      </a>
    </p>
    <hr />
    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.itens.length})
       </h2>
      {
        <ul>
       {/* {seguidores.map((itemAtual) => {
           return (
             <li key={itemAtual.id}>
               <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual} />
                   <span>{itemAtual}</span>
                 </a>
             </li>
           )
          })} */}
          
        </ul> 
      }         
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuario = props.githubUser;
  const [comunidades, setComunidades] = React.useState([  ]);
  //const comunidades = comunidades[0];
  //const alteradorDeComunidades/setComunidades = comunidades [1];
  console.log(comunidades);
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'viniirale', 
    'DanielRAcosta', 
    'amfabian', 
    'Krigeren', 
    'fabio-baum', 
    'simaraconceicao'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  //Pegar o array de dados do github
  React.useEffect(function() {
    fetch('https://api.github.com/users/maitecr/followers')
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
    
    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '861c877c903054df12fe5f13e6e4d5',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          creatorSlug
          imageUrl
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)

    })

  }, [])

  console.log('seguidores antes do return'.seguidores)

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuario} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}> 
          <Box>
            <h1 className="title">
              Bem-vindo(a), {usuario}!
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'))
              console.log('Campo: ', dadosDoForm.get('image'))

              const comunidade = {
                title: dadosDoForm.get('title'),
                creatorSlug: usuario,
                imageUrl: dadosDoForm.get('image'),
              }
              
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                
              })
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)            
             
            }}>

              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa:" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa:" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea"style={{ gridArea: 'profileRelationsArea'}}>
      
          <ProfileRelationsBox title="Seguidores" itens={seguidores} />
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades  ({comunidades.length})
            </h2>
            {
               <ul>
               {comunidades.map((itemAtual) => {
                 return (
                   <li key={itemAtual.id}>
                     <a href={`/communities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} />
                         <span>{itemAtual.title}</span>
                       </a>
                   </li>
                 )
                })}
              </ul>
            }         
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da Comunidade  ({pessoasFavoritas.length})
            </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                </li>
              )
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        
      </MainGrid>
    </>
      )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  //Substituir com este link para subir para o vercel: https://alurakut-ten-sable.vercel.app/
  const { isAuthenticated } = await fetch("https://alurakut-ten-sable.vercel.app", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())


  console.log('isAuthenticated', isAuthenticated);
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, 
  }
}
